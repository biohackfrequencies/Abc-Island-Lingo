import { useEffect, useState } from 'react';
import type { PurchasesPackage, CustomerInfo } from '@revenuecat/purchases-capacitor';
import { Purchases } from '@revenuecat/purchases-capacitor';
import { useStore } from '../store/useStore';
import { Capacitor } from '@capacitor/core';

// TODO: Replace with your actual RevenueCat API Keys
const API_KEYS = {
    ios: "appl_xbbjNQDKQjsFGMiUHSisHUjFWmI",
    android: "goog_pkJdoVriybPknlkGRKJestCMfNv"
};

const ENTITLEMENT_ID = "premium"; // The identifier for your entitlement in RevenueCat

export const useIAP = () => {
    const { setPremium, isPremium } = useStore();
    const [packages, setPackages] = useState<PurchasesPackage[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Initialize RevenueCat
    useEffect(() => {
        const init = async () => {
            const platform = Capacitor.getPlatform();
            const apiKey = platform === 'ios' ? API_KEYS.ios : API_KEYS.android;

            if (!apiKey || apiKey.includes("YOUR_")) {
                console.warn("IAP: API Key not set. Purchases will not work.");
                return;
            }

            try {
                await Purchases.configure({ apiKey });

                // key: Check current subscription status
                const { customerInfo } = await Purchases.getCustomerInfo();
                updatePremiumStatus(customerInfo);

                // Load offerings
                const offerings = await Purchases.getOfferings();
                if (offerings.current && offerings.current.availablePackages.length > 0) {
                    setPackages(offerings.current.availablePackages);
                }
            } catch (e: any) {
                console.error("IAP Init Error:", e);
                // DEBUG: Show actual error to user
                alert(`IAP Error: ${e.message || JSON.stringify(e)}`);
            }
        };

        init();
    }, []);

    const updatePremiumStatus = (customerInfo: CustomerInfo) => {
        const isEntitled = typeof customerInfo.entitlements.active[ENTITLEMENT_ID] !== "undefined";
        if (isEntitled !== isPremium) {
            setPremium(isEntitled);
        }
    };

    const purchase = async (pack: PurchasesPackage) => {
        setLoading(true);
        setError(null);
        try {
            const { customerInfo } = await Purchases.purchasePackage({ aPackage: pack });
            updatePremiumStatus(customerInfo);
            return true;
        } catch (e: any) {
            if (!e.userCancelled) {
                setError(e.message || "Purchase failed");
            }
            return false;
        } finally {
            setLoading(false);
        }
    };

    const restore = async () => {
        setLoading(true);
        setError(null);
        try {
            const { customerInfo } = await Purchases.restorePurchases();
            updatePremiumStatus(customerInfo);

            // Check if user actually has the entitlement after restore
            const isEntitled = typeof customerInfo.entitlements.active[ENTITLEMENT_ID] !== "undefined";
            if (isEntitled) {
                alert("Purchases restored successfully!");
            } else {
                alert("No previous purchases found.");
            }
            return isEntitled;
        } catch (e: any) {
            setError(e.message || "Restore failed");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        packages,
        purchase,
        restore,
        loading,
        error
    };
};
