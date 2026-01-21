import React from 'react';
import { useStore } from '../store/useStore';
import { useIAP } from '../hooks/useIAP';
import { lessons } from '../data/lessons';
import { Link } from 'react-router-dom';
import { Star, Flame, Zap, Check, PlayCircle, Lock } from 'lucide-react';

export const Dashboard: React.FC = () => {
    const { language, completedLessons, isPremium } = useStore();
    const { packages, purchase, restore, loading, error } = useIAP();

    const nextLessonIndex = lessons.findIndex(l => !completedLessons.includes(l.id));
    const activeLesson = lessons[nextLessonIndex !== -1 ? nextLessonIndex : 0];

    if (!language) return <div className="p-4 text-white">Please select a language first.</div>;

    return (
        <div className="min-h-screen bg-bg-main pb-24 text-white">
            {/* Header */}
            <header className="p-6 pb-2 flex justify-between items-start">
                <div className="flex items-center gap-3">
                    <img src="/logo.png" alt="ABC Logo" className="w-12 h-12 rounded-xl shadow-lg" />
                    <div>
                        <h1 className="text-xl font-bold text-gray-400 leading-none">Bon bini!</h1>
                        <h2 className="text-2xl font-extrabold text-white leading-tight">ABC Island Lingo</h2>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-slate-800/50 p-2 rounded-full border border-slate-700/50 backdrop-blur-sm">
                    <span className="text-xl">
                        {language === 'en' ? '🇺🇸' : language === 'es' ? '🇻🇪' : '🇳🇱'}
                    </span>
                    <span className="text-gray-400">→</span>
                    <span className="text-xl">🇦🇼</span>
                </div>
            </header>

            {/* Stats Row */}
            <div className="px-6 py-4 grid grid-cols-2 gap-4">
                <div className="bg-white py-3 px-4 rounded-2xl flex items-center gap-3 shadow-md">
                    <div className="p-2 bg-orange-100 rounded-full text-orange-500">
                        <Flame size={20} className="fill-current" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 font-bold uppercase">Streak</p>
                        <p className="text-slate-900 font-extrabold text-xl">1 days</p>
                    </div>
                </div>
                <div className="bg-white py-3 px-4 rounded-2xl flex items-center gap-3 shadow-md">
                    <div className="p-2 bg-teal-100 rounded-full text-brand-teal">
                        <Zap size={20} className="fill-current" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 font-bold uppercase">Total XP</p>
                        <p className="text-slate-900 font-extrabold text-xl">{completedLessons.length * 15}</p>
                    </div>
                </div>
            </div>

            {/* Hero Card */}
            <div className="px-6 mb-8">
                <Link to={`/lesson/${activeLesson.id}`} className="block">
                    <div className="bg-gradient-sunset rounded-3xl p-6 shadow-lg shadow-orange-500/20 relative overflow-hidden transition-transform hover:scale-[1.02]">
                        <div className="relative z-10">
                            <p className="text-white/80 font-bold text-sm mb-1 uppercase tracking-wide">Continue Learning</p>
                            <h3 className="text-3xl font-extrabold text-white mb-2">{activeLesson.title}</h3>
                            <p className="text-white/90 text-sm mb-6">{activeLesson.topic}</p>

                            <button className="bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 hover:bg-white/30 transition-colors">
                                <PlayCircle size={20} />
                                <span>Start Lesson</span>
                            </button>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Unit Based Lesson List */}
            <div className="space-y-12 px-6 pb-6 pt-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(unit => {
                    const unitLessons = lessons.filter(l => l.unit === unit);
                    if (unitLessons.length === 0) return null;

                    // Detect Section Change logic
                    const currentLevel = unitLessons[0]?.level || 'A1';
                    // We only show header if it's the first unit of that level
                    // Unit 1 is start of A1.
                    // Unit 4 (was 4) is start of A2.
                    // Unit 6 is start of B1.

                    // Simple hardcoded check for cleaner visual structure based on our lessons.ts
                    // But simpler: just check level change?
                    const previousUnitLessons = lessons.filter(l => l.unit === unit - 1);
                    const previousLevel = previousUnitLessons[0]?.level;
                    const isSectionStart = currentLevel !== previousLevel;

                    const sectionTitles: Record<string, string> = {
                        'A1': 'Survival & Basics',
                        'A2': 'Elementary & Home',
                        'B1': 'Grammar & Society',
                        'B2': 'Upper Intermediate',
                        'C1': 'Mastery & Professional'
                    };

                    const unitTitles: Record<number, string> = {
                        1: "Introduction & Basics",
                        2: "Numbers & Colors",
                        3: "Daily Life & Verbs",
                        4: "Environment & Home",
                        5: "City & Directions",
                        6: "Grammar Mastery (Tenses)",
                        7: "Social & Shopping",
                        8: "Advanced Fluency",
                        9: "Business & Academia"
                    };

                    return (
                        <div key={unit}>
                            {/* Section Header */}
                            {isSectionStart && (
                                <div className="mt-8 mb-6 border-b-2 border-slate-700/50 pb-2">
                                    <h3 className="text-sm font-black tracking-[0.2em] text-gray-500 uppercase flex items-center gap-2">
                                        <span className={`px-2 py-0.5 rounded text-xs text-white ${currentLevel === 'A1' ? 'bg-brand-teal' : currentLevel === 'A2' ? 'bg-blue-500' : currentLevel === 'B1' ? 'bg-purple-500' : currentLevel === 'B2' ? 'bg-pink-500' : 'bg-yellow-500'}`}>
                                            {currentLevel}
                                        </span>
                                        {sectionTitles[currentLevel]}
                                    </h3>
                                </div>
                            )}

                            <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-sunset flex items-center justify-center font-bold text-xl shadow-lg shadow-orange-500/20">
                                    {unit}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white tracking-wide">{unitTitles[unit]}</h3>
                                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                                        {unitLessons.filter(l => completedLessons.includes(l.id)).length} / {unitLessons.length} Completed
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4 relative">
                                { /* Locking Logic for Unit 3+ */}
                                {unit > 2 && !isPremium ? (
                                    <div className="bg-slate-800/80 rounded-2xl p-8 border border-brand-teal/30 text-center relative overflow-hidden group backdrop-blur-sm">
                                        <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/5 to-transparent opacity-50" />

                                        <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10 shadow-lg relative z-10">
                                            <Lock className="text-brand-teal w-8 h-8" />
                                        </div>

                                        <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Premium Content</h3>
                                        <p className="text-gray-400 text-sm mb-6 max-w-xs mx-auto relative z-10">
                                            Unlock Units 3-9, specialized vocabulary, and all future updates.
                                        </p>

                                        <div className="flex flex-col gap-3 items-center relative z-10">
                                            <button
                                                onClick={async () => {
                                                    if (packages.length > 0) {
                                                        await purchase(packages[0]);
                                                    } else {
                                                        alert(`No products found. Error: ${error || 'Unknown'}. Packages: ${packages.length}`);
                                                    }
                                                }}
                                                disabled={loading}
                                                className="bg-brand-teal text-slate-900 font-bold py-3 px-8 rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(45,212,191,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {loading ? 'Processing...' : `Unlock Lifetime Access - ${packages.length > 0 ? packages[0].product.priceString : '$4.99'}`}
                                            </button>

                                            <button
                                                onClick={restore}
                                                disabled={loading}
                                                className="text-gray-400 text-sm font-medium hover:text-white underline decoration-gray-600 underline-offset-4"
                                            >
                                                Restore Purchases
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        {/* Connector Line */}
                                        <div className="absolute left-[22px] top-4 bottom-4 w-1 bg-slate-800 -z-10 rounded-full"></div>

                                        {unitLessons.map((lesson) => {
                                            const isCompleted = completedLessons.includes(lesson.id);

                                            return (
                                                <Link
                                                    key={lesson.id}
                                                    to={`/lesson/${lesson.id}`}
                                                    className={`
                                                        block relative bg-slate-800 rounded-2xl p-4 border-2 transition-all group
                                                        ${isCompleted
                                                            ? 'border-brand-green bg-brand-green/10'
                                                            : 'border-slate-700 hover:border-brand-teal hover:bg-slate-800 hover:-translate-y-1 hover:shadow-xl'
                                                        }
                                                    `}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className={`
                                                            w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-4 z-10 transition-colors
                                                            ${isCompleted
                                                                ? 'bg-brand-green border-brand-green text-white'
                                                                : 'bg-slate-900 border-slate-700 text-slate-500 group-hover:border-brand-teal group-hover:text-brand-teal'
                                                            }
                                                        `}>
                                                            {isCompleted ? <Check size={20} strokeWidth={4} /> : <div className="w-3 h-3 rounded-full bg-current" />}
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className={`font-bold text-lg ${isCompleted ? 'text-brand-green' : 'text-white group-hover:text-brand-teal transition-colors'}`}>
                                                                {lesson.title}
                                                            </h4>
                                                            <p className="text-sm text-gray-400">{lesson.topic}</p>
                                                        </div>
                                                        {isCompleted && (
                                                            <div className="flex items-center gap-1">
                                                                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
