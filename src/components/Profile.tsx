import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Settings } from 'lucide-react';
import { messages } from '../i18n/messages';
import { effectiveStreak, localDateString } from '../lib/progress';
import { useStore } from '../store/useStore';
import type { Language } from '../types';

const languages: { id: Language; flag: string; label: string }[] = [
    { id: 'nl', flag: '🇳🇱', label: 'Nederlands' },
    { id: 'en', flag: '🇺🇸', label: 'English' },
    { id: 'es', flag: '🇻🇪', label: 'Español' },
];

export const Profile: React.FC = () => {
    const language = useStore((state) => state.language);
    const displayName = useStore((state) => state.displayName);
    const xp = useStore((state) => state.xp);
    const streak = useStore((state) => state.streak);
    const lastStudyDate = useStore((state) => state.lastStudyDate);
    const setLanguage = useStore((state) => state.setLanguage);
    const setDisplayName = useStore((state) => state.setDisplayName);
    const resetProgress = useStore((state) => state.resetProgress);
    const navigate = useNavigate();
    const [draft, setDraft] = useState(displayName);
    const [confirming, setConfirming] = useState(false);
    useEffect(() => {
        setDraft(displayName);
    }, [displayName]);
    const copy = messages[language ?? 'en'];
    const streakDays = effectiveStreak(streak, lastStudyDate, localDateString());
    const initial = (displayName.trim().charAt(0) || 'L').toUpperCase();

    return (
        <div className="min-h-screen bg-slate-900 text-white p-6 pb-28">
            <h1 className="text-2xl font-bold mb-6">{copy.profileTitle}</h1>

            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 mb-6">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-sunset flex items-center justify-center text-2xl font-bold">
                        {initial}
                    </div>
                    <div className="flex-1">
                        <label className="text-xs uppercase tracking-wide text-gray-400 font-bold" htmlFor="display-name">
                            {copy.profileName}
                        </label>
                        <input
                            id="display-name"
                            value={draft}
                            onChange={(event) => setDraft(event.target.value)}
                            onBlur={() => setDisplayName(draft)}
                            className="mt-1 w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 font-bold text-lg focus:outline-none focus:border-brand-teal"
                        />
                        <p className="text-gray-400 text-sm mt-1">{copy.profileLearning}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-900 p-4 rounded-xl text-center">
                        <span className="text-2xl">🔥</span>
                        <p className="font-bold text-xl" data-testid="profile-streak">{streakDays}</p>
                        <p className="text-xs text-gray-400">{copy.streak}</p>
                    </div>
                    <div className="bg-slate-900 p-4 rounded-xl text-center">
                        <span className="text-2xl">⚡</span>
                        <p className="font-bold text-xl" data-testid="profile-xp">{xp}</p>
                        <p className="text-xs text-gray-400">{copy.totalXp}</p>
                    </div>
                </div>
            </div>

            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 mb-6">
                <div className="flex items-center gap-2 mb-4 text-gray-400 uppercase text-xs font-bold tracking-wider">
                    <Settings size={16} />
                    <span>{copy.languageSettings}</span>
                </div>
                <p className="text-sm text-gray-400 mb-4">{copy.iSpeak}</p>
                <div className="grid gap-2">
                    {languages.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => setLanguage(item.id)}
                            className={`p-3 rounded-xl border flex items-center gap-3 font-bold transition-all ${language === item.id ? 'bg-brand-teal/20 border-brand-teal text-brand-teal' : 'bg-slate-900 border-slate-700 text-gray-400'}`}
                        >
                            <span className="text-xl">{item.flag}</span> {item.label}
                        </button>
                    ))}
                </div>
            </div>

            {confirming ? (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4">
                    <p className="font-bold text-red-200">{copy.resetTitle}</p>
                    <p className="text-sm text-red-100/80 mt-1 mb-4">{copy.resetBody}</p>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => {
                                resetProgress();
                                navigate('/');
                            }}
                            className="flex-1 py-3 rounded-xl bg-red-500 text-white font-bold"
                        >
                            {copy.resetYes}
                        </button>
                        <button
                            type="button"
                            onClick={() => setConfirming(false)}
                            className="flex-1 py-3 rounded-xl bg-slate-800 text-white font-bold"
                        >
                            {copy.resetCancel}
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={() => setConfirming(true)}
                    className="w-full p-4 rounded-xl bg-red-500/10 text-red-400 border border-red-500/30 font-bold flex items-center justify-center gap-2 hover:bg-red-500/20 transition-colors"
                >
                    <LogOut size={20} />
                    {copy.reset}
                </button>
            )}
        </div>
    );
};
