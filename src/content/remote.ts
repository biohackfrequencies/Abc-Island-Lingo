import bundledFile from '../../content/remote.json';
import type { DictionaryEntry, Language, Lesson, Question } from '../types';

/** Text file on the public GitHub repo. Editing it does not install code. */
export const REMOTE_CONTENT_URL =
    'https://raw.githubusercontent.com/biohackfrequencies/Abc-Island-Lingo/main/content/remote.json';

const CACHE_KEY = 'abc-island-lingo-remote-content-v1';
const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1'] as const;
const QUESTION_TYPES = ['multiple-choice', 'spelling', 'translate', 'order'] as const;
const PARTS = ['noun', 'verb', 'adjective', 'phrase', 'other'] as const;

export interface RemotePhrase {
    papiamento: string;
    en: string;
    nl: string;
    es: string;
}

export interface RemoteVocab {
    id: string;
    papiamento: string;
    en: string;
    nl: string;
    es: string;
    partOfSpeech: DictionaryEntry['partOfSpeech'];
}

export interface RemoteQuestion {
    type: 'multiple-choice' | 'spelling' | 'translate' | 'order';
    prompt: string | Record<Language, string>;
    options?: string[];
    answer: string;
}

export interface RemoteLesson {
    id: string;
    title: string;
    premium: boolean;
    level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
    description: Record<Language, string>;
    questions: RemoteQuestion[];
}

export interface RemoteContent {
    phraseOfTheWeek: RemotePhrase;
    vocabulary: RemoteVocab[];
    lessons: RemoteLesson[];
}

const FALLBACK_PHRASE: RemotePhrase = {
    papiamento: 'Bon bini',
    en: 'Welcome',
    nl: 'Welkom',
    es: 'Bienvenido',
};

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function cleanString(value: unknown, max: number): string | null {
    if (typeof value !== 'string') return null;
    const trimmed = value.trim();
    if (!trimmed || trimmed.length > max) return null;
    if (/[<>]/.test(trimmed)) return null;
    for (let index = 0; index < trimmed.length; index += 1) {
        if (trimmed.charCodeAt(index) < 32) return null;
    }
    return trimmed;
}

function localized(value: unknown, max: number): Record<Language, string> | null {
    if (!isRecord(value)) return null;
    const en = cleanString(value.en, max);
    const nl = cleanString(value.nl, max);
    const es = cleanString(value.es, max);
    if (!en || !nl || !es) return null;
    return { en, nl, es };
}

function promptOf(value: unknown): RemoteQuestion['prompt'] | null {
    const single = cleanString(value, 300);
    if (single) return single;
    return localized(value, 300);
}

function remoteId(value: unknown): string | null {
    const id = cleanString(value, 48);
    if (!id || !/^remote-[a-z0-9-]+$/.test(id)) return null;
    return id;
}

function phraseOf(value: unknown): RemotePhrase | null {
    if (!isRecord(value)) return null;
    const papiamento = cleanString(value.papiamento, 200);
    const text = localized(value, 200);
    if (!papiamento || !text) return null;
    return { papiamento, ...text };
}

function vocabOf(value: unknown, seen: Set<string>): RemoteVocab | null {
    if (!isRecord(value)) return null;
    const id = remoteId(value.id);
    const papiamento = cleanString(value.papiamento, 120);
    const text = localized(value, 160);
    const part = value.partOfSpeech;
    if (!id || seen.has(id) || !papiamento || !text) return null;
    if (typeof part !== 'string' || !PARTS.includes(part as RemoteVocab['partOfSpeech'])) return null;
    seen.add(id);
    return { id, papiamento, ...text, partOfSpeech: part as RemoteVocab['partOfSpeech'] };
}

function questionOf(value: unknown): RemoteQuestion | null {
    if (!isRecord(value)) return null;
    const type = value.type;
    if (typeof type !== 'string' || !QUESTION_TYPES.includes(type as RemoteQuestion['type'])) return null;
    const prompt = promptOf(value.prompt);
    const answer = cleanString(value.answer, 200);
    if (!prompt || !answer) return null;
    const kind = type as RemoteQuestion['type'];
    if (kind === 'spelling') return { type: kind, prompt, answer };
    if (!Array.isArray(value.options) || value.options.length < 2 || value.options.length > 8) return null;
    const options: string[] = [];
    for (const option of value.options) {
        const text = cleanString(option, 120);
        if (!text) return null;
        options.push(text);
    }
    if (kind === 'order') {
        if (options.join(' ') !== answer) return null;
    } else if (!options.includes(answer)) {
        return null;
    }
    return { type: kind, prompt, options, answer };
}

