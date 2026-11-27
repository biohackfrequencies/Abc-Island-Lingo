import { conversations, type Conversation } from '../data/conversations';
import { vocabulary, type VocabEntry } from '../data/vocabulary';
import type { Language, Lesson, LessonConfig, MatchPair, Question } from '../types';
import { vocabEmoji } from './emoji';
import {
    baseSize,
    canMatch,
    dialoguesFor,
    displayPap,
    isProduction,
    kindsForItem,
    LESSON_MAX,
    selectEntries,
    type ExerciseKind,
} from './coursePlan';
import { rngFor, shuffle } from './rng';

const TRUE_FALSE: Record<Language, { yes: string; no: string }> = {
    en: { yes: 'True', no: 'False' },
    nl: { yes: 'Waar', no: 'Onwaar' },
    es: { yes: 'Verdadero', no: 'Falso' },
};

const SKIP_BLANK = new Set(['ta', 'e', 'mi', 'bo', 'di', 'na', 'un', 'pa', 'a', 'lo', 'no', 'den', 'ri']);

export function matchKey(pairs: MatchPair[]): string {
    return pairs
        .map((pair) => ({ left: pair.left, right: pair.right }))
        .sort((a, b) => a.left.localeCompare(b.left) || a.right.localeCompare(b.right))
        .map((pair) => `${pair.left}→${pair.right}`)
        .join('|');
}

function optionKey(value: string): string {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

function uniqueStrings(correct: string, extras: string[], limit: number): string[] {
    const picked: string[] = [];
    const seen = new Set([optionKey(correct)]);
    for (const extra of extras) {
        const key = optionKey(extra);
        if (!extra || seen.has(key)) continue;
        seen.add(key);
        picked.push(extra);
        if (picked.length >= limit) break;
    }
    return picked;
}

function getDistractors(target: VocabEntry, count: number, localPool: VocabEntry[], rng: () => number): VocabEntry[] {
    let pool = localPool.filter((entry) => entry.id !== target.id && entry.type === target.type);
    const add = (extra: VocabEntry[]) => {
        const fresh = extra.filter((entry) => entry.id !== target.id && !pool.some((item) => item.id === entry.id));
        pool = [...pool, ...shuffle(fresh, rng).slice(0, Math.max(0, count - pool.length))];
    };
    if (pool.length < count) {
        add(vocabulary.filter((entry) => entry.category === target.category && entry.type === target.type));
    }
    if (pool.length < count) {
        add(vocabulary.filter((entry) => entry.type === target.type));
    }
    if (pool.length < count) add(vocabulary);
    return shuffle(pool, rng).slice(0, count);
}

function clozeToken(entry: VocabEntry): string {
    const braced = entry.papiamento.match(/\{([^}]+)\}/);
    if (braced) return braced[1];
    return displayPap(entry).split(' ')[0] ?? displayPap(entry);
}

