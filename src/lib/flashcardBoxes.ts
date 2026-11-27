/** Five Leitner boxes. Box 1 is due immediately so a miss returns in this session and the next one. */
export const BOX_COUNT = 5;
const DAY = 24 * 60 * 60 * 1000;
/** How long a card waits after the learner says they knew it, by the box it moves into. */
const PROMOTE_INTERVALS = [DAY, 3 * DAY, 7 * DAY, 21 * DAY, 45 * DAY];

export interface CardProgress {
    box: number;
    dueAt: number;
}

export function gradeCard(current: CardProgress | undefined, knew: boolean, now: number): CardProgress {
    if (!knew) return { box: 1, dueAt: now };
    const box = Math.min(BOX_COUNT, (current?.box ?? 0) + 1);
    return { box, dueAt: now + PROMOTE_INTERVALS[box - 1] };
}

export function isDue(card: CardProgress | undefined, now: number): boolean {
    if (!card) return true;
    return card.dueAt <= now;
}

/** Due cards first, and lower boxes before higher ones, so misses return sooner. */
export function sessionQueue(ids: string[], progress: Record<string, CardProgress>, now: number, includeLater = false): string[] {
    const chosen = includeLater ? ids : ids.filter((id) => isDue(progress[id], now));
    const rank = (id: string) => {
        const box = progress[id]?.box;
        return box ?? 1.5;
    };
    return [...chosen].sort((a, b) => {
        const boxA = rank(a);
        const boxB = rank(b);
        if (boxA !== boxB) return boxA - boxB;
        return (progress[a]?.dueAt ?? 0) - (progress[b]?.dueAt ?? 0);
    });
}

/** Put a missed card a few places ahead so it comes back in this sitting. */
export function requeue(queue: string[], cardId: string, gap = 2): string[] {
    const rest = queue.filter((id) => id !== cardId);
    const at = Math.min(gap, rest.length);
    rest.splice(at, 0, cardId);
    return rest;
}

export function readFlashcards(value: unknown): Record<string, CardProgress> {
    if (!value || typeof value !== 'object') return {};
    const cards: Record<string, CardProgress> = {};
    for (const [id, raw] of Object.entries(value)) {
        if (!raw || typeof raw !== 'object') continue;
        const box = (raw as { box?: unknown }).box;
        const dueAt = (raw as { dueAt?: unknown }).dueAt;
        if (typeof box !== 'number' || typeof dueAt !== 'number') continue;
        if (!Number.isInteger(box) || box < 1 || box > BOX_COUNT) continue;
        cards[id] = { box, dueAt };
    }
    return cards;
}
