import React, { useState } from 'react';
import { dictionary } from '../data/dictionary';
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';

export const Dictionary: React.FC = () => {
    const { language } = useStore();
    const [searchTerm, setSearchTerm] = useState('');

    const filtered = dictionary.filter(entry =>
        entry.papiamento.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (language && entry.meanings[language].toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-sand">
            {/* Header */}
            <div className="bg-white p-4 shadow-sm sticky top-0 z-10 flex items-center gap-4">
                <Link to="/dashboard" className="p-2 hover:bg-gray-100 rounded-full">
                    <ArrowLeft className="text-gray-600" />
                </Link>
                <h1 className="text-xl font-bold">Dictionary</h1>
            </div>

            <div className="p-4 max-w-md mx-auto">
                <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search Papiamento or native..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                    />
                </div>

                <div className="space-y-3">
                    {filtered.map(entry => (
                        <div key={entry.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-lg text-primary">{entry.papiamento}</h3>
                                {entry.partOfSpeech && (
                                    <span className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full capitalize">
                                        {entry.partOfSpeech}
                                    </span>
                                )}
                            </div>
                            <div className="text-gray-600 text-right">
                                <p>{language ? entry.meanings[language] : entry.meanings.en}</p>
                            </div>
                        </div>
                    ))}
                    {filtered.length === 0 && (
                        <div className="text-center text-gray-400 mt-10">
                            No words found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
