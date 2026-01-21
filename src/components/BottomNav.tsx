import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Globe, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 pb-safe pt-2 px-6 flex justify-between items-center z-50 h-20">
            <NavLink
                to="/dashboard"
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
                <Home size={24} />
                <span>Home</span>
            </NavLink>

            <NavLink
                to="/lessons"
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
                <BookOpen size={24} />
                <span>Lessons</span>
            </NavLink>

            <NavLink
                to="/culture"
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
                <Globe size={24} />
                <span>Culture</span>
            </NavLink>

            <NavLink
                to="/profile"
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
                <User size={24} />
                <span>Profile</span>
            </NavLink>
        </nav>
    );
};
