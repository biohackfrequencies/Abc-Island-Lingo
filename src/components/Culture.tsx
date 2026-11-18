import React from 'react';
import { Info, MessageCircle, Music, Trees, Utensils } from 'lucide-react';
import { cultureCopy, type CultureCopy } from '../i18n/culture';
import { messages } from '../i18n/messages';
import { useStore } from '../store/useStore';

const icons: Record<CultureCopy['insights'][number]['icon'], React.ReactNode> = {
    music: <Music size={20} />,
    food: <Utensils size={20} />,
    nature: <Trees size={20} />,
    language: <MessageCircle size={20} />,
};

const iconTone: Record<CultureCopy['insights'][number]['icon'], string> = {
    music: 'bg-purple-500/20 text-purple-400',
    food: 'bg-orange-500/20 text-orange-400',
    nature: 'bg-green-500/20 text-green-400',
    language: 'bg-blue-500/20 text-blue-400',
};

export const Culture: React.FC = () => {
    const language = useStore((state) => state.language) ?? 'en';
    const copy = messages[language];
    const content = cultureCopy[language];

    return (
        <div className="min-h-screen bg-bg-main pb-28 text-white">
            <div className="p-6 pb-2">
                <h1 className="text-3xl font-extrabold text-white">{copy.cultureEyebrow}</h1>
                <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-green">{copy.cultureTitle}</h2>
            </div>

            <div className="mt-6">
                <h3 className="px-6 text-xl font-bold mb-4">{copy.theIslands}</h3>
                <div className="flex gap-4 overflow-x-auto px-6 pb-4 snap-x snap-mandatory">
                    {content.islands.map((island) => (
                        <div key={island.name} className="snap-center shrink-0 w-[85vw] md:w-80 bg-slate-800 rounded-3xl overflow-hidden shadow-lg border border-slate-700">
                            <div className="h-48 overflow-hidden relative">
                                <img src={island.image} alt={island.name} className="w-full h-full object-cover" />
                                <div className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full shadow-md ${island.badgeClass}`}>
                                    {island.name}
                                </div>
                            </div>
                            <div className="p-5">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{island.tagline}</p>
                                <p className="text-sm text-gray-200 mb-4">{island.body}</p>
                                <div className="flex flex-wrap gap-2">
                                    {island.tags.map((tag) => (
                                        <span key={tag} className="text-xs bg-slate-700 text-brand-teal px-2 py-1 rounded-md">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="px-6 mt-8">
                <h3 className="text-xl font-bold mb-4">{copy.insights}</h3>
                <div className="space-y-4">
                    {content.insights.map((insight) => (
                        <div key={insight.title} className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700/50">
                            <div className="flex items-center gap-3 mb-3">
                                <div className={`p-2 rounded-full ${iconTone[insight.icon]}`}>{icons[insight.icon]}</div>
                                <h4 className="text-lg font-bold">{insight.title}</h4>
                            </div>
                            <p className="text-sm text-gray-300 leading-relaxed">{insight.body}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="px-6 mt-8">
                <h3 className="text-xl font-bold mb-4">{copy.factsTitle}</h3>
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-6 shadow-lg text-white">
                    <div className="space-y-6">
                        {content.facts.map((fact) => (
                            <div key={fact.place} className="flex gap-4">
                                <div className="mt-1"><Info size={20} className="text-yellow-400" /></div>
                                <div>
                                    <p className="text-xs font-bold text-blue-200 uppercase mb-1">{fact.place}</p>
                                    <p className="text-sm font-medium">{fact.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="px-6 mt-8">
                <h3 className="text-xl font-bold mb-4">{copy.phrasesTitle}</h3>
                <div className="bg-slate-800 rounded-3xl overflow-hidden divide-y divide-slate-700/50 border border-slate-700">
                    {content.phrases.map((phrase) => (
                        <div key={phrase.pap} className="p-4">
                            <h4 className="font-bold text-white text-lg">{phrase.pap}</h4>
                            <p className="text-gray-400 text-sm">{phrase.gloss}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
