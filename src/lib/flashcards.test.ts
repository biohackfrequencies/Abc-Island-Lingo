import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { test } from 'node:test';
import { pictures } from '../data/pictures.ts';
import { gradeCard, readFlashcards, requeue, sessionQueue } from './flashcardBoxes.ts';
import { buildDecks, cardIsLocked, earliestUnit } from './flashcards.ts';
import { migratePersistedState } from './progress.ts';

const DAY = 24 * 60 * 60 * 1000;

test('a miss returns to box 1 and a known card waits longer', () => {
    const now = 1_700_000_000_000;
    const missed = gradeCard({ box: 3, dueAt: now }, false, now);
    assert.equal(missed.box, 1);
    assert.equal(missed.dueAt, now);

    const first = gradeCard(undefined, true, now);
    assert.equal(first.box, 1);
    assert.equal(first.dueAt, now + DAY);

    const second = gradeCard(first, true, now);
    assert.equal(second.box, 2);
    assert.equal(second.dueAt, now + 3 * DAY);

    const queue = sessionQueue(['a', 'b', 'c'], { b: missed, c: second }, now);
    assert.deepEqual(queue[0], 'b');
    const again = requeue(queue.slice(1), 'b', 2);
    assert.ok(again.includes('b'));
    assert.notEqual(again[0], 'b');
});

test('saved lessons survive when flashcard boxes are added', () => {
    const migrated = migratePersistedState({
        language: 'en',
        isPremium: false,
        completedLessons: ['l1-basics'],
        xp: 15,
        streak: 2,
        lastStudyDate: '2026-11-20',
        displayName: 'Anna',
        mistakes: [],
        flashcards: {
            'ani-9': { box: 2, dueAt: 50 },
            bad: { box: 9, dueAt: 1 },
        },
    }, 3);
    assert.equal(migrated.xp, 15);
    assert.deepEqual(migrated.completedLessons, ['l1-basics']);
    assert.equal(migrated.displayName, 'Anna');
    assert.deepEqual(migrated.flashcards['ani-9'], { box: 2, dueAt: 50 });
    assert.equal(migrated.flashcards.bad, undefined);
    assert.deepEqual(readFlashcards(null), {});
});

test('flashcard decks follow the same free units as lessons', () => {
    const free = buildDecks(false, []);
    const unit1 = free.find((deck) => deck.id === 'unit-1');
    const unit3 = free.find((deck) => deck.id === 'unit-3');
    assert.ok(unit1 && unit1.cardIds.length > 0 && unit1.locked === false);
    assert.ok(unit3 && unit3.locked === true);
    assert.equal(cardIsLocked(unit1.cardIds[0], false), false);
    const unit3Only = unit3.cardIds.find((id) => earliestUnit(id) === 3);
    assert.ok(unit3Only);
    assert.equal(cardIsLocked(unit3Only, false), true);

    const premium = buildDecks(true, []);
    assert.equal(premium.find((deck) => deck.id === 'unit-3')?.locked, false);

    const withMistake = buildDecks(false, [{
        key: 'lesson:q',
        lessonId: 'l1-basics',
        questionId: 'q',
        sourceId: unit1.cardIds[0],
        question: { id: 'q', type: 'true-false', prompt: '?', correctAnswer: 'yes' },
        language: 'en',
        missedAt: 1,
    }]);
    const mistakes = withMistake.find((deck) => deck.id === 'mistakes');
    assert.deepEqual(mistakes?.cardIds, [unit1.cardIds[0]]);
    assert.equal(mistakes?.locked, false);
});

test('every referenced picture file is the new owned artwork', () => {
    assert.equal(pictures['rout-4'], undefined);
    assert.ok(Object.keys(pictures).length >= 120);
    for (const picture of Object.values(pictures)) {
        assert.equal(picture.licence.includes('CC0'), false);
        assert.equal(picture.author, 'Heartbeat Frequencies LLC');
        assert.equal(existsSync(`public${picture.src}`), true);
    }
});
