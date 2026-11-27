import type { Language } from '../types';

export interface CultureCopy {
    islands: { name: string; tagline: string; body: string; tags: [string, string]; image: string; badgeClass: string }[];
    insights: { icon: 'music' | 'food' | 'nature' | 'language'; title: string; body: string }[];
    facts: { place: string; body: string }[];
    phrases: { pap: string; gloss: string }[];
}

const en: CultureCopy = {
    islands: [
        {
            name: 'Aruba',
            tagline: 'One Happy Island',
            body: 'Famous for pristine beaches and bent divi-divi trees.',
            tags: ['Eagle Beach', 'Divi-divi trees'],
            image: '/assets/aruba.png',
            badgeClass: 'bg-orange-500 text-white',
        },
        {
            name: 'Bonaire',
            tagline: "Diver's paradise",
            body: 'World-class diving and flamingo sanctuaries.',
            tags: ['Marine park', 'Salt flats'],
            image: '/assets/bonaire.png',
            badgeClass: 'bg-blue-500 text-white',
        },
        {
            name: 'Curaçao',
            tagline: 'Colorful history',
            body: 'A UNESCO World Heritage capital and hidden coves.',
            tags: ['Willemstad', 'Beaches'],
            image: '/assets/curacao.png',
            badgeClass: 'bg-yellow-500 text-black',
        },
    ],
    insights: [
        {
            icon: 'music',
            title: 'Music & dance',
            body: 'Tumba is the heartbeat of Curaçao, a rhythmic genre that takes center stage during Carnival. The music blends African rhythms with Latin influences.',
        },
        {
            icon: 'food',
            title: 'Local cuisine',
            body: 'Try keshi yena (stuffed cheese), funchi (cornmeal), and fresh seafood. The food reflects Dutch, Spanish, and African roots.',
        },
        {
            icon: 'nature',
            title: 'Island nature',
            body: 'From Aruba’s bent divi-divi trees to Bonaire’s flamingos and Curaçao’s rugged coast, the ABC islands have a nature of their own.',
        },
        {
            icon: 'language',
            title: 'Papiamento',
            body: 'Papiamento is a creole language of the ABC islands. It blends Portuguese, Spanish, Dutch, English, French, and African languages.',
        },
    ],
    facts: [
        { place: 'Aruba', body: 'Known as “One Happy Island,” Aruba has more than 300 sunny days a year.' },
        { place: 'Bonaire', body: 'Bonaire is a diver’s paradise. The whole coastline is a marine park.' },
        { place: 'Curaçao', body: 'Willemstad’s colorful buildings are a UNESCO World Heritage Site.' },
        { place: 'ABC islands', body: 'Papiamento blends Portuguese, Spanish, Dutch, and African languages.' },
    ],
    phrases: [
        { pap: 'Dushi', gloss: 'Sweet, dear, nice — a favorite word.' },
        { pap: 'Mi ta stima bo', gloss: 'I love you' },
        { pap: 'Kon ta bai?', gloss: 'How are you?' },
        { pap: 'Mi ta bon', gloss: 'I am fine' },
        { pap: 'Masha danki', gloss: 'Thank you very much' },
    ],
};

