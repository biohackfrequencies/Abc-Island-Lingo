import { type VocabEntry, vocabulary } from '../data/vocabulary';
import { type Lesson, type Question, type Language, type LessonConfig } from '../types';
import { conversations, type Conversation } from '../data/conversations';

// Helper to shuffle array
const shuffle = <T>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
};

// Helper to get logic-aware distractors
const getDistractors = (target: VocabEntry, count: number, localPool: VocabEntry[]): VocabEntry[] => {
    // 1. Prefer words from the same lesson (localPool) to keep relevance high
    let pool = localPool.filter(v => v.id !== target.id && v.type === target.type);

    // 2. If not enough, expand to same category from global vocabulary
    if (pool.length < count) {
        const remainingNeeded = count - pool.length;
        const categoryPool = vocabulary.filter(v =>
            v.category === target.category &&
            v.type === target.type &&
            v.id !== target.id &&
            !pool.includes(v)
        );
        pool = [...pool, ...shuffle(categoryPool).slice(0, remainingNeeded)];
    }

    // 3. If still not enough, expand to same type globally
    if (pool.length < count) {
        const remainingNeeded = count - pool.length;
        const typePool = vocabulary.filter(v =>
            v.type === target.type &&
            v.id !== target.id &&
            !pool.includes(v)
        );
        pool = [...pool, ...shuffle(typePool).slice(0, remainingNeeded)];
    }

    return shuffle(pool).slice(0, count);
};

export const generateLesson = (config: LessonConfig, userLang: Language = 'en'): Lesson => {
    // 1. Select Vocabulary
    let lessonVocab: VocabEntry[] = [];

    if (config.content.type === 'ids') {
        lessonVocab = vocabulary.filter(v => config.content.type === 'ids' && config.content.ids.includes(v.id));
        // Sort by order in ids array if important, or keep vocabulary order
        const orderMap = new Map(config.content.ids.map((id, index) => [id, index]));
        lessonVocab.sort((a, b) => (orderMap.get(a.id) ?? 0) - (orderMap.get(b.id) ?? 0));

    } else if (config.content.type === 'tag') {
        const tag = config.content.tag;
        const count = config.content.count;
        lessonVocab = vocabulary.filter(v => v.tags?.includes(tag));
        if (count) lessonVocab = shuffle(lessonVocab).slice(0, count);

    } else if (config.content.type === 'category') {
        const category = config.content.category;
        const count = config.content.count;
        lessonVocab = vocabulary.filter(v => v.category === category);
        if (count) lessonVocab = shuffle(lessonVocab).slice(0, count);
    }

    if (lessonVocab.length === 0) {
        console.warn(`No vocabulary found for lesson ${config.id}`);
        // Fallback or empty
    }

    // 2. Generate Standard Questions
    // 2. Generate Standard Questions
    // DOUBLE EXPOSURE STRATEGY:
    // For Words: Q1 Learn (MCQ) -> Q2 Master (Spelling)
    // For Others: Active Construction (Cloze/Order)
    const questions: Question[] = lessonVocab.flatMap((vocab, index) => {
        const qId = `q-${vocab.id}-${index}`;

        if (vocab.type === 'sentence') {
            // Sentences: Single active challenge
            if (vocab.papiamento.includes('{')) {
                return [generateClozeQuestion(qId, vocab, userLang, lessonVocab)];
            }
            return [generateOrderQuestion(qId, vocab, userLang)];

        } else if (vocab.type === 'phrase') {
            // Phrases: Single active challenge
            if (vocab.papiamento.includes(' ')) {
                return [generateOrderQuestion(qId, vocab, userLang)];
            }
            const rand = Math.random();
            if (rand < 0.5) return [generateSpellingQuestion(qId, vocab, userLang)];
            return [generateTranslateQuestion(qId, vocab, userLang, lessonVocab)];

        } else {
            // WORD MASTERY LOOP (For all subject words)
            // Q1: Learning (Multiple Choice) - See and Select
            const learnQ = generateMultipleChoiceQuestion(`${qId}-learn`, vocab, userLang, lessonVocab);

            // Q2: Mastery (Spelling) - Recall and Type
            const masterQ = generateSpellingQuestion(`${qId}-master`, vocab, userLang);

            return [learnQ, masterQ];
        }
    });

    // 3. Generate Dialogue Questions (if applicable)
    // Find conversations matching this lesson's category or tags
    const relevantConversations = conversations.filter(c => {
        if (config.content.type === 'category') return c.category === config.content.category;
        if (config.content.type === 'tag') return c.tags.includes(config.content.tag);
        return false;
    });

    relevantConversations.forEach((conv, index) => {
        questions.push(generateDialogueQuestion(`q-dial-${conv.id}-${index}`, conv, userLang, lessonVocab));
    });

    return {
        id: config.id,
        category: config.category,
        level: config.level,
        title: config.title,
        topic: config.topic,
        description: config.description,
        questions: questions
    };
};

