import { lessons } from '../data/lessons';
import { pictureFor } from '../data/pictures';
import { vocabulary, type VocabEntry } from '../data/vocabulary';
import type { Language } from '../types';
import type { StoredMistake } from './mistakes';
import { isLessonLocked } from './progress';
import { selectEntries } from '../utils/coursePlan';

export type { CardProgress } from './flashcardBoxes';

export interface FlashDeck {
    id: string;
    kind: 'unit' | 'category' | 'mistakes';
    titleKey?: 'flashcardsMistakes';
    unit?: number;
    category?: string;
    cardIds: string[];
    locked: boolean;
}

const CATEGORY_LABELS: Record<string, Record<Language, string>> = {
    abstract: { en: 'Abstract', nl: 'Abstract', es: 'Abstracto' },
    basics: { en: 'Basics', nl: 'Basis', es: 'Básico' },
    colors: { en: 'Colors', nl: 'Kleuren', es: 'Colores' },
    directions: { en: 'Directions', nl: 'Richtingen', es: 'Direcciones' },
    emotions: { en: 'Feelings', nl: 'Gevoelens', es: 'Emociones' },
    family: { en: 'Family', nl: 'Familie', es: 'Familia' },
    food: { en: 'Food', nl: 'Eten', es: 'Comida' },
    grammar: { en: 'Grammar', nl: 'Grammatica', es: 'Gramática' },
    health: { en: 'Health', nl: 'Gezondheid', es: 'Salud' },
    house: { en: 'House', nl: 'Huis', es: 'Casa' },
    nature: { en: 'Nature', nl: 'Natuur', es: 'Naturaleza' },
    numbers: { en: 'Numbers', nl: 'Cijfers', es: 'Números' },
    places: { en: 'Places', nl: 'Plaatsen', es: 'Lugares' },
    prepositions: { en: 'Prepositions', nl: 'Voorzetsels', es: 'Preposiciones' },
    pronouns: { en: 'Pronouns', nl: 'Voornaamwoorden', es: 'Pronombres' },
    restaurant: { en: 'Restaurant', nl: 'Restaurant', es: 'Restaurante' },
    shopping: { en: 'Shopping', nl: 'Winkelen', es: 'Compras' },
    social: { en: 'Social', nl: 'Sociaal', es: 'Social' },
    verbs: { en: 'Verbs', nl: 'Werkwoorden', es: 'Verbos' },
    weather: { en: 'Weather', nl: 'Weer', es: 'Tiempo' },
    work: { en: 'Work', nl: 'Werk', es: 'Trabajo' },
};

let unitsByCard: Map<string, number[]> | null = null;

function unitsForCards(): Map<string, number[]> {
    if (unitsByCard) return unitsByCard;
    const found = new Map<string, Set<number>>();
    for (const lesson of lessons) {
        for (const entry of selectEntries(lesson)) {
            if (!pictureFor(entry.id)) continue;
            const units = found.get(entry.id) ?? new Set<number>();
            units.add(lesson.unit);
            found.set(entry.id, units);
        }
    }
    unitsByCard = new Map([...found].map(([id, units]) => [id, [...units].sort((a, b) => a - b)]));
    return unitsByCard;
}

export function earliestUnit(cardId: string): number | null {
    const units = unitsForCards().get(cardId);
    return units && units.length > 0 ? units[0] : null;
}

export function cardIsLocked(cardId: string, isPremium: boolean): boolean {
    const unit = earliestUnit(cardId);
    if (unit === null) return !isPremium;
    return isLessonLocked(unit, isPremium);
}

export function categoryLabel(category: string, language: Language): string {
    return CATEGORY_LABELS[category]?.[language] ?? category;
}

function accessible(ids: string[], isPremium: boolean): string[] {
    return ids.filter((id) => !cardIsLocked(id, isPremium));
}

export function buildDecks(isPremium: boolean, mistakes: StoredMistake[] = []): FlashDeck[] {
    const units = unitsForCards();
    const byUnit = new Map<number, string[]>();
    const byCategory = new Map<string, string[]>();
    const entries = new Map(vocabulary.map((entry) => [entry.id, entry]));

    for (const [id, cardUnits] of units) {
        for (const unit of cardUnits) {
            const list = byUnit.get(unit) ?? [];
            list.push(id);
            byUnit.set(unit, list);
        }
        const entry = entries.get(id);
        if (!entry) continue;
        const list = byCategory.get(entry.category) ?? [];
        list.push(id);
        byCategory.set(entry.category, list);
    }

    const decks: FlashDeck[] = [];
    for (const unit of [...byUnit.keys()].sort((a, b) => a - b)) {
        const cardIds = byUnit.get(unit) ?? [];
        decks.push({
            id: `unit-${unit}`,
            kind: 'unit',
            unit,
            cardIds,
            locked: isLessonLocked(unit, isPremium),
        });
    }

    for (const category of [...byCategory.keys()].sort()) {
        const all = byCategory.get(category) ?? [];
        const open = accessible(all, isPremium);
        decks.push({
            id: `cat-${category}`,
            kind: 'category',
            category,
            cardIds: open.length > 0 ? open : all,
            locked: open.length === 0 && all.length > 0,
        });
    }

    const mistakeIds: string[] = [];
    const seen = new Set<string>();
    let hiddenMistake = false;
    for (const mistake of mistakes) {
        const sourceId = mistake.sourceId ?? mistake.question.sourceId;
        if (!sourceId || seen.has(sourceId) || !pictureFor(sourceId)) continue;
        const lesson = lessons.find((item) => item.id === mistake.lessonId);
        const unit = lesson?.unit ?? earliestUnit(sourceId) ?? 9;
        if (isLessonLocked(unit, isPremium)) {
            hiddenMistake = true;
            continue;
        }
        seen.add(sourceId);
        mistakeIds.push(sourceId);
    }
    decks.unshift({
        id: 'mistakes',
        kind: 'mistakes',
        titleKey: 'flashcardsMistakes',
        cardIds: mistakeIds,
        locked: mistakeIds.length === 0 && hiddenMistake,
    });

    return decks;
}

export function deckById(deckId: string, isPremium: boolean, mistakes: StoredMistake[] = []): FlashDeck | undefined {
    return buildDecks(isPremium, mistakes).find((deck) => deck.id === deckId);
}

export function vocabForCard(cardId: string): VocabEntry | undefined {
    return vocabulary.find((entry) => entry.id === cardId);
}
