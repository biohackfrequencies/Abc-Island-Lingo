import assert from 'node:assert/strict';
import { test } from 'node:test';
import { baselinePractice } from '../data/baselinePractice.ts';
import { conversations } from '../data/conversations.ts';
import { lessons } from '../data/lessons.ts';
import { pictures } from '../data/pictures.ts';
import { vocabulary } from '../data/vocabulary.ts';
import { isLessonLocked } from '../lib/progress.ts';
import type { Language, Question } from '../types/index.ts';
import { displayPap } from './coursePlan.ts';
import { generateLesson, matchKey, questionForPractice } from './lessonGenerator.ts';

/** Exact copies of another entry. The surviving id still teaches the word. Lesson ids are unchanged. */
const RETIRED_DUPLICATES = new Set([
    'pub-3', 'pub-5', 'rout-6', 'sent-plur-1', 'nat-env-5', 'ani-7', 'rout-4', 'hous-rm-3', 'pro-7',
    'pub-4', 'soc-gen-3', 'soc-gen-1', 'hous-rm-1', 'sent-acad-2', 'soc-gen-2', 'trans-4', 'rout-5', 'dir-6', 'pub-1',
]);

const ORIGINAL_IDS = [
    'l1-basics', 'l9-pronouns', 'l1b-sentence-structure', 'l1c-questions',
    'l2-numbers-1-10', 'l3-numbers-20-100', 'l3b-numbers-1000', 'l4-colors',
    'l5-family-close', 'l3-verbs-1', 'l3-verbs-2', 'l3-verbs-3', 'l-family-ext',
    'l-daily-routine', 'l6-emotions', 'l7-food', 'l8-restaurant',
    'l11-weather', 'l12-house', 'l20-nature', 'l-house-inside', 'l-environment',
    'l13-directions', 'l14-places', 'l-travel', 'l-transport', 'l-public-services',
    'l-gram-present', 'l-gram-past', 'l-gram-future', 'l-gram-exam', 'l-gram-plural',
    'l7c-drinks', 'l7d-supermarket', 'l7e-clothing', 'l7-shopping-extra', 'l7-dialogue',
    'l-social-intro', 'l21-health', 'l22-abstract', 'l23-conversation',
    'l9a-business', 'l9b-academic', 'l9c-formal',
];

const BEFORE_PER_UNIT = [4, 4, 9, 5, 5, 5, 6, 3, 3];
const PRODUCTION = new Set(['spelling', 'order', 'cloze']);

function generated(lang: Language = 'en') {
    return lessons.map((lesson) => ({ lesson, questions: generateLesson(lesson, lang).questions }));
}

const english = generated('en');

function idsOf(questions: Question[]): string[] {
    return questions.flatMap((question) => question.sourceIds ?? []);
}

test('the course is longer and every old item is practiced at least as often', () => {
    assert.equal(ORIGINAL_IDS.length, 44);
    assert.ok(lessons.length > 44);
    const counts = new Map<string, number>();
    let exercises = 0;
    for (const { questions } of english) {
        exercises += questions.length;
        for (const id of idsOf(questions)) counts.set(id, (counts.get(id) ?? 0) + 1);
    }
    assert.ok(exercises > 989, `expected more than 989 exercises, got ${exercises}`);
    for (const [id, before] of Object.entries(baselinePractice)) {
        if (RETIRED_DUPLICATES.has(id)) continue;
        assert.ok((counts.get(id) ?? 0) >= before, `${id} dropped from ${before} to ${counts.get(id) ?? 0}`);
    }
    for (const entry of vocabulary) {
        assert.ok((counts.get(entry.id) ?? 0) > 0, `${entry.id} is still unused`);
    }
});

test('lessons stay short, mix exercise types, and introduce a word before they test it', () => {
    const indexes = new Set<number>();
    let sawTrue = false;
    let sawFalse = false;
    let matches = 0;
    for (const { lesson, questions } of english) {
        assert.ok(questions.length >= 8 && questions.length <= 16, `${lesson.id} has ${questions.length} questions`);
        for (let index = 1; index < questions.length; index++) {
            assert.notEqual(questions[index].type, questions[index - 1].type, `${lesson.id} repeats ${questions[index].type}`);
            const sameWord = (questions[index].sourceIds ?? []).some((id) => questions[index - 1].sourceIds?.includes(id));
            const chooseThenType = questions[index - 1].type === 'multiple-choice'
                && questions[index].type === 'spelling'
                && sameWord;
            assert.equal(chooseThenType, false, `${lesson.id} types a word right after choosing it`);
        }
        const seen = new Map<string, number>();
        const tested = new Map<string, number>();
        questions.forEach((question, index) => {
            const produced = PRODUCTION.has(question.type);
            for (const id of question.sourceIds ?? []) {
                if (id.startsWith('conv-')) continue;
                if (!produced && !seen.has(id)) seen.set(id, index);
                if (produced && !tested.has(id)) tested.set(id, index);
            }
            if (question.type === 'multiple-choice' && Array.isArray(question.options)) {
                indexes.add(question.options.indexOf(String(question.correctAnswer)));
            }
            if (question.type === 'true-false') {
                if (question.correctAnswer === 'True') sawTrue = true;
                if (question.correctAnswer === 'False') sawFalse = true;
            }
            if (question.type === 'match') matches += 1;
        });
        for (const [id, at] of tested) {
            assert.ok((seen.get(id) ?? Number.POSITIVE_INFINITY) < at, `${lesson.id} tests ${id} before showing it`);
        }
    }
    assert.ok(indexes.size > 1, 'the correct choice should not always be in the same slot');
    assert.equal(sawTrue && sawFalse, true);
    assert.ok(matches > 0);
});

