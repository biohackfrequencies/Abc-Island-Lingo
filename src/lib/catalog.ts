import { lessons } from '../data/lessons';
import { vocabulary } from '../data/vocabulary';

/** Counts taken from the shipped course, so the paywall never hard-codes them. */
export function courseStats(): { units: number; words: number } {
    const units = new Set(lessons.map((lesson) => lesson.unit)).size;
    return { units, words: vocabulary.length };
}