const generateDialogueQuestion = (id: string, conv: Conversation, lang: Language, lessonVocab: VocabEntry[]): Question => {
    // Find the interactive line (the one missing)
    const interactiveLineIndex = conv.lines.findIndex(l => l.isInteractive);
    if (interactiveLineIndex === -1) {
        // If no interactive line marked, default to the last one
        // or just return a read-only view? Let's assume last one for now or safety.
        // Actually, let's just make the last line interactive if none specified.
    }

    // For now, let's assume valid data has isInteractive
    const correctLine = conv.lines.find(l => l.isInteractive) || conv.lines[conv.lines.length - 1];

    // Generate distractors: sentences from other dialogues or similar length sentences from vocab
    // This is hard without more dialogue data.
    // Fallback: Generic responses + some vocab sentences
    const genericResponses = [
        "Mi no sa.",
        "Danki.",
        "Ata aki.",
        "Si, sigur.",
        "Nò, dispensami."
    ];

    const vocabSentences = lessonVocab
        .filter(v => v.type === 'sentence' || v.type === 'phrase')
        .map(v => v.papiamento);

    const pool = shuffle([...genericResponses, ...vocabSentences].filter(s => s !== correctLine.text));
    const options = shuffle([correctLine.text, ...pool.slice(0, 2)]); // 3 options total

    const prompts: Record<Language, string> = {
        en: "Complete the conversation",
        nl: "Maak het gesprek af",
        es: "Completa la conversación"
    };

    return {
        id,
        type: 'dialogue',
        prompt: prompts[lang],
        correctAnswer: correctLine.text,
        options,
        dialogueLines: conv.lines // Pass the full lines so player can render bubbles
    };
};

const generateClozeQuestion = (id: string, vocab: VocabEntry, lang: Language, lessonVocab: VocabEntry[]): Question => {
    // Extract hidden word: "Mi {ta} bai" -> hidden: "ta", display: "Mi ___ bai"
    const match = vocab.papiamento.match(/\{([^}]+)\}/);
    const hiddenWord = match ? match[1] : '';
    const displaySentence = vocab.papiamento.replace(/\{[^}]+\}/, '___');

    // Distractors: Need words of similar type (e.g. verbs/particles). 
    // For now, generic distractors from lesson vocabulary + grammar words
    const grammarDistractors = ['ta', 'tin', 'bai', 'kier', 'por', 'a'];

    // Fix: Extract the core word from other sentence vocabulary if needed
    const otherDistractors = getDistractors(vocab, 3, lessonVocab).map(v => {
        const match = v.papiamento.match(/\{([^}]+)\}/);
        return match ? match[1] : v.papiamento;
    });

    // Cleanup: Filter out full sentences that might have slipped through (dictionaries with spaces usually ok, but long sentences are bad distractors)
    // Also remove duplicates and the correct answer
    const pool = shuffle([...new Set([...grammarDistractors, ...otherDistractors])]
        .filter(w => w !== hiddenWord && w.length < 20 && !w.includes(' '))); // Filter out multi-word distractors that aren't the target

    // Pick 3 distractors
    const options = shuffle([hiddenWord, ...pool.slice(0, 3)]);



    const prompts: Record<Language, string> = {
        en: `Complete the sentence: "${vocab.meanings['en']}"`,
        nl: `Maak de zin compleet: "${vocab.meanings['nl']}"`,
        es: `Completa la frase: "${vocab.meanings['es']}"`
    };

    return {
        id,
        type: 'cloze',
        prompt: `${prompts[lang]}\n\n${displaySentence}`,
        options: options,
        correctAnswer: hiddenWord,
        explanation: vocab.meanings[lang],
        image: vocab.image,
        culturalTip: vocab.culturalTip
    };
};

