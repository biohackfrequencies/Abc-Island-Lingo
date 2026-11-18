import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import { toPlayableLesson } from '../content/remote';
import { useRemoteContent } from '../content/useRemoteContent';
import { lessons } from '../data/lessons';
import { messages } from '../i18n/messages';
import { isLessonLocked } from '../lib/progress';
import { useStore } from '../store/useStore';
import type { Language } from '../types';
import { generateLesson } from '../utils/lessonGenerator';
import { PaywallCard } from './PaywallCard';

const LessonMessage: React.FC<{ title: string; body?: string }> = ({ title, body }) => {
    const navigate = useNavigate();
    const language = useStore((state) => state.language) ?? 'en';
    return (
        <div className="min-h-screen bg-slate-900 text-white p-6 flex flex-col">
            <button type="button" onClick={() => navigate('/dashboard')} className="self-start p-3 rounded-full bg-slate-800 border border-white/10">
                <X size={24} />
            </button>
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-3 max-w-md mx-auto">
                <h1 className="text-2xl font-extrabold">{title}</h1>
                {body && <p className="text-gray-300">{body}</p>}
                <button type="button" onClick={() => navigate('/dashboard')} className="mt-4 bg-brand-teal text-slate-900 font-bold px-6 py-3 rounded-xl">
                    {messages[language].backHome}
                </button>
            </div>
        </div>
    );
};

const LockedLesson: React.FC<{ title: string }> = ({ title }) => {
    const navigate = useNavigate();
    const language = (useStore((state) => state.language) ?? 'en') as Language;
    const copy = messages[language];
    return (
        <div className="min-h-screen bg-slate-900 text-white p-6" data-testid="locked-lesson">
            <button type="button" onClick={() => navigate('/dashboard')} className="p-3 rounded-full bg-slate-800 border border-white/10 mb-6">
                <X size={24} />
            </button>
            <p className="text-brand-teal font-bold uppercase tracking-wide text-sm">{copy.lessonLockedTitle}</p>
            <h1 className="text-3xl font-extrabold mt-2 mb-2">{title}</h1>
            <p className="text-gray-300 mb-6">{copy.lessonLockedBody}</p>
            <PaywallCard />
        </div>
    );
};

