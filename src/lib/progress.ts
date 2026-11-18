import type { Language } from '../types';

export const FREE_UNIT_MAX = 2;
export const XP_PER_LESSON = 15;

const DEFAULT_NAMES = ['Learner', 'Leerling', 'Estudiante'] as const;

export interface ProgressSnapshot {
    completedLessons: string[];
    xp: number;
    streak: number;
    lastStudyDate: string | null;
}

export function isLessonLocked(unit: number, isPremium: boolean): boolean {
    return unit > FREE_UNIT_MAX && !isPremium;
}

export function defaultDisplayName(language: Language | null): string {
    if (language === 'nl') return 'Leerling';
    if (language === 'es') return 'Estudiante';
    return 'Learner';
}

export function isDefaultDisplayName(name: string): boolean {
    return (DEFAULT_NAMES as readonly string[]).includes(name.trim());
}

export function localDateString(date = new Date()): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function shiftDate(isoDate: string, days: number): string {
    const [year, month, day] = isoDate.split('-').map(Number);
    const date = new Date(year, (month || 1) - 1, day || 1);
    date.setDate(date.getDate() + days);
    return localDateString(date);
}

/** Streak still counts on the study day and the day after. A missed day clears it. */
export function effectiveStreak(streak: number, lastStudyDate: string | null, today: string): number {
    if (!lastStudyDate || streak <= 0) return 0;
    if (lastStudyDate === today || lastStudyDate === shiftDate(today, -1)) return streak;
    return 0;
}

export function nextStreak(streak: number, lastStudyDate: string | null, today: string): { streak: number; lastStudyDate: string } {
    if (lastStudyDate === today) {
        return { streak: Math.max(streak, 1), lastStudyDate: today };
    }
    if (lastStudyDate === shiftDate(today, -1)) {
        return { streak: Math.max(streak, 0) + 1, lastStudyDate: today };
    }
    return { streak: 1, lastStudyDate: today };
}

export function applyLessonCompletion(state: ProgressSnapshot, lessonId: string, locked: boolean, today: string): ProgressSnapshot {
    if (locked) return state;
    const study = nextStreak(state.streak, state.lastStudyDate, today);
    const already = state.completedLessons.includes(lessonId);
    return {
        completedLessons: already ? state.completedLessons : [...state.completedLessons, lessonId],
        xp: already ? state.xp : state.xp + XP_PER_LESSON,
        streak: study.streak,
        lastStudyDate: study.lastStudyDate,
    };
}
