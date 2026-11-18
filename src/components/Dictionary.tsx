import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { dictionary } from '../data/dictionary';
import { formatWordCount, messages, type MessageKey } from '../i18n/messages';
import { useStore } from '../store/useStore';
import type { DictionaryEntry } from '../types';

const posKey: Record<DictionaryEntry['partOfSpeech'], MessageKey> = {
    noun: 'posNoun',
    verb: 'posVerb',
    adjective: 'posAdjective',
    phrase: 'posPhrase',
    other: 'posOther',
};

function fold(value: string): string {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

export const Dictionary: React.FC = () => {
    const language = useStore((state) => state.language) ?? 'en';
    const copy = messages[language];
    const [searchTerm, setSearchTerm] = useState('');
    const query = fold(searchTerm.trim());

    const filtered = useMemo(() => {
        if (!query) return dictionary;
        return dictionary.filter((entry) =>
            fold(entry.papiamento).includes(query) || fold(entry.meanings[language]).includes(query)
        );
    }, [language, query]);

    return (
        <div className="min-h-screen bg-slate-900 text-white pb-28">
            <div className="bg-slate-900/95 p-4 sticky top-0 z-10 border-b border-slate-800">
                <h1 className="text-xl font-bold mb-3">{copy.dictionaryTitle}</h1>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder={copy.dictionarySearch}
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-teal text-white placeholder:text-slate-500"
                    />
                </div>
                <p className="text-xs text-gray-400 mt-2" data-testid="dictionary-count">{formatWordCount(filtered.length, language)}</p>
            </div>

            <div className="p-4 max-w-lg mx-auto space-y-3">
                {filtered.map((entry) => (
                    <div key={entry.id} className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                        <div className="flex justify-between items-start gap-3">
                            <h3 className="font-bold text-lg text-brand-teal">{entry.papiamento}</h3>
                            <span className="text-xs bg-teal-950 text-brand-teal px-2 py-0.5 rounded-full shrink-0">
                                {copy[posKey[entry.partOfSpeech]]}
                            </span>
                        </div>
                        <p className="text-gray-200 mt-1">{entry.meanings[language]}</p>
                    </div>
                ))}
                {filtered.length === 0 && (
                    <div className="text-center text-gray-400 mt-10">{copy.dictionaryEmpty}</div>
                )}
            </div>
        </div>
    );
};
