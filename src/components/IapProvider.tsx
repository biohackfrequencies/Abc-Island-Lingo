import React from 'react';
import { IapContext, useIapController, type IapNoticeCode } from '../hooks/useIAP';
import { messages, type MessageKey } from '../i18n/messages';
import { useStore } from '../store/useStore';

const noticeKey: Record<IapNoticeCode, MessageKey> = {
    purchased: 'iapPurchased',
    restored: 'iapRestored',
    nothing: 'iapNothing',
    cancelled: 'iapCancelled',
    'purchase-failed': 'iapPurchaseFailed',
    'restore-failed': 'iapRestoreFailed',
    unavailable: 'iapUnavailable',
    'ios-only': 'iapIosOnly',
    'init-failed': 'iapInitFailed',
};

export const IapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const api = useIapController();
    const language = useStore((state) => state.language) ?? 'en';
    const copy = messages[language];
    const tone = api.notice === 'purchased' || api.notice === 'restored'
        ? 'border-green-500/40 bg-green-950 text-green-50'
        : api.notice === 'purchase-failed' || api.notice === 'restore-failed' || api.notice === 'init-failed'
            ? 'border-red-500/40 bg-red-950 text-red-50'
            : 'border-brand-teal/40 bg-slate-800 text-slate-100';

    return (
        <IapContext.Provider value={api}>
            {children}
            {api.notice && (
                <div className="safe-top pointer-events-none fixed inset-x-0 top-0 z-[80] px-4">
                    <div className={`pointer-events-auto mx-auto max-w-md rounded-2xl border p-4 shadow-2xl ${tone}`} role="status">
                        <p className="text-sm font-semibold leading-relaxed">{copy[noticeKey[api.notice]]}</p>
                        <button
                            type="button"
                            onClick={api.clearNotice}
                            className="mt-3 text-xs font-bold uppercase tracking-wide opacity-80"
                        >
                            {copy.dismiss}
                        </button>
                    </div>
                </div>
            )}
        </IapContext.Provider>
    );
};
