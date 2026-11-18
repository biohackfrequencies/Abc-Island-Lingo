import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Lock, Star } from 'lucide-react';
import { lessons } from '../data/lessons';
import { formatCompleted, messages, sectionTitle, unitTitle } from '../i18n/messages';
import { isLessonLocked } from '../lib/progress';
import { useStore } from '../store/useStore';
import { PaywallCard } from './PaywallCard';

const levelBadge: Record<string, string> = {
    A1: 'bg-brand-teal',
    A2: 'bg-blue-500',
    B1: 'bg-purple-500',
    B2: 'bg-pink-500',
    C1: 'bg-yellow-500',
};

export const LessonCatalog: React.FC<{ showPaywall?: boolean }> = ({ showPaywall = true }) => {
    const language = useStore((state) => state.language) ?? 'en';
    const completedLessons = useStore((state) => state.completedLessons);
    const isPremium = useStore((state) => state.isPremium);
    const copy = messages[language];
    const done = new Set(completedLessons);
    let paywallShown = false;

    const focusPaywall = () => {
        document.getElementById('premium-paywall')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    return (
        <div className="space-y-12">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((unit) => {
                const unitLessons = lessons.filter((lesson) => lesson.unit === unit);
                if (unitLessons.length === 0) return null;

                const currentLevel = unitLessons[0]?.level || 'A1';
                const previousLevel = lessons.find((lesson) => lesson.unit === unit - 1)?.level;
                const isSectionStart = currentLevel !== previousLevel;
                const unitLocked = isLessonLocked(unit, isPremium);
                const showPaywallCard = showPaywall && unitLocked && !paywallShown;
                if (showPaywallCard) paywallShown = true;
                const finished = unitLessons.filter((lesson) => done.has(lesson.id)).length;

                return (
                    <div key={unit}>
                        {isSectionStart && (
                            <div className="mt-8 mb-6 border-b-2 border-slate-700/50 pb-2">
                                <h3 className="text-sm font-black tracking-[0.2em] text-gray-500 uppercase flex items-center gap-2">
                                    <span className={`px-2 py-0.5 rounded text-xs text-white ${levelBadge[currentLevel] ?? 'bg-slate-600'}`}>
                                        {currentLevel}
                                    </span>
                                    {sectionTitle(currentLevel, language)}
                                </h3>
                            </div>
                        )}

                        <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-sunset flex items-center justify-center font-bold text-xl shadow-lg shadow-orange-500/20">
                                {unit}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white tracking-wide">{unitTitle(unit, language)}</h3>
                                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                                    {formatCompleted(finished, unitLessons.length, language)}
                                </p>
                            </div>
                        </div>

                        {showPaywallCard && (
                            <div className="mb-6">
                                <PaywallCard />
                            </div>
                        )}

                        <div className="space-y-4 relative">
                            {!unitLocked && <div className="absolute left-[22px] top-4 bottom-4 w-1 bg-slate-800 -z-10 rounded-full" />}
                            {unitLessons.map((lesson) => {
                                const isCompleted = done.has(lesson.id);
                                const body = (
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-4 z-10 ${isCompleted && !unitLocked ? 'bg-brand-green border-brand-green text-white' : 'bg-slate-900 border-slate-700 text-slate-500'}`}>
                                            {unitLocked ? <Lock size={18} /> : isCompleted ? <Check size={20} strokeWidth={4} /> : <div className="w-3 h-3 rounded-full bg-current" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className={`font-bold text-lg ${isCompleted && !unitLocked ? 'text-brand-green' : 'text-white'}`}>
                                                {lesson.title}
                                            </h4>
                                            <p className="text-sm text-gray-400">{lesson.description[language]}</p>
                                        </div>
                                        {unitLocked && <span className="text-xs font-bold uppercase text-brand-teal">{copy.lockedRow}</span>}
                                        {isCompleted && !unitLocked && <Star size={16} className="fill-yellow-400 text-yellow-400" />}
                                    </div>
                                );

                                if (unitLocked) {
                                    return (
                                        <button
                                            key={lesson.id}
                                            type="button"
                                            onClick={focusPaywall}
                                            className="block w-full text-left relative bg-slate-800/70 rounded-2xl p-4 border-2 border-slate-700"
                                        >
                                            {body}
                                        </button>
                                    );
                                }

                                return (
                                    <Link
                                        key={lesson.id}
                                        to={`/lesson/${lesson.id}`}
                                        className={`block relative bg-slate-800 rounded-2xl p-4 border-2 transition-all ${isCompleted ? 'border-brand-green bg-brand-green/10' : 'border-slate-700 hover:border-brand-teal'}`}
                                    >
                                        {body}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