const nl: CultureCopy = {
    islands: [
        {
            name: 'Aruba',
            tagline: 'One Happy Island',
            body: 'Bekend om stranden en kromme divi-divibomen.',
            tags: ['Eagle Beach', 'Divi-divibomen'],
            image: '/assets/aruba.png',
            badgeClass: 'bg-orange-500 text-white',
        },
        {
            name: 'Bonaire',
            tagline: 'Duikersparadijs',
            body: 'Duiken van wereldklasse en flamingo’s.',
            tags: ['Marien park', 'Zoutpannen'],
            image: '/assets/bonaire.png',
            badgeClass: 'bg-blue-500 text-white',
        },
        {
            name: 'Curaçao',
            tagline: 'Kleurrijke geschiedenis',
            body: 'Een UNESCO-hoofdstad en verborgen baaien.',
            tags: ['Willemstad', 'Stranden'],
            image: '/assets/curacao.png',
            badgeClass: 'bg-yellow-500 text-black',
        },
    ],
    insights: [
        {
            icon: 'music',
            title: 'Muziek en dans',
            body: 'Tumba is de hartslag van Curaçao, een ritmisch genre dat tijdens carnaval centraal staat. De muziek mengt Afrikaanse ritmes met Latijnse invloeden.',
        },
        {
            icon: 'food',
            title: 'Lokale keuken',
            body: 'Proef keshi yena (gevulde kaas), funchi (maïsmeel) en verse vis. Het eten laat Nederlandse, Spaanse en Afrikaanse wortels zien.',
        },
        {
            icon: 'nature',
            title: 'Eilandnatuur',
            body: 'Van de kromme divi-divibomen op Aruba tot de flamingo’s van Bonaire en de ruige kust van Curaçao: de ABC-eilanden hebben een eigen natuur.',
        },
        {
            icon: 'language',
            title: 'Papiaments',
            body: 'Papiaments is een creoolse taal van de ABC-eilanden. Het mengt Portugees, Spaans, Nederlands, Engels, Frans en Afrikaanse talen.',
        },
    ],
    facts: [
        { place: 'Aruba', body: 'Aruba heet “One Happy Island” en heeft meer dan 300 zonnige dagen per jaar.' },
        { place: 'Bonaire', body: 'Bonaire is een duikersparadijs: de hele kust is een marien park.' },
        { place: 'Curaçao', body: 'De gekleurde huizen van Willemstad zijn UNESCO-werelderfgoed.' },
        { place: 'ABC-eilanden', body: 'Papiaments mengt Portugees, Spaans, Nederlands en Afrikaanse talen.' },
    ],
    phrases: [
        { pap: 'Dushi', gloss: 'Lekker, lief, fijn — een geliefd woord.' },
        { pap: 'Mi ta stima bo', gloss: 'Ik hou van je' },
        { pap: 'Kon ta bai?', gloss: 'Hoe gaat het?' },
        { pap: 'Mi ta bon', gloss: 'Met mij gaat het goed' },
        { pap: 'Masha danki', gloss: 'Heel erg bedankt' },
    ],
};

const es: CultureCopy = {
    islands: [
        {
            name: 'Aruba',
            tagline: 'One Happy Island',
            body: 'Famosa por sus playas y los árboles divi-divi inclinados.',
            tags: ['Eagle Beach', 'Árboles divi-divi'],
            image: '/assets/aruba.png',
            badgeClass: 'bg-orange-500 text-white',
        },
        {
            name: 'Bonaire',
            tagline: 'Paraíso del buceo',
            body: 'Buceo de primer nivel y santuarios de flamencos.',
            tags: ['Parque marino', 'Salinas'],
            image: '/assets/bonaire.png',
            badgeClass: 'bg-blue-500 text-white',
        },
        {
            name: 'Curaçao',
            tagline: 'Historia de colores',
            body: 'Una capital Patrimonio de la UNESCO y calas escondidas.',
            tags: ['Willemstad', 'Playas'],
            image: '/assets/curacao.png',
            badgeClass: 'bg-yellow-500 text-black',
        },
    ],
    insights: [
        {
            icon: 'music',
            title: 'Música y baile',
            body: 'La tumba es el latido de Curaçao, un género rítmico que ocupa el centro del carnaval. La música mezcla ritmos africanos con influencias latinas.',
        },
        {
            icon: 'food',
            title: 'Cocina local',
            body: 'Prueba keshi yena (queso relleno), funchi (harina de maíz) y pescado fresco. La comida refleja raíces neerlandesas, españolas y africanas.',
        },
        {
            icon: 'nature',
            title: 'Naturaleza isleña',
            body: 'Desde los divi-divi inclinados de Aruba hasta los flamencos de Bonaire y la costa agreste de Curaçao, las islas ABC tienen una naturaleza propia.',
        },
        {
            icon: 'language',
            title: 'El papiamento',
            body: 'El papiamento es una lengua criolla de las islas ABC. Mezcla portugués, español, neerlandés, inglés, francés y lenguas africanas.',
        },
    ],
    facts: [
        { place: 'Aruba', body: 'Aruba, “One Happy Island”, tiene más de 300 días de sol al año.' },
        { place: 'Bonaire', body: 'Bonaire es un paraíso del buceo: toda la costa es un parque marino.' },
        { place: 'Curaçao', body: 'Las casas de colores de Willemstad son Patrimonio de la Humanidad de la UNESCO.' },
        { place: 'Islas ABC', body: 'El papiamento mezcla portugués, español, neerlandés y lenguas africanas.' },
    ],
    phrases: [
        { pap: 'Dushi', gloss: 'Dulce, querido, rico: una palabra muy usada.' },
        { pap: 'Mi ta stima bo', gloss: 'Te quiero' },
        { pap: 'Kon ta bai?', gloss: '¿Cómo estás?' },
        { pap: 'Mi ta bon', gloss: 'Estoy bien' },
        { pap: 'Masha danki', gloss: 'Muchas gracias' },
    ],
};

export const cultureCopy: Record<Language, CultureCopy> = { en, nl, es };
