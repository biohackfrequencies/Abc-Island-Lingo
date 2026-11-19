import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Lock } from 'lucide-react';
import { useRemoteContent } from '../content/useRemoteContent';
import { messages } from '../i18n/messages';
import { useStore } from '../store/useStore';

export const PhraseOfTheWeek: React.FC = () => {
    const language = useStore((state) => state.language) ?? 'en';
    const content = useRemoteContent();
    const phrase = content.phraseOfTheWeek;
    const copy = messages[language];

    return (
        <section className="mx-6 mb-8 rounded-3xl border border-white/10 bg-slate-800 p-5" data-testid="phrase-of-the-week">
            <p className="text-xs font-bold uppercase tracking-wide text-brand-teal">{copy.phraseOfTheWeek}</p>
            <h3 className="text-2xl font-extrabold mt-1">{phrase.papiamento}</h3>
            <p className="text-gray-300 mt-1">{phrase[language]}</p>
        </section>
    );
};

export const RemoteLessonList: React.FC<{ onLocked?: () => void }> = ({ onLocked }) => {
    const navigate = useNavigate();
    const language = useStore((state) => state.language) ?? 'en';
    const isPremium = useStore((state) => state.isPremium);
    const completedLessons = useStore((state) => state.completedLessons);
    const content = useRemoteContent();
    const copy = messages[language];
    const done = new Set(completedLessons);

    if (content.lessons.length === 0) return null;

    const openPaywall = () => {
        onLocked?.();
        window.setTimeout(() => {
            const node = document.getElementById('premium-paywall');
            if (node) {
                node.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }
            if (!onLocked) navigate('/lessons');
        }, 0);
    };

    return (
        <section className="mb-10" data-testid="remote-lessons">
            <h3 className="text-xl font-bold text-white">{copy.updatedLessons}</h3>
            <p className="text-sm text-gray-400 mb-4">{copy.updatedLessonsBody}</p>
            <div className="space-y-4">
                {content.lessons.map((lesson) => {
                    const locked = lesson.premium && !isPremium;
                    const isCompleted = done.has(lesson.id);
                    const body = (
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-4 ${isCompleted && !locked ? 'bg-brand-green border-brand-green text-white' : 'bg-slate-900 border-slate-700 text-slate-500'}`}>
                                {locked ? <Lock size={18} /> : isCompleted ? <Check size={20} strokeWidth={4} /> : <div className="w-3 h-3 rounded-full bg-current" />}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-lg text-white">{lesson.title}</h4>
                                <p className="text-sm text-gray-400">{lesson.description[language]}</p>
                            </div>
                            {locked && <span className="text-xs font-bold uppercase text-brand-teal">{copy.lockedRow}</span>}
                        </div>
                    );
                    const className = 'block w-full text-left bg-slate-800 rounded-2xl p-4 border-2 border-slate-700';
                    if (locked) {
                        return (
                            <button key={lesson.id} type="button" onClick={openPaywall} className={className} data-testid={`remote-${lesson.id}`}>
                                {body}
                            </button>
                        );
                    }
                    return (
                        <Link key={lesson.id} to={`/lesson/${lesson.id}`} className={className} data-testid={`remote-${lesson.id}`}>
                            {body}
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};
