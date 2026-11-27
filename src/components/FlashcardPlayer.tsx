import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { pictureFor } from '../data/pictures';
import { requeue, sessionQueue } from '../lib/flashcardBoxes';
import { deckById, vocabForCard } from '../lib/flashcards';
import { displayPap } from '../utils/coursePlan';
import { messages } from '../i18n/messages';
import { useStore } from '../store/useStore';
import { PaywallCard } from './PaywallCard';

export const FlashcardPlayer: React.FC = () => {
    const { deckId = '' } = useParams();
    const language = useStore((state) => state.language) ?? 'en';
    const isPremium = useStore((state) => state.isPremium);
    const mistakes = useStore((state) => state.mistakes);
    const progress = useStore((state) => state.flashcards);
    const gradeFlashcard = useStore((state) => state.gradeFlashcard);
    const copy = messages[language];
    const [now] = useState(() => Date.now());
    const deck = useMemo(() => deckById(deckId, isPremium, mistakes), [deckId, isPremium, mistakes]);
    const due = useMemo(
        () => (deck && !deck.locked ? sessionQueue(deck.cardIds, progress ?? {}, now) : []),
        [deck, progress, now],
    );
    const [queue, setQueue] = useState<string[] | null>(null);
    const [flipped, setFlipped] = useState(false);
    const [hint, setHint] = useState(false);
    const [practicingAll, setPracticingAll] = useState(false);

    const cards = queue ?? due;
    const cardId = cards[0];
    const entry = cardId ? vocabForCard(cardId) : undefined;
    const picture = cardId ? pictureFor(cardId) : undefined;

    if (!deck) {
        return (
            <div className="min-h-screen bg-slate-900 p-6 text-white">
                <p className="mb-4">{copy.flashcardsEmpty}</p>
                <Link to="/flashcards" className="text-brand-teal font-bold">{copy.flashcardsBack}</Link>
            </div>
        );
    }

    if (deck.locked) {
        return (
            <div className="min-h-screen bg-slate-900 p-6 text-white">
                <Link to="/flashcards" className="mb-6 inline-block text-brand-teal font-bold">{copy.flashcardsBack}</Link>
                <h1 className="mb-2 text-2xl font-extrabold">{copy.lessonLockedTitle}</h1>
                <p className="mb-6 text-gray-300">{copy.lessonLockedBody}</p>
                <PaywallCard />
            </div>
        );
    }

    const grade = (knew: boolean) => {
        if (!cardId) return;
        gradeFlashcard(cardId, knew);
        setFlipped(false);
        setQueue((current) => {
            const list = current ?? due;
            const rest = list.slice(1);
            return knew ? rest : requeue(rest, cardId, 2);
        });
    };

    if (!cardId || !entry || !picture) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 p-6 text-center text-white">
                <h1 className="text-3xl font-extrabold">{copy.flashcardsCaughtUp}</h1>
                <p className="mt-3 max-w-sm text-gray-300">{deck.cardIds.length === 0 ? copy.flashcardsMistakesEmpty : copy.flashcardsCaughtUpBody}</p>
                {deck.cardIds.length > 0 && !practicingAll && (
                    <button
                        type="button"
                        className="mt-6 rounded-xl bg-white/10 px-6 py-3 font-bold"
                        onClick={() => {
                            setPracticingAll(true);
                            setQueue(sessionQueue(deck.cardIds, progress ?? {}, now, true));
                            setFlipped(false);
                        }}
                    >
                        {copy.flashcardsPracticeAll}
                    </button>
                )}
                <Link to="/flashcards" className="mt-6 font-bold text-brand-teal">{copy.flashcardsBack}</Link>
            </div>
        );
    }

    const meaning = entry.meanings[language];

    return (
        <div className="flex min-h-screen flex-col bg-slate-900 text-white">
            <header className="flex items-center justify-between px-4 py-4">
                <Link to="/flashcards" className="text-sm font-bold text-brand-teal">{copy.flashcardsBack}</Link>
                <p className="text-sm text-gray-400">{cards.length}</p>
            </header>
            <div className="flex flex-1 flex-col px-4 pb-6">
                <button
                    type="button"
                    onClick={() => setFlipped((value) => !value)}
                    data-testid={flipped ? 'flashcard-back' : 'flashcard-front'}
                    className="flex min-h-[420px] w-full flex-1 flex-col items-center justify-center rounded-3xl border border-white/10 bg-slate-800 p-6 text-center"
                >
                    {flipped ? (
                        <>
                            <p className="text-4xl font-extrabold text-white" data-testid="flashcard-word">{displayPap(entry)}</p>
                            <p className="mt-4 text-xl text-brand-teal" data-testid="flashcard-meaning">{meaning}</p>
                        </>
                    ) : (
                        <>
                            <img
                                src={picture.src}
                                alt=""
                                data-testid="flashcard-image"
                                className="aspect-square w-full max-w-sm rounded-2xl object-cover"
                            />
                            {hint && <p className="mt-4 text-lg text-gray-200">{entry.meanings.en}</p>}
                            <p className="mt-4 text-sm font-bold uppercase tracking-wide text-gray-400">{copy.flashcardsFlip}</p>
                        </>
                    )}
                </button>
                <label className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-300">
                    <input type="checkbox" checked={hint} onChange={(event) => setHint(event.target.checked)} data-testid="flashcard-hint" />
                    {copy.flashcardsHint}
                </label>
                <div className="mt-4 grid grid-cols-2 gap-3">
                    <button type="button" onClick={() => grade(false)} data-testid="flashcard-again" className="rounded-2xl bg-slate-700 py-4 font-extrabold">
                        {copy.flashcardsAgain}
                    </button>
                    <button type="button" onClick={() => grade(true)} data-testid="flashcard-knew" className="rounded-2xl bg-brand-teal py-4 font-extrabold text-slate-900">
                        {copy.flashcardsKnew}
                    </button>
                </div>
            </div>
        </div>
    );
};
