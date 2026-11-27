import type { Question, Language } from '../types';

/** A missed exercise, stored on the device so it can be practiced offline. */
export interface StoredMistake {
    key: string;
    lessonId: string;
    questionId: string;
    sourceId?: string;
    question: Question;
    language: Language;
    missedAt: number;
}

export type NewMistake = Omit<StoredMistake, 'missedAt'>;

const QUESTION_TYPES = new Set(['translate', 'match', 'multiple-choice', 'order', 'cloze', 'spelling', 'dialogue', 'true-false', 'tap-picture', 'picture-word']);

export function isStoredMistake(value: unknown): value is StoredMistake {
    if (!value || typeof value !== 'object') return false;
    const item = value as Partial<StoredMistake>;
    const question = item.question;
    if (!question || typeof question !== 'object') return false;
    return typeof item.key === 'string'
        && item.key.length > 0
        && typeof item.lessonId === 'string'
        && typeof item.questionId === 'string'
        && typeof item.missedAt === 'number'
        && (item.language === 'en' || item.language === 'nl' || item.language === 'es')
        && typeof question.id === 'string'
        && typeof question.type === 'string'
        && QUESTION_TYPES.has(question.type);
}

export function upsertMistake(list: StoredMistake[], item: StoredMistake): StoredMistake[] {
    return [...list.filter((entry) => entry.key !== item.key), item];
}

export function removeMistake(list: StoredMistake[], key: string): StoredMistake[] {
    return list.filter((entry) => entry.key !== key);
}
