import { createContext, useContext, useEffect, useState } from 'react';
import type { CustomerInfo, PurchasesPackage } from '@revenuecat/purchases-capacitor';
import { Purchases } from '@revenuecat/purchases-capacitor';
import { Capacitor } from '@capacitor/core';
import { useStore } from '../store/useStore';

const API_KEYS = {
    ios: 'appl_xbbjNQDKQjsFGMiUHSisHUjFWmI',
    android: 'goog_pkJdoVriybPknlkGRKJestCMfNv',
};

const ENTITLEMENT_ID = 'premium';

export type IapNoticeCode =
    | 'purchased'
    | 'restored'
    | 'nothing'
    | 'cancelled'
    | 'purchase-failed'
    | 'restore-failed'
    | 'unavailable'
    | 'ios-only'
    | 'init-failed';

export interface IapApi {
    packages: PurchasesPackage[];
    loading: boolean;
    notice: IapNoticeCode | null;
    clearNotice: () => void;
    purchase: (pack?: PurchasesPackage) => Promise<boolean>;
    restore: () => Promise<boolean>;
    redeemCode: () => Promise<void>;
}

export const IapContext = createContext<IapApi | null>(null);

type InitResult = { packages: PurchasesPackage[]; notice: IapNoticeCode | null };

let initTask: Promise<InitResult> | null = null;

function isNativeStore(): boolean {
    const platform = Capacitor.getPlatform();
    return platform === 'ios' || platform === 'android';
}

function isCancelled(error: unknown): boolean {
    if (!error || typeof error !== 'object') return false;
    const record = error as { userCancelled?: boolean; code?: string | number };
    return Boolean(record.userCancelled) || record.code === 1 || record.code === '1' || record.code === 'PURCHASE_CANCELLED';
}

function hasPremium(customerInfo: CustomerInfo): boolean {
    return typeof customerInfo.entitlements.active[ENTITLEMENT_ID] !== 'undefined';
}

function syncPremium(customerInfo: CustomerInfo) {
    useStore.getState().setPremium(hasPremium(customerInfo));
}

async function runInit(): Promise<InitResult> {
    if (!isNativeStore()) {
        return { packages: [], notice: null };
    }

    const platform = Capacitor.getPlatform();
    const apiKey = platform === 'ios' ? API_KEYS.ios : API_KEYS.android;

    try {
        await Purchases.configure({ apiKey });
        const { customerInfo } = await Purchases.getCustomerInfo();
        syncPremium(customerInfo);
        const offerings = await Purchases.getOfferings();
        const packages = offerings.current?.availablePackages ?? [];
        return { packages, notice: null };
    } catch (error) {
        console.error('IAP init failed', error);
        return { packages: [], notice: 'init-failed' };
    }
}

function loadIap(): Promise<InitResult> {
    if (!initTask) initTask = runInit();
    return initTask;
}

export function useIapController(): IapApi {
    const [packages, setPackages] = useState<PurchasesPackage[]>([]);
    const [loading, setLoading] = useState(false);
    const [notice, setNotice] = useState<IapNoticeCode | null>(null);

    useEffect(() => {
        let active = true;
        loadIap().then((result) => {
            if (!active) return;
            setPackages(result.packages);
            if (result.notice) setNotice(result.notice);
        });
        return () => {
            active = false;
        };
    }, []);

    const purchase = async (pack?: PurchasesPackage) => {
        const selected = pack ?? packages[0];
        if (!isNativeStore() || !selected) {
            setNotice('unavailable');
            return false;
        }

        setLoading(true);
        setNotice(null);
        try {
            const { customerInfo } = await Purchases.purchasePackage({ aPackage: selected });
            syncPremium(customerInfo);
            if (hasPremium(customerInfo)) setNotice('purchased');
            return hasPremium(customerInfo);
        } catch (error) {
            if (isCancelled(error)) {
                setNotice('cancelled');
            } else {
                console.error('IAP purchase failed', error);
                setNotice('purchase-failed');
            }
            return false;
        } finally {
            setLoading(false);
        }
    };

    const restore = async () => {
        if (!isNativeStore()) {
            setNotice('unavailable');
            return false;
        }

        setLoading(true);
        setNotice(null);
        try {
            const { customerInfo } = await Purchases.restorePurchases();
            syncPremium(customerInfo);
            const entitled = hasPremium(customerInfo);
            setNotice(entitled ? 'restored' : 'nothing');
            return entitled;
        } catch (error) {
            console.error('IAP restore failed', error);
            setNotice('restore-failed');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const redeemCode = async () => {
        if (Capacitor.getPlatform() !== 'ios') {
            setNotice('ios-only');
            return;
        }
        try {
            await Purchases.presentCodeRedemptionSheet();
        } catch (error) {
            console.error('IAP redeem failed', error);
            setNotice('purchase-failed');
        }
    };

    return {
        packages,
        loading,
        notice,
        clearNotice: () => setNotice(null),
        purchase,
        restore,
        redeemCode,
    };
}

export function useIap(): IapApi {
    const api = useContext(IapContext);
    if (!api) {
        throw new Error('useIap must be used within IapProvider');
    }
    return api;
}
