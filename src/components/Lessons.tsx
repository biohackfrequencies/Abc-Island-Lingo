import React from 'react';
import { messages } from '../i18n/messages';
import { useStore } from '../store/useStore';
import { LessonCatalog } from './LessonCatalog';

export const Lessons: React.FC = () => {
    const language = useStore((state) => state.language);
    const copy = messages[language ?? 'en'];

    if (!language) return <div className="p-6 text-white">{copy.notSelected}</div>;

    return (
        <div className="min-h-screen bg-bg-main pb-28 text-white">
            <header className="p-6 pb-2">
                <h1 className="text-3xl font-extrabold">{copy.lessonsTitle}</h1>
                <p className="text-gray-400 mt-1">{copy.lessonsSubtitle}</p>
            </header>
            <div className="px-6 pb-6">
                <LessonCatalog />
            </div>
        </div>
    );
};
