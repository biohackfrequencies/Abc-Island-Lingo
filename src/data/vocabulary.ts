export type VocabType = 'word' | 'phrase' | 'sentence';
export type WordCategory = 'basics' | 'numbers' | 'colors' | 'family' | 'emotions' | 'food' | 'restaurant' | 'weather' | 'house' | 'directions' | 'places' | 'pronouns' | 'verbs' | 'prepositions' | 'shopping' | 'social' | 'work' | 'health' | 'nature' | 'abstract' | 'grammar';

export interface VocabEntry {
    id: string;
    papiamento: string;
    meanings: {
        en: string;
        nl: string;
        es: string;
    };
    category: WordCategory;
    type: VocabType;
    pronunciation?: string;
    image?: string; // URL for visual learning
    tags?: string[]; // For filtering specific subsets e.g. 'greeting', '1-10'
    culturalTip?: { en: string; nl: string; es: string }; // Optional tip
}

export const vocabulary: VocabEntry[] = [
    // --- BASICS & GREETINGS ---
    {
        id: 'bas-1',
        papiamento: 'Bon dia',
        meanings: { en: 'Good morning', nl: 'Goedemorgen', es: 'Buenos días' },
        category: 'basics',
        type: 'phrase',
        pronunciation: 'Bon dee-a',
        tags: ['greeting']
    },
    {
        id: 'bas-2',
        papiamento: 'Bon tardi',
        meanings: { en: 'Good afternoon', nl: 'Goedemiddag', es: 'Buenas tardes' },
        category: 'basics',
        type: 'phrase',
        pronunciation: 'Bon tar-dee',
        tags: ['greeting']
    },
    {
        id: 'bas-3',
        papiamento: 'Bon nochi',
        meanings: { en: 'Good evening', nl: 'Goedenavond', es: 'Buenas noches' },
        category: 'basics',
        type: 'phrase',
        pronunciation: 'Bon no-chee',
        tags: ['greeting']
    },
    {
        id: 'bas-4',
        papiamento: 'Bon bini',
        meanings: { en: 'Welcome', nl: 'Welkom', es: 'Bienvenido' },
        category: 'basics',
        type: 'phrase'
    },
    {
        id: 'bas-5',
        papiamento: 'Danki',
        meanings: { en: 'Thank you', nl: 'Dank je', es: 'Gracias' },
        category: 'basics',
        type: 'word'
    },
    {
        id: 'bas-6',
        papiamento: 'Por fabor',
        meanings: { en: 'Please', nl: 'Alsjeblieft', es: 'Por favor' },
        category: 'basics',
        type: 'phrase',
        pronunciation: 'Por fa-bor'
    },
    {
        id: 'bas-7',
        papiamento: 'Ayó',
        meanings: { en: 'Goodbye', nl: 'Doei/Tot ziens', es: 'Adiós' },
        category: 'basics',
        type: 'word'
    },
    {
        id: 'bas-8',
        papiamento: 'Masha danki',
        meanings: { en: 'Thank you very much', nl: 'Heel erg bedankt', es: 'Muchas gracias' },
        category: 'basics',
        type: 'phrase'
    },
    {
        id: 'bas-9',
        papiamento: 'Mi ta bon',
        meanings: { en: 'I am fine', nl: 'Met mij gaat het goed', es: 'Estoy bien' },
        category: 'basics',
        type: 'sentence'
    },
    {
        id: 'bas-10',
        papiamento: 'Kon ta bai?',
        meanings: { en: 'How are you?', nl: 'Hoe gaat het?', es: '¿Cómo estás?' },
        category: 'basics',
        type: 'sentence',
        tags: ['questions'], // Added tag
        culturalTip: {
            en: "Questions in Papiamento often use the same word order as statements, just with a rising intonation!",
            nl: "Vragen in het Papiaments gebruiken vaak dezelfde woordvolgorde als stellingen, maar met een stijgende intonatie.",
            es: "¡Las preguntas en papiamento a menudo usan el mismo orden de palabras que las afirmaciones, solo con una entonación ascendente!"
        }
    },
    { id: 'bas-11', papiamento: 'Si', meanings: { en: 'Yes', nl: 'Ja', es: 'Sí' }, category: 'basics', type: 'word', tags: ['structure'] },
    { id: 'bas-12', papiamento: 'Nò', meanings: { en: 'No', nl: 'Nee', es: 'No' }, category: 'basics', type: 'word', tags: ['structure'] },
    { id: 'bas-13', papiamento: 'Kiko', meanings: { en: 'What', nl: 'Wat', es: 'Qué' }, category: 'basics', type: 'word', tags: ['questions'] },
    { id: 'bas-14', papiamento: 'Unda', meanings: { en: 'Where', nl: 'Waar', es: 'Dónde' }, category: 'basics', type: 'word', tags: ['questions'] },
    { id: 'bas-15', papiamento: 'Ken', meanings: { en: 'Who', nl: 'Wie', es: 'Quién' }, category: 'basics', type: 'word', tags: ['questions'] },
    { id: 'bas-q1', papiamento: 'Dikon', meanings: { en: 'Why', nl: 'Waarom', es: 'Por qué' }, category: 'basics', type: 'word', tags: ['questions'] },
    { id: 'bas-q2', papiamento: 'Ki ora', meanings: { en: 'What time/When', nl: 'Hoe laat/Wanneer', es: 'A qué hora/Cuándo' }, category: 'basics', type: 'word', tags: ['questions'] },

    // Sentence Building Basics
    {
        id: 'bas-16',
        papiamento: 'Mi ta',
        meanings: { en: 'I am', nl: 'Ik ben', es: 'Yo soy/estoy' },
        category: 'basics',
        type: 'phrase',
        tags: ['structure'], // Added tag
        culturalTip: {
            en: "Papiamento structure is simple: Subject + Verb + Object. 'Mi' (Subject) + 'ta' (Verb).",
            nl: "De structuur van het Papiaments is simpel: Onderwerp + Werkwoord + Lijdend Voorwerp. 'Mi' (Onderwerp) + 'ta' (Werkwoord).",
            es: "La estructura del papiamento es simple: Sujeto + Verbo + Objeto. 'Mi' (Sujeto) + 'ta' (Verbo)."
        }
    },
    { id: 'bas-17', papiamento: 'Bo ta', meanings: { en: 'You are', nl: 'Jij bent', es: 'Tú eres/estás' }, category: 'basics', type: 'phrase', tags: ['structure'] },
    { id: 'bas-18', papiamento: 'E ta', meanings: { en: 'He/She/It is', nl: 'Hij/Zij/Het is', es: 'Él/Ella es/está' }, category: 'basics', type: 'phrase', tags: ['structure'] },
    { id: 'bas-19', papiamento: 'Kiko esaki ta?', meanings: { en: 'What is this?', nl: 'Wat is dit?', es: '¿Qué es esto?' }, category: 'basics', type: 'sentence', tags: ['cloze', 'questions'] },
    { id: 'bas-20', papiamento: 'Unda bo ta?', meanings: { en: 'Where are you?', nl: 'Waar ben je?', es: '¿Dónde estás?' }, category: 'basics', type: 'sentence', tags: ['cloze', 'questions'] },
    { id: 'bas-21', papiamento: 'Ken e ta?', meanings: { en: 'Who is he/she?', nl: 'Wie is hij/zij?', es: '¿Quién es él/ella?' }, category: 'basics', type: 'sentence', tags: ['questions'] },

    // --- NUMBERS 1-10 ---
    { id: 'num-1', papiamento: 'Unu', meanings: { en: 'One', nl: 'Eén', es: 'Uno' }, category: 'numbers', type: 'word', tags: ['1-10'] },
    { id: 'num-2', papiamento: 'Dos', meanings: { en: 'Two', nl: 'Twee', es: 'Dos' }, category: 'numbers', type: 'word', tags: ['1-10'] },
    { id: 'num-3', papiamento: 'Tres', meanings: { en: 'Three', nl: 'Drie', es: 'Tres' }, category: 'numbers', type: 'word', tags: ['1-10'] },
    { id: 'num-4', papiamento: 'Kuater', meanings: { en: 'Four', nl: 'Vier', es: 'Cuatro' }, category: 'numbers', type: 'word', tags: ['1-10'] },
    { id: 'num-5', papiamento: 'Sinku', meanings: { en: 'Five', nl: 'Vijf', es: 'Cinco' }, category: 'numbers', type: 'word', tags: ['1-10'] },
    { id: 'num-6', papiamento: 'Seis', meanings: { en: 'Six', nl: 'Zes', es: 'Seis' }, category: 'numbers', type: 'word', tags: ['1-10'] },
    { id: 'num-7', papiamento: 'Shete', meanings: { en: 'Seven', nl: 'Zeven', es: 'Siete' }, category: 'numbers', type: 'word', tags: ['1-10'] },
    { id: 'num-8', papiamento: 'Ocho', meanings: { en: 'Eight', nl: 'Acht', es: 'Ocho' }, category: 'numbers', type: 'word', tags: ['1-10'] },
    { id: 'num-9', papiamento: 'Nuebe', meanings: { en: 'Nine', nl: 'Negen', es: 'Nueve' }, category: 'numbers', type: 'word', tags: ['1-10'] },
    { id: 'num-10', papiamento: 'Dies', meanings: { en: 'Ten', nl: 'Tien', es: 'Diez' }, category: 'numbers', type: 'word', tags: ['1-10'] },

    // --- NUMBERS 11-20 ---
    { id: 'num-11', papiamento: 'Diesun', meanings: { en: 'Eleven', nl: 'Elf', es: 'Once' }, category: 'numbers', type: 'word', tags: ['11-20'] },
    { id: 'num-12', papiamento: 'Diesdos', meanings: { en: 'Twelve', nl: 'Twaalf', es: 'Doce' }, category: 'numbers', type: 'word', tags: ['11-20'] },
    { id: 'num-15', papiamento: 'Diessinku', meanings: { en: 'Fifteen', nl: 'Vijftien', es: 'Quince' }, category: 'numbers', type: 'word', tags: ['11-20'] },
    {
        id: 'num-20', papiamento: 'Binti', meanings: { en: 'Twenty', nl: 'Twintig', es: 'Veinte' }, category: 'numbers', type: 'word', tags: ['20-100', 'tens'],
        culturalTip: {
            en: "Papiamento numbers are very similar to Spanish and Portuguese due to historical roots.",
            nl: "Papiaments getallen lijken erg op Spaans en Portugees vanwege historische wortels.",
            es: "Los números en Papiamento son muy similares al español y portugués debido a raíces históricas."
        }
    },
    { id: 'num-21', papiamento: 'Bintiun', meanings: { en: 'Twenty-one', nl: 'Eenentwintig', es: 'Veintiuno' }, category: 'numbers', type: 'word', tags: ['20-100'] },
    { id: 'num-30', papiamento: 'Trinta', meanings: { en: 'Thirty', nl: 'Dertig', es: 'Treinta' }, category: 'numbers', type: 'word', tags: ['20-100', 'tens'] },
    { id: 'num-40', papiamento: 'Kuarenta', meanings: { en: 'Forty', nl: 'Veertig', es: 'Cuarenta' }, category: 'numbers', type: 'word', tags: ['20-100', 'tens'] },
    { id: 'num-50', papiamento: 'Sinkuenta', meanings: { en: 'Fifty', nl: 'Vijftig', es: 'Cincuenta' }, category: 'numbers', type: 'word', tags: ['20-100', 'tens'] },
    { id: 'num-60', papiamento: 'Sesenta', meanings: { en: 'Sixty', nl: 'Zestig', es: 'Sesenta' }, category: 'numbers', type: 'word', tags: ['20-100', 'tens'] },
    { id: 'num-70', papiamento: 'Setenta', meanings: { en: 'Seventy', nl: 'Zeventig', es: 'Setenta' }, category: 'numbers', type: 'word', tags: ['20-100', 'tens'] },
    { id: 'num-80', papiamento: 'Ochenta', meanings: { en: 'Eighty', nl: 'Tachtig', es: 'Ochenta' }, category: 'numbers', type: 'word', tags: ['20-100', 'tens'] },
    { id: 'num-90', papiamento: 'Nobenta', meanings: { en: 'Ninety', nl: 'Negentig', es: 'Noventa' }, category: 'numbers', type: 'word', tags: ['20-100', 'tens'] },

    // Hundreds
    { id: 'num-100', papiamento: 'Shen', meanings: { en: 'One Hundred', nl: 'Honderd', es: 'Cien' }, category: 'numbers', type: 'word', tags: ['100-1000', 'hundreds'] },
    { id: 'num-200', papiamento: 'Dosshen', meanings: { en: 'Two Hundred', nl: 'Tweehonderd', es: 'Doscientos' }, category: 'numbers', type: 'word', tags: ['100-1000'] },
    { id: 'num-500', papiamento: 'Sinkushen', meanings: { en: 'Five Hundred', nl: 'Vijfhonderd', es: 'Quinientos' }, category: 'numbers', type: 'word', tags: ['100-1000'] },
    { id: 'num-1000', papiamento: 'Mil', meanings: { en: 'One Thousand', nl: 'Duizend', es: 'Mil' }, category: 'numbers', type: 'word', tags: ['100-1000'] },

    // Sentences with Numbers
    { id: 'sent-num-1', papiamento: 'Mi tin {trinta} aña', meanings: { en: 'I am thirty years old', nl: 'Ik ben dertig jaar oud', es: 'Tengo treinta años' }, category: 'numbers', type: 'sentence', tags: ['20-100', 'context'] },
    { id: 'sent-num-2', papiamento: 'Esaki ta kosta {shen} florin', meanings: { en: 'This costs one hundred florins', nl: 'Dit kost honderd gulden', es: 'Esto cuesta cien florines' }, category: 'numbers', type: 'sentence', tags: ['100-1000', 'context'] },
    { id: 'sent-num-3', papiamento: 'Tin {mil} hende', meanings: { en: 'There are a thousand people', nl: 'Er zijn duizend mensen', es: 'Hay mil personas' }, category: 'numbers', type: 'sentence', tags: ['100-1000', 'context'] },

    // --- COLORS ---
    { id: 'col-1', papiamento: 'Kòrá', meanings: { en: 'Red', nl: 'Rood', es: 'Rojo' }, category: 'colors', type: 'word', tags: ['basic-colors'] },
    { id: 'col-2', papiamento: 'Blou', meanings: { en: 'Blue', nl: 'Blauw', es: 'Azul' }, category: 'colors', type: 'word', tags: ['basic-colors'] },
    { id: 'col-3', papiamento: 'Bèrdè', meanings: { en: 'Green', nl: 'Groen', es: 'Verde' }, category: 'colors', type: 'word', tags: ['basic-colors'] },
    { id: 'col-4', papiamento: 'Hel', meanings: { en: 'Yellow', nl: 'Geel', es: 'Amarillo' }, category: 'colors', type: 'word', tags: ['basic-colors'] },
    { id: 'col-5', papiamento: 'Pretu', meanings: { en: 'Black', nl: 'Zwart', es: 'Negro' }, category: 'colors', type: 'word', tags: ['basic-colors'] },
    { id: 'col-6', papiamento: 'Blanku', meanings: { en: 'White', nl: 'Wit', es: 'Blanco' }, category: 'colors', type: 'word', tags: ['basic-colors'] },

    // Advanced Colors
    { id: 'col-7', papiamento: 'Oraño', meanings: { en: 'Orange', nl: 'Oranje', es: 'Naranja' }, category: 'colors', type: 'word', tags: ['adv-colors'] },
    { id: 'col-8', papiamento: 'Gris', meanings: { en: 'Grey', nl: 'Grijs', es: 'Gris' }, category: 'colors', type: 'word', tags: ['adv-colors'] },
    { id: 'col-9', papiamento: 'Rosa', meanings: { en: 'Pink', nl: 'Roze', es: 'Rosa' }, category: 'colors', type: 'word', tags: ['adv-colors'] },
    { id: 'col-10', papiamento: 'Biña', meanings: { en: 'Purple', nl: 'Paars', es: 'Morado' }, category: 'colors', type: 'word', tags: ['adv-colors'] },
    { id: 'col-11', papiamento: 'Maron', meanings: { en: 'Brown', nl: 'Bruin', es: 'Marrón' }, category: 'colors', type: 'word', tags: ['adv-colors'] },

    // Color Sentences
    { id: 'sent-col-1', papiamento: 'E outo ta {kòrá}', meanings: { en: 'The car is red', nl: 'De auto is rood', es: 'El carro es rojo' }, category: 'colors', type: 'sentence', tags: ['basic-colors', 'context'] },
    { id: 'sent-col-2', papiamento: 'E shelu ta {blou}', meanings: { en: 'The sky is blue', nl: 'De lucht is blauw', es: 'El cielo es azul' }, category: 'colors', type: 'sentence', tags: ['basic-colors', 'context'] },
    { id: 'sent-col-3', papiamento: 'Mi gusta bo kamisa {rosa}', meanings: { en: 'I like your pink shirt', nl: 'Ik vind je roze shirt leuk', es: 'Me gusta tu camisa rosa' }, category: 'colors', type: 'sentence', tags: ['adv-colors', 'context'] }, // Simplified sentence
    { id: 'sent-col-4', papiamento: 'E flor ta {biña}', meanings: { en: 'The flower is purple', nl: 'De bloem is paars', es: 'La flor es morada' }, category: 'colors', type: 'sentence', tags: ['adv-colors', 'context'] },

    // --- FAMILY ---
    { id: 'fam-1', papiamento: 'Tata', meanings: { en: 'Father', nl: 'Vader', es: 'Padre' }, category: 'family', type: 'word' },
    { id: 'fam-2', papiamento: 'Mama', meanings: { en: 'Mother', nl: 'Moeder', es: 'Madre' }, category: 'family', type: 'word' },
    { id: 'fam-3', papiamento: 'Ruman', meanings: { en: 'Sibling', nl: 'Broer/Zus', es: 'Hermano/a' }, category: 'family', type: 'word' },
    { id: 'fam-4', papiamento: 'Ruman hòmber', meanings: { en: 'Brother', nl: 'Broer', es: 'Hermano' }, category: 'family', type: 'word' },
    { id: 'fam-5', papiamento: 'Ruman muhé', meanings: { en: 'Sister', nl: 'Zus', es: 'Hermana' }, category: 'family', type: 'word' },
    { id: 'fam-6', papiamento: 'Wela', meanings: { en: 'Grandmother', nl: 'Oma', es: 'Abuela' }, category: 'family', type: 'word' },
    { id: 'fam-7', papiamento: 'Welo', meanings: { en: 'Grandfather', nl: 'Opa', es: 'Abuelo' }, category: 'family', type: 'word' },
    { id: 'fam-8', papiamento: 'Mi mama', meanings: { en: 'My mother', nl: 'Mijn moeder', es: 'Mi madre' }, category: 'family', type: 'phrase' },
    { id: 'fam-9', papiamento: 'Mi ruman hòmber ta haltu', meanings: { en: 'My brother is tall', nl: 'Mijn broer is lang', es: 'Mi hermano es alto' }, category: 'family', type: 'sentence' },
    { id: 'fam-10', papiamento: 'Mi ta stima mi famia', meanings: { en: 'I love my family', nl: 'Ik hou van mijn familie', es: 'Amo a mi familia' }, category: 'family', type: 'sentence' },

    // --- EMOTIONS ---
    { id: 'emo-1', papiamento: 'Kontentu', meanings: { en: 'Happy', nl: 'Blij', es: 'Feliz' }, category: 'emotions', type: 'word' },
    { id: 'emo-2', papiamento: 'Tristu', meanings: { en: 'Sad', nl: 'Verdrietig', es: 'Triste' }, category: 'emotions', type: 'word' },
    {
        id: 'emo-3', papiamento: 'Rabia', meanings: { en: 'Angry', nl: 'Boos', es: 'Enojado' }, category: 'emotions', type: 'word',
        culturalTip: {
            en: "Expressing emotions directly is common. 'Mi ta rabia' means 'I am angry'.",
            nl: "Emoties direct uiten is gewoon. 'Mi ta rabia' betekent 'Ik ben boos'.",
            es: "Expresar emociones directamente es común. 'Mi ta rabia' significa 'Estoy enojado'."
        }
    },
    { id: 'emo-4', papiamento: 'Kansá', meanings: { en: 'Tired', nl: 'Moe', es: 'Cansado' }, category: 'emotions', type: 'word' },
    { id: 'emo-5', papiamento: 'Mi ta kontentu', meanings: { en: 'I am happy', nl: 'Ik ben blij', es: 'Estoy feliz' }, category: 'emotions', type: 'sentence' },

    // --- FOOD & DRINKS ---
    { id: 'food-1', papiamento: 'Awa', meanings: { en: 'Water', nl: 'Water', es: 'Agua' }, category: 'food', type: 'word' },
    { id: 'food-2', papiamento: 'Pan', meanings: { en: 'Bread', nl: 'Brood', es: 'Pan' }, category: 'food', type: 'word' },
    { id: 'food-3', papiamento: 'Kòfi', meanings: { en: 'Coffee', nl: 'Koffie', es: 'Café' }, category: 'food', type: 'word' },
    { id: 'food-4', papiamento: 'Té', meanings: { en: 'Tea', nl: 'Thee', es: 'Té' }, category: 'food', type: 'word' },
    { id: 'food-5', papiamento: 'Aros', meanings: { en: 'Rice', nl: 'Rijst', es: 'Arroz' }, category: 'food', type: 'word' },
    { id: 'food-6', papiamento: 'Galiña', meanings: { en: 'Chicken', nl: 'Kip', es: 'Pollo' }, category: 'food', type: 'word', pronunciation: 'Ga-lee-nya' },
    { id: 'food-7', papiamento: 'Piska', meanings: { en: 'Fish', nl: 'Vis', es: 'Pescado' }, category: 'food', type: 'word' },
    { id: 'food-8', papiamento: 'Mi kièr awa', meanings: { en: 'I want water', nl: 'Ik wil water', es: 'Yo quiero agua' }, category: 'food', type: 'sentence' },
    { id: 'food-9', papiamento: 'Mi ta bebe kòfi', meanings: { en: 'I drink coffee', nl: 'Ik drink koffie', es: 'Yo bebo café' }, category: 'food', type: 'sentence' },
    { id: 'food-10', papiamento: 'E kuminda ta bon', meanings: { en: 'The food is good', nl: 'Het eten is goed', es: 'La comida es buena' }, category: 'food', type: 'sentence' },

    // --- RESTAURANT ---
    { id: 'rest-1', papiamento: 'Kuenta', meanings: { en: 'Bill', nl: 'Rekening', es: 'Cuenta' }, category: 'restaurant', type: 'word' },
    { id: 'rest-2', papiamento: 'Mesa', meanings: { en: 'Table', nl: 'Tafel', es: 'Mesa' }, category: 'restaurant', type: 'word' },
    { id: 'rest-3', papiamento: 'Desayuno', meanings: { en: 'Breakfast', nl: 'Ontbijt', es: 'Desayuno' }, category: 'restaurant', type: 'word' },
    { id: 'rest-4', papiamento: 'Kuminda di mèrdia', meanings: { en: 'Lunch', nl: 'Lunch', es: 'Almuerzo' }, category: 'restaurant', type: 'word' },
    { id: 'rest-5', papiamento: 'Sena', meanings: { en: 'Dinner', nl: 'Avondeten', es: 'Cena' }, category: 'restaurant', type: 'word' },
    { id: 'rest-6', papiamento: 'Serbes', meanings: { en: 'Beer', nl: 'Bier', es: 'Cerveza' }, category: 'restaurant', type: 'word' },
    { id: 'rest-7', papiamento: 'Dushi', meanings: { en: 'Tasty/Sweet', nl: 'Lekker', es: 'Rico/Dulce' }, category: 'restaurant', type: 'word' },
    { id: 'rest-8', papiamento: 'E kuenta por fabor', meanings: { en: 'The bill please', nl: 'De rekening alsjeblieft', es: 'La cuenta por favor' }, category: 'restaurant', type: 'sentence' },
    { id: 'rest-9', papiamento: 'Mi kièr kome', meanings: { en: 'I want to eat', nl: 'Ik wil eten', es: 'Yo quiero comer' }, category: 'restaurant', type: 'sentence' },
    { id: 'rest-10', papiamento: 'Bo tin...?', meanings: { en: 'Do you have...?', nl: 'Heb je...?', es: '¿Tienes...?' }, category: 'restaurant', type: 'phrase' },
    { id: 'rest-11', papiamento: 'Un serbes por fabor', meanings: { en: 'One beer please', nl: 'Een biertje alsjeblieft', es: 'Una cerveza por favor' }, category: 'restaurant', type: 'sentence' },

    // --- SHOPPING EXPANSION (UNIT 7) ---
    { id: 'shop-6', papiamento: 'Mi por pasa esaki?', meanings: { en: 'Can I try this on?', nl: 'Mag ik dit passen?', es: '¿Puedo probarme esto?' }, category: 'shopping', type: 'sentence', tags: ['social-extra'] },
    { id: 'shop-7', papiamento: 'Bo tin e risibu?', meanings: { en: 'Do you have the receipt?', nl: 'Heb je de bon?', es: '¿Tienes el recibo?' }, category: 'shopping', type: 'sentence', tags: ['social-extra'] },
    { id: 'shop-8', papiamento: 'Kuantu deskuento tin?', meanings: { en: 'How much discount is there?', nl: 'Hoeveel korting is er?', es: '¿Cuánto descuento hay?' }, category: 'shopping', type: 'sentence', tags: ['social-extra'] },
    { id: 'shop-9', papiamento: 'Mi ta buska un regalo', meanings: { en: 'I am looking for a gift', nl: 'Ik zoek een cadeau', es: 'Busco un regalo' }, category: 'shopping', type: 'sentence', tags: ['social-extra'] },

    // --- SOCIAL EXPANSION (UNIT 7) ---
    { id: 'soc-extra-1', papiamento: 'Pasa un bon dia', meanings: { en: 'Have a nice day', nl: 'Fijne dag verder', es: 'Ten un buen día' }, category: 'social', type: 'phrase', tags: ['social-extra'] },
    { id: 'soc-extra-2', papiamento: 'Te después', meanings: { en: 'See you later', nl: 'Tot later', es: 'Hasta luego' }, category: 'social', type: 'phrase', tags: ['social-extra'] },
    { id: 'soc-extra-3', papiamento: 'Kiko bo ta hasi awe?', meanings: { en: 'What are you doing today?', nl: 'Wat doe je vandaag?', es: '¿Qué haces hoy?' }, category: 'social', type: 'sentence', tags: ['social-extra'] },

    // --- SOCIAL MEETUP VOCABULARY (Unit 7 Expansion) ---
    // These have the 'social-meetup' tag so they appear in the new lesson alongside the dialogue.
    { id: 'soc-meet-1', papiamento: 'Liber', meanings: { en: 'Free/Available', nl: 'Vrij', es: 'Libre' }, category: 'social', type: 'word', tags: ['social-meetup'] },
    { id: 'soc-meet-2', papiamento: 'Okupá', meanings: { en: 'Busy', nl: 'Druk', es: 'Ocupado' }, category: 'social', type: 'word', tags: ['social-meetup'] },
    { id: 'soc-meet-3', papiamento: 'Ban', meanings: { en: 'Let\'s go', nl: 'Laten we gaan', es: 'Vamos' }, category: 'social', type: 'word', tags: ['social-meetup'] },
    { id: 'soc-meet-4', papiamento: 'Awe nochi', meanings: { en: 'Tonight', nl: 'Vanavond', es: 'Esta noche' }, category: 'social', type: 'phrase', tags: ['social-meetup'] },
    { id: 'soc-meet-5', papiamento: 'Idea', meanings: { en: 'Idea', nl: 'Idee', es: 'Idea' }, category: 'social', type: 'word', tags: ['social-meetup'] },
    { id: 'soc-meet-6', papiamento: 'Mi ta liber', meanings: { en: 'I am free', nl: 'Ik ben vrij', es: 'Estoy libre' }, category: 'social', type: 'sentence', tags: ['social-meetup'] },
    { id: 'soc-meet-7', papiamento: 'Ban kome algu', meanings: { en: 'Let\'s eat something', nl: 'Laten we iets eten', es: 'Vamos a comer algo' }, category: 'social', type: 'sentence', tags: ['social-meetup'] },
    { id: 'soc-meet-8', papiamento: 'Bo kièr bai?', meanings: { en: 'Do you want to go?', nl: 'Wil je gaan?', es: '¿Quieres ir?' }, category: 'social', type: 'sentence', tags: ['social-meetup'] },

    // --- WEATHER ---
    { id: 'wea-1', papiamento: 'Solo', meanings: { en: 'Sun', nl: 'Zon', es: 'Sol' }, category: 'weather', type: 'word' },
    { id: 'wea-2', papiamento: 'Bientu', meanings: { en: 'Wind', nl: 'Wind', es: 'Viento' }, category: 'weather', type: 'word' },
    { id: 'wea-3', papiamento: 'Nubia', meanings: { en: 'Cloud', nl: 'Wolk', es: 'Nube' }, category: 'weather', type: 'word' },
    { id: 'wea-4', papiamento: 'Laman', meanings: { en: 'Sea', nl: 'Zee', es: 'Mar' }, category: 'weather', type: 'word' },
    { id: 'wea-5', papiamento: 'Awa ta kai', meanings: { en: 'It is raining', nl: 'Het regent', es: 'Está lloviendo' }, category: 'weather', type: 'sentence' },
    { id: 'wea-6', papiamento: 'Friu', meanings: { en: 'Cold', nl: 'Koud', es: 'Frío' }, category: 'weather', type: 'word' },
    { id: 'wea-7', papiamento: 'Kayente', meanings: { en: 'Hot', nl: 'Heet', es: 'Caliente' }, category: 'weather', type: 'word' },
    { id: 'wea-8', papiamento: 'E solo ta kayente', meanings: { en: 'The sun is hot', nl: 'De zon is heet', es: 'El sol está caliente' }, category: 'weather', type: 'sentence' },
    { id: 'wea-9', papiamento: 'E laman ta bunita', meanings: { en: 'The sea is beautiful', nl: 'De zee is mooi', es: 'El mar es hermoso' }, category: 'weather', type: 'sentence' },

    // --- HOUSE ---
    { id: 'hse-1', papiamento: 'Kas', meanings: { en: 'House', nl: 'Huis', es: 'Casa' }, category: 'house', type: 'word' },
    { id: 'hse-2', papiamento: 'Kushina', meanings: { en: 'Kitchen', nl: 'Keuken', es: 'Cocina' }, category: 'house', type: 'word' },
    { id: 'hse-3', papiamento: 'Kamber', meanings: { en: 'Bedroom', nl: 'Slaapkamer', es: 'Dormitorio' }, category: 'house', type: 'word' },
    { id: 'hse-4', papiamento: 'Baño', meanings: { en: 'Bathroom', nl: 'Badkamer', es: 'Baño' }, category: 'house', type: 'word' },
    { id: 'hse-5', papiamento: 'Sala', meanings: { en: 'Living Room', nl: 'Woonkamer', es: 'Sala' }, category: 'house', type: 'word' },
    { id: 'hse-6', papiamento: 'Bentana', meanings: { en: 'Window', nl: 'Raam', es: 'Ventana' }, category: 'house', type: 'word' },
    { id: 'hse-7', papiamento: 'Porta', meanings: { en: 'Door', nl: 'Deur', es: 'Puerta' }, category: 'house', type: 'word' },
    { id: 'hse-8', papiamento: 'Chikí', meanings: { en: 'Small', nl: 'Klein', es: 'Pequeño' }, category: 'house', type: 'word' },
    { id: 'hse-9', papiamento: 'Grandi', meanings: { en: 'Big', nl: 'Groot', es: 'Grande' }, category: 'house', type: 'word' },
    { id: 'hse-10', papiamento: 'Esaki ta mi kas', meanings: { en: 'This is my house', nl: 'Dit is mijn huis', es: 'Esta es mi casa' }, category: 'house', type: 'sentence' },
    { id: 'hse-11', papiamento: 'E kushina ta grandi', meanings: { en: 'The kitchen is big', nl: 'De keuken is groot', es: 'La cocina es grande' }, category: 'house', type: 'sentence' },

    // --- DIRECTIONS ---
    { id: 'dir-1', papiamento: 'Robes', meanings: { en: 'Left', nl: 'Links', es: 'Izquierda' }, category: 'directions', type: 'word' },
    { id: 'dir-2', papiamento: 'Drechi', meanings: { en: 'Right', nl: 'Rechts', es: 'Derecha' }, category: 'directions', type: 'word' },
    { id: 'dir-3', papiamento: 'Padilanti', meanings: { en: 'Straight', nl: 'Rechtdoor', es: 'Derecho' }, category: 'directions', type: 'word' },
    { id: 'dir-4', papiamento: 'Sigui padilanti', meanings: { en: 'Go straight', nl: 'Ga rechtdoor', es: 'Sigue derecho' }, category: 'directions', type: 'phrase' },
    { id: 'dir-5', papiamento: 'Bira robes', meanings: { en: 'Turn left', nl: 'Sla linksaf', es: 'Gira a la izquierda' }, category: 'directions', type: 'phrase' },
    { id: 'dir-7', papiamento: 'Aki', meanings: { en: 'Here', nl: 'Hier', es: 'Aquí' }, category: 'directions', type: 'word' },
    { id: 'dir-8', papiamento: 'Aya', meanings: { en: 'There', nl: 'Daar', es: 'Allí' }, category: 'directions', type: 'word' },
    { id: 'dir-9', papiamento: 'Unda e laman ta?', meanings: { en: 'Where is the sea?', nl: 'Waar is de zee?', es: '¿Dónde está el mar?' }, category: 'directions', type: 'sentence' },
    { id: 'dir-10', papiamento: 'E ta serka', meanings: { en: 'It is close', nl: 'Het is dichtbij', es: 'Está cerca' }, category: 'directions', type: 'sentence' },

    // --- PLACES ---
    { id: 'plc-1', papiamento: 'Skol', meanings: { en: 'School', nl: 'School', es: 'Escuela' }, category: 'places', type: 'word' },
    { id: 'plc-2', papiamento: 'Hospital', meanings: { en: 'Hospital', nl: 'Ziekenhuis', es: 'Hospital' }, category: 'places', type: 'word' },
    { id: 'plc-3', papiamento: 'Botika', meanings: { en: 'Pharmacy', nl: 'Apotheek', es: 'Farmacia' }, category: 'places', type: 'word' },
    { id: 'plc-4', papiamento: 'Supermerkado', meanings: { en: 'Supermarket', nl: 'Supermarkt', es: 'Supermercado' }, category: 'places', type: 'word' },
    { id: 'plc-5', papiamento: 'Brùg', meanings: { en: 'Bridge', nl: 'Brug', es: 'Puente' }, category: 'places', type: 'word' },
    { id: 'plc-6', papiamento: 'Kaya', meanings: { en: 'Street', nl: 'Straat', es: 'Calle' }, category: 'places', type: 'word' },
    { id: 'plc-7', papiamento: 'Aeropuerto', meanings: { en: 'Airport', nl: 'Vliegveld', es: 'Aeropuerto' }, category: 'places', type: 'word' },
    { id: 'plc-8', papiamento: 'Mi ta bai skol', meanings: { en: 'I go to school', nl: 'Ik ga naar school', es: 'Voy a la escuela' }, category: 'places', type: 'sentence' },
    { id: 'plc-9', papiamento: 'E hotèl ta grandi', meanings: { en: 'The hotel is big', nl: 'Het hotel is groot', es: 'El hotel es grande' }, category: 'places', type: 'sentence' },
    { id: 'plc-10', papiamento: 'E kaya ta largu', meanings: { en: 'The street is long', nl: 'De straat is lang', es: 'La calle es larga' }, category: 'places', type: 'sentence' },

    // --- PRONOUNS ---
    { id: 'pro-1', papiamento: 'Mi', meanings: { en: 'I', nl: 'Ik', es: 'Yo' }, category: 'pronouns', type: 'word' },
    { id: 'pro-2', papiamento: 'Bo', meanings: { en: 'You', nl: 'Jij', es: 'Tú' }, category: 'pronouns', type: 'word' },
    { id: 'pro-3', papiamento: 'E', meanings: { en: 'He/She/It', nl: 'Hij/Zij/Het', es: 'Él/Ella/Eso' }, category: 'pronouns', type: 'word' },
    { id: 'pro-4', papiamento: 'Nos', meanings: { en: 'We', nl: 'Wij', es: 'Nosotros' }, category: 'pronouns', type: 'word' },
    { id: 'pro-5', papiamento: 'Boso', meanings: { en: 'You (All)', nl: 'Jullie', es: 'Ustedes' }, category: 'pronouns', type: 'word' },
    { id: 'pro-6', papiamento: 'Nan', meanings: { en: 'They', nl: 'Zij', es: 'Ellos' }, category: 'pronouns', type: 'word' },
    { id: 'pro-8', papiamento: 'Bo tin', meanings: { en: 'You have', nl: 'Jij hebt', es: 'Tú tienes' }, category: 'pronouns', type: 'phrase' },
    { id: 'pro-9', papiamento: 'Nos ta bai', meanings: { en: 'We go', nl: 'Wij gaan', es: 'Nosotros vamos' }, category: 'pronouns', type: 'sentence' },

    // --- VERBS ---
    { id: 'v-1', papiamento: 'Ta', meanings: { en: 'To be', nl: 'Zijn', es: 'Ser/Estar' }, category: 'verbs', type: 'word' },
    { id: 'v-2', papiamento: 'Tin', meanings: { en: 'To have', nl: 'Hebben', es: 'Tener' }, category: 'verbs', type: 'word' },
    { id: 'v-3', papiamento: 'Bai', meanings: { en: 'To go', nl: 'Gaan', es: 'Ir' }, category: 'verbs', type: 'word' },
    { id: 'v-4', papiamento: 'Bin', meanings: { en: 'To come', nl: 'Komen', es: 'Venir' }, category: 'verbs', type: 'word' },
    { id: 'v-5', papiamento: 'Kome', meanings: { en: 'To eat', nl: 'Eten', es: 'Comer' }, category: 'verbs', type: 'word' },
    { id: 'v-6', papiamento: 'Bebe', meanings: { en: 'To drink', nl: 'Drinken', es: 'Beber' }, category: 'verbs', type: 'word' },
    { id: 'v-7', papiamento: 'Drumi', meanings: { en: 'To sleep', nl: 'Slapen', es: 'Dormir' }, category: 'verbs', type: 'word' },
    { id: 'v-8', papiamento: 'E {ta} drumi', meanings: { en: 'He sleeps', nl: 'Hij slaapt', es: 'Él duerme' }, category: 'verbs', type: 'sentence' },
    { id: 'v-9', papiamento: 'Mi {ta} bai', meanings: { en: 'I am going', nl: 'Ik ga', es: 'Voy' }, category: 'verbs', type: 'sentence' },
    { id: 'v-10', papiamento: 'Bo {tin} plaka', meanings: { en: 'You have money', nl: 'Jij hebt geld', es: 'Tienes dinero' }, category: 'verbs', type: 'sentence' },
    { id: 'v-11', papiamento: 'Nos {ta} famia', meanings: { en: 'We are family', nl: 'Wij zijn familie', es: 'Somos familia' }, category: 'verbs', type: 'sentence' },

    // --- VERBS MASTERY EXPANSION ---
    { id: 'v-12', papiamento: 'Traha', meanings: { en: 'To work', nl: 'Werken', es: 'Trabajar' }, category: 'verbs', type: 'word', tags: ['verb-training', 'verb-word'] },
    { id: 'v-13', papiamento: 'Baila', meanings: { en: 'To dance', nl: 'Dansen', es: 'Bailar' }, category: 'verbs', type: 'word', tags: ['verb-training', 'verb-word'] },
    { id: 'v-14', papiamento: 'Lesa', meanings: { en: 'To read', nl: 'Lezen', es: 'Leer' }, category: 'verbs', type: 'word', tags: ['verb-training', 'verb-word'] },
    { id: 'v-15', papiamento: 'Skirbi', meanings: { en: 'To write', nl: 'Schrijven', es: 'Escribir' }, category: 'verbs', type: 'word', tags: ['verb-training', 'verb-word'] },
    { id: 'v-16', papiamento: 'Kore', meanings: { en: 'To run/drive', nl: 'Rennen/Rijden', es: 'Correr/Conducir' }, category: 'verbs', type: 'word', tags: ['verb-training', 'verb-word'] },
    { id: 'v-17', papiamento: 'Hunga', meanings: { en: 'To play', nl: 'Spelen', es: 'Jugar' }, category: 'verbs', type: 'word', tags: ['verb-training', 'verb-word'] },
    { id: 'v-18', papiamento: 'Siña', meanings: { en: 'To learn', nl: 'Leren', es: 'Aprender' }, category: 'verbs', type: 'word', tags: ['verb-training', 'verb-word'] },
    { id: 'v-19', papiamento: 'Wak', meanings: { en: 'To watch/look', nl: 'Kijken', es: 'Mirar' }, category: 'verbs', type: 'word', tags: ['verb-training', 'verb-word'] },
    { id: 'v-20', papiamento: 'Kumpra', meanings: { en: 'To buy', nl: 'Kopen', es: 'Comprar' }, category: 'verbs', type: 'word', tags: ['verb-training', 'verb-word'] },

    // Verb Sentences (Training)
    { id: 'v-sent-1', papiamento: 'Mi ta {traha} tur dia', meanings: { en: 'I work every day', nl: 'Ik werk elke dag', es: 'Yo trabajo todos los días' }, category: 'verbs', type: 'sentence', tags: ['verb-training', 'verb-sentence', 'cloze'] },
    { id: 'v-sent-2', papiamento: 'Nos ta {baila} salsa', meanings: { en: 'We dance salsa', nl: 'Wij dansen salsa', es: 'Bailamos salsa' }, category: 'verbs', type: 'sentence', tags: ['verb-training', 'verb-sentence', 'cloze'] },
    { id: 'v-sent-3', papiamento: 'E ta {lesa} un buki', meanings: { en: 'He reads a book', nl: 'Hij leest een boek', es: 'Él lee un libro' }, category: 'verbs', type: 'sentence', tags: ['verb-training', 'verb-sentence', 'cloze'] },
    { id: 'v-sent-4', papiamento: 'Bo ta {skirbi} bon', meanings: { en: 'You write well', nl: 'Jij schrijft goed', es: 'Escribes bien' }, category: 'verbs', type: 'sentence', tags: ['verb-training', 'verb-sentence', 'cloze'] },
    { id: 'v-sent-5', papiamento: 'Mi ta {kore} mainta', meanings: { en: 'I run in the morning', nl: 'Ik ren \'s ochtends', es: 'Corro por la mañana' }, category: 'verbs', type: 'sentence', tags: ['verb-training', 'verb-sentence', 'cloze'] },
    { id: 'v-sent-6', papiamento: 'E mucha ta {hunga}', meanings: { en: 'The child is playing', nl: 'Het kind speelt', es: 'El niño está jugando' }, category: 'verbs', type: 'sentence', tags: ['verb-training', 'verb-sentence', 'cloze'] },
    { id: 'v-sent-7', papiamento: 'Nos ta {siña} Papiamentu', meanings: { en: 'We are learning Papiamentu', nl: 'Wij leren Papiaments', es: 'Estamos aprendiendo Papiamento' }, category: 'verbs', type: 'sentence', tags: ['verb-training', 'verb-sentence', 'cloze'] },
    { id: 'v-sent-8', papiamento: 'Bo ta {wak} TV?', meanings: { en: 'Are you watching TV?', nl: 'Kijk je naar de tv?', es: '¿Ves la televisión?' }, category: 'verbs', type: 'sentence', tags: ['verb-training', 'verb-sentence', 'cloze'] },

    // --- PREPOSITIONS ---
    { id: 'prep-1', papiamento: 'Riba', meanings: { en: 'On', nl: 'Op', es: 'Sobre' }, category: 'prepositions', type: 'word' },
    { id: 'prep-2', papiamento: 'Bou di', meanings: { en: 'Under', nl: 'Onder', es: 'Debajo de' }, category: 'prepositions', type: 'word' },
    { id: 'prep-3', papiamento: 'Promé', meanings: { en: 'Before', nl: 'Voor', es: 'Antes' }, category: 'prepositions', type: 'word' },
    { id: 'prep-4', papiamento: 'Después', meanings: { en: 'After', nl: 'Na', es: 'Después' }, category: 'prepositions', type: 'word' },

    // --- SHOPPING ---
    { id: 'shop-1', papiamento: 'Kuantu', meanings: { en: 'How much', nl: 'Hoeveel', es: 'Cuánto' }, category: 'shopping', type: 'word' },
    { id: 'shop-2', papiamento: 'Barata', meanings: { en: 'Cheap', nl: 'Goedkoop', es: 'Barato' }, category: 'shopping', type: 'word' },
    { id: 'shop-3', papiamento: 'Karu', meanings: { en: 'Expensive', nl: 'Duur', es: 'Caro' }, category: 'shopping', type: 'word' },
    { id: 'shop-4', papiamento: 'Plaka', meanings: { en: 'Money', nl: 'Geld', es: 'Dinero' }, category: 'shopping', type: 'word' },
    { id: 'shop-5', papiamento: 'Kuantu esaki ta kosta?', meanings: { en: 'How much does this cost?', nl: 'Hoeveel kost dit?', es: '¿Cuánto cuesta esto?' }, category: 'shopping', type: 'sentence' },

    // --- WORK & BUSINESS (B1) ---
    { id: 'wrk-1', papiamento: 'Trabou', meanings: { en: 'Work/Job', nl: 'Werk', es: 'Trabajo' }, category: 'work', type: 'word' },
    { id: 'wrk-2', papiamento: 'Ofisina', meanings: { en: 'Office', nl: 'Kantoor', es: 'Oficina' }, category: 'work', type: 'word' },
    { id: 'wrk-3', papiamento: 'Reunion', meanings: { en: 'Meeting', nl: 'Vergadering', es: 'Reunión' }, category: 'work', type: 'word' },
    { id: 'wrk-4', papiamento: 'Hefe', meanings: { en: 'Boss', nl: 'Baas', es: 'Jefe' }, category: 'work', type: 'word' },
    { id: 'wrk-5', papiamento: 'Kolega', meanings: { en: 'Colleague', nl: 'Collega', es: 'Colega' }, category: 'work', type: 'word' },
    { id: 'wrk-6', papiamento: 'Solisitá', meanings: { en: 'To apply (job)', nl: 'Solliciteren', es: 'Solicitar' }, category: 'work', type: 'word' },
    { id: 'wrk-7', papiamento: 'Mi tin un {reunion} importante', meanings: { en: 'I have an important meeting', nl: 'Ik heb een belangrijke vergadering', es: 'Tengo una reunión importante' }, category: 'work', type: 'sentence' },
    { id: 'wrk-8', papiamento: 'E {trabou} ta difísil', meanings: { en: 'The work is difficult', nl: 'Het werk is moeilijk', es: 'El trabajo es difícil' }, category: 'work', type: 'sentence' },

    // --- HEALTH (B1) ---
    { id: 'hlt-1', papiamento: 'Salú', meanings: { en: 'Health', nl: 'Gezondheid', es: 'Salud' }, category: 'health', type: 'word' },
    { id: 'hlt-2', papiamento: 'Dòkter', meanings: { en: 'Doctor', nl: 'Dokter', es: 'Doctor' }, category: 'health', type: 'word' },
    { id: 'hlt-3', papiamento: 'Doló', meanings: { en: 'Pain', nl: 'Pijn', es: 'Dolor' }, category: 'health', type: 'word' },
    { id: 'hlt-4', papiamento: 'Remedi', meanings: { en: 'Medicine', nl: 'Medicijn', es: 'Medicina' }, category: 'health', type: 'word' },
    { id: 'hlt-5', papiamento: 'Kurpa', meanings: { en: 'Body', nl: 'Lichaam', es: 'Cuerpo' }, category: 'health', type: 'word' },
    { id: 'hlt-6', papiamento: 'Mi tin {doló} di kabes', meanings: { en: 'I have a headache', nl: 'Ik heb hoofdpijn', es: 'Tengo dolor de cabeza' }, category: 'health', type: 'sentence' },
    { id: 'hlt-7', papiamento: 'Mi mester bai {dòkter}', meanings: { en: 'I need to go to the doctor', nl: 'Ik moet naar de dokter', es: 'Necesito ir al médico' }, category: 'health', type: 'sentence' },

    // --- NATURE & ENVIRONMENT (B1) ---
    { id: 'nat-1', papiamento: 'Naturalesa', meanings: { en: 'Nature', nl: 'Natuur', es: 'Naturaleza' }, category: 'nature', type: 'word' },
    { id: 'nat-2', papiamento: 'Palu', meanings: { en: 'Tree', nl: 'Boom', es: 'Árbol' }, category: 'nature', type: 'word' },
    { id: 'nat-3', papiamento: 'Flor', meanings: { en: 'Flower', nl: 'Bloem', es: 'Flor' }, category: 'nature', type: 'word' },
    { id: 'nat-4', papiamento: 'Seru', meanings: { en: 'Hill/Mountain', nl: 'Heuvel/Berg', es: 'Colina/Montaña' }, category: 'nature', type: 'word' },
    { id: 'nat-5', papiamento: 'Bestia', meanings: { en: 'Animal', nl: 'Dier', es: 'Animal' }, category: 'nature', type: 'word' },
    { id: 'nat-6', papiamento: 'E {naturalesa} di Aruba ta bunita', meanings: { en: 'The nature of Aruba is beautiful', nl: 'De natuur van Aruba is mooi', es: 'La naturaleza de Aruba es hermosa' }, category: 'nature', type: 'sentence' },

    // --- ABSTRACT & OPINIONS (B2) ---
    { id: 'abs-1', papiamento: 'Opinion', meanings: { en: 'Opinion', nl: 'Mening', es: 'Opinión' }, category: 'abstract', type: 'word' },
    { id: 'abs-2', papiamento: 'Pensamentu', meanings: { en: 'Thought', nl: 'Gedachte', es: 'Pensamiento' }, category: 'abstract', type: 'word' },
    { id: 'abs-3', papiamento: 'Libertat', meanings: { en: 'Freedom', nl: 'Vrijheid', es: 'Libertad' }, category: 'abstract', type: 'word' },
    { id: 'abs-4', papiamento: 'Futuro', meanings: { en: 'Future', nl: 'Toekomst', es: 'Futuro' }, category: 'abstract', type: 'word' },
    { id: 'abs-5', papiamento: 'Kere', meanings: { en: 'To believe', nl: 'Geloven', es: 'Creer' }, category: 'abstract', type: 'word' },
    { id: 'abs-6', papiamento: 'Segun mi {opinion}', meanings: { en: 'In my opinion', nl: 'Naar mijn mening', es: 'En mi opinión' }, category: 'abstract', type: 'sentence' },
    { id: 'abs-7', papiamento: 'Nos mester pensa riba e {futuro}', meanings: { en: 'We must think about the future', nl: 'Wij moeten denken aan de toekomst', es: 'Debemos pensar en el futuro' }, category: 'abstract', type: 'sentence' },
    { id: 'abs-8', papiamento: 'Kiko ta bo {pensamentu}?', meanings: { en: 'What is your thought?', nl: 'Wat is jouw gedachte?', es: '¿Cuál es tu pensamiento?' }, category: 'abstract', type: 'sentence' },

    // --- SOCIAL & CONVERSATION (B1/B2) ---
    { id: 'soc-1', papiamento: 'Nòmber', meanings: { en: 'Name', nl: 'Naam', es: 'Nombre' }, category: 'social', type: 'word' },
    { id: 'soc-2', papiamento: 'Biba', meanings: { en: 'To live', nl: 'Wonen', es: 'Vivir' }, category: 'social', type: 'word' },
    { id: 'soc-3', papiamento: 'Papia', meanings: { en: 'To speak', nl: 'Spreken', es: 'Hablar' }, category: 'social', type: 'word' },
    { id: 'soc-4', papiamento: 'Komprendé', meanings: { en: 'To understand', nl: 'Begrijpen', es: 'Entender' }, category: 'social', type: 'word' },
    { id: 'soc-5', papiamento: 'Mi yama...', meanings: { en: 'My name is...', nl: 'Ik heet...', es: 'Me llamo...' }, category: 'social', type: 'phrase' },
    { id: 'soc-6', papiamento: 'Kon yama bo?', meanings: { en: 'What is your name?', nl: 'Hoe heet jij?', es: '¿Cómo te llamas?' }, category: 'social', type: 'sentence' },
    { id: 'soc-7', papiamento: 'Unda bo ta {biba}?', meanings: { en: 'Where do you live?', nl: 'Waar woon je?', es: '¿Dónde vives?' }, category: 'social', type: 'sentence' },
    { id: 'soc-8', papiamento: 'Mi ta biba na Aruba', meanings: { en: 'I live in Aruba', nl: 'Ik woon op Aruba', es: 'Vivo en Aruba' }, category: 'social', type: 'sentence' },
    { id: 'soc-9', papiamento: 'Bo ta {papia} Papiamentu?', meanings: { en: 'Do you speak Papiamentu?', nl: 'Spreek je Papiaments?', es: '¿Hablas Papiamento?' }, category: 'social', type: 'sentence' },
    { id: 'soc-10', papiamento: 'Mi no ta {komprendé} bon', meanings: { en: 'I do not understand well', nl: 'Ik begrijp het niet goed', es: 'No entiendo bien' }, category: 'social', type: 'sentence' },
    { id: 'soc-11', papiamento: 'Pasa un bon dia', meanings: { en: 'Have a nice day', nl: 'Fijne dag', es: 'Que tengas un buen día' }, category: 'social', type: 'phrase' },

    // --- GRAMMAR: TENSES (Ta / Tabata / A / Lo) ---
    // Verb: Bai (To go)
    { id: 'gram-go-pres', papiamento: 'Mi {ta} bai skol', meanings: { en: 'I am going to school', nl: 'Ik ga naar school', es: 'Voy a la escuela' }, category: 'verbs', type: 'sentence', tags: ['grammar-ta'] },
    { id: 'gram-go-past-imp', papiamento: 'Mi {tabata} bai skol', meanings: { en: 'I was going to school', nl: 'Ik ging naar school', es: 'Iba a la escuela' }, category: 'verbs', type: 'sentence', tags: ['grammar-tabata'] },
    { id: 'gram-go-past-perf', papiamento: 'Mi {a} bai skol', meanings: { en: 'I went to school', nl: 'Ik ben naar school gegaan', es: 'Fui a la escuela' }, category: 'verbs', type: 'sentence', tags: ['grammar-a'] },
    { id: 'gram-go-fut', papiamento: '{Lo} mi bai skol', meanings: { en: 'I will go to school', nl: 'Ik zal naar school gaan', es: 'Iré a la escuela' }, category: 'verbs', type: 'sentence', tags: ['grammar-lo'] },

    // Verb: Kome (To eat)
    { id: 'gram-eat-pres', papiamento: 'E {ta} kome pan', meanings: { en: 'He is eating bread', nl: 'Hij eet brood', es: 'Él está comiendo pan' }, category: 'verbs', type: 'sentence', tags: ['grammar-ta'] },
    { id: 'gram-eat-past-imp', papiamento: 'E {tabata} kome pan', meanings: { en: 'He was eating bread', nl: 'Hij was brood aan het eten', es: 'Él estaba comiendo pan' }, category: 'verbs', type: 'sentence', tags: ['grammar-tabata'] },
    { id: 'gram-eat-past-perf', papiamento: 'E {a} kome pan', meanings: { en: 'He ate bread', nl: 'Hij heeft brood gegeten', es: 'Él comió pan' }, category: 'verbs', type: 'sentence', tags: ['grammar-a'] },
    { id: 'gram-eat-fut', papiamento: '{Lo} e kome pan', meanings: { en: 'He will eat bread', nl: 'Hij zal brood eten', es: 'Él comerá pan' }, category: 'verbs', type: 'sentence', tags: ['grammar-lo'] },

    // Verb: Drumi (To sleep)
    { id: 'gram-sleep-pres', papiamento: 'Nan {ta} drumi', meanings: { en: 'They are sleeping', nl: 'Zij slapen', es: 'Ellos están durmiendo' }, category: 'verbs', type: 'sentence', tags: ['grammar-ta'] },
    { id: 'gram-sleep-past-imp', papiamento: 'Nan {tabata} drumi', meanings: { en: 'They were sleeping', nl: 'Zij waren aan het slapen', es: 'Ellos estaban durmiendo' }, category: 'verbs', type: 'sentence', tags: ['grammar-tabata'] },
    { id: 'gram-sleep-fut', papiamento: '{Lo} nan drumi', meanings: { en: 'They will sleep', nl: 'Zij zullen slapen', es: 'Ellos dormirán' }, category: 'verbs', type: 'sentence', tags: ['grammar-lo'] },

    // Verb: Traha (To work) - NEW
    { id: 'gram-work-pres', papiamento: 'Mi {ta} traha duru', meanings: { en: 'I am working hard', nl: 'Ik werk hard', es: 'Estoy trabajando duro' }, category: 'verbs', type: 'sentence', tags: ['grammar-ta'] },
    { id: 'gram-work-past', papiamento: 'Mi {tabata} traha ayera', meanings: { en: 'I was working yesterday', nl: 'Ik was gisteren aan het werken', es: 'Estaba trabajando ayer' }, category: 'verbs', type: 'sentence', tags: ['grammar-tabata'] },
    { id: 'gram-work-fut', papiamento: '{Lo} mi traha mañan', meanings: { en: 'I will work tomorrow', nl: 'Ik zal morgen werken', es: 'Trabajaré mañana' }, category: 'verbs', type: 'sentence', tags: ['grammar-lo'] },

    // Verb: Hunga (To play) - NEW
    { id: 'gram-play-pres', papiamento: 'E mucha {ta} hunga', meanings: { en: 'The child is playing', nl: 'Het kind speelt', es: 'El niño está jugando' }, category: 'verbs', type: 'sentence', tags: ['grammar-ta'] },
    { id: 'gram-play-past', papiamento: 'E mucha {tabata} hunga', meanings: { en: 'The child was playing', nl: 'Het kind was aan het spelen', es: 'El niño estaba jugando' }, category: 'verbs', type: 'sentence', tags: ['grammar-tabata'] },
    { id: 'gram-play-fut', papiamento: '{Lo} e mucha hunga', meanings: { en: 'The child will play', nl: 'Het kind zal spelen', es: 'El niño jugará' }, category: 'verbs', type: 'sentence', tags: ['grammar-lo'] },

    // Verb: Lesa (To read) - NEW
    { id: 'gram-read-pres', papiamento: 'Nos {ta} lesa buki', meanings: { en: 'We are reading a book', nl: 'Wij lezen een boek', es: 'Estamos leyendo un libro' }, category: 'verbs', type: 'sentence', tags: ['grammar-ta'] },
    { id: 'gram-read-past', papiamento: 'Nos {a} lesa e buki', meanings: { en: 'We read the book (finished)', nl: 'Wij hebben het boek gelezen', es: 'Leímos el libro' }, category: 'verbs', type: 'sentence', tags: ['grammar-a'] },
    { id: 'gram-read-fut', papiamento: 'Nos {lo} lesa después', meanings: { en: 'We will read later', nl: 'Wij zullen later lezen', es: 'Leeremos más tarde' }, category: 'verbs', type: 'sentence', tags: ['grammar-lo'] },

    // --- FOOD: DRINKS ---
    { id: 'drk-1', papiamento: 'Refresko', meanings: { en: 'Soda', nl: 'Frisdrank', es: 'Refresco' }, category: 'food', type: 'word', tags: ['drinks'] },
    { id: 'drk-2', papiamento: 'Djus', meanings: { en: 'Juice', nl: 'Sap', es: 'Jugo' }, category: 'food', type: 'word', tags: ['drinks'] },
    { id: 'drk-3', papiamento: 'Lechi', meanings: { en: 'Milk', nl: 'Melk', es: 'Leche' }, category: 'food', type: 'word', tags: ['drinks'] },
    {
        id: 'drk-4', papiamento: 'Batido', meanings: { en: 'Shake', nl: 'Shake', es: 'Batido' }, category: 'food', type: 'word', tags: ['drinks'],
        culturalTip: {
            en: "A 'Batido' is a popular fresh fruit smoothie often made with milk and sugar found at roadside snacks.",
            nl: "Een 'Batido' is een populaire verse fruitsmoothie met melk en suiker, vaak bij snacksongs te vinden.",
            es: "Un 'Batido' es un licuado de fruta fresca popular, a menudo con leche y azúcar."
        }
    },
    { id: 'drk-5', papiamento: 'Mi kièr un {refresko}', meanings: { en: 'I want a soda', nl: 'Ik wil een frisdrank', es: 'Quiero un refresco' }, category: 'food', type: 'sentence', tags: ['drinks'] },

    // --- FOOD: SUPERMARKET ---
    { id: 'sup-1', papiamento: 'Garoshi', meanings: { en: 'Cart', nl: 'Karretje', es: 'Carrito' }, category: 'shopping', type: 'word', tags: ['supermarket'] },
    { id: 'sup-2', papiamento: 'Kaha', meanings: { en: 'Cash register', nl: 'Kassa', es: 'Caja' }, category: 'shopping', type: 'word', tags: ['supermarket'] },
    { id: 'sup-3', papiamento: 'Bolsa', meanings: { en: 'Bag', nl: 'Tas', es: 'Bolsa' }, category: 'shopping', type: 'word', tags: ['supermarket'] },
    { id: 'sup-4', papiamento: 'Oferta', meanings: { en: 'Offer', nl: 'Aanbieding', es: 'Oferta' }, category: 'shopping', type: 'word', tags: ['supermarket'] },
    { id: 'sup-5', papiamento: 'Unda e {lechi} ta?', meanings: { en: 'Where is the milk?', nl: 'Waar is de melk?', es: '¿Dónde está la leche?' }, category: 'shopping', type: 'sentence', tags: ['supermarket'] },
    { id: 'sup-6', papiamento: 'Mi mester un {bolsa}', meanings: { en: 'I need a bag', nl: 'Ik heb een tas nodig', es: 'Necesito una bolsa' }, category: 'shopping', type: 'sentence', tags: ['supermarket'] },

    // --- SOCIAL: GENERAL ---
    { id: 'soc-gen-4', papiamento: 'Kon yama bo?', meanings: { en: 'What is your name?', nl: 'Hoe heet je?', es: '¿Cómo te llamas?' }, category: 'social', type: 'phrase' },
    { id: 'soc-gen-5', papiamento: 'Mi nòmber ta...', meanings: { en: 'My name is...', nl: 'Mijn naam is...', es: 'Mi nombre es...' }, category: 'social', type: 'phrase' },
    { id: 'soc-gen-6', papiamento: 'Di nada', meanings: { en: 'You are welcome', nl: 'Graag gedaan', es: 'De nada' }, category: 'social', type: 'phrase' },
    { id: 'soc-gen-7', papiamento: 'Pordon', meanings: { en: 'Excuse me', nl: 'Pardon', es: 'Perdón' }, category: 'social', type: 'word' },
    { id: 'soc-gen-8', papiamento: 'Ata', meanings: { en: 'Here is/There is', nl: 'Hier is/Daar is', es: 'Aquí está' }, category: 'social', type: 'word' },

    // --- ANIMALS (NATURE EXPANSION) ---
    { id: 'ani-1', papiamento: 'Kachó', meanings: { en: 'Dog', nl: 'Hond', es: 'Perro' }, category: 'nature', type: 'word' },
    { id: 'ani-2', papiamento: 'Pushi', meanings: { en: 'Cat', nl: 'Kat', es: 'Gato' }, category: 'nature', type: 'word' },
    { id: 'ani-3', papiamento: 'Kabai', meanings: { en: 'Horse', nl: 'Paard', es: 'Caballo' }, category: 'nature', type: 'word' },
    {
        id: 'ani-4', papiamento: 'Yuana', meanings: { en: 'Iguana', nl: 'Leguaan', es: 'Iguana' }, category: 'nature', type: 'word',
        culturalTip: {
            en: "Iguana soup ('Sòpi di Yuana') is a traditional delicacy believed to give strength.",
            nl: "Leguanensoep ('Sòpi di Yuana') is een traditionele delicatesse waarvan wordt gedacht dat het kracht geeft.",
            es: "La sopa de iguana ('Sòpi di Yuana') es una delicia tradicional que se cree da fuerza."
        }
    },
    { id: 'ani-5', papiamento: 'Turtuga', meanings: { en: 'Turtle', nl: 'Schildpad', es: 'Tortuga' }, category: 'nature', type: 'word' },
    { id: 'ani-6', papiamento: 'Prikichi', meanings: { en: 'Parakeet', nl: 'Parkiet', es: 'Perico' }, category: 'nature', type: 'word' },
    { id: 'ani-8', papiamento: 'Baka', meanings: { en: 'Cow', nl: 'Koe', es: 'Vaca' }, category: 'nature', type: 'word' },
    { id: 'ani-9', papiamento: 'Blenchi', meanings: { en: 'Hummingbird', nl: 'Kolibrie', es: 'Colibrí' }, category: 'nature', type: 'word' },
    { id: 'ani-10', papiamento: 'Chuchubi', meanings: { en: 'Mockingbird', nl: 'Spotlijster', es: 'Sinsonte' }, category: 'nature', type: 'word' },

    // --- CITY & PLACES EXPANSION ---
    { id: 'city-1', papiamento: 'Banko', meanings: { en: 'Bank', nl: 'Bank', es: 'Banco' }, category: 'places', type: 'word' },
    { id: 'city-2', papiamento: 'Parke', meanings: { en: 'Park', nl: 'Park', es: 'Parque' }, category: 'places', type: 'word' },
    { id: 'city-3', papiamento: 'Warda di Polis', meanings: { en: 'Police Station', nl: 'Politiebureau', es: 'Estación de Policía' }, category: 'places', type: 'word' },
    { id: 'city-4', papiamento: 'Misa', meanings: { en: 'Church', nl: 'Kerk', es: 'Iglesia' }, category: 'places', type: 'word' },
    { id: 'city-5', papiamento: 'Biblioteka', meanings: { en: 'Library', nl: 'Bibliotheek', es: 'Biblioteca' }, category: 'places', type: 'word' },
    { id: 'city-6', papiamento: 'Sinema', meanings: { en: 'Cinema', nl: 'Bioscoop', es: 'Cine' }, category: 'places', type: 'word' },
    { id: 'city-7', papiamento: 'Stadion', meanings: { en: 'Stadium', nl: 'Stadion', es: 'Estadio' }, category: 'places', type: 'word' },
    { id: 'city-8', papiamento: 'Stashon di gasolin', meanings: { en: 'Gas Station', nl: 'Benzinestation', es: 'Gasolinera' }, category: 'places', type: 'word' },

    // --- TRAVEL EXPANSION ---
    { id: 'trav-1', papiamento: 'Pasport', meanings: { en: 'Passport', nl: 'Paspoort', es: 'Pasaporte' }, category: 'places', type: 'word', tags: ['travel'] },
    { id: 'trav-2', papiamento: 'Maleta', meanings: { en: 'Suitcase', nl: 'Koffer', es: 'Maleta' }, category: 'places', type: 'word', tags: ['travel'] },
    { id: 'trav-3', papiamento: 'Avion', meanings: { en: 'Airplane', nl: 'Vliegtuig', es: 'Avión' }, category: 'places', type: 'word', tags: ['travel'] },
    { id: 'trav-4', papiamento: 'Boto', meanings: { en: 'Boat', nl: 'Boot', es: 'Barco' }, category: 'places', type: 'word', tags: ['travel'] },
    { id: 'trav-5', papiamento: 'Karchi', meanings: { en: 'Ticket', nl: 'Kaartje', es: 'Boleto' }, category: 'places', type: 'word', tags: ['travel'] },
    { id: 'trav-6', papiamento: 'Taksi', meanings: { en: 'Taxi', nl: 'Taxi', es: 'Taxi' }, category: 'places', type: 'word', tags: ['travel'] },
    { id: 'trav-7', papiamento: 'Bus', meanings: { en: 'Bus', nl: 'Bus', es: 'Autobús' }, category: 'places', type: 'word', tags: ['travel'] },
    { id: 'trav-8', papiamento: 'Yabi', meanings: { en: 'Key', nl: 'Sleutel', es: 'Llave' }, category: 'places', type: 'word', tags: ['travel'] },

    // --- FOOD INGREDIENTS EXPANSION ---
    { id: 'food-ing-1', papiamento: 'Suku', meanings: { en: 'Sugar', nl: 'Suiker', es: 'Azúcar' }, category: 'food', type: 'word' },
    { id: 'food-ing-2', papiamento: 'Salu', meanings: { en: 'Salt', nl: 'Zout', es: 'Sal' }, category: 'food', type: 'word' },
    { id: 'food-ing-3', papiamento: 'Peper', meanings: { en: 'Pepper', nl: 'Peper', es: 'Pimienta' }, category: 'food', type: 'word' },
    { id: 'food-ing-4', papiamento: 'Manteka', meanings: { en: 'Butter', nl: 'Boter', es: 'Mantequilla' }, category: 'food', type: 'word' },
    { id: 'food-ing-5', papiamento: 'Keshi', meanings: { en: 'Cheese', nl: 'Kaas', es: 'Queso' }, category: 'food', type: 'word' },
    { id: 'food-ing-6', papiamento: 'Ham', meanings: { en: 'Ham', nl: 'Ham', es: 'Jamón' }, category: 'food', type: 'word' },
    { id: 'food-ing-7', papiamento: 'Webu', meanings: { en: 'Egg', nl: 'Ei', es: 'Huevo' }, category: 'food', type: 'word' },
    { id: 'food-ing-8', papiamento: 'Karni', meanings: { en: 'Meat', nl: 'Vlees', es: 'Carne' }, category: 'food', type: 'word' },
    { id: 'food-ing-9', papiamento: 'Fruta', meanings: { en: 'Fruit', nl: 'Fruit', es: 'Fruta' }, category: 'food', type: 'word' },
    { id: 'food-ing-10', papiamento: 'Bèrdura', meanings: { en: 'Vegetables', nl: 'Groenten', es: 'Verduras' }, category: 'food', type: 'word' },

    // --- FRUITS & VEGGIES ---
    { id: 'food-fv-1', papiamento: 'Apel', meanings: { en: 'Apple', nl: 'Appel', es: 'Manzana' }, category: 'food', type: 'word' },
    { id: 'food-fv-2', papiamento: 'Bakoba', meanings: { en: 'Banana', nl: 'Banaan', es: 'Banana' }, category: 'food', type: 'word' },
    { id: 'food-fv-3', papiamento: 'Lamunchi', meanings: { en: 'Lemon/Lime', nl: 'Citroen/limoen', es: 'Limón' }, category: 'food', type: 'word' },
    { id: 'food-fv-4', papiamento: 'Tomati', meanings: { en: 'Tomato', nl: 'Tomaat', es: 'Tomate' }, category: 'food', type: 'word' },
    { id: 'food-fv-5', papiamento: 'Siboyo', meanings: { en: 'Onion', nl: 'Ui', es: 'Cebolla' }, category: 'food', type: 'word' },
    { id: 'food-fv-6', papiamento: 'Batata', meanings: { en: 'Potato', nl: 'Aardappel', es: 'Papa' }, category: 'food', type: 'word' },
    { id: 'food-fv-7', papiamento: 'Sla', meanings: { en: 'Lettuce', nl: 'Sla', es: 'Lechuga' }, category: 'food', type: 'word' },

    // --- CONTEXT SENTENCES (CLOZE) ---
    // Nature
    { id: 'sent-nat-1', papiamento: 'E {kachó} ta kore duru', meanings: { en: 'The dog runs fast', nl: 'De hond rent hard', es: 'El perro corre rápido' }, category: 'nature', type: 'sentence', tags: ['cloze'] },
    { id: 'sent-nat-2', papiamento: 'E {pushi} ta drumi riba kama', meanings: { en: 'The cat sleeps on the bed', nl: 'De kat slaapt op het bed', es: 'El gato duerme en la cama' }, category: 'nature', type: 'sentence', tags: ['cloze'] },
    { id: 'sent-nat-3', papiamento: 'Mi ta stima kore {kabai}', meanings: { en: 'I love riding horses', nl: 'Ik rij graag paard', es: 'Me encanta montar a caballo' }, category: 'nature', type: 'sentence', tags: ['cloze'] },
    { id: 'sent-nat-4', papiamento: 'E {yuana} ta kome blachi', meanings: { en: 'The iguana eats leaves', nl: 'De leguaan eet bladeren', es: 'La iguana come hojas' }, category: 'nature', type: 'sentence', tags: ['cloze'] },
    { id: 'sent-nat-5', papiamento: 'E {tortuga} ta landa den laman', meanings: { en: 'The turtle swims in the sea', nl: 'De schildpad zwemt in de zee', es: 'La tortuga nada en el mar' }, category: 'nature', type: 'sentence', tags: ['cloze'] },

    // City
    { id: 'sent-cit-1', papiamento: 'Mi mester bai {banko} awe', meanings: { en: 'I need to go to the bank today', nl: 'Ik moet vandaag naar de bank', es: 'Necesito ir al banco hoy' }, category: 'places', type: 'sentence', tags: ['cloze'] },
    { id: 'sent-cit-2', papiamento: 'Nos ta kana den {parke}', meanings: { en: 'We walk in the park', nl: 'Wij lopen in het park', es: 'Caminamos en el parque' }, category: 'places', type: 'sentence', tags: ['cloze'] },
    { id: 'sent-cit-3', papiamento: 'E {warda di polis} ta leu', meanings: { en: 'The police station is far', nl: 'Het politiebureau is ver', es: 'La estación de policía está lejos' }, category: 'places', type: 'sentence', tags: ['cloze'] },
    { id: 'sent-cit-4', papiamento: 'Nan ta bai {misa} diadomingo', meanings: { en: 'They go to church on Sunday', nl: 'Ze gaan zondag naar de kerk', es: 'Van a la iglesia el domingo' }, category: 'places', type: 'sentence', tags: ['cloze'] },
    { id: 'sent-cit-5', papiamento: 'Nos ta wak pelíkula na {sinema}', meanings: { en: 'We watch movies at the cinema', nl: 'We kijken films in de bioscoop', es: 'Vemos películas en el cine' }, category: 'places', type: 'sentence', tags: ['cloze'] },

    // Travel
    { id: 'sent-trv-1', papiamento: 'Bo tin bo {pasport}?', meanings: { en: 'Do you have your passport?', nl: 'Heb je je paspoort?', es: '¿Tienes tu pasaporte?' }, category: 'places', type: 'sentence', tags: ['travel', 'cloze'] },
    { id: 'sent-trv-2', papiamento: 'Mi {maleta} ta pisa', meanings: { en: 'My suitcase is heavy', nl: 'Mijn koffer is zwaar', es: 'Mi maleta es pesada' }, category: 'places', type: 'sentence', tags: ['travel', 'cloze'] },
    { id: 'sent-trv-3', papiamento: 'E {avion} ta grandi', meanings: { en: 'The airplane is big', nl: 'Het vliegtuig is groot', es: 'El avión es grande' }, category: 'places', type: 'sentence', tags: ['travel', 'cloze'] },
    { id: 'sent-trv-4', papiamento: 'Mi tin mi {karchi} di avion', meanings: { en: 'I have my plane ticket', nl: 'Ik heb mijn vliegticket', es: 'Tengo mi boleto de avión' }, category: 'places', type: 'sentence', tags: ['travel', 'cloze'] },
    { id: 'sent-trv-5', papiamento: 'E {boto} ta riba awa', meanings: { en: 'The boat is on the water', nl: 'De boot is op het water', es: 'El barco está en el agua' }, category: 'places', type: 'sentence', tags: ['travel', 'cloze'] },

    // Food
    { id: 'sent-food-1', papiamento: 'Bo kièr {suku} den bo kòfi?', meanings: { en: 'Do you want sugar in your coffee?', nl: 'Wil je suiker in je koffie?', es: '¿Quieres azúcar en tu café?' }, category: 'food', type: 'sentence', tags: ['cloze'] },
    { id: 'sent-food-2', papiamento: 'E sòpi falta {salu}', meanings: { en: 'The soup lacks salt', nl: 'De soep heeft te weinig zout', es: 'A la sopa le falta sal' }, category: 'food', type: 'sentence', tags: ['cloze'] },
    { id: 'sent-food-3', papiamento: 'Pone {manteka} riba e pan', meanings: { en: 'Put butter on the bread', nl: 'Doe boter op het brood', es: 'Pon mantequilla en el pan' }, category: 'food', type: 'sentence', tags: ['cloze'] },
    { id: 'sent-food-4', papiamento: 'Mi gusta kome {keshi}', meanings: { en: 'I like eating cheese', nl: 'Ik eet graag kaas', es: 'Me gusta comer queso' }, category: 'food', type: 'sentence', tags: ['cloze'] },
    { id: 'sent-food-5', papiamento: 'E {fruta} ta dushi', meanings: { en: 'The fruit is delicious', nl: 'Het fruit is lekker', es: 'La fruta es deliciosa' }, category: 'food', type: 'sentence', tags: ['cloze'] },

    // --- EXTENDED FAMILY ---
    { id: 'fam-ext-1', papiamento: 'Tio', meanings: { en: 'Uncle', nl: 'Oom', es: 'Tío' }, category: 'family', type: 'word', tags: ['extended-family'] },
    { id: 'fam-ext-2', papiamento: 'Tanta', meanings: { en: 'Aunt', nl: 'Tante', es: 'Tía' }, category: 'family', type: 'word', tags: ['extended-family'] },
    { id: 'fam-ext-3', papiamento: 'Prima', meanings: { en: 'Cousin (female)', nl: 'Nicht', es: 'Prima' }, category: 'family', type: 'word', tags: ['extended-family'] },
    { id: 'fam-ext-4', papiamento: 'Primu', meanings: { en: 'Cousin (male)', nl: 'Neef', es: 'Primo' }, category: 'family', type: 'word', tags: ['extended-family'] },
    { id: 'fam-ext-5', papiamento: 'Subrina', meanings: { en: 'Niece', nl: 'Nichtje', es: 'Sobrina' }, category: 'family', type: 'word', tags: ['extended-family'] },
    { id: 'fam-ext-6', papiamento: 'Subrino', meanings: { en: 'Nephew', nl: 'Neefje', es: 'Sobrino' }, category: 'family', type: 'word', tags: ['extended-family'] },
    { id: 'fam-ext-7', papiamento: 'Nieto', meanings: { en: 'Grandchild', nl: 'Kleinkind', es: 'Nieto' }, category: 'family', type: 'word', tags: ['extended-family'] },

    // Family Sentences
    { id: 'sent-fam-1', papiamento: 'Mi {tio} ta traha na banko', meanings: { en: 'My uncle works at the bank', nl: 'Mijn oom werkt bij de bank', es: 'Mi tío trabaja en el banco' }, category: 'family', type: 'sentence', tags: ['cloze', 'extended-family'] },
    { id: 'sent-fam-2', papiamento: 'E ta mi {prima} faborito', meanings: { en: 'She is my favorite cousin', nl: 'Zij is mijn favoriete nicht', es: 'Ella es mi prima favorita' }, category: 'family', type: 'sentence', tags: ['cloze', 'extended-family'] },
    { id: 'sent-fam-3', papiamento: 'Mi {tanta} ta biba na Aruba', meanings: { en: 'My aunt lives in Aruba', nl: 'Mijn tante woont op Aruba', es: 'Mi tía vive en Aruba' }, category: 'family', type: 'sentence', tags: ['cloze', 'extended-family'] },

    // --- DAILY ROUTINE ---
    { id: 'rout-1', papiamento: 'Lanta', meanings: { en: 'To get up/Wake up', nl: 'Opstaan', es: 'Levantarse' }, category: 'social', type: 'word', tags: ['routine'] },
    { id: 'rout-2', papiamento: 'Baña', meanings: { en: 'To bathe/Shower', nl: 'Baden/Douchen', es: 'Bañarse' }, category: 'social', type: 'word', tags: ['routine'] },
    { id: 'rout-3', papiamento: 'Bistí', meanings: { en: 'To dress/Get dressed', nl: 'Aankleden', es: 'Vestirse' }, category: 'social', type: 'word', tags: ['routine'] }, // Can mean 'clothes' or 'dressed'
    { id: 'rout-7', papiamento: 'Limpia', meanings: { en: 'To clean', nl: 'Schoonmaken', es: 'Limpiar' }, category: 'social', type: 'word', tags: ['routine'] },

    // Routine Sentences
    { id: 'sent-rout-1', papiamento: 'Mi ta {lanta} trempan', meanings: { en: 'I wake up early', nl: 'Ik sta vroeg op', es: 'Me levanto temprano' }, category: 'social', type: 'sentence', tags: ['cloze', 'routine'] },
    { id: 'sent-rout-2', papiamento: 'Bo mester {baña} tur dia', meanings: { en: 'You must bathe every day', nl: 'Je moet elke dag douchen', es: 'Debes bañarte todos los días' }, category: 'social', type: 'sentence', tags: ['cloze', 'routine'] },
    { id: 'sent-rout-3', papiamento: 'Nos ta {kome} sena anochi', meanings: { en: 'We eat dinner at night', nl: 'Wij eten \'s avonds', es: 'Cenamos por la noche' }, category: 'social', type: 'sentence', tags: ['cloze', 'routine'] },
    { id: 'sent-rout-4', papiamento: 'E mucha ta {drumi} hopi', meanings: { en: 'The child sleeps a lot', nl: 'Het kind slaapt veel', es: 'El niño duerme mucho' }, category: 'social', type: 'sentence', tags: ['cloze', 'routine'] },

    // --- CLOTHING ---
    { id: 'cloth-1', papiamento: 'Kamisa', meanings: { en: 'Shirt', nl: 'Overhemd/Shirt', es: 'Camisa' }, category: 'shopping', type: 'word', tags: ['clothing'] },
    { id: 'cloth-2', papiamento: 'Karson', meanings: { en: 'Pants/Trousers', nl: 'Broek', es: 'Pantalón' }, category: 'shopping', type: 'word', tags: ['clothing'] },
    { id: 'cloth-3', papiamento: 'Sapatu', meanings: { en: 'Shoes', nl: 'Schoenen', es: 'Zapatos' }, category: 'shopping', type: 'word', tags: ['clothing'] },
    { id: 'cloth-4', papiamento: 'Bistí', meanings: { en: 'Dress/Clothes', nl: 'Jurk/Kleding', es: 'Vestido/Ropa' }, category: 'shopping', type: 'word', tags: ['clothing'] },
    { id: 'cloth-5', papiamento: 'Faha', meanings: { en: 'Belt', nl: 'Riem', es: 'Cinturón' }, category: 'shopping', type: 'word', tags: ['clothing'] },
    { id: 'cloth-6', papiamento: 'Sok', meanings: { en: 'Sock', nl: 'Sok', es: 'Calcetín' }, category: 'shopping', type: 'word', tags: ['clothing'] },
    { id: 'cloth-7', papiamento: 'Pèchi', meanings: { en: 'Cap', nl: 'Pet', es: 'Gorra' }, category: 'shopping', type: 'word', tags: ['clothing'] },

    // Clothing Sentences
    { id: 'sent-cloth-1', papiamento: 'Mi {kamisa} ta kòrá', meanings: { en: 'My shirt is red', nl: 'Mijn shirt is rood', es: 'Mi camisa es roja' }, category: 'shopping', type: 'sentence', tags: ['cloze', 'clothing'] },
    { id: 'sent-cloth-2', papiamento: 'Bo {sapatu} ta nobo', meanings: { en: 'Your shoes are new', nl: 'Je schoenen zijn nieuw', es: 'Tus zapatos son nuevos' }, category: 'shopping', type: 'sentence', tags: ['cloze', 'clothing'] },
    { id: 'sent-cloth-3', papiamento: 'E tin un {karson} blou', meanings: { en: 'He has blue pants', nl: 'Hij heeft een blauwe broek', es: 'Él tiene un pantalón azul' }, category: 'shopping', type: 'sentence', tags: ['cloze', 'clothing'] },

    // --- HOUSE: ROOMS & FURNITURE ---
    { id: 'hous-rm-2', papiamento: 'Sofá', meanings: { en: 'Sofa/Couch', nl: 'Bank', es: 'Sofá' }, category: 'house', type: 'word', tags: ['furniture'] },
    { id: 'hous-rm-4', papiamento: 'Stul', meanings: { en: 'Chair', nl: 'Stoel', es: 'Silla' }, category: 'house', type: 'word', tags: ['furniture'] },
    { id: 'hous-rm-5', papiamento: 'Televishon', meanings: { en: 'Television', nl: 'Televisie', es: 'Televisión' }, category: 'house', type: 'word', tags: ['furniture'] },
    { id: 'hous-rm-6', papiamento: 'Kama', meanings: { en: 'Bed', nl: 'Bed', es: 'Cama' }, category: 'house', type: 'word', tags: ['furniture'] },
    { id: 'hous-rm-7', papiamento: 'Kashi', meanings: { en: 'Cupboard/Closet', nl: 'Kast', es: 'Armario' }, category: 'house', type: 'word', tags: ['furniture'] },
    { id: 'hous-rm-8', papiamento: 'Fòrnu', meanings: { en: 'Stove/Oven', nl: 'Fornuis/oven', es: 'Estufa' }, category: 'house', type: 'word', tags: ['furniture'] },
    { id: 'hous-rm-9', papiamento: 'Frishidèr', meanings: { en: 'Fridge', nl: 'Koelkast', es: 'Nevera' }, category: 'house', type: 'word', tags: ['furniture'] },
    { id: 'hous-rm-10', papiamento: 'W.C.', meanings: { en: 'Toilet', nl: 'W.C.', es: 'Baño' }, category: 'house', type: 'word', tags: ['rooms'] },

    // House Sentences
    { id: 'sent-hous-1', papiamento: 'E {sofá} ta nobo', meanings: { en: 'The sofa is new', nl: 'De bank is nieuw', es: 'El sofá es nuevo' }, category: 'house', type: 'sentence', tags: ['cloze', 'furniture'] },
    { id: 'sent-hous-2', papiamento: 'Pone e pan riba {mesa}', meanings: { en: 'Put the bread on the table', nl: 'Leg het brood op tafel', es: 'Pon el pan en la mesa' }, category: 'house', type: 'sentence', tags: ['cloze', 'furniture'] },
    { id: 'sent-hous-3', papiamento: 'Mi ta wak {televishon}', meanings: { en: 'I am watching television', nl: 'Ik kijk naar de televisie', es: 'Estoy viendo televisión' }, category: 'house', type: 'sentence', tags: ['cloze', 'furniture'] },
    { id: 'sent-hous-4', papiamento: 'E {kama} ta grandi', meanings: { en: 'The bed is big', nl: 'Het bed is groot', es: 'La cama es grande' }, category: 'house', type: 'sentence', tags: ['cloze', 'furniture'] },

    // --- NATURE & ENVIRONMENT EXPANSION ---
    { id: 'nat-env-1', papiamento: 'Laman', meanings: { en: 'Beach/Sea', nl: 'Strand/Zee', es: 'Playa/Mar' }, category: 'nature', type: 'word', tags: ['environment'] },
    { id: 'nat-env-2', papiamento: 'Santu', meanings: { en: 'Sand', nl: 'Zand', es: 'Arena' }, category: 'nature', type: 'word', tags: ['environment'] },
    { id: 'nat-env-3', papiamento: 'Baranka', meanings: { en: 'Rock', nl: 'Rots', es: 'Roca' }, category: 'nature', type: 'word', tags: ['environment'] },
    { id: 'nat-env-4', papiamento: 'Hòfi', meanings: { en: 'Garden', nl: 'Tuin', es: 'Jardín' }, category: 'nature', type: 'word', tags: ['environment'] },
    { id: 'nat-env-6', papiamento: 'Luna', meanings: { en: 'Moon', nl: 'Maan', es: 'Luna' }, category: 'nature', type: 'word', tags: ['environment'] },
    { id: 'nat-env-7', papiamento: 'Strea', meanings: { en: 'Star', nl: 'Ster', es: 'Estrella' }, category: 'nature', type: 'word', tags: ['environment'] },
    { id: 'nat-env-8', papiamento: 'Seru', meanings: { en: 'Hill/Mountain', nl: 'Heuvel/Berg', es: 'Cerro/Montaña' }, category: 'nature', type: 'word', tags: ['environment'] },

    // Nature Sentences
    { id: 'sent-env-1', papiamento: 'Nos ta bai {laman}', meanings: { en: 'We are going to the sea', nl: 'Wij gaan naar de zee', es: 'Vamos al mar' }, category: 'nature', type: 'sentence', tags: ['cloze', 'environment'] },
    { id: 'sent-env-2', papiamento: 'E {flornan} ta bunita', meanings: { en: 'The flowers are beautiful', nl: 'De bloemen zijn mooi', es: 'Las flores son hermosas' }, category: 'nature', type: 'sentence', tags: ['cloze', 'environment'] },
    { id: 'sent-env-3', papiamento: 'Mira e {luna} den shelu', meanings: { en: 'Look at the moon in the sky', nl: 'Kijk naar de maan in de lucht', es: 'Mira la luna en el cielo' }, category: 'nature', type: 'sentence', tags: ['cloze', 'environment'] },
    { id: 'sent-env-4', papiamento: 'E {santu} ta kayente', meanings: { en: 'The sand is hot', nl: 'Het zand is heet', es: 'La arena está caliente' }, category: 'nature', type: 'sentence', tags: ['cloze', 'environment'] },

    // --- PLURALS (NAN) ---
    // In Papiamento, add 'nan' to make it plural
    { id: 'plur-1', papiamento: 'Flornan', meanings: { en: 'Flowers', nl: 'Bloemen', es: 'Flores' }, category: 'grammar', type: 'word', tags: ['plurals'] },
    { id: 'plur-2', papiamento: 'Kasnan', meanings: { en: 'Houses', nl: 'Huizen', es: 'Casas' }, category: 'grammar', type: 'word', tags: ['plurals'] },
    { id: 'plur-3', papiamento: 'Bukinan', meanings: { en: 'Books', nl: 'Boeken', es: 'Libros' }, category: 'grammar', type: 'word', tags: ['plurals'] },
    { id: 'plur-4', papiamento: 'Autonan', meanings: { en: 'Cars', nl: 'Auto\'s', es: 'Autos' }, category: 'grammar', type: 'word', tags: ['plurals'] },
    { id: 'plur-5', papiamento: 'Muchanan', meanings: { en: 'Children', nl: 'Kinderen', es: 'Niños' }, category: 'grammar', type: 'word', tags: ['plurals'] },
    { id: 'plur-6', papiamento: 'Dianan', meanings: { en: 'Days', nl: 'Dagen', es: 'Días' }, category: 'grammar', type: 'word', tags: ['plurals'] },
    { id: 'plur-7', papiamento: 'Hendenan', meanings: { en: 'People', nl: 'Mensen', es: 'Gente' }, category: 'grammar', type: 'word', tags: ['plurals'] },

    // Plural Sentences
    { id: 'sent-plur-2', papiamento: 'Tin hopi {autonan} riba kaya', meanings: { en: 'There are many cars on the street', nl: 'Er zijn veel auto\'s op straat', es: 'Hay muchos autos en la calle' }, category: 'grammar', type: 'sentence', tags: ['cloze', 'plurals'] },
    { id: 'sent-plur-3', papiamento: 'E {muchanan} ta hunga', meanings: { en: 'The children are playing', nl: 'De kinderen spelen', es: 'Los niños están jugando' }, category: 'grammar', type: 'sentence', tags: ['cloze', 'plurals'] },
    { id: 'sent-plur-4', papiamento: 'Nos tin dos {kasnan}', meanings: { en: 'We have two houses', nl: 'Wij hebben twee huizen', es: 'Tenemos dos casas' }, category: 'grammar', type: 'sentence', tags: ['cloze', 'plurals'] },

    // --- UNIT 5 EXPANSION: TRANSPORT ---
    { id: 'trans-1', papiamento: 'Outo', meanings: { en: 'Car', nl: 'Auto', es: 'Carro' }, category: 'places', type: 'word', tags: ['transport'] },
    { id: 'trans-2', papiamento: 'Autobus', meanings: { en: 'Bus', nl: 'Bus', es: 'Autobús' }, category: 'places', type: 'word', tags: ['transport'] },
    {
        id: 'trans-3', papiamento: 'Konvoi', meanings: { en: 'Convoy/Bus (Big Bus)', nl: 'Grote Bus', es: 'Autobús Grande' }, category: 'places', type: 'word', tags: ['transport'],
        culturalTip: {
            en: "'Konvoi' refers to the larger public buses. Smaller vans are often called 'Bus'.",
            nl: "'Konvoi' verwijst naar de grote openbare bussen. Kleinere busjes worden vaak gewoon 'Bus' genoemd.",
            es: "'Konvoi' se refiere a los autobuses públicos grandes. Las furgonetas más pequeñas a menudo se llaman 'Bus'."
        }
    },
    { id: 'trans-5', papiamento: 'Baiskel', meanings: { en: 'Bicycle', nl: 'Fiets', es: 'Bicicleta' }, category: 'places', type: 'word', tags: ['transport'] },
    { id: 'trans-6', papiamento: 'Bròmer', meanings: { en: 'Moped/Scooter', nl: 'Brommer', es: 'Ciclomotor' }, category: 'places', type: 'word', tags: ['transport'] },
    { id: 'trans-7', papiamento: 'Wil', meanings: { en: 'Wheel', nl: 'Wiel', es: 'Rueda' }, category: 'places', type: 'word', tags: ['transport'] },

    // Transport Sentences
    { id: 'sent-trans-1', papiamento: 'Mi ta kore {outo}', meanings: { en: 'I drive a car', nl: 'Ik rij auto', es: 'Conduzco un carro' }, category: 'places', type: 'sentence', tags: ['cloze', 'transport'] },
    { id: 'sent-trans-2', papiamento: 'E {taksi} ta kosta hopi', meanings: { en: 'The taxi costs a lot', nl: 'De taxi kost veel', es: 'El taxi cuesta mucho' }, category: 'places', type: 'sentence', tags: ['cloze', 'transport'] },
    { id: 'sent-trans-3', papiamento: 'Warda riba e {konvoi}', meanings: { en: 'Wait for the bus', nl: 'Wacht op de bus', es: 'Espera el autobús' }, category: 'places', type: 'sentence', tags: ['cloze', 'transport'] },

    // --- UNIT 5 EXPANSION: PUBLIC SERVICES ---
    { id: 'pub-2', papiamento: 'Pòstkantor', meanings: { en: 'Post Office', nl: 'Postkantoor', es: 'Oficina de Correos' }, category: 'places', type: 'word', tags: ['city'] },
    { id: 'pub-6', papiamento: 'Plasa', meanings: { en: 'Square/Market', nl: 'Plein/Markt', es: 'Plaza/Mercado' }, category: 'places', type: 'word', tags: ['city'] },

    // Public Services Sentences
    { id: 'sent-pub-1', papiamento: 'Mi mester bai {banko}', meanings: { en: 'I need to go to the bank', nl: 'Ik moet naar de bank', es: 'Necesito ir al banco' }, category: 'places', type: 'sentence', tags: ['cloze', 'city'] },
    { id: 'sent-pub-2', papiamento: 'E {misa} ta bieu', meanings: { en: 'The church is old', nl: 'De kerk is oud', es: 'La iglesia es vieja' }, category: 'places', type: 'sentence', tags: ['cloze', 'city'] },
    { id: 'sent-pub-3', papiamento: 'Unda e {warda di polis} ta?', meanings: { en: 'Where is the police station?', nl: 'Waar is het politiebureau?', es: '¿Dónde está la estación de policía?' }, category: 'places', type: 'sentence', tags: ['cloze', 'city'] },

    // --- UNIT 9: BUSINESS (C1) ---
    { id: 'bus-1', papiamento: 'Invershon', meanings: { en: 'Investment', nl: 'Investering', es: 'Inversión' }, category: 'work', type: 'word', tags: ['business'] },
    { id: 'bus-2', papiamento: 'Presupuesto', meanings: { en: 'Budget', nl: 'Begroting', es: 'Presupuesto' }, category: 'work', type: 'word', tags: ['business'] },
    { id: 'bus-3', papiamento: 'Negosiashon', meanings: { en: 'Negotiation', nl: 'Onderhandeling', es: 'Negociación' }, category: 'work', type: 'word', tags: ['business'] },
    { id: 'bus-4', papiamento: 'Ganashi', meanings: { en: 'Profit', nl: 'Winst', es: 'Ganancia' }, category: 'work', type: 'word', tags: ['business'] },
    { id: 'bus-5', papiamento: 'Pèrdida', meanings: { en: 'Loss', nl: 'Verlies', es: 'Pérdida' }, category: 'work', type: 'word', tags: ['business'] },
    { id: 'bus-6', papiamento: 'Maneho', meanings: { en: 'Management/Policy', nl: 'Beleid/Management', es: 'Gestión/Política' }, category: 'work', type: 'word', tags: ['business'] },
    { id: 'bus-7', papiamento: 'Kontrato', meanings: { en: 'Contract', nl: 'Contract', es: 'Contrato' }, category: 'work', type: 'word', tags: ['business'] },

    // Business Phrases
    { id: 'sent-bus-1', papiamento: 'Nos mester sera un {trato}', meanings: { en: 'We need to close a deal', nl: 'We moeten een deal sluiten', es: 'Tenemos que cerrar un trato' }, category: 'work', type: 'sentence', tags: ['cloze', 'business'] },
    { id: 'sent-bus-2', papiamento: 'E {presupuesto} ta aproba', meanings: { en: 'The budget is approved', nl: 'De begroting is goedgekeurd', es: 'El presupuesto está aprobado' }, category: 'work', type: 'sentence', tags: ['cloze', 'business'] },
    {
        id: 'sent-bus-3', papiamento: 'Atentamente', meanings: { en: 'Sincerely (Formal)', nl: 'Hoogachtend', es: 'Atentamente' }, category: 'work', type: 'phrase', tags: ['business'],
        culturalTip: {
            en: "Use 'Atentamente' to sign off formal emails or letters.",
            nl: "Gebruik 'Atentamente' om formele e-mails of brieven af te sluiten.",
            es: "Usa 'Atentamente' para despedirte en correos o cartas formales."
        }
    },

    // --- UNIT 9: ACADEMIC (C1) ---
    { id: 'acad-1', papiamento: 'Teoria', meanings: { en: 'Theory', nl: 'Theorie', es: 'Teoría' }, category: 'work', type: 'word', tags: ['academic'] },
    { id: 'acad-2', papiamento: 'Hipótesis', meanings: { en: 'Hypothesis', nl: 'Hypothese', es: 'Hipótesis' }, category: 'work', type: 'word', tags: ['academic'] },
    { id: 'acad-3', papiamento: 'Análisis', meanings: { en: 'Analysis', nl: 'Analyse', es: 'Análisis' }, category: 'work', type: 'word', tags: ['academic'] },
    { id: 'acad-4', papiamento: 'Konklushon', meanings: { en: 'Conclusion', nl: 'Conclusie', es: 'Conclusión' }, category: 'work', type: 'word', tags: ['academic'] },
    { id: 'acad-5', papiamento: 'Investigashon', meanings: { en: 'Research', nl: 'Onderzoek', es: 'Investigación' }, category: 'work', type: 'word', tags: ['academic'] },
    { id: 'acad-6', papiamento: 'Argumento', meanings: { en: 'Argument', nl: 'Argument', es: 'Argumento' }, category: 'work', type: 'word', tags: ['academic'] },

    // Academic Sentences
    { id: 'sent-acad-1', papiamento: 'E {análisis} ta mustra', meanings: { en: 'The analysis shows', nl: 'De analyse toont', es: 'El análisis muestra' }, category: 'work', type: 'sentence', tags: ['cloze', 'academic'] },
    { id: 'sent-acad-3', papiamento: 'Kiko ta bo {konklushon}?', meanings: { en: 'What is your conclusion?', nl: 'Wat is jouw conclusie?', es: '¿Cuál es tu conclusión?' }, category: 'work', type: 'sentence', tags: ['cloze', 'academic'] }
];
