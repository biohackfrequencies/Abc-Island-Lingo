import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type Language } from '../types';

interface AppState {
    language: Language | null;
    completedLessons: string[];
    isPremium: boolean;
    setLanguage: (lang: Language) => void;
    setPremium: (status: boolean) => void;
    completeLesson: (lessonId: string) => void;
    resetProgress: () => void;
}

export const useStore = create<AppState>()(
    persist(
        (set) => ({
            language: null, // Null means onboarding not completed
            completedLessons: [],
            isPremium: false,
            setLanguage: (lang) => set({ language: lang }),
            setPremium: (status) => set({ isPremium: status }),
            completeLesson: (id) => set((state) => ({
                completedLessons: [...state.completedLessons, id]
            })),
            resetProgress: () => set({ language: null, completedLessons: [], isPremium: false }),
        }),
        {
            name: 'papiamento-storage',
        }
    )
);
