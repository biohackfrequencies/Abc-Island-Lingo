import React from 'react';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { LogOut, Settings } from 'lucide-react';

export const Profile: React.FC = () => {
    const { language, setLanguage, resetProgress } = useStore();
    const navigate = useNavigate();

    const handleReset = () => {
        if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
            resetProgress();
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white p-6 pb-24">
            <h1 className="text-2xl font-bold mb-6">Your Profile</h1>

            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 mb-6">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-sunset flex items-center justify-center text-2xl font-bold">
                        A
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Annemiek</h2>
                        <p className="text-gray-400">Learning Papiamento</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-900 p-4 rounded-xl text-center">
                        <span className="text-2xl">🔥</span>
                        <p className="font-bold text-xl">1</p>
                        <p className="text-xs text-gray-400">Day Streak</p>
                    </div>
                    <div className="bg-slate-900 p-4 rounded-xl text-center">
                        <span className="text-2xl">⚡</span>
                        <p className="font-bold text-xl">106</p>
                        <p className="text-xs text-gray-400">Total XP</p>
                    </div>
                </div>
            </div>

            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 mb-6">
                <div className="flex items-center gap-2 mb-4 text-gray-400 uppercase text-xs font-bold tracking-wider">
                    <Settings size={16} />
                    <span>Language Settings</span>
                </div>

                <p className="text-sm text-gray-400 mb-4">I speak:</p>
                <div className="grid gap-2">
                    <button
                        onClick={() => setLanguage('nl')}
                        className={`p-3 rounded-xl border flex items-center gap-3 font-bold transition-all ${language === 'nl' ? 'bg-brand-teal/20 border-brand-teal text-brand-teal' : 'bg-slate-900 border-slate-700 text-gray-400'}`}
                    >
                        <span className="text-xl">🇳🇱</span> Nederlands
                    </button>
                    <button
                        onClick={() => setLanguage('en')}
                        className={`p-3 rounded-xl border flex items-center gap-3 font-bold transition-all ${language === 'en' ? 'bg-brand-teal/20 border-brand-teal text-brand-teal' : 'bg-slate-900 border-slate-700 text-gray-400'}`}
                    >
                        <span className="text-xl">🇺🇸</span> English
                    </button>
                    <button
                        onClick={() => setLanguage('es')}
                        className={`p-3 rounded-xl border flex items-center gap-3 font-bold transition-all ${language === 'es' ? 'bg-brand-teal/20 border-brand-teal text-brand-teal' : 'bg-slate-900 border-slate-700 text-gray-400'}`}
                    >
                        <span className="text-xl">🇻🇪</span> Español
                    </button>
                </div>
            </div>

            <button
                onClick={handleReset}
                className="w-full p-4 rounded-xl bg-red-500/10 text-red-400 border border-red-500/30 font-bold flex items-center justify-center gap-2 hover:bg-red-500/20 transition-colors"
            >
                <LogOut size={20} />
                Sign Out / Reset Progress
            </button>
        </div>
    );
};
