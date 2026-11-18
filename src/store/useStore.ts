import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { lessons } from '../data/lessons';
import type { Language } from '../types';
import {
    applyLessonCompletion,
    defaultDisplayName,
    isDefaultDisplayName,
    isLessonLocked,
    localDateString,
    XP_PER_LESSON,
    type ProgressSnapshot,
} from '../lib/progress';

interface AppState extends ProgressSnapshot {
    language: Language | null;
    isPremium: boolean;
    displayName: string;
    setLanguage: (lang: Language) => void;
    setPremium: (status: boolean) => void;
    setDisplayName: (name: string) => void;
    completeLesson: (lessonId: string) => void;
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
            completeLesson: (id) => set((state) => {
                const config = lessons.find((lesson) => lesson.id === id);
                const locked = !config || isLessonLocked(config.unit, state.isPremium);
                return applyLessonCompletion(state, id, locked, localDateString());
            }),
            resetProgress: () => set((state) => ({
                language: null,
                isPremium: state.isPremium,
                ...emptyProgress,
            })),
        }),
        {
            name: 'papiamento-storage',
            version: 1,
            migrate: (persisted, version) => {
                const raw = (persisted ?? {}) as Partial<AppState>;
                const completed = Array.from(new Set(raw.completedLessons ?? []));
                if (version >= 1 && typeof raw.xp === 'number' && raw.displayName) {
                    return {
                        ...raw,
                        completedLessons: completed,
                    } as AppState;
                }
                return {
                    language: raw.language ?? null,
                    isPremium: Boolean(raw.isPremium),
                    completedLessons: completed,
                    xp: typeof raw.xp === 'number' ? raw.xp : completed.length * XP_PER_LESSON,
                    streak: typeof raw.streak === 'number' ? raw.streak : 0,
                    lastStudyDate: raw.lastStudyDate ?? null,
                    displayName: raw.displayName?.trim() || 'Learner',
                } as AppState;
            },
        }
    )
);
