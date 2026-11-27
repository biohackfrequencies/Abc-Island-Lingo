import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Layers, PlayCircle, RotateCcw, Zap } from 'lucide-react';
import { lessons } from '../data/lessons';
import { effectiveStreak, isLessonLocked, localDateString } from '../lib/progress';
import { formatDays, formatReviewCount, messages } from '../i18n/messages';
import { useStore } from '../store/useStore';
import { LessonCatalog } from './LessonCatalog';
import { PaywallCard } from './PaywallCard';
import { PhraseOfTheWeek, RemoteLessonList } from './RemoteLessons';

export const Dashboard: React.FC = () => {
    const language = useStore((state) => state.language);
    const completedLessons = useStore((state) => state.completedLessons);
    const isPremium = useStore((state) => state.isPremium);
    const streak = useStore((state) => state.streak);
    const lastStudyDate = useStore((state) => state.lastStudyDate);
    const xp = useStore((state) => state.xp);
    const mistakes = useStore((state) => state.mistakes);

    if (!language) {
        return <div className="p-6 text-white">{messages.en.notSelected}</div>;
    }

    const copy = messages[language];
    const done = new Set(completedLessons);
    const nextLesson = lessons.find((lesson) => !done.has(lesson.id)) ?? null;
    const nextLocked = !!nextLesson && isLessonLocked(nextLesson.unit, isPremium);
    const streakDays = effectiveStreak(streak, lastStudyDate, localDateString());
    const showPaywall = nextLocked;

    return (
        <div className="min-h-screen bg-bg-main pb-28 text-white">
            <header className="p-6 pb-2 flex justify-between items-start">
                <div className="flex items-center gap-3">
                    <img src="/logo.png" alt="ABC Island Lingo" className="w-14 h-14 object-contain" />
                    <div>
                        <h1 className="text-xl font-bold text-gray-400 leading-none">Bon bini!</h1>
                        <h2 className="text-2xl font-extrabold text-white leading-tight">ABC Island Lingo</h2>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-slate-800/50 p-2 rounded-full border border-slate-700/50">
                    <span className="text-xl">{language === 'en' ? '🇺🇸' : language === 'es' ? '🇻🇪' : '🇳🇱'}</span>
                    <span className="text-gray-400">→</span>
                    <span className="text-xl">🇦🇼</span>
                </div>
            </header>

            <div className="px-6 py-4 grid grid-cols-2 gap-4">
                <div className="bg-white py-3 px-4 rounded-2xl flex items-center gap-3 shadow-md">
                    <div className="p-2 bg-orange-100 rounded-full text-orange-500">
                        <Flame size={20} className="fill-current" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 font-bold uppercase">{copy.streak}</p>
                        <p className="text-slate-900 font-extrabold text-xl" data-testid="streak-value">{formatDays(streakDays, language)}</p>
                    </div>
                </div>
                <div className="bg-white py-3 px-4 rounded-2xl flex items-center gap-3 shadow-md">
                    <div className="p-2 bg-teal-100 rounded-full text-brand-teal">
                        <Zap size={20} className="fill-current" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 font-bold uppercase">{copy.totalXp}</p>
                        <p className="text-slate-900 font-extrabold text-xl" data-testid="xp-value">{xp}</p>
                    </div>
                </div>
            </div>

            <PhraseOfTheWeek />

            <div className="px-6 mb-8">
                <Link to="/flashcards" className="mb-4 block" data-testid="open-flashcards">
                    <div className="rounded-3xl border border-white/10 bg-slate-800 p-5">
                        <p className="mb-1 text-sm font-bold uppercase tracking-wide text-brand-teal">{copy.flashcardsTitle}</p>
                        <h3 className="text-2xl font-extrabold text-white">{copy.flashcardsSubtitle}</h3>
                        <span className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand-teal px-6 py-3 font-bold text-slate-900">
                            <Layers size={18} />
                            {copy.flashcardsTitle}
                        </span>
                    </div>
                </Link>
                {mistakes.length > 0 && (
                    <Link to="/review" className="block mb-4" data-testid="practice-mistakes">
                        <div className="rounded-3xl border border-brand-teal/40 bg-slate-800 p-5">
                            <p className="text-brand-teal font-bold text-sm mb-1 uppercase tracking-wide">{copy.reviewTitle}</p>
                            <h3 className="text-2xl font-extrabold text-white">{formatReviewCount(mistakes.length, language)}</h3>
                            <p className="text-gray-300 text-sm mt-2 mb-4">{copy.reviewBody}</p>
                            <span className="bg-brand-teal text-slate-900 font-bold py-3 px-6 rounded-xl inline-flex items-center gap-2">
                                <RotateCcw size={18} />
                                {copy.reviewTitle}
                            </span>
                        </div>
                    </Link>
                )}
                {!nextLesson && (
                    <div className="bg-gradient-sunset rounded-3xl p-6 shadow-lg shadow-orange-500/20">
                        <p className="text-white/80 font-bold text-sm mb-1 uppercase tracking-wide">{copy.continueLearning}</p>
                        <h3 className="text-3xl font-extrabold text-white mb-2">{copy.allDoneTitle}</h3>
                        <p className="text-white/90 text-sm">{copy.allDoneBody}</p>
                    </div>
                )}
                {nextLesson && nextLocked && (
                    <div className="bg-slate-800 rounded-3xl p-6 border border-brand-teal/40">
                        <p className="text-brand-teal font-bold text-sm mb-1 uppercase tracking-wide">{copy.continueLearning}</p>
                        <h3 className="text-3xl font-extrabold text-white mb-2">{nextLesson.title}</h3>
                        <p className="text-gray-300 text-sm">{copy.lessonLockedBody}</p>
                    </div>
                )}
                {nextLesson && !nextLocked && (
                    <Link to={`/lesson/${nextLesson.id}`} className="block">
                        <div className="bg-gradient-sunset rounded-3xl p-6 shadow-lg shadow-orange-500/20">
                            <p className="text-white/80 font-bold text-sm mb-1 uppercase tracking-wide">{copy.continueLearning}</p>
                            <h3 className="text-3xl font-extrabold text-white mb-2">{nextLesson.title}</h3>
                            <p className="text-white/90 text-sm mb-6">{nextLesson.description[language]}</p>
                            <span className="bg-white/20 border border-white/30 text-white font-bold py-3 px-6 rounded-xl inline-flex items-center gap-2">
                                <PlayCircle size={20} />
                                {copy.startLesson}
                            </span>
                        </div>
                    </Link>
                )}
            </div>

            {showPaywall && (
                <div className="px-6 mb-8">
                    <PaywallCard />
                </div>
            )}

            <div className="px-6 pb-6">
                <RemoteLessonList />
                <LessonCatalog showPaywall={!nextLocked} />
            </div>
        </div>
    );
};