test('answer options change between lessons and every answer is an existing item', () => {
    for (const { questions } of english) {
        for (const question of questions) {
            const vocabId = question.sourceIds?.find((id) => vocabulary.some((entry) => entry.id === id));
            const entry = vocabulary.find((item) => item.id === vocabId);
            if (question.type === 'multiple-choice' && entry && Array.isArray(question.options)) {
                assert.equal(question.correctAnswer, displayPap(entry));
                assert.ok(question.options.includes(displayPap(entry)));
                assert.ok(question.options.length >= 2);
            }
            if (question.type === 'spelling' && entry) assert.equal(question.correctAnswer, entry.papiamento);
            if (question.type === 'order' && entry) {
                assert.equal(question.correctAnswer, displayPap(entry));
                assert.deepEqual([...(question.options as string[])].sort(), displayPap(entry).split(' ').sort());
            }
            if (question.type === 'cloze' && entry) {
                assert.ok(entry.papiamento.replace(/[{}]/g, '').includes(String(question.correctAnswer)));
                assert.ok((question.options as string[]).includes(String(question.correctAnswer)));
            }
            if (question.type === 'translate' && entry) assert.equal(question.correctAnswer, entry.meanings.en);
            if (question.type === 'match' && question.pairs) {
                assert.equal(question.correctAnswer, matchKey(question.pairs));
                for (const pair of question.pairs) {
                    assert.ok(vocabulary.some((item) => displayPap(item) === pair.left && item.meanings.en === pair.right));
                }
            }
        }
    }
    const tioLessons = english.filter(({ questions }) => questions.some((question) =>
        question.type === 'multiple-choice' && question.sourceId === 'fam-ext-1'));
    assert.ok(tioLessons.length >= 2);
    const optionSets = new Set(tioLessons.map(({ questions }) => {
        const question = questions.find((item) => item.type === 'multiple-choice' && item.sourceId === 'fam-ext-1');
        return [...(question?.options as string[])].sort().join('|');
    }));
    assert.ok(optionSets.size >= 2, 'the same word should not always have the same wrong answers');
});

test('English, Dutch, and Spanish lessons ask for the same practice in each language', () => {
    const dutch = generateLesson(lessons[0], 'nl');
    const spanish = generateLesson(lessons[0], 'es');
    const first = english[0].questions;
    assert.equal(dutch.questions.length, first.length);
    assert.equal(spanish.questions.length, first.length);
    const translated = first.find((question) => question.type === 'translate');
    const dutchTranslated = dutch.questions.find((question) => question.id === translated?.id);
    const spanishTranslated = spanish.questions.find((question) => question.id === translated?.id);
    assert.ok(translated && dutchTranslated && spanishTranslated);
    assert.notEqual(translated.correctAnswer, dutchTranslated.correctAnswer);
    assert.notEqual(translated.prompt, spanishTranslated.prompt);

    const truth = english.flatMap(({ questions }) => questions).find((question) => question.type === 'true-false');
    assert.ok(truth);
    const rebuilt = questionForPractice({ question: truth, sourceId: truth.sourceId }, 'es');
    assert.equal(rebuilt.type, 'true-false');
    assert.ok(rebuilt.correctAnswer === 'Verdadero' || rebuilt.correctAnswer === 'Falso');

    const match = english.flatMap(({ questions }) => questions).find((question) => question.type === 'match');
    assert.ok(match);
    const spanishMatch = questionForPractice({ question: match, sourceId: match.sourceId }, 'es');
    assert.equal(spanishMatch.type, 'match');
    const pair = spanishMatch.pairs?.[0];
    const source = vocabulary.find((entry) => displayPap(entry) === pair?.left);
    assert.equal(pair?.right, source?.meanings.es);
});

