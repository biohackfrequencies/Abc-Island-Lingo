import React from 'react';
import { Music, Utensils, Trees, MessageCircle, Info } from 'lucide-react';

export const Culture: React.FC = () => {
    return (
        <div className="min-h-screen bg-bg-main pb-24 text-white">
            {/* Header */}
            <div className="p-6 pb-2">
                <h1 className="text-3xl font-extrabold text-white">ABC Islands</h1>
                <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-green">Culture</h2>
            </div>

            {/* The Islands - Horizontal Scroll */}
            <div className="mt-6">
                <h3 className="px-6 text-xl font-bold mb-4">The Islands</h3>
                <div className="flex gap-4 overflow-x-auto px-6 pb-4 snap-x snap-mandatory hide-scrollbar">

                    {/* Aruba Card */}
                    <div className="snap-center shrink-0 w-[85vw] md:w-80 bg-slate-800 rounded-3xl overflow-hidden shadow-lg border border-slate-700">
                        <div className="h-48 overflow-hidden relative">
                            <img src="/assets/aruba.png" alt="Aruba" className="w-full h-full object-cover" />
                            <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                Aruba
                            </div>
                        </div>
                        <div className="p-5">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">One Happy Island</p>
                            <p className="text-sm text-gray-200 mb-4">
                                Famous for pristine beaches and bent divi-divi trees.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="text-xs bg-slate-700 text-brand-teal px-2 py-1 rounded-md">Eagle Beach</span>
                                <span className="text-xs bg-slate-700 text-brand-teal px-2 py-1 rounded-md">Divi-Divi Trees</span>
                            </div>
                        </div>
                    </div>

                    {/* Bonaire Card */}
                    <div className="snap-center shrink-0 w-[85vw] md:w-80 bg-slate-800 rounded-3xl overflow-hidden shadow-lg border border-slate-700">
                        <div className="h-48 overflow-hidden relative">
                            <img src="/assets/bonaire.png" alt="Bonaire" className="w-full h-full object-cover" />
                            <div className="absolute top-4 left-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                Bonaire
                            </div>
                        </div>
                        <div className="p-5">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Diver's Paradise</p>
                            <p className="text-sm text-gray-200 mb-4">
                                World-class diving and flamingo sanctuaries.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="text-xs bg-slate-700 text-brand-teal px-2 py-1 rounded-md">Marine Park</span>
                                <span className="text-xs bg-slate-700 text-brand-teal px-2 py-1 rounded-md">Salt Flats</span>
                            </div>
                        </div>
                    </div>

                    {/* Curaçao Card */}
                    <div className="snap-center shrink-0 w-[85vw] md:w-80 bg-slate-800 rounded-3xl overflow-hidden shadow-lg border border-slate-700">
                        <div className="h-48 overflow-hidden relative">
                            <img src="/assets/curacao.png" alt="Curaçao" className="w-full h-full object-cover" />
                            <div className="absolute top-4 left-4 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                Curaçao
                            </div>
                        </div>
                        <div className="p-5">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Colorful History</p>
                            <p className="text-sm text-gray-200 mb-4">
                                UNESCO World Heritage capital and hidden coves.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="text-xs bg-slate-700 text-brand-teal px-2 py-1 rounded-md">Willemstad</span>
                                <span className="text-xs bg-slate-700 text-brand-teal px-2 py-1 rounded-md">Beaches</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Cultural Insights */}
            <div className="px-6 mt-8">
                <h3 className="text-xl font-bold mb-4">Cultural Insights</h3>
                <div className="space-y-4">

                    <div className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700/50 backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-purple-500/20 rounded-full text-purple-400">
                                <Music size={20} />
                            </div>
                            <h4 className="text-lg font-bold">Music & Dance</h4>
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed">
                            Tumba is the heartbeat of Curaçao, a rhythmic genre that takes center stage during Carnival. The music blends African rhythms with Latin influences, creating an irresistible urge to dance.
                        </p>
                    </div>

                    <div className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700/50 backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-orange-500/20 rounded-full text-orange-400">
                                <Utensils size={20} />
                            </div>
                            <h4 className="text-lg font-bold">Local Cuisine</h4>
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed">
                            Try Keshi Yena (stuffed cheese), Funchi (cornmeal), and fresh seafood. The cuisine reflects the islands' diverse heritage with Dutch, Spanish, and African influences.
                        </p>
                    </div>

                    <div className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700/50 backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-green-500/20 rounded-full text-green-400">
                                <Trees size={20} />
                            </div>
                            <h4 className="text-lg font-bold">Island Nature</h4>
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed">
                            From the famous bent divi-divi trees of Aruba to Bonaire's flamingo colonies and Curaçao's rugged coastline, the ABC islands offer unique natural wonders.
                        </p>
                    </div>

                    <div className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700/50 backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-blue-500/20 rounded-full text-blue-400">
                                <MessageCircle size={20} />
                            </div>
                            <h4 className="text-lg font-bold">Papiamento</h4>
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed">
                            Papiamento is a Creole language unique to the ABC islands. It beautifully blends Portuguese, Spanish, Dutch, English, French, and various African languages.
                        </p>
                    </div>

                </div>
            </div>

            {/* Did You Know? */}
            <div className="px-6 mt-8">
                <h3 className="text-xl font-bold mb-4">Did You Know?</h3>
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-6 shadow-lg text-white">
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="mt-1"><Info size={20} className="text-yellow-400" /></div>
                            <div>
                                <p className="text-xs font-bold text-blue-200 uppercase mb-1">Aruba</p>
                                <p className="text-sm font-medium">Known as "One Happy Island," Aruba has 300+ sunny days per year.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="mt-1"><Info size={20} className="text-yellow-400" /></div>
                            <div>
                                <p className="text-xs font-bold text-blue-200 uppercase mb-1">Bonaire</p>
                                <p className="text-sm font-medium">Bonaire is a diver's paradise - the entire coastline is a marine park.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="mt-1"><Info size={20} className="text-yellow-400" /></div>
                            <div>
                                <p className="text-xs font-bold text-blue-200 uppercase mb-1">Curaçao</p>
                                <p className="text-sm font-medium">Willemstad's colorful buildings are a UNESCO World Heritage Site.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="mt-1"><Info size={20} className="text-yellow-400" /></div>
                            <div>
                                <p className="text-xs font-bold text-blue-200 uppercase mb-1">ABC Islands</p>
                                <p className="text-sm font-medium">Papiamento blends Portuguese, Spanish, Dutch, and African languages.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Essential Phrases */}
            <div className="px-6 mt-8">
                <h3 className="text-xl font-bold mb-4">Essential Phrases</h3>
                <div className="bg-slate-800 rounded-3xl overflow-hidden divide-y divide-slate-700/50 border border-slate-700">
                    <div className="p-4 hover:bg-slate-700/50 transition-colors">
                        <h4 className="font-bold text-white text-lg">Dushi</h4>
                        <p className="text-gray-400 text-sm">Sweet, dear, nice - the most popular word!</p>
                    </div>
                    <div className="p-4 hover:bg-slate-700/50 transition-colors">
                        <h4 className="font-bold text-white text-lg">Mi ta stima bo</h4>
                        <p className="text-gray-400 text-sm">I love you</p>
                    </div>
                    <div className="p-4 hover:bg-slate-700/50 transition-colors">
                        <h4 className="font-bold text-white text-lg">Kon ta bai?</h4>
                        <p className="text-gray-400 text-sm">How are you?</p>
                    </div>
                    <div className="p-4 hover:bg-slate-700/50 transition-colors">
                        <h4 className="font-bold text-white text-lg">Mi ta bon</h4>
                        <p className="text-gray-400 text-sm">I'm fine</p>
                    </div>
                    <div className="p-4 hover:bg-slate-700/50 transition-colors">
                        <h4 className="font-bold text-white text-lg">Masha danki</h4>
                        <p className="text-gray-400 text-sm">Thank you very much</p>
                    </div>
                </div>
            </div>

        </div>
    );
};
