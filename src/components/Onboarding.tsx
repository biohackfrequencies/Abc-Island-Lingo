import React from 'react';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const Onboarding: React.FC = () => {
    const setLanguage = useStore((state) => state.setLanguage);
    const navigate = useNavigate();

    const handleSelect = (lang: 'en' | 'nl' | 'es') => {
        setLanguage(lang);
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-center">
            <img src="/logo.png" alt="ABC Logo" className="w-28 h-28 rounded-3xl shadow-2xl border-4 border-white/10" />

            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-ocean mb-2">
                Bon Bini!
            </h1>
            <p className="text-gray-400 mb-8 max-w-sm">
                Welcome to Papiamento Learn. Which language do you speak?
            </p>

            <div className="grid gap-4 w-full max-w-sm">
                <button
                    onClick={() => handleSelect('nl')}
                    className="bg-white hover:bg-teal-50 border-2 border-transparent hover:border-primary text-gray-800 font-bold py-4 px-6 rounded-2xl shadow-md transition-all flex items-center justify-between group"
                >
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">🇳🇱</span>
                        <span>Ik spreek Nederlands</span>
                    </div>
                    <ArrowRight className="text-gray-300 group-hover:text-primary transition-colors" />
                </button>

                <button
                    onClick={() => handleSelect('en')}
                    className="bg-white hover:bg-teal-50 border-2 border-transparent hover:border-primary text-gray-800 font-bold py-4 px-6 rounded-2xl shadow-md transition-all flex items-center justify-between group"
                >
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">🇺🇸</span>
                        <span>I speak English</span>
                    </div>
                    <ArrowRight className="text-gray-300 group-hover:text-primary transition-colors" />
                </button>

                <button
                    onClick={() => handleSelect('es')}
                    className="bg-white hover:bg-teal-50 border-2 border-transparent hover:border-primary text-gray-800 font-bold py-4 px-6 rounded-2xl shadow-md transition-all flex items-center justify-between group"
                >
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">🇻🇪</span>
                        <span>Hablo Español</span>
                    </div>
                    <ArrowRight className="text-gray-300 group-hover:text-primary transition-colors" />
                </button>
            </div>

            <p className="mt-8 text-sm text-gray-400">
                Start your journey to the ABC islands today.
            </p>
        </div>
    );
};