const generateSpellingQuestion = (id: string, vocab: VocabEntry, lang: Language): Question => {
    const prompts: Record<Language, string> = {
        en: `Type the Papiamento word for "${vocab.meanings['en']}"`,
        nl: `Typ het Papiaments voor "${vocab.meanings['nl']}"`,
        es: `Escribe en Papiamento "${vocab.meanings['es']}"`
    };

    return {
        id,
        type: 'spelling',
        prompt: prompts[lang],
        correctAnswer: vocab.papiamento,
        pronunciation: vocab.pronunciation,
        image: vocab.image,
        culturalTip: vocab.culturalTip
    };
};

const generateOrderQuestion = (id: string, vocab: VocabEntry, lang: Language): Question => {
    // Question: Form the sentence in Papiamento
    const prompts: Record<Language, string> = {
        en: `Form the sentence: "${vocab.meanings['en']}"`,
        nl: `Maak de zin: "${vocab.meanings['nl']}"`,
        es: `Forma la frase: "${vocab.meanings['es']}"`
    };

    return {
        id,
        type: 'order',
        prompt: prompts[lang],
        options: shuffle(vocab.papiamento.split(' ')), // The words to order
        correctAnswer: vocab.papiamento,
        explanation: vocab.meanings[lang], // Simple explanation is just the meaning
        image: vocab.image,
        culturalTip: vocab.culturalTip
    };
};

const generateTranslateQuestion = (id: string, vocab: VocabEntry, lang: Language, lessonVocab: VocabEntry[]): Question => {
    // Question: Translate [Papiamento] -> [User Lang]
    // Or [User Lang] -> [Papiamento]. Let's stick to Papiamento prompt -> User Lang selection/input
    // But `translate` type in Player seems to be "Select the correct translation from options"

    // Let's generate options (correct + 2 distractors)
    const distractors = getDistractors(vocab, 2, lessonVocab);
    const options = shuffle([vocab.meanings[lang], ...distractors.map(d => d.meanings[lang])]);

    // Prompt structure
    const prompts: Record<Language, string> = {
        en: `What does "${vocab.papiamento}" mean?`,
        nl: `Wat betekent "${vocab.papiamento}"?`,
        es: `¿Qué significa "${vocab.papiamento}"?`
    };

    return {
        id,
        type: 'translate',
        prompt: prompts[lang],
        options: options,
        correctAnswer: vocab.meanings[lang],
        pronunciation: vocab.pronunciation,
        image: vocab.image,
        culturalTip: vocab.culturalTip
    };
};

const generateMultipleChoiceQuestion = (id: string, vocab: VocabEntry, lang: Language, lessonVocab: VocabEntry[]): Question => {
    // Question: User Lang Prompt -> Select Papiamento Word
    // e.g. "House" -> ["Kas", "Auto", "Kaya"]

    const distractors = getDistractors(vocab, 3, lessonVocab);
    const options = shuffle([vocab.papiamento, ...distractors.map(d => d.papiamento)]);

    const prompts: Record<Language, string> = {
        en: `How do you say "${vocab.meanings['en']}"?`,
        nl: `Hoe zeg je "${vocab.meanings['nl']}"?`,
        es: `¿Cómo se dice "${vocab.meanings['es']}"?`
    };

    return {
        id,
        type: 'multiple-choice',
        prompt: prompts[lang], // "How do you say 'House'?"
        options: options, // ["Kas", ...]
        correctAnswer: vocab.papiamento,
        pronunciation: vocab.pronunciation,
        image: vocab.image, // Pass the image if available
        culturalTip: vocab.culturalTip
    };
};
