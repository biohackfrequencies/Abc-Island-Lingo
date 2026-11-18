import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Globe, Home, Library, User } from 'lucide-react';
import { messages, type MessageKey } from '../i18n/messages';
import { useStore } from '../store/useStore';

const items: { to: string; icon: React.ReactNode; key: MessageKey }[] = [
    { to: '/dashboard', icon: <Home size={22} />, key: 'navHome' },
    { to: '/lessons', icon: <BookOpen size={22} />, key: 'navLessons' },
    { to: '/dictionary', icon: <Library size={22} />, key: 'navDictionary' },
    { to: '/culture', icon: <Globe size={22} />, key: 'navCulture' },
    { to: '/profile', icon: <User size={22} />, key: 'navProfile' },
];

export const BottomNav: React.FC = () => {
    const language = useStore((state) => state.language) ?? 'en';
    const copy = messages[language];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 pb-safe pt-2 px-2 flex justify-between items-start z-50 h-20">
            {items.map((item) => (
                <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) => `nav-item flex-1 text-[10px] leading-tight text-center ${isActive ? 'active' : ''}`}
                >
                    {item.icon}
                    <span>{copy[item.key]}</span>
                </NavLink>
            ))}
        </nav>
    );
};