export const LessonPlayer: React.FC = () => {
    const { lessonId } = useParams();
    const navigate = useNavigate();
    const completeLesson = useStore((state) => state.completeLesson);
    const language = useStore((state) => state.language);
    const isPremium = useStore((state) => state.isPremium);
    const currentLang = (language || 'en') as Language;
    const copy = messages[currentLang];
    const remote = useRemoteContent();
    const remoteLesson = remote.lessons.find((lesson) => lesson.id === lessonId) ?? null;

    const lessonConfig = lessons.find(l => l.id === lessonId);
    const locked = remoteLesson
        ? remoteLesson.premium && !isPremium
        : !!lessonConfig && isLessonLocked(lessonConfig.unit, isPremium);

    const lesson = useMemo(() => {
        if (locked) return null;
        if (remoteLesson) return toPlayableLesson(remoteLesson);
        if (!lessonConfig) return null;
        return generateLesson(lessonConfig, currentLang);
    }, [currentLang, lessonConfig, locked, remoteLesson]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const lessonTitle = remoteLesson?.title ?? lessonConfig?.title ?? copy.lessonMissing;
    if (!remoteLesson && !lessonConfig) return <LessonMessage title={copy.lessonMissing} />;
    if (locked) return <LockedLesson title={lessonTitle} />;
    if (!lesson || lesson.questions.length === 0) return <LessonMessage title={lessonTitle} body={copy.lessonEmpty} />;

    const currentQuestion = lesson.questions[currentIndex];
    if (!currentQuestion) return <LessonMessage title={lessonTitle} body={copy.lessonEmpty} />;
    const progress = ((currentIndex) / lesson.questions.length) * 100;

    // Helper to get content based on language
    const getLocalizedText = (content?: string | Record<string, string>): string => {
        if (!content) return '';
        if (typeof content === 'string') return content;
        return content[currentLang] || content['en'] || '';
    };

    const getLocalizedOptions = (): string[] => {
        const opt = currentQuestion.options;
        if (!opt) return [];
        if (Array.isArray(opt)) return opt;
        // It's a record
        const record = opt as Record<string, string[]>;
        return record[currentLang] || record['en'] || [];
    };

    const getCorrectAnswer = (): string | string[] => {
        const ans = currentQuestion.correctAnswer;
        if (typeof ans === 'string' || Array.isArray(ans)) return ans;
        // It's a localized record
        // Force type assertion or check since key access on union might be tricky?
        // Actually Record<Language, ...> and currentLang is string (or Language).
        // TypeScript shouldn't complain if currentLang is of type Language.
        // But ans is LocalizedAnswer which is complex.
        const record = ans as Record<string, string | string[]>;
        const localized = record[currentLang];
        // It could be string or string[], normalize
        return localized || record['en'] || '';
    };

    const normalizeText = (text: string) => {
        return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
    };

    const handleCheck = () => {
        if (!selectedOption) return;

        const correctAns = getCorrectAnswer();
        let correct = false;

        // Use relaxed comparison: normalize both expected answer and user input
        if (Array.isArray(correctAns)) {
            correct = correctAns.some(a => normalizeText(a) === normalizeText(selectedOption));
        } else {
            correct = normalizeText(selectedOption) === normalizeText(correctAns as string);
        }

        setIsCorrect(correct);
    };

    const handleNext = () => {
        if (currentIndex < lesson.questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedOption(null);
            setIsCorrect(null);
        } else {
            completeLesson(lesson.id);
            navigate('/dashboard');
        }
    };

    const promptText = getLocalizedText(currentQuestion.prompt);
    const explanationText = getLocalizedText(currentQuestion.explanation);
    const displayedCorrectAnswer = Array.isArray(getCorrectAnswer())
        ? (getCorrectAnswer() as string[])[0]
        : (getCorrectAnswer() as string);

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col w-full max-w-3xl mx-auto text-white shadow-2xl">
            {/* Header */}
            <div className="p-4 pt-[calc(env(safe-area-inset-top)+1rem)] flex items-center gap-4">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="fixed top-4 left-4 z-50 p-3 rounded-full bg-slate-900/50 backdrop-blur-sm border border-white/10 text-white hover:bg-slate-800 transition-all mt-[env(safe-area-inset-top)]"
                >
                    <X size={28} />
                </button>
                <div className="w-12"></div> {/* Spacer for fixed button */}
                <div className="flex-1 h-3 md:h-4 bg-slate-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-brand-green transition-all duration-300 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 md:p-12 flex flex-col justify-center max-w-3xl w-full mx-auto">
                <div className="mb-8 md:mb-16 text-center">
                    <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8 leading-relaxed">
                        {currentQuestion.type === 'cloze'
                            ? promptText.split('\n\n')[0]
                            : promptText}
                    </h2>
                    {currentQuestion.pronunciation && (
                        <p className="text-gray-400 text-sm md:text-xl font-mono tracking-wide">[{currentQuestion.pronunciation}]</p>
                    )}
                </div>

                {/* Question Types Logic */}
                <div className="w-full">
                    {/* Spelling (Input) */}
                    {currentQuestion.type === 'spelling' && (
                        <div className="w-full">
                            <input
                                type="text"
                                autoFocus
                                placeholder={copy.typeHere}
                                className={`
                                    w-full bg-slate-800 border-b-4 border-slate-700 text-2xl md:text-4xl font-bold text-center tracking-wider p-4 md:p-8 rounded-xl focus:outline-none focus:border-brand-teal text-white placeholder-slate-600 mb-8 transition-colors
                                    ${isCorrect === true ? 'border-green-500 text-green-400' : isCorrect === false ? 'border-red-500 text-red-400' : ''}
                                `}
                                onChange={(e) => {
                                    if (isCorrect !== null) return;
                                    setSelectedOption(e.target.value);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && selectedOption) {
                                        handleCheck();
                                    }
                                }}
                                disabled={isCorrect !== null}
                                value={selectedOption || ''}
                            />
                        </div>
                    )}

                    {/* Cloze (Fill-in-blank) - Reusing multiple choice style for options */}
                    {currentQuestion.type === 'cloze' && (
                        <div className="grid gap-3 md:gap-6">
                            <div className="bg-slate-800 p-6 md:p-10 rounded-xl border border-slate-700 mb-6 text-xl md:text-3xl text-center font-mono leading-relaxed">
                                {currentQuestion.prompt.toString().split('\n\n')[1] /* Show just the sentence part in the box */}
                            </div>
                            <div className="grid grid-cols-2 gap-3 md:gap-6">
                                {getLocalizedOptions().map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => !isCorrect && setSelectedOption(opt)}
                                        className={`
                                            p-4 md:p-8 border-2 rounded-2xl font-bold transition-all text-lg md:text-2xl
                                            ${selectedOption === opt
                                                ? isCorrect === null
                                                    ? 'border-brand-teal bg-brand-teal/20 text-brand-teal'
                                                    : isCorrect
                                                        ? 'border-green-500 bg-green-500/20 text-green-400'
                                                        : 'border-red-500 bg-red-500/20 text-red-400'
                                                : 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:border-slate-500'
                                            }
                                        `}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Dialogue (Chat Mode) */}
                    {currentQuestion.type === 'dialogue' && currentQuestion.dialogueLines && (
                        <div className="w-full max-w-md md:max-w-2xl mx-auto mb-6">
                            <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
                                {currentQuestion.dialogueLines.map((line, idx) => {
                                    const isHidden = line.isInteractive;
                                    return (
                                        <div key={idx} className={`flex ${line.speaker === 'A' ? 'justify-start' : 'justify-end'}`}>
                                            <div className={`
                                                max-w-[80%] p-3 md:p-6 rounded-2xl text-sm md:text-xl relative
                                                ${line.speaker === 'A'
                                                    ? 'bg-slate-700 text-slate-200 rounded-tl-sm'
                                                    : 'bg-brand-teal text-slate-900 font-medium rounded-tr-sm'
                                                }
                                                ${isHidden && !selectedOption ? 'animate-pulse border-2 border-dashed border-white/50' : ''}
                                            `}>
                                                {isHidden && !selectedOption ? '___' : isHidden && selectedOption ? selectedOption : line.text}
                                                {!isHidden && <div className="text-[10px] md:text-sm opacity-60 mt-1">{line.translation}</div>}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="grid gap-3 md:gap-4">
                                {getLocalizedOptions().map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => !isCorrect && setSelectedOption(opt)}
                                        className={`
                                            p-4 md:p-6 border-2 rounded-xl font-bold transition-all text-left text-lg md:text-xl
                                            ${selectedOption === opt
                                                ? isCorrect === null
                                                    ? 'border-brand-teal bg-brand-teal/20 text-brand-teal'
                                                    : isCorrect
                                                        ? 'border-green-500 bg-green-500/20 text-green-400'
                                                        : 'border-red-500 bg-red-500/20 text-red-400'
                                                : 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:border-slate-500'
                                            }
                                        `}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Multiple Choice & Translate (Button Selection) */}
                    {(currentQuestion.type === 'multiple-choice' || currentQuestion.type === 'translate') && (
                        <div className="grid gap-3 md:gap-6">
                            {getLocalizedOptions().map((opt) => (
                                <button
                                    key={opt}
                                    onClick={() => !isCorrect && setSelectedOption(opt)}
                                    className={`
                                        p-4 md:p-8 border-2 rounded-2xl text-left font-bold transition-all text-lg md:text-3xl w-full
                                        ${selectedOption === opt
                                            ? isCorrect === null
                                                ? 'border-brand-teal bg-brand-teal/20 text-brand-teal' // Selected
                                                : isCorrect
                                                    ? 'border-green-500 bg-green-500/20 text-green-400' // Correct
                                                    : 'border-red-500 bg-red-500/20 text-red-400' // Wrong
                                            : 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:border-slate-500'
                                        }
                                    `}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Order / Sentence Building */}
                    {currentQuestion.type === 'order' && (
                        <div className="space-y-8 md:space-y-12">
                            {/* Answer Area */}
                            <div className="min-h-[60px] md:min-h-[100px] border-b-2 border-slate-700 flex flex-wrap gap-2 md:gap-4 pb-2 md:pb-6 items-end">
                                {selectedOption ? selectedOption.split(' ').map((word, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            if (isCorrect !== null) return;
                                            const newAns = selectedOption?.split(' ').filter((_, i) => i !== idx).join(' ');
                                            setSelectedOption(newAns || null);
                                        }}
                                        className="bg-brand-teal text-bg-main font-bold px-3 py-2 md:px-6 md:py-4 rounded-lg text-sm md:text-2xl"
                                    >
                                        {word}
                                    </button>
                                )) : <span className="text-gray-600 italic text-lg md:text-2xl">{copy.tapWords}</span>}
                            </div>

                            {/* Word Bank */}
                            <div className="flex flex-wrap gap-3 md:gap-6 justify-center">
                                {getLocalizedOptions().map((word, idx) => {
                                    // Simple logic: if word is used X times in answer, hide X times in bank.
                                    // For now, simpler: just hide if included (assuming unique words for simplicity or counting).
                                    // Better: word object with ID. For now string matching:

                                    return (
                                        <button
                                            key={`${word}-${idx}`}
                                            onClick={() => {
                                                if (isCorrect !== null) return;
                                                setSelectedOption(prev => prev ? `${prev} ${word}` : word);
                                            }}
                                            className="bg-slate-700 border-b-4 border-slate-900 text-white font-bold px-4 py-3 md:px-8 md:py-6 rounded-xl active:border-b-0 active:translate-y-1 transition-all text-base md:text-2xl"
                                        >
                                            {word}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Cultural Tip */}
            {currentQuestion.culturalTip && (
                <div className="mx-4 mt-auto mb-4 bg-indigo-900/50 border border-indigo-500/30 p-4 rounded-xl flex items-start gap-3 animate-fade-in-up md:mx-12 md:mb-8">
                    <span className="text-2xl">💡</span>
                    <div>
                        <p className="text-xs font-bold text-indigo-300 uppercase mb-1">
                            {copy.didYouKnow}
                        </p>
                        <p className="text-sm md:text-lg text-indigo-100">
                            {getLocalizedText(currentQuestion.culturalTip)}
                        </p>
                    </div>
                </div>
            )}

            {/* Footer */}
            <div className={`p-4 pb-8 border-t border-slate-800 transition-colors duration-300 ${isCorrect === true ? 'bg-green-900/30 border-green-900' : isCorrect === false ? 'bg-red-900/30 border-red-900' : 'bg-slate-900'}`}>
                <div className="flex flex-col gap-4 max-w-3xl mx-auto">
                    {isCorrect === true && (
                        <div className="flex flex-col gap-2 mb-2 animate-bounce-short">
                            <div className="flex items-center gap-2 text-green-400 font-bold md:text-2xl">
                                <div className="bg-green-500 text-black p-1 rounded-full"><Check size={20} className="md:w-8 md:h-8" /></div>
                                <span>{copy.correct}</span>
                            </div>
                            {explanationText && (
                                <p className="text-sm md:text-xl text-green-200 ml-9 bg-green-900/40 p-2 rounded-lg border border-green-800/50">
                                    💡 {explanationText}
                                </p>
                            )}
                        </div>
                    )}
                    {isCorrect === false && (
                        <div className="flex flex-col gap-2 mb-2">
                            <div className="flex items-center gap-2 text-red-400 font-bold md:text-2xl">
                                <div className="bg-red-500 text-white p-1 rounded-full"><X size={20} className="md:w-8 md:h-8" /></div>
                                <span>{copy.wrongAnswer}: {displayedCorrectAnswer}</span>
                            </div>
                            {explanationText && (
                                <p className="text-sm md:text-xl text-red-200 ml-9 bg-red-900/40 p-2 rounded-lg border border-red-800/50">
                                    💡 {explanationText}
                                </p>
                            )}
                        </div>
                    )}

                    <button
                        onClick={isCorrect !== null ? handleNext : handleCheck}
                        disabled={!selectedOption && isCorrect === null}
                        className={`
                            w-full py-4 px-8 rounded-xl font-bold text-white shadow-lg transition-all text-lg md:text-2xl md:py-6
                            ${!selectedOption && isCorrect === null
                                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                : isCorrect !== null
                                    ? isCorrect ? 'bg-green-500 hover:bg-green-400 shadow-green-500/30' : 'bg-red-500 hover:bg-red-400 shadow-red-500/30'
                                    : 'bg-brand-green hover:bg-green-400 shadow-green-500/30'
                            }
                        `}
                    >
                        {isCorrect !== null ? (currentIndex === lesson.questions.length - 1 ? copy.finish : copy.next) : copy.check}
                    </button>
                </div>
            </div>
        </div>
    );
};
