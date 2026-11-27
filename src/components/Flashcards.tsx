import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, Lock } from 'lucide-react';
import { buildDecks, categoryLabel, type FlashDeck } from '../lib/flashcards';
import { formatWordCount, messages, unitTitle } from '../i18n/messages';
import { useStore } from '../store/useStore';
import { PaywallCard } from './PaywallCard';

function deckTitle(deck: FlashDeck, language: 'en' | 'nl' | 'es'): string {
    if (deck.kind === 'mistakes') return messages[language].flashcardsMistakes;
    if (deck.kind === 'unit' && deck.unit) return unitTitle(deck.unit, language);
    if (deck.category) return categoryLabel(deck.category, language);
    return deck.id;
}

export const Flashcards: React.FC = () => {
    const language = useStore((state) => state.language);
    const isPremium = useStore((state) => state.isPremium);
    const mistakes = useStore((state) => state.mistakes);
    const copy = messages[language ?? 'en'];

    if (!language) return <div className="p-6 text-white">{copy.notSelected}</div>;

    const decks = buildDecks(isPremium, mistakes);
    const mistakesDeck = decks.find((deck) => deck.kind === 'mistakes');
    const unitDecks = decks.filter((deck) => deck.kind === 'unit');
    const categoryDecks = decks.filter((deck) => deck.kind === 'category');
    const showPaywall = decks.some((deck) => deck.locked);

    const row = (deck: FlashDeck) => {
        const title = deckTitle(deck, language);
        const count = formatWordCount(deck.cardIds.length, language);
        const body = (
            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-800/80 p-4 text-left">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${deck.locked ? 'bg-slate-900 text-slate-500' : 'bg-brand-teal/20 text-brand-teal'}`}>
                    {deck.locked ? <Lock size={20} /> : <Layers size={20} />}
                </div>
                <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-white">{title}</h3>
                    <p className="text-sm text-gray-400">{deck.cardIds.length === 0 && deck.kind === 'mistakes' ? copy.flashcardsMistakesEmpty : count}</p>
                </div>
                {deck.locked && <span className="text-xs font-bold uppercase text-brand-teal">{copy.lockedRow}</span>}
            </div>
        );
        if (deck.locked) {
            return (
                <button key={deck.id} type="button" className="block w-full" onClick={() => document.getElementById('premium-paywall')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>
                    {body}
                </button>
            );
        }
        return (
            <Link key={deck.id} to={`/flashcards/${deck.id}`} className="block" data-testid={`flashcard-deck-${deck.id}`}>
                {body}
            </Link>
        );
    };

    return (
        <div className="min-h-screen bg-bg-main pb-28 text-white">
            <header className="p-6 pb-2">
                <h1 className="text-3xl font-extrabold">{copy.flashcardsTitle}</h1>
                <p className="mt-1 text-gray-400">{copy.flashcardsSubtitle}</p>
            </header>
            <div className="space-y-8 px-6 pb-6">
                {mistakesDeck && (
                    <section className="space-y-3">
                        {row(mistakesDeck)}
                    </section>
                )}
                <section className="space-y-3">
                    <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">{copy.flashcardsByUnit}</h2>
                    {unitDecks.map(row)}
                </section>
                <section className="space-y-3">
                    <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">{copy.flashcardsByCategory}</h2>
                    {categoryDecks.map(row)}
                </section>
                {showPaywall && <PaywallCard />}
            </div>
        </div>
    );
};