test('long lessons were split, copies were replaced, and unused words got a home', () => {
    for (const id of ORIGINAL_IDS) {
        assert.ok(lessons.some((lesson) => lesson.id === id), `${id} no longer exists`);
    }
    for (let unit = 1; unit <= 9; unit++) {
        const count = lessons.filter((lesson) => lesson.unit === unit).length;
        assert.ok(count > BEFORE_PER_UNIT[unit - 1], `unit ${unit} did not grow`);
        assert.ok(lessons.some((lesson) => lesson.unit === unit && lesson.role === 'review'));
    }
    const played = new Map<string, string>();
    for (const { lesson, questions } of english) {
        const signature = questions.map((question) => (
            `${question.type}|${question.prompt}|${question.correctAnswer}|${JSON.stringify(question.options)}`
        )).join('\n');
        assert.equal(played.has(signature), false, `${lesson.id} plays the same as ${played.get(signature)}`);
        played.set(signature, lesson.id);
    }
    const idsFor = (prefix: string) => lessons
        .filter((lesson) => lesson.id === prefix || lesson.id.startsWith(`${prefix}--`))
        .flatMap((lesson) => (lesson.content.type === 'ids' ? lesson.content.ids : []))
        .sort()
        .join('|');
    assert.notEqual(idsFor('l23-conversation'), idsFor('l-social-intro'));
    assert.notEqual(idsFor('l9c-formal'), idsFor('l9a-business'));
    assert.ok(idsFor('l7-prices').includes('shop-5'));
    assert.equal(lessons.find((lesson) => lesson.id === 'l2-numbers-11-20')?.unit, 2);
    assert.equal(lessons.find((lesson) => lesson.id === 'l8-work')?.unit, 8);
    assert.equal(lessons.find((lesson) => lesson.id === 'l23-conversation')?.role, 'review');
    assert.equal(lessons.find((lesson) => lesson.id === 'l9c-formal')?.role, 'review');

    for (const lesson of lessons) {
        const locked = isLessonLocked(lesson.unit, false);
        assert.equal(locked, lesson.unit > 2);
    }
});

test('official Curaçao and Bonaire spellings replace clear errors', () => {
    const pap = (id: string) => vocabulary.find((entry) => entry.id === id)?.papiamento;
    assert.equal(pap('num-1'), 'Unu');
    assert.equal(pap('num-7'), 'Shete');
    assert.equal(pap('num-15'), 'Diessinku');
    assert.equal(pap('food-6'), 'Galiña');
    assert.equal(pap('trav-5'), 'Karchi');
    assert.equal(pap('emo-4'), 'Kansá');
    assert.equal(pap('shop-3'), 'Karu');
    assert.equal(pap('wrk-2'), 'Ofisina');
    assert.equal(pap('food-ing-8'), 'Karni');
    assert.equal(pap('abs-5'), 'Kere');
    assert.equal(pap('num-30'), 'Trinta');
    assert.equal(pap('num-60'), 'Sesenta');
    assert.equal(pap('num-70'), 'Setenta');
    assert.equal(pap('num-500'), 'Sinkushen');
    assert.equal(pap('ani-9'), 'Blenchi');
    assert.equal(pap('hous-rm-9'), 'Frishidèr');
    assert.equal(pap('col-7'), 'Oraño');
    assert.equal(pap('cloth-7'), 'Pèchi');
    assert.equal(pap('ani-5'), 'Turtuga');
    assert.equal(pap('fam-ext-4'), 'Primu');
    assert.equal(pap('pub-2'), 'Pòstkantor');
    assert.equal(pap('sup-1'), 'Garoshi');
    assert.equal(pap('bas-7'), 'Ayó');
    assert.equal(pap('fam-ext-7'), 'Nieto');
    assert.equal(pap('fam-ext-6'), 'Subrino');
    assert.equal(pap('gram-read-fut'), 'Nos {lo} lesa después');
    assert.equal(pap('prep-4'), 'Después');
    assert.ok(!vocabulary.some((entry) => entry.papiamento.toLowerCase().includes('despues')));
    assert.ok(conversations.some((conversation) => conversation.lines.some((line) => line.text.includes('después'))));
    assert.ok(!conversations.some((conversation) => conversation.lines.some((line) => line.text.toLowerCase().includes('despues'))));
    assert.equal(pap('trans-7'), 'Wil');
    assert.ok(!vocabulary.some((entry) => entry.papiamento.toLowerCase().includes('flamingo')));
    assert.ok(!vocabulary.some((entry) => entry.papiamento.toLowerCase().includes('siete')));
    assert.ok(!vocabulary.some((entry) => entry.papiamento.toLowerCase().includes('tike')));
});

test('picture exercises use the corrected words and appear in every unit', () => {
    assert.ok(Object.keys(pictures).length >= 120, `only ${Object.keys(pictures).length} pictures`);
    const seen = new Map<number, Set<string>>();
    let tap = 0;
    let fromPicture = 0;
    for (const { lesson, questions } of english) {
        const types = seen.get(lesson.unit) ?? new Set<string>();
        for (const question of questions) {
            if (question.type === 'tap-picture') {
                tap += 1;
                types.add(question.type);
                assert.equal(question.pictures?.length, 4);
                assert.ok(question.pictures?.some((tile) => tile.src === question.correctAnswer));
            }
            if (question.type === 'picture-word') {
                fromPicture += 1;
                types.add(question.type);
                assert.ok(question.image);
            }
            if (question.type === 'true-false' && question.sourceId && pictures[question.sourceId]) {
                assert.equal(question.image, pictures[question.sourceId].src);
                assert.equal(question.emoji, undefined);
            }
        }
        seen.set(lesson.unit, types);
    }
    for (let unit = 1; unit <= 9; unit++) {
        assert.ok((seen.get(unit)?.size ?? 0) > 0, `unit ${unit} has no picture exercise`);
    }
    assert.ok(tap > 0 && fromPicture > 0);
});
