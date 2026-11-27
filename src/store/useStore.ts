import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getRemoteLesson } from '../content/remote';
import { lessons } from '../data/lessons';
import type { Language } from '../types';
import { removeMistake, upsertMistake, type NewMistake, type StoredMistake } from '../lib/mistakes';
import {
    applyLessonCompletion,
    defaultDisplayName,
    isDefaultDisplayName,
    isLessonLocked,
    localDateString,
    migratePersistedState,
    type ProgressSnapshot,
} from '../lib/progress';

interface AppState extends ProgressSnapshot {
    language: Language | null;
    isPremium: boolean;
    displayName: string;
    mistakes: StoredMistake[];
    setLanguage: (lang: Language) => void;
    setPremium: (status: boolean) => void;
    setDisplayName: (name: string) => void;
    completeLesson: (lessonId: string) => void;
    recordMistake: (item: NewMistake) => void;
    clearMistake: (key: string) => void;
    resetProgress: () => void;
}

const emptyProgress = {
    completedLessons: [] as string[],
    xp: 0,
    streak: 0,
    lastStudyDate: null as string | null,
    displayName: 'Learner',
};

export const useStore = create<AppState>()(
    persist(
        (set, get) => ({
            language: null,
            isPremium: false,
            mistakes: [],
            ...emptyProgress,
            setLanguage: (lang) => set((state) => ({
                language: lang,
                displayName: isDefaultDisplayName(state.displayName) ? defaultDisplayName(lang) : state.displayName,
            })),
            setPremium: (status) => set({ isPremium: status }),
            setDisplayName: (name) => {
                const trimmed = name.trim();
                set({ displayName: trimmed || defaultDisplayName(get().language) });
            },
            recordMistake: (item) => set((state) => ({
                mistakes: upsertMistake(state.mistakes ?? [], { ...item, missedAt: Date.now() }),
            })),
            clearMistake: (key) => set((state) => ({ mistakes: removeMistake(state.mistakes ?? [], key) })),
            completeLesson: (id) => set((state) => {
                const config = lessons.find((lesson) => lesson.id === id);
                if (config) {
                    return applyLessonCompletion(state, id, isLessonLocked(config.unit, state.isPremium), localDateString());
                }
                const remote = getRemoteLesson(id);
                if (!remote) return state;
                return applyLessonCompletion(state, id, remote.premium && !state.isPremium, localDateString());
            }),
            resetProgress: () => set((state) => ({
                language: null,
                isPremium: state.isPremium,
                mistakes: [],
                ...emptyProgress,
            })),
        }),
        {
            name: 'papiamento-storage',
            version: 3,
            migrate: (persisted, version) => migratePersistedState(persisted, version) as AppState,
        }
    )
);
