import { conversations, type Conversation } from '../data/conversations';
import { pictureFor } from '../data/pictures';
import { vocabulary, type VocabEntry } from '../data/vocabulary';
import type { Language, LessonConfig } from '../types';

export type ExerciseKind =
    | 'multiple-choice'
    | 'translate'
    | 'true-false'
    | 'spelling'
    | 'order'
    | 'cloze'
    | 'match'
    | 'dialogue'
    | 'tap-picture'
    | 'picture-word';

/** A lesson should feel like a short session, not a 90-question drill. */
export const LESSON_MAX = 15;

export function displayPap(entry: VocabEntry): string {
    return entry.papiamento.replace(/[{}]/g, '').replace(/\s+/g, ' ').trim();
}

export function isProduction(kind: ExerciseKind): boolean {
    return kind === 'spelling' || kind === 'order' || kind === 'cloze';
}

function pictureKind(id: string): ExerciseKind | null {
    if (!pictureFor(id)) return null;
    const salt = [...id].reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return salt % 2 === 0 ? 'tap-picture' : 'picture-word';
}

/** Exercise types for one vocabulary item. Counts are at least the v1.0.2 exposure. */
export function kindsForItem(entry: VocabEntry): ExerciseKind[] {
    const multi = displayPap(entry).includes(' ');
    const hasBlank = entry.papiamento.includes('{');
    const pictured = entry.type === 'word' ? pictureKind(entry.id) : null;
    const lead = pictured ? [pictured] : [];
    if (entry.type === 'sentence') {
        return hasBlank
            ? ['cloze', 'translate', 'true-false']
            : ['order', 'translate', 'multiple-choice'];
    }
    if (entry.type === 'phrase' && multi) {
        return ['order', 'cloze', 'translate'];
    }
    return [...lead, 'multiple-choice', 'translate', 'true-false', 'spelling'];
}

export function canMatch(entry: VocabEntry): boolean {
    if (entry.type === 'sentence') return false;
    const left = displayPap(entry);
    const right = entry.meanings.en;
    return left.length > 0 && left.length <= 18 && right.length <= 28;
}

export function baseSize(entries: VocabEntry[]): number {
    return entries.reduce((sum, entry) => sum + kindsForItem(entry).length, 0);
}

export function selectEntries(config: LessonConfig): VocabEntry[] {
    const content = config.content;
    if (content.type === 'review') return [];
    if (content.type === 'ids') {
        const order = new Map(content.ids.map((id, index) => [id, index]));
        return vocabulary
            .filter((entry) => order.has(entry.id))
            .sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0));
    }
    if (content.type === 'tag') {
        const items = vocabulary.filter((entry) => entry.tags?.includes(content.tag));
        return content.count ? items.slice(0, content.count) : items;
    }
    if (content.type === 'category') {
        const items = vocabulary.filter((entry) => entry.category === content.category);
        return content.count ? items.slice(0, content.count) : items;
    }
    return [];
}

export function dialoguesFor(config: LessonConfig): Conversation[] {
    if (config.dialogueTags?.length) {
        return conversations.filter((conversation) =>
            conversation.tags.some((tag) => config.dialogueTags?.includes(tag)),
        );
    }
    if (config.dialogueCategories?.length) {
        return conversations.filter((conversation) => config.dialogueCategories?.includes(conversation.category));
    }
    return [];
}

function inheritedDialogue(config: LessonConfig): Pick<LessonConfig, 'dialogueTags' | 'dialogueCategories'> {
    if (config.dialogueTags?.length) return { dialogueTags: config.dialogueTags };
    if (config.dialogueCategories?.length) return { dialogueCategories: config.dialogueCategories };
    if (config.content.type === 'category') return { dialogueCategories: [config.content.category] };
    if (config.content.type === 'tag') return { dialogueTags: [config.content.tag] };
    return {};
}

const STRETCH = LESSON_MAX + 1;

function groupPenalty(size: number): number {
    if (size > STRETCH) return 5000 + size;
    if (size < 8) return 1000 + (8 - size) * 20;
    if (size > LESSON_MAX) return 40;
    return Math.abs(size - 12);
}

/**
 * Split a vocabulary list into lesson-sized groups, keeping file order so words
 * stay ahead of the sentences that use them. A 16-question group is used only
 * when every shorter split would leave a lesson under 8.
 */
export function packEntries(entries: VocabEntry[], dialogues: number): VocabEntry[][] {
    const count = entries.length;
    if (count === 0) return [];
    const weights = entries.map((entry) => kindsForItem(entry).length);
    const prefix = [0];
    for (const weight of weights) prefix.push(prefix[prefix.length - 1] + weight);
    const span = (start: number, end: number, extra: number) => prefix[end] - prefix[start] + extra;

    const best = Array.from({ length: count + 1 }, () => ({ score: Number.POSITIVE_INFINITY, from: -1 }));
    best[0] = { score: 0, from: -1 };
    for (let end = 1; end <= count; end++) {
        for (let start = 0; start < end; start++) {
            if (!Number.isFinite(best[start].score)) continue;
            const size = span(start, end, end === count ? dialogues : 0);
            const score = best[start].score + groupPenalty(size);
            if (score < best[end].score) best[end] = { score, from: start };
        }
    }

    const bounds: number[] = [count];
    let cursor = count;
    while (cursor > 0 && best[cursor].from >= 0) {
        cursor = best[cursor].from;
        bounds.push(cursor);
    }
    bounds.reverse();
    const groups: VocabEntry[][] = [];
    for (let index = 0; index < bounds.length - 1; index++) {
        groups.push(entries.slice(bounds[index], bounds[index + 1]));
    }
    return groups.filter((group) => group.length > 0);
}

