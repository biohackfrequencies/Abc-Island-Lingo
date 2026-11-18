import React from 'react';
import { Lock } from 'lucide-react';
import { useIap } from '../hooks/useIAP';
import { formatPremiumOffer, messages } from '../i18n/messages';
import { courseStats } from '../lib/catalog';
import { useStore } from '../store/useStore';

export const PaywallCard: React.FC = () => {
    const language = useStore((state) => state.language) ?? 'en';
    const copy = messages[language];
    const { packages, purchase, restore, redeemCode, loading } = useIap();
    const price = packages[0]?.product.priceString || null;
    const { units, words } = courseStats();
    const offer = formatPremiumOffer(language, units, words, price);

    return (
        <div id="premium-paywall" className="bg-slate-800/80 rounded-2xl p-8 border border-brand-teal/30 text-center relative overflow-hidden backdrop-blur-sm">
            <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10 shadow-lg">
                <Lock className="text-brand-teal w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{copy.premiumTitle}</h3>
            <p className="text-gray-200 text-sm leading-relaxed mb-6 max-w-md mx-auto" data-testid="premium-offer">{offer}</p>
            <div className="flex flex-col gap-3 items-center">
                <button
                    type="button"
                    onClick={() => purchase(packages[0])}
                    disabled={loading}
                    className="bg-brand-teal text-slate-900 font-bold py-3 px-8 rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(45,212,191,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? copy.processing : price ? `${copy.unlock} · ${price}` : copy.unlock}
                </button>
                <button
                    type="button"
                    onClick={restore}
                    disabled={loading}
                    className="text-gray-300 text-sm font-medium hover:text-white underline decoration-gray-600 underline-offset-4 disabled:opacity-50"
                >
                    {copy.restore}
                </button>
                <button
                    type="button"
                    onClick={redeemCode}
                    disabled={loading}
                    className="text-gray-400 text-xs font-medium hover:text-white disabled:opacity-50"
                >
                    {copy.redeem}
                </button>
            </div>
        </div>
    );
};
