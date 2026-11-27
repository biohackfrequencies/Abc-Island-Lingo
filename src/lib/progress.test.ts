import assert from 'node:assert/strict';
import { test } from 'node:test';
import { migratePersistedState } from './progress.ts';

test('a saved course keeps its checkmarks and XP when lessons are split', () => {
    const migrated = migratePersistedState({
        language: 'nl',
        isPremium: true,
        completedLessons: ['l14-places', 'l1-basics', 'l14-places'],
        xp: 30,
        streak: 4,
        lastStudyDate: '2026-11-01',
        displayName: 'Anna',
        mistakes: [{ nope: true }, {
            key: 'l1-basics:q',
            lessonId: 'l1-basics',
            questionId: 'q',
            question: { id: 'q', type: 'spelling', prompt: 'Type', correctAnswer: 'Danki' },
            language: 'nl',
            missedAt: 10,
        }],
    }, 2);

    assert.deepEqual(migrated.completedLessons, ['l14-places', 'l1-basics']);
    assert.equal(migrated.xp, 30);
    assert.equal(migrated.streak, 4);
    assert.equal(migrated.isPremium, true);
    assert.equal(migrated.language, 'nl');
    assert.equal(migrated.displayName, 'Anna');
    assert.equal(migrated.lastStudyDate, '2026-11-01');
    assert.equal(migrated.mistakes.length, 1);
    assert.equal(migrated.completedLessons.includes('l14-places--2'), false);
});

test('an older save still receives XP for lessons it already finished', () => {
    const migrated = migratePersistedState({
        completedLessons: ['l1-basics'],
        isPremium: false,
    }, 0);
    assert.equal(migrated.xp, 15);
    assert.deepEqual(migrated.completedLessons, ['l1-basics']);
    assert.equal(migrated.displayName, 'Learner');
});