function lessonOf(value: unknown, seen: Set<string>): RemoteLesson | null {
    if (!isRecord(value)) return null;
    const id = remoteId(value.id);
    const title = cleanString(value.title, 80);
    const description = localized(value.description, 240);
    const level = typeof value.level === 'string' && LEVELS.includes(value.level as RemoteLesson['level'])
        ? value.level as RemoteLesson['level']
        : 'A1';
    if (!id || seen.has(id) || !title || !description || typeof value.premium !== 'boolean') return null;
    if (!Array.isArray(value.questions) || value.questions.length < 1 || value.questions.length > 40) return null;
    const questions: RemoteQuestion[] = [];
    for (const question of value.questions) {
        const parsed = questionOf(question);
        if (!parsed) return null;
        questions.push(parsed);
    }
    seen.add(id);
    return { id, title, premium: value.premium, level, description, questions };
}

/** Accept only text lessons, words, and a phrase. Anything else is ignored by returning null. */
export function validateRemoteContent(value: unknown): RemoteContent | null {
    if (!isRecord(value)) return null;
    const phraseOfTheWeek = phraseOf(value.phraseOfTheWeek);
    if (!phraseOfTheWeek) return null;
    if (!Array.isArray(value.vocabulary) || value.vocabulary.length > 300) return null;
    if (!Array.isArray(value.lessons) || value.lessons.length > 40) return null;
    const seen = new Set<string>();
    const vocabulary: RemoteVocab[] = [];
    for (const entry of value.vocabulary) {
        const parsed = vocabOf(entry, seen);
        if (!parsed) return null;
        vocabulary.push(parsed);
    }
    const lessons: RemoteLesson[] = [];
    for (const entry of value.lessons) {
        const parsed = lessonOf(entry, seen);
        if (!parsed) return null;
        lessons.push(parsed);
    }
    return { phraseOfTheWeek, vocabulary, lessons };
}

export function toPlayableLesson(lesson: RemoteLesson): Lesson {
    const questions: Question[] = lesson.questions.map((question, index) => ({
        id: `${lesson.id}-q${index + 1}`,
        type: question.type,
        prompt: question.prompt,
        options: question.options,
        correctAnswer: question.answer,
    }));
    return {
        id: lesson.id,
        category: 'Update',
        level: lesson.level,
        title: lesson.title,
        topic: lesson.description.en,
        description: lesson.description,
        questions,
    };
}

export function toDictionaryEntries(vocabulary: RemoteVocab[]): DictionaryEntry[] {
    return vocabulary.map((entry) => ({
        id: entry.id,
        papiamento: entry.papiamento,
        meanings: { en: entry.en, nl: entry.nl, es: entry.es },
        partOfSpeech: entry.partOfSpeech,
    }));
}

function storage(): Storage | null {
    try {
        if (typeof localStorage === 'undefined') return null;
        return localStorage;
    } catch {
        return null;
    }
}

export function readCachedContent(): RemoteContent | null {
    const store = storage();
    if (!store) return null;
    try {
        const raw = store.getItem(CACHE_KEY);
        if (!raw) return null;
        return validateRemoteContent(JSON.parse(raw));
    } catch {
        return null;
    }
}

const bundled = validateRemoteContent(bundledFile) ?? {
    phraseOfTheWeek: FALLBACK_PHRASE,
    vocabulary: [],
    lessons: [],
};

let active: RemoteContent = readCachedContent() ?? bundled;
const listeners = new Set<(content: RemoteContent) => void>();
let refreshPromise: Promise<void> | null = null;

export function getActiveRemoteContent(): RemoteContent {
    return active;
}

export function getRemoteLesson(id: string): RemoteLesson | null {
    return active.lessons.find((lesson) => lesson.id === id) ?? null;
}

function publish(content: RemoteContent) {
    active = content;
    const store = storage();
    if (store) {
        try {
            store.setItem(CACHE_KEY, JSON.stringify(content));
        } catch {
            // The in-memory copy still works for this visit.
        }
    }
    listeners.forEach((listener) => listener(content));
}

export function subscribeRemoteContent(listener: (content: RemoteContent) => void): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

export async function fetchRemoteContent(signal?: AbortSignal): Promise<RemoteContent | null> {
    const response = await fetch(REMOTE_CONTENT_URL, { signal, cache: 'no-store' });
    if (!response.ok) return null;
    return validateRemoteContent(await response.json());
}

/** Download once per app launch. A failure keeps the cached or bundled copy. */
export function refreshRemoteContent(): Promise<void> {
    if (!refreshPromise) {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);
        refreshPromise = fetchRemoteContent(controller.signal)
            .then((next) => {
                if (next) publish(next);
            })
            .catch(() => {
                // Offline, blocked, or not valid JSON. Keep what is already on the device.
            })
            .finally(() => clearTimeout(timeout));
    }
    return refreshPromise;
}