function withPart(description: Record<Language, string>, part: number): Record<Language, string> {
    if (part === 1) return description;
    return {
        en: `${description.en} Part ${part}.`,
        nl: `${description.nl} Deel ${part}.`,
        es: `${description.es} Parte ${part}.`,
    };
}

function expandTeaching(config: LessonConfig): LessonConfig[] {
    const entries = selectEntries(config);
    if (entries.length === 0) return [];
    const dialogue = inheritedDialogue(config);
    const dialogueCount = dialoguesFor({ ...config, ...dialogue, content: { type: 'ids', ids: [] } }).length;
    const chunks = packEntries(entries, dialogueCount);
    return chunks.map((chunk, index) => {
        const part = index + 1;
        const last = index === chunks.length - 1;
        return {
            ...config,
            id: part === 1 ? config.id : `${config.id}--${part}`,
            title: chunks.length > 1 && part > 1 ? `${config.title} (${part})` : config.title,
            description: withPart(config.description, part),
            content: { type: 'ids', ids: chunk.map((entry) => entry.id) },
            role: undefined,
            dialogueTags: last ? dialogue.dialogueTags : undefined,
            dialogueCategories: last ? dialogue.dialogueCategories : undefined,
        };
    });
}

function uniqueIds(ids: string[]): string[] {
    const seen = new Set<string>();
    return ids.filter((id) => {
        if (seen.has(id)) return false;
        seen.add(id);
        return true;
    });
}

function sampleIds(ids: string[], count: number): string[] {
    if (ids.length <= count) return [...ids];
    const picked: string[] = [];
    const seen = new Set<string>();
    for (let i = 0; i < count; i++) {
        const index = Math.round((i * (ids.length - 1)) / (count - 1));
        const id = ids[index];
        if (!seen.has(id)) {
            seen.add(id);
            picked.push(id);
        }
    }
    for (const id of ids) {
        if (picked.length >= count) break;
        if (!seen.has(id)) {
            seen.add(id);
            picked.push(id);
        }
    }
    return picked;
}

function reviewCount(poolSize: number, dialogues: number): number {
    const match = poolSize >= 3 ? 1 : 0;
    const room = LESSON_MAX - dialogues - match;
    return Math.max(4, Math.min(6, Math.floor(room / 2)));
}

function buildReview(shell: LessonConfig, pool: string[], taken: string[][]): LessonConfig {
    const dialogueCount = dialoguesFor(shell).length;
    const count = Math.min(reviewCount(pool.length, dialogueCount), pool.length);
    let picked = sampleIds(pool, count);
    for (let offset = 0; offset < pool.length; offset++) {
        const rotated = pool.slice(offset).concat(pool.slice(0, offset));
        const candidate = sampleIds(rotated, count);
        const key = candidate.slice().sort().join('|');
        const clash = taken.some((set) => set.slice().sort().join('|') === key);
        if (!clash) {
            picked = candidate;
            break;
        }
    }
    return {
        ...shell,
        role: 'review',
        content: { type: 'ids', ids: picked },
    };
}

function defaultReview(unit: number, sample: LessonConfig): LessonConfig {
    return {
        id: `u${unit}-review`,
        unit,
        category: sample.category,
        level: sample.level,
        title: `Repaso ${unit}`,
        topic: 'Unit review',
        description: {
            en: 'A short practice of words from this unit.',
            nl: 'Een korte oefening met woorden uit deze unit.',
            es: 'Una práctica corta con palabras de esta unidad.',
        },
        role: 'review',
        content: { type: 'review' },
    };
}

/** Turn the authored lessons into short parts plus one review at the end of each unit. */
export function expandCourse(blueprints: LessonConfig[]): LessonConfig[] {
    const result: LessonConfig[] = [];
    const units = new Set(blueprints.map((lesson) => lesson.unit));
    for (const unit of [...units].sort((a, b) => a - b)) {
        const group = blueprints.filter((lesson) => lesson.unit === unit);
        const teaching = group.filter((lesson) => lesson.role !== 'review');
        const reviews = group.filter((lesson) => lesson.role === 'review');
        const expanded = teaching.flatMap((lesson) => expandTeaching(lesson));
        result.push(...expanded);
        const pool = uniqueIds(expanded.flatMap((lesson) => (
            lesson.content.type === 'ids' ? lesson.content.ids : []
        )));
        const taken = expanded
            .filter((lesson) => lesson.content.type === 'ids')
            .map((lesson) => (lesson.content.type === 'ids' ? lesson.content.ids : []));
        if (pool.length === 0) continue;
        if (reviews.length > 0) {
            for (const review of reviews) result.push(buildReview(review, pool, taken));
        } else {
            result.push(buildReview(defaultReview(unit, teaching[0] ?? group[0]), pool, taken));
        }
    }
    return result;
}
