import type { DictionaryEntry } from '../types';
import { vocabulary, type VocabEntry } from './vocabulary';

function partOfSpeech(entry: VocabEntry): DictionaryEntry['partOfSpeech'] {
    if (entry.type === 'phrase' || entry.type === 'sentence') return 'phrase';
    if (entry.category === 'verbs') return 'verb';
    if (entry.category === 'colors' || entry.category === 'emotions') return 'adjective';
    if (entry.category === 'pronouns' || entry.category === 'prepositions') return 'other';
    return 'noun';
}

export const dictionary: DictionaryEntry[] = vocabulary
    .map((entry) => ({
        id: entry.id,
        papiamento: entry.papiamento.replace(/[{}]/g, ''),
        meanings: entry.meanings,
        partOfSpeech: partOfSpeech(entry),
    }))
    .sort((a, b) => a.papiamento.localeCompare(b.papiamento, 'en', { sensitivity: 'base' }));