function blankOf(entry: VocabEntry): { hidden: string; display: string } {
    const braced = entry.papiamento.match(/\{([^}]+)\}/);
    if (braced) {
        return {
            hidden: braced[1],
            display: entry.papiamento.replace(/\{[^}]+\}/, '___'),
        };
    }
    const tokens = displayPap(entry).split(' ');
    let index = tokens.length - 1;
    let best = -1;
    tokens.forEach((token, tokenIndex) => {
        const core = token.replace(/[^\p{L}\-']/gu, '');
        if (SKIP_BLANK.has(core.toLowerCase())) return;
        if (core.length > best) {
            best = core.length;
            index = tokenIndex;
        }
    });
    const hidden = tokens[index]?.replace(/[^\p{L}\-']/gu, '') || tokens[index] || '';
    const display = tokens.map((token, tokenIndex) => (tokenIndex === index ? '___' : token)).join(' ');
    return { hidden, display };
}

function tagQuestion(question: Question, sourceId: string, sourceIds?: string[]): Question {
    return { ...question, sourceId, sourceIds: sourceIds ?? [sourceId] };
}

function generateMultipleChoice(id: string, vocab: VocabEntry, lang: Language, pool: VocabEntry[], rng: () => number): Question {
    const correct = displayPap(vocab);
    const distractors = getDistractors(vocab, 6, pool, rng).map(displayPap);
    const prompts: Record<Language, string> = {
        en: `How do you say "${vocab.meanings.en}"?`,
        nl: `Hoe zeg je "${vocab.meanings.nl}"?`,
        es: `¿Cómo se dice "${vocab.meanings.es}"?`,
    };
    return {
        id,
        type: 'multiple-choice',
        prompt: prompts[lang],
        options: shuffle([correct, ...uniqueStrings(correct, distractors, 3)], rng),
        correctAnswer: correct,
        pronunciation: vocab.pronunciation,
        image: vocab.image,
    };
}

function generateTranslate(id: string, vocab: VocabEntry, lang: Language, pool: VocabEntry[], rng: () => number): Question {
    const correct = vocab.meanings[lang];
    const distractors = getDistractors(vocab, 6, pool, rng).map((entry) => entry.meanings[lang]);
    const prompts: Record<Language, string> = {
        en: `What does "${displayPap(vocab)}" mean?`,
        nl: `Wat betekent "${displayPap(vocab)}"?`,
        es: `¿Qué significa "${displayPap(vocab)}"?`,
    };
    return {
        id,
        type: 'translate',
        prompt: prompts[lang],
        options: shuffle([correct, ...uniqueStrings(correct, distractors, 3)], rng),
        correctAnswer: correct,
        pronunciation: vocab.pronunciation,
        image: vocab.image,
        explanation: vocab.meanings[lang],
    };
}

function generateSpelling(id: string, vocab: VocabEntry, lang: Language): Question {
    const prompts: Record<Language, string> = {
        en: `Type the Papiamento word for "${vocab.meanings.en}"`,
        nl: `Typ het Papiaments voor "${vocab.meanings.nl}"`,
        es: `Escribe en Papiamento "${vocab.meanings.es}"`,
    };
    return {
        id,
        type: 'spelling',
        prompt: prompts[lang],
        correctAnswer: vocab.papiamento,
        pronunciation: vocab.pronunciation,
        image: vocab.image,
    };
}

function generateOrder(id: string, vocab: VocabEntry, lang: Language, rng: () => number): Question {
    const sentence = displayPap(vocab);
    const prompts: Record<Language, string> = {
        en: `Build the phrase: "${vocab.meanings.en}"`,
        nl: `Maak de zin: "${vocab.meanings.nl}"`,
        es: `Forma la frase: "${vocab.meanings.es}"`,
    };
    return {
        id,
        type: 'order',
        prompt: prompts[lang],
        options: shuffle(sentence.split(' '), rng),
        correctAnswer: sentence,
        explanation: vocab.meanings[lang],
        image: vocab.image,
    };
}

function generateCloze(id: string, vocab: VocabEntry, lang: Language, pool: VocabEntry[], rng: () => number): Question {
    const { hidden, display } = blankOf(vocab);
    const fromLesson = getDistractors(vocab, 6, pool, rng).map(clozeToken);
    const grammar = ['ta', 'tin', 'bai', 'kier', 'por', 'a', 'lo'];
    const extras = shuffle([...fromLesson, ...grammar], rng).filter((word) => word.length < 20 && !word.includes(' '));
    const prompts: Record<Language, string> = {
        en: `Fill in the missing word: "${vocab.meanings.en}"`,
        nl: `Vul het ontbrekende woord in: "${vocab.meanings.nl}"`,
        es: `Completa la palabra que falta: "${vocab.meanings.es}"`,
    };
    return {
        id,
        type: 'cloze',
        prompt: `${prompts[lang]}\n\n${display}`,
        options: shuffle([hidden, ...uniqueStrings(hidden, extras, 3)], rng),
        correctAnswer: hidden,
        explanation: vocab.meanings[lang],
        image: vocab.image,
    };
}

function generateTrueFalse(id: string, vocab: VocabEntry, lang: Language, pool: VocabEntry[], rng: () => number): Question {
    const truthful = (rng() * 2) < 1;
    const distractor = getDistractors(vocab, 4, pool, rng)
        .map((entry) => entry.meanings[lang])
        .find((meaning) => optionKey(meaning) !== optionKey(vocab.meanings[lang]));
    const shown = truthful || !distractor ? vocab.meanings[lang] : distractor;
    const answer = shown === vocab.meanings[lang] ? TRUE_FALSE[lang].yes : TRUE_FALSE[lang].no;
    const prompts: Record<Language, string> = {
        en: `Does "${displayPap(vocab)}" mean "${shown}"?`,
        nl: `Betekent "${displayPap(vocab)}" "${shown}"?`,
        es: `¿"${displayPap(vocab)}" significa "${shown}"?`,
    };
    return {
        id,
        type: 'true-false',
        prompt: prompts[lang],
        emoji: vocabEmoji[vocab.id],
        options: shuffle([TRUE_FALSE[lang].yes, TRUE_FALSE[lang].no], rng),
        correctAnswer: answer,
        explanation: vocab.meanings[lang],
    };
}

function generateMatch(id: string, items: VocabEntry[], lang: Language, rng: () => number): Question {
    const pairs = items.map((entry) => ({ left: displayPap(entry), right: entry.meanings[lang] }));
    const prompts: Record<Language, string> = {
        en: 'Tap the matching pairs',
        nl: 'Tik de paren aan',
        es: 'Toca las parejas',
    };
    return {
        id,
        type: 'match',
        prompt: prompts[lang],
        pairs: shuffle(pairs, rng),
        options: shuffle(pairs.map((pair) => pair.right), rng),
        correctAnswer: matchKey(pairs),
        sourceId: items[0]?.id,
        sourceIds: items.map((entry) => entry.id),
    };
}

function generateDialogue(id: string, conv: Conversation, lang: Language, lessonVocab: VocabEntry[], rng: () => number): Question {
    const correctLine = conv.lines.find((line) => line.isInteractive) || conv.lines[conv.lines.length - 1];
    const generic = ['Mi no sa.', 'Danki.', 'Ata aki.', 'Si, sigur.', 'Nò, dispensami.'];
    const fromLesson = lessonVocab
        .filter((entry) => entry.type === 'sentence' || entry.type === 'phrase')
        .map((entry) => displayPap(entry));
    const pool = shuffle([...generic, ...fromLesson].filter((line) => line !== correctLine.text), rng);
    const prompts: Record<Language, string> = {
        en: 'Complete the conversation',
        nl: 'Maak het gesprek af',
        es: 'Completa la conversación',
    };
    return {
        id,
        type: 'dialogue',
        prompt: prompts[lang],
        correctAnswer: correctLine.text,
        options: shuffle([correctLine.text, ...pool.slice(0, 2)], rng),
        dialogueLines: conv.lines,
        sourceId: conv.id,
        sourceIds: [conv.id],
    };
}

function buildQuestion(
    kind: ExerciseKind,
    vocab: VocabEntry,
    lang: Language,
    pool: VocabEntry[],
    lessonId: string,
): Question | null {
    const rng = rngFor(`${lessonId}:${lang}:${vocab.id}:${kind}`);
    const id = `q-${vocab.id}-${kind}`;
    if (kind === 'multiple-choice') return tagQuestion(generateMultipleChoice(id, vocab, lang, pool, rng), vocab.id);
    if (kind === 'translate') return tagQuestion(generateTranslate(id, vocab, lang, pool, rng), vocab.id);
    if (kind === 'spelling') return tagQuestion(generateSpelling(id, vocab, lang), vocab.id);
    if (kind === 'order') {
        if (!displayPap(vocab).includes(' ')) return null;
        return tagQuestion(generateOrder(id, vocab, lang, rng), vocab.id);
    }
    if (kind === 'cloze') return tagQuestion(generateCloze(id, vocab, lang, pool, rng), vocab.id);
    if (kind === 'true-false') return tagQuestion(generateTrueFalse(id, vocab, lang, pool, rng), vocab.id);
    return null;
}

function rotate<T>(items: T[], amount: number): T[] {
    if (items.length === 0) return [];
    const shift = ((amount % items.length) + items.length) % items.length;
    return [...items.slice(shift), ...items.slice(0, shift)];
}

function kindsFor(entry: VocabEntry, index: number, lessonSalt: number, review: boolean): ExerciseKind[] {
    const all = kindsForItem(entry).filter((kind) => kind !== 'order' || displayPap(entry).includes(' '));
    const recognition = all.filter((kind) => !isProduction(kind));
    const production = all.filter((kind) => isProduction(kind));
    if (review) {
        const seen = recognition.length ? rotate(recognition, index + lessonSalt)[0] : 'translate';
        const made = production.length ? production[(index + lessonSalt) % production.length] : 'spelling';
        return [seen, made].filter((kind, kindIndex, list) => list.indexOf(kind) === kindIndex);
    }
    const rotated = rotate(recognition, index + lessonSalt);
    const result = [...rotated];
    production.forEach((kind, productionIndex) => {
        const slot = 1 + ((index + lessonSalt + productionIndex) % Math.max(1, result.length));
        result.splice(Math.min(slot, result.length), 0, kind);
    });
    return result;
}

function sharesSource(a: Question, b: Question): boolean {
    const left = new Set(a.sourceIds ?? (a.sourceId ? [a.sourceId] : []));
    return (b.sourceIds ?? (b.sourceId ? [b.sourceId] : [])).some((id) => left.has(id));
}

/** Take one exercise per word at a time so the same type rarely repeats. */
function mixQuestions(lists: Question[][]): Question[] {
    const cursors = lists.map(() => 0);
    const total = lists.reduce((sum, list) => sum + list.length, 0);
    const out: Question[] = [];
    while (out.length < total) {
        let picked = -1;
        let best = Number.POSITIVE_INFINITY;
        const last = out[out.length - 1];
        for (let pass = 0; pass < 2 && picked < 0; pass++) {
            best = Number.POSITIVE_INFINITY;
            for (let index = 0; index < lists.length; index++) {
                const question = lists[index][cursors[index]];
                if (!question) continue;
                const sameType = !!last && question.type === last.type;
                const chooseThenType = !!last
                    && last.type === 'multiple-choice'
                    && question.type === 'spelling'
                    && sharesSource(last, question);
                if (pass === 0 && (sameType || chooseThenType)) continue;
                const score = cursors[index] * 100 + index;
                if (score < best) {
                    best = score;
                    picked = index;
                }
            }
        }
        if (picked < 0) break;
        out.push(lists[picked][cursors[picked]]);
        cursors[picked] += 1;
    }
    return out;
}

function introOk(questions: Question[]): boolean {
    const seen = new Map<string, number>();
    const tested = new Map<string, number>();
    questions.forEach((question, index) => {
        const production = isProduction(question.type);
        for (const id of question.sourceIds ?? []) {
            if (id.startsWith('conv-')) continue;
            if (!production && !seen.has(id)) seen.set(id, index);
            if (production && !tested.has(id)) tested.set(id, index);
        }
    });
    for (const [id, at] of tested) {
        const introduced = seen.get(id);
        if (introduced === undefined || introduced > at) return false;
    }
    return true;
}

function adjacentIssues(questions: Question[]): number {
    let issues = 0;
    for (let index = 1; index < questions.length; index++) {
        const previous = questions[index - 1];
        const current = questions[index];
        if (current.type === previous.type) issues += 1;
        if (previous.type === 'multiple-choice' && current.type === 'spelling' && sharesSource(previous, current)) {
            issues += 1;
        }
    }
    return issues;
}

/** Break up runs of the same exercise without testing a word before it is shown. */
function repairOrder(questions: Question[]): Question[] {
    const arranged = [...questions];
    for (let pass = 0; pass < arranged.length * 3; pass++) {
        const before = adjacentIssues(arranged);
        if (before === 0) break;
        let changed = false;
        for (let index = 1; index < arranged.length && !changed; index++) {
            if (arranged[index].type !== arranged[index - 1].type
                && !(arranged[index - 1].type === 'multiple-choice'
                    && arranged[index].type === 'spelling'
                    && sharesSource(arranged[index - 1], arranged[index]))) {
                continue;
            }
            for (let swap = 0; swap < arranged.length; swap++) {
                if (swap === index || swap === index - 1) continue;
                if (arranged[swap].type === arranged[index].type) continue;
                const next = [...arranged];
                [next[index], next[swap]] = [next[swap], next[index]];
                if (!introOk(next) || adjacentIssues(next) >= before) continue;
                arranged.splice(0, arranged.length, ...next);
                changed = true;
                break;
            }
        }
        if (!changed) break;
    }
    return arranged;
}

function placeExtra(questions: Question[], extra: Question, preferred: number): Question[] {
    const out = [...questions];
    let at = Math.min(Math.max(preferred, 0), out.length);
    if (out[at - 1]?.type === extra.type || out[at]?.type === extra.type) {
        const later = out.findIndex((question, index) => index >= at && question.type !== extra.type);
        at = later === -1 ? out.length : later + 1;
    }
    out.splice(at, 0, extra);
    return out;
}

function matchItems(entries: VocabEntry[], lang: Language, rng: () => number): VocabEntry[] {
    const seen = new Set<string>();
    const ready = entries.filter((entry) => {
        if (!canMatch(entry)) return false;
        const left = optionKey(displayPap(entry));
        const right = optionKey(entry.meanings[lang]);
        if (seen.has(left) || seen.has(right)) return false;
        seen.add(left);
        seen.add(right);
        return true;
    });
    return shuffle(ready, rng).slice(0, 4);
}

function orderedEntries(entries: VocabEntry[]): VocabEntry[] {
    const rank = (entry: VocabEntry) => (entry.type === 'sentence' ? 2 : entry.type === 'phrase' ? 1 : 0);
    return [...entries].sort((a, b) => rank(a) - rank(b));
}

export const generateLesson = (config: LessonConfig, userLang: Language = 'en'): Lesson => {
    const lessonVocab = orderedEntries(selectEntries(config));
    const review = config.role === 'review';
    const lessonSalt = hashSalt(config.id);

    const lists = lessonVocab.map((entry, index) => {
        const kinds = kindsFor(entry, index, lessonSalt, review);
        return kinds
            .map((kind) => buildQuestion(kind, entry, userLang, lessonVocab, config.id))
            .filter((question): question is Question => question !== null);
    }).filter((list) => list.length > 0);

    let questions = mixQuestions(lists);
    const dialogueQuestions = dialoguesFor(config).map((conversation, index) => (
        generateDialogue(`q-dial-${conversation.id}-${index}`, conversation, userLang, lessonVocab, rngFor(`${config.id}:${userLang}:dialogue:${conversation.id}`))
    ));

    const matched = matchItems(lessonVocab, userLang, rngFor(`${config.id}:${userLang}:match-pick`));
    const room = LESSON_MAX + (baseSize(lessonVocab) + dialogueQuestions.length === LESSON_MAX + 1 ? 1 : 0);
    if (matched.length >= 3 && questions.length + dialogueQuestions.length + 1 <= Math.max(room, LESSON_MAX)) {
        const match = generateMatch(
            `q-${config.id}-match`,
            matched,
            userLang,
            rngFor(`${config.id}:${userLang}:match`),
        );
        questions = placeExtra(questions, match, 2);
    }

    dialogueQuestions.forEach((dialogue, index) => {
        const at = index === 0 ? questions.length : Math.floor(questions.length * ((index + 1) / (dialogueQuestions.length + 1)));
        questions = placeExtra(questions, dialogue, at);
    });

    const withTips = applyTips(repairOrder(questions), lessonVocab);

    return {
        id: config.id,
        category: config.category,
        level: config.level,
        title: config.title,
        topic: config.topic,
        description: config.description,
        questions: withTips,
    };
}

function hashSalt(value: string): number {
    let hash = 0;
    for (let i = 0; i < value.length; i++) hash = (hash + value.charCodeAt(i) * (i + 1)) % 97;
    return hash;
}

function applyTips(questions: Question[], entries: VocabEntry[]): Question[] {
    const tips = new Map(entries.filter((entry) => entry.culturalTip).map((entry) => [entry.id, entry.culturalTip]));
    const used = new Set<string>();
    return questions.map((question) => {
        const id = question.sourceId;
        if (!id || question.type === 'true-false' || question.type === 'match' || used.has(id) || !tips.has(id)) {
            return question;
        }
        used.add(id);
        return { ...question, culturalTip: tips.get(id) };
    });
}

/** Rebuild a missed exercise in the learner's current language. Falls back to the saved snapshot. */
export function questionForPractice(
    mistake: { question: Question; sourceId?: string },
    lang: Language,
): Question {
    const sourceId = mistake.sourceId ?? mistake.question.sourceId;
    const type = mistake.question.type;
    const id = mistake.question.id;
    const sourceIds = mistake.question.sourceIds;

    if (type === 'match') {
        const ids = sourceIds ?? (sourceId ? [sourceId] : []);
        const entries = ids
            .map((itemId) => vocabulary.find((entry) => entry.id === itemId))
            .filter((entry): entry is VocabEntry => !!entry);
        if (entries.length >= 2) {
            const rebuilt = generateMatch(id, entries, lang, rngFor(`${id}:${lang}:match`));
            return { ...rebuilt, id, sourceId: entries[0].id, sourceIds: entries.map((entry) => entry.id) };
        }
    }

    if (!sourceId) return mistake.question;
    const vocab = vocabulary.find((entry) => entry.id === sourceId);
    if (vocab && type !== 'dialogue') {
        const pool = vocabulary.filter((entry) => entry.category === vocab.category);
        const rng = rngFor(`${id}:${lang}:${type}`);
        const built = (() => {
            switch (type) {
                case 'order':
                    return generateOrder(id, vocab, lang, rng);
                case 'cloze':
                    return generateCloze(id, vocab, lang, pool, rng);
                case 'spelling':
                    return generateSpelling(id, vocab, lang);
                case 'translate':
                    return generateTranslate(id, vocab, lang, pool, rng);
                case 'multiple-choice':
                    return generateMultipleChoice(id, vocab, lang, pool, rng);
                case 'true-false':
                    return generateTrueFalse(id, vocab, lang, pool, rng);
                default:
                    return null;
            }
        })();
        if (built) return { ...built, id, sourceId, sourceIds: [sourceId] };
    }

    const conversation = conversations.find((entry) => entry.id === sourceId);
    if (conversation && type === 'dialogue') {
        return { ...generateDialogue(id, conversation, lang, vocabulary, rngFor(`${id}:${lang}:dialogue`)), id, sourceId };
    }
    return mistake.question;
}
