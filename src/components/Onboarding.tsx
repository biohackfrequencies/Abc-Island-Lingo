import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import type { Language } from '../types';

const choices: { id: Language; flag: string; label: string }[] = [
    { id: 'nl', flag: '🇳🇱', label: 'Ik spreek Nederlands' },
    { id: 'en', flag: '🇺🇸', label: 'I speak English' },
    { id: 'es', flag: '🇻🇪', label: 'Hablo Español' },
];

export const Onboarding: React.FC = () => {
    const setLanguage = useStore((state) => state.setLanguage);
    const navigate = useNavigate();

    const handleSelect = (lang: Language) => {
        setLanguage(lang);
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-center">
            <img src="/logo.png" alt="ABC Island Lingo" className="w-36 h-36 object-contain" />

            <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-brand-teal">ABC Island Lingo</p>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-ocean mb-4">
                Bon bini!
            </h1>
            <div className="mb-8 space-y-1" data-testid="language-prompt">
                <p className="text-lg font-bold text-white">Which language do you speak?</p>
                <p className="text-lg font-bold text-white">Welke taal spreek je?</p>
                <p className="text-lg font-bold text-white">¿Qué idioma hablas?</p>
            </div>

            <div className="grid gap-4 w-full max-w-sm">
                {choices.map((choice) => (
                    <button
                        key={choice.id}
                        type="button"
                        onClick={() => handleSelect(choice.id)}
                        className="bg-white hover:bg-teal-50 border-2 border-transparent hover:border-brand-teal text-gray-800 font-bold py-4 px-6 rounded-2xl shadow-md transition-all flex items-center justify-between group"
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">{choice.flag}</span>
                            <span>{choice.label}</span>
                        </div>
                        <ArrowRight className="text-gray-300 group-hover:text-brand-teal transition-colors" />
                    </button>
                ))}
            </div>

            <p className="mt-8 text-sm text-gray-400">Aruba · Bonaire · Curaçao</p>
        </div>
    );
};
