import { type LessonConfig } from '../types';
import { expandCourse } from '../utils/coursePlan';

const lessonBlueprints: LessonConfig[] = [
    // --- UNIT 1: INTRODUCTION ---
    {
        id: 'l1-basics',
        unit: 1,
        category: 'Básiko',
        level: 'A1',
        title: 'Básiko & Saludo',
        topic: 'Basics & Greetings',
        description: { en: 'Master the essentials.', nl: 'Beheers de basis.', es: 'Domina lo básico.' },
        content: { type: 'category', category: 'basics' }
    },
    {
        id: 'l9-pronouns',
        unit: 1,
        category: 'Gramátika Básiko',
        level: 'A1',
        title: 'Pronòmbernan',
        topic: 'Personal Pronouns',
        description: { en: 'I, You, He, She...', nl: 'Ik, Jij, Hij, Zij...', es: 'Yo, Tú, Él, Ella...' },
        content: { type: 'category', category: 'pronouns' }
    },
    {
        id: 'l1b-sentence-structure',
        unit: 1,
        category: 'Básiko',
        level: 'A1',
        title: 'Traha Frase (Sentences)',
        topic: 'Sentence Structure',
        description: { en: 'Simple: Subject + Verb.', nl: 'Simpel: Onderwerp + Werkwoord.', es: 'Simple: Sujeto + Verbo.' },
        content: { type: 'tag', tag: 'structure' }
    },
    {
        id: 'l1c-questions',
        unit: 1,
        category: 'Básiko',
        level: 'A1',
        title: 'Preguntanan (Questions)',
        topic: 'Asking Questions',
        description: { en: 'Who, What, Where?', nl: 'Wie, Wat, Waar?', es: '¿Quién, Qué, Dónde?' },
        content: { type: 'tag', tag: 'questions' }
    },

    // --- UNIT 2: NUMBERS & COLORS ---
    {
        id: 'l2-numbers-1-10',
        unit: 2,
        category: 'Numbernan i Kolornan',
        level: 'A1',
        title: 'Numbernan 1-10',
        topic: 'Counting',
        description: { en: 'Count 1-10.', nl: 'Tel 1-10.', es: 'Cuenta 1-10.' },
        content: { type: 'tag', tag: '1-10' }
    },
    {
        id: 'l2-numbers-11-20',
        unit: 2,
        category: 'Numbernan i Kolornan',
        level: 'A1',
        title: 'Numbernan 11-20',
        topic: 'Eleven to twenty',
        description: { en: 'Eleven, twelve and fifteen.', nl: 'Elf, twaalf en vijftien.', es: 'Once, doce y quince.' },
        content: { type: 'tag', tag: '11-20' }
    },
    {
        id: 'l3-numbers-20-100',
        unit: 2,
        category: 'Numbernan i Kolornan',
        level: 'A1',
        title: 'Numbernan 20-100',
        topic: 'Counting to 100',
        description: { en: 'Twenty, Thirty... Hundred.', nl: 'Twintig, Dertig... Honderd.', es: 'Veinte, Treinta... Cien.' },
        content: { type: 'tag', tag: '20-100' }
    },
    {
        id: 'l3b-numbers-1000',
        unit: 2,
        category: 'Numbernan i Kolornan',
        level: 'A1',
        title: 'Numbernan Grandi (1000)',
        topic: 'Big Numbers',
        description: { en: '100, 500, 1000.', nl: '100, 500, 1000.', es: '100, 500, 1000.' },
        content: { type: 'tag', tag: '100-1000' }
    },
    {
        id: 'l4-colors',
        unit: 2,
        category: 'Numbernan i Kolornan',
        level: 'A1',
        title: 'Kolornan Kompleto',
        topic: 'All Colors',
        description: { en: 'Red, Blue, Purple, Pink.', nl: 'Rood, Blauw, Paars, Roze.', es: 'Rojo, Azul, Morado, Rosa.' },
        // Strategy: mix basic and advanced colors
        content: { type: 'category', category: 'colors' }
    },

    // --- UNIT 3: DAILY LIFE ---
    {
        id: 'l5-family-close',
        unit: 3,
        category: 'Famia i Hende',
        level: 'A1',
        title: 'Famia Serka',
        topic: 'Close Family',
        description: { en: 'Mom, Dad, Siblings.', nl: 'Mama, Papa, Broers/Zus.', es: 'Mamá, Papá, Hermanos.' },
        content: { type: 'category', category: 'family' }
    },
    {
        id: 'l3-verbs-core',
        unit: 3,
        category: 'Actionan',
        level: 'A1',
        title: 'Verbonan Básiko',
        topic: 'Core Verbs',
        description: { en: 'To be, to have, to go.', nl: 'Zijn, hebben, gaan.', es: 'Ser, tener, ir.' },
        content: {
            type: 'ids',
            ids: ['v-1', 'v-2', 'v-3', 'v-4', 'v-5', 'v-6', 'v-7', 'v-8', 'v-9', 'v-10', 'v-11'],
        },
    },
    {
        id: 'l3-verbs-1',
        unit: 3,
        category: 'Actionan',
        level: 'A1',
        title: 'Accionnan (Action Verbs)',
        topic: 'Common Actions',
        description: { en: 'Work, Dance, Play.', nl: 'Werken, Dansen, Spelen.', es: 'Trabajar, Bailar, Jugar.' },
        content: { type: 'tag', tag: 'verb-word' } // Only the verb words
    },
    {
        id: 'l3-verbs-2',
        unit: 3,
        category: 'Actionan',
        level: 'A1',
        title: 'Verbo den Frase (Sentences)',
        topic: 'Using Verbs',
        description: { en: 'I work, We dance.', nl: 'Ik werk, Wij dansen.', es: 'Yo trabajo, Bailamos.' },
        content: { type: 'tag', tag: 'verb-sentence' } // Only the sentences
    },
    {
        id: 'l3-verbs-3',
        unit: 3,
        category: 'Actionan',
        level: 'A1',
        title: 'Training Intensivo (Drill)',
        topic: 'Verb Mastery',
        description: { en: 'Practice Makes Perfect.', nl: 'Oefening baart kunst.', es: 'La práctica hace al maestro.' },
        content: { type: 'tag', tag: 'verb-training' } // MIX of both
    },
    {
        id: 'l-family-ext',
        unit: 3,
        category: 'Famia i Hende',
        level: 'A1',
        title: 'Famia Grandi',
        topic: 'Extended Family',
        description: { en: 'Uncle, Aunt, Cousins.', nl: 'Oom, Tante, Neven.', es: 'Tío, Tía, Primos.' },
        content: { type: 'tag', tag: 'extended-family' }
    },
    {
        id: 'l-daily-routine',
        unit: 3,
        category: 'Konversashon Diarío',
        level: 'A1',
        title: 'Rutina Diario',
        topic: 'Daily Routine',
        description: { en: 'Wake up, Shower, Work.', nl: 'Opstaan, Douchen, Werken.', es: 'Levantarse, Bañarse, Trabajar.' },
        content: { type: 'tag', tag: 'routine' }
    },
    {
        id: 'l6-emotions',
        unit: 3,
        category: 'Famia i Hende',
        level: 'A1',
        title: 'Emoshon Básiko',
        topic: 'Basic Emotions',
        description: { en: 'Happy, Sad.', nl: 'Blij, Verdrietig.', es: 'Feliz, Triste.' },
        content: { type: 'category', category: 'emotions' }
    },
    {
        id: 'l7-food',
        unit: 3,
        category: 'Konversashon Diarío',
        level: 'A1',
        title: 'Kuminda i Bebida',
        topic: 'Food & Drinks',
        description: { en: 'Common foods.', nl: 'Veelvoorkomend eten.', es: 'Comidas comunes.' },
        content: { type: 'category', category: 'food' }
    },
    {
        id: 'l8-restaurant',
        unit: 3,
        category: 'Konversashon Diarío',
        level: 'A1',
        title: 'Restaurant',
        topic: 'Ordering Food',
        description: { en: 'Ordering.', nl: 'Bestellen.', es: 'Pedir.' },
        content: { type: 'category', category: 'restaurant' }
    },

    // --- UNIT 4: ENVIRONMENT ---
    {
        id: 'l11-weather',
        unit: 4,
        category: 'Tempo i Kas',
        level: 'A2',
        title: 'Tempo',
        topic: 'Weather',
        description: { en: 'Sun, Rain, Wind.', nl: 'Zon, Regen, Wind.', es: 'Sol, Lluvia, Viento.' },
        content: { type: 'category', category: 'weather' }
    },
    {
        id: 'l12-house',
        unit: 4,
        category: 'Tempo i Kas',
        level: 'A2',
        title: 'Kas',
        topic: 'The House',
        description: { en: 'Kitchen, Room, Bed.', nl: 'Keuken, Kamer, Bed.', es: 'Cocina, Cuarto, Cama.' },
        content: { type: 'category', category: 'house' }
    },
    {
        id: 'l20-nature',
        unit: 4,
        category: 'Mundu Natural',
        level: 'B1',
        title: 'Naturalesa (Nature)',
        topic: 'Animals & Plants',
        description: { en: 'Trees, Animals.', nl: 'Bomen, Dieren.', es: 'Árboles, Animales.' },
        content: { type: 'category', category: 'nature' }
    },
    {
        id: 'l-house-inside',
        unit: 4,
        category: 'Tempo i Kas',
        level: 'A2',
        title: 'Muebles (Furniture)',
        topic: 'Inside the House',
        description: { en: 'Table, Chair, Bed.', nl: 'Tafel, Stoel, Bed.', es: 'Mesa, Silla, Cama.' },
        content: { type: 'tag', tag: 'furniture' }
    },
    {
        id: 'l-environment',
        unit: 4,
        category: 'Mundu Natural',
        level: 'B1',
        title: 'Medio Ambiente',
        topic: 'The Environment',
        description: { en: 'Beach, Sky, Garden.', nl: 'Strand, Lucht, Tuin.', es: 'Playa, Cielo, Jardín.' },
        content: { type: 'tag', tag: 'environment' }
    },

    // --- UNIT 5: CITY & DIRECTIONS ---
    {
        id: 'l13-directions',
        unit: 5,
        category: 'Direkshonan i Lugarnan',
        level: 'B1',
        title: 'Direkshon',
        topic: 'Directions',
        description: { en: 'Left, Right, Straight.', nl: 'Links, Rechts, Rechtdoor.', es: 'Izquierda, Derecha, Derecho.' },
        content: { type: 'category', category: 'directions' }
    },
    {
        id: 'l5-prepositions',
        unit: 5,
        category: 'Direkshonan i Lugarnan',
        level: 'B1',
        title: 'Preposishon',
        topic: 'Prepositions',
        description: { en: 'On, under, before, after.', nl: 'Op, onder, voor, na.', es: 'Sobre, debajo, antes, después.' },
        content: { type: 'category', category: 'prepositions' }
    },
    {
        id: 'l14-places',
        unit: 5,
        category: 'Direkshonan i Lugarnan',
        level: 'B1',
        title: 'Lugarnan (Places)',
        topic: 'City Places',
        description: { en: 'School, Hospital, Bank.', nl: 'School, Ziekenhuis, Bank.', es: 'Escuela, Hospital, Banco.' },
        content: { type: 'category', category: 'places' }
    },
    {
        id: 'l-travel',
        unit: 5,
        category: 'Direkshonan i Lugarnan',
        level: 'B1',
        title: 'Biahe (Travel)',
        topic: 'Travel & Transport',
        description: { en: 'Airport, Ticket, Suitcase.', nl: 'Vliegveld, Ticket, Koffer.', es: 'Aeropuerto, Boleto, Maleta.' },
        content: { type: 'tag', tag: 'travel' }
    },
    {
        id: 'l-transport',
        unit: 5,
        category: 'Direkshonan i Lugarnan',
        level: 'B1',
        title: 'Medio di Transporte',
        topic: 'Transport',
        description: { en: 'Bus, Car, Taxi.', nl: 'Bus, Auto, Taxi.', es: 'Autobús, Carro, Taxi.' },
        content: { type: 'tag', tag: 'transport' }
    },
    {
        id: 'l-public-services',
        unit: 5,
        category: 'Direkshonan i Lugarnan',
        level: 'B1',
        title: 'Servisio Publiko',
        topic: 'City Services',
        description: { en: 'Police, Post Office, Bank.', nl: 'Politie, Postkantoor, Bank.', es: 'Policía, Correo, Banco.' },
        content: { type: 'tag', tag: 'city' }
    },

    // --- UNIT 6: GRAMMAR MASTERY ---
    {
        id: 'l-gram-present',
        unit: 6,
        category: 'Gramátika Avansá',
        level: 'A2',
        title: 'Present Tense (Ta)',
        topic: 'Describing Now',
        description: { en: 'Mi ta bai - I am going.', nl: 'Mi ta bai - Ik ga.', es: 'Mi ta bai - Yo voy.' },
        content: { type: 'tag', tag: 'grammar-ta' }
    },
    {
        id: 'l-gram-past',
        unit: 6,
        category: 'Gramátika Avansá',
        level: 'A2',
        title: 'Past Tense (Tabata/A)',
        topic: 'The Past',
        description: { en: 'Was going vs. Went.', nl: 'Ging vs. Is gegaan.', es: 'Iba vs. Fui.' },
        content: { type: 'tag', tag: 'grammar-tabata' }
    },
    {
        id: 'l-gram-future',
        unit: 6,
        category: 'Gramátika Avansá',
        level: 'A2',
        title: 'Future Tense (Lo)',
        topic: 'The Future',
        description: { en: 'I will go.', nl: 'Ik zal gaan.', es: 'Yo iré.' },
        content: { type: 'tag', tag: 'grammar-lo' }
    },
    {
        id: 'l-gram-exam',
        unit: 6,
        category: 'Gramátika Avansá',
        level: 'B2',
        title: 'Eksamen Final (Mixed Tenses)',
        topic: 'Mastering Time',
        description: { en: 'Mix Past, Present & Future.', nl: 'Mix Verleden, Heden & Toekomst.', es: 'Mezcla Pasado, Presente y Futuro.' },
        content: {
            type: 'ids',
            ids: [
                'gram-go-pres',
                'gram-eat-pres',
                'gram-sleep-pres',
                'gram-work-pres',
                'gram-go-past-imp',
                'gram-eat-past-imp',
                'gram-work-past',
                'gram-go-past-perf',
                'gram-eat-past-perf',
                'gram-read-past',
                'gram-go-fut',
                'gram-eat-fut',
                'gram-sleep-fut',
                'gram-work-fut',
            ],
        },
        dialogueTags: ['exam-mixed'],
    },
    {
        id: 'l-gram-plural',
        unit: 6,
        category: 'Gramátika Avansá',
        level: 'A2',
        title: 'Plurals (Nan)',
        topic: 'More than one',
        description: { en: 'Flor -> Flornan.', nl: 'Bloem -> Bloemen.', es: 'Flor -> Flores.' },
        content: { type: 'tag', tag: 'plurals' }
    },

    // --- UNIT 7: EXPANDED TOPICS ---
    {
        id: 'l7c-drinks',
        unit: 7,
        category: 'Konversashon Diarío',
        level: 'A1',
        title: 'Bebidas (Drinks)',
        topic: 'Thirst & Drinks',
        description: { en: 'Water, Juice, Milk.', nl: 'Water, Sap, Melk.', es: 'Agua, Jugo, Leche.' },
        content: { type: 'tag', tag: 'drinks' }
    },
    {
        id: 'l7d-supermarket',
        unit: 7,
        category: 'Konversashon Diarío',
        level: 'A1',
        title: 'Supermarket',
        topic: 'Shopping for Food',
        description: { en: 'Bags, Carts, Cashier.', nl: 'Tas, Kar, Kassa.', es: 'Bolsa, Carrito, Caja.' },
        content: { type: 'tag', tag: 'supermarket' }
    },
    {
        id: 'l7e-clothing',
        unit: 7,
        category: 'Situashonnan',
        level: 'A1',
        title: 'Ropa (Clothing)',
        topic: 'Shopping for Clothes',
        description: { en: 'Shirt, Pants, Shoes.', nl: 'Shirt, Broek, Schoenen.', es: 'Camisa, Pantalón, Zapatos.' },
        content: { type: 'tag', tag: 'clothing' }
    },
    {
        id: 'l7-prices',
        unit: 7,
        category: 'Situashonnan',
        level: 'A1',
        title: 'Presio',
        topic: 'Prices',
        description: { en: 'How much does this cost?', nl: 'Hoeveel kost dit?', es: '¿Cuánto cuesta esto?' },
        content: { type: 'ids', ids: ['shop-1', 'shop-2', 'shop-3', 'shop-4', 'shop-5'] }
    },
    {
        id: 'l7-shopping-extra',
        unit: 7,
        category: 'Situashonnan',
        level: 'A1',
        title: 'Kompras (Shopping Talk)',
        topic: 'Discounts & Gifts',
        description: { en: 'Receipts, Try on, Gifts.', nl: 'Bonnetjes, Passen, Cadeaus.', es: 'Recibos, Probar, Regalos.' },
        content: { type: 'tag', tag: 'social-extra' }
    },
    {
        id: 'l7-dialogue',
        unit: 7,
        category: 'Situashonnan',
        level: 'A1',
        title: 'Konversashon (Meetup)',
        topic: 'Meeting a Friend',
        description: { en: 'A chat in the city.', nl: 'Een praatje in de stad.', es: 'Una charla en la ciudad.' },
        content: { type: 'tag', tag: 'social-meetup' } // Matches the conversation tag
    },
    {
        id: 'l-social-intro',
        unit: 7,
        category: 'Situashonnan',
        level: 'A1',
        title: 'Social Basics',
        topic: 'Meeting People',
        description: { en: 'Names, Politeness.', nl: 'Namen, Beleefdheid.', es: 'Nombres, Cortesía.' },
        content: { type: 'category', category: 'social' }
    },

    // Old Nature Lesson Removed (Moved to Unit 4)

    // --- SECTION 4: UPPER INTERMEDIATE (B2) ---
    // UNIT 8: Complex Concepts & Fluency
    {
        id: 'l21-health',
        unit: 8,
        category: 'Salud i Kurpa',
        level: 'B2',
        title: 'Salud',
        topic: 'Health & Body',
        description: { en: 'Doctor & Pain.', nl: 'Dokter & Pijn.', es: 'Doctor y Dolor.' },
        content: { type: 'category', category: 'health' }
    },
    {
        id: 'l22-abstract',
        unit: 8,
        category: 'Konseptos Abstrakto',
        level: 'B2',
        title: 'Opinion i Futuro',
        topic: 'Abstract Concepts',
        description: { en: 'Thoughts & Ideas.', nl: 'Gedachten & Ideeën.', es: 'Pensamientos e Ideas.' },
        content: { type: 'category', category: 'abstract' }
    },
    {
        id: 'l8-work',
        unit: 8,
        category: 'Trabou',
        level: 'B2',
        title: 'Trabou',
        topic: 'Work',
        description: { en: 'The office, the boss, a meeting.', nl: 'Het kantoor, de baas, een vergadering.', es: 'La oficina, el jefe, una reunión.' },
        content: { type: 'ids', ids: ['wrk-1', 'wrk-2', 'wrk-3', 'wrk-4', 'wrk-5', 'wrk-6', 'wrk-7', 'wrk-8'] },
        dialogueTags: ['work'],
    },
    {
        id: 'l23-conversation',
        unit: 8,
        category: 'Konversashon',
        level: 'B2',
        title: 'Repaso 8',
        topic: 'Unit review',
        description: { en: 'Practice words from this unit.', nl: 'Oefen woorden uit deze unit.', es: 'Practica palabras de esta unidad.' },
        role: 'review',
        content: { type: 'review' },
        dialogueCategories: ['social'],
    },

    // --- SECTION 5: MASTERY (C1) ---
    // UNIT 9: Business & Academia
    {
        id: 'l9a-business',
        unit: 9,
        category: 'Negoshi i Finansa',
        level: 'C1',
        title: 'Negoshi (Business)',
        topic: 'Business & Finance',
        description: { en: 'Profit, Investment, Contracts.', nl: 'Winst, Investering, Contracten.', es: 'Ganancia, Inversión, Contratos.' },
        content: { type: 'tag', tag: 'business' }
    },
    {
        id: 'l9b-academic',
        unit: 9,
        category: 'Mundu Akademiko',
        level: 'C1',
        title: 'Akademiko (Academic)',
        topic: 'Research & Theory',
        description: { en: 'Theory, Analysis, Logic.', nl: 'Theorie, Analyse, Logica.', es: 'Teoría, Análisis, Lógica.' },
        content: { type: 'tag', tag: 'academic' }
    },
    {
        id: 'l9c-formal',
        unit: 9,
        category: 'Papiamento Formal',
        level: 'C1',
        title: 'Repaso 9',
        topic: 'Unit review',
        description: { en: 'Practice business and academic words.', nl: 'Oefen zakelijke en academische woorden.', es: 'Practica palabras de negocios y estudio.' },
        role: 'review',
        content: { type: 'review' },
    }
];

export const lessons: LessonConfig[] = expandCourse(lessonBlueprints);
