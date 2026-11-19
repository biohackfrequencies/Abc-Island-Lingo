export type Language = 'en' | 'nl' | 'es';

export interface Lesson {
    id: string;
    category: string; // e.g., "Famia i Hende", "Numbers"
    level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
    title: string; // Title in Papiamento
    description: Record<Language, string>; // Localized description
    topic: string;
    questions: Question[];
}

// Helper type for content that can be a single string or localized
export type LocalizedContent = string | Record<Language, string>;
export type LocalizedAnswer = string | string[] | Record<Language, string | string[]>;

export interface DialogueLine {
    speaker: 'A' | 'B';
    text: string; // The Papiamento text
    translation?: string; // Localized translation
    isInteractive?: boolean; // If true, this line is hidden/tobefilled
}

export interface Question {
    id: string;
    type: 'translate' | 'match' | 'multiple-choice' | 'order' | 'cloze' | 'spelling' | 'dialogue';
    prompt: LocalizedContent;
    pronunciation?: string; // e.g., "Bon dee-a"
    options?: string[] | Record<Language, string[]>; // Context-aware options
    correctAnswer: LocalizedAnswer;
    explanation?: LocalizedContent; // Explanation shown after answer
    audio?: string; // Path to audio file
    image?: string; // URL to image
    dialogueLines?: DialogueLine[]; // For dialogue questions
    culturalTip?: LocalizedContent; // Cultural or language tip
    /** Vocabulary or conversation id, so a missed item can be rebuilt in another language. */
    sourceId?: string;
}

export interface DictionaryEntry {
    id: string;
    papiamento: string;
    meanings: Record<Language, string>;
    partOfSpeech: 'noun' | 'verb' | 'adjective' | 'phrase' | 'other';
    exampleSentence?: string;
}

export type ContentStrategy =
    | { type: 'ids'; ids: string[] }
    | { type: 'tag'; tag: string; count?: number }
    | { type: 'category'; category: string; count?: number };

export interface LessonConfig {
    id: string;
    unit: number; // e.g. 1
    category: string;
    level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
    title: string;
    topic: string;
    description: Record<Language, string>;
    content: ContentStrategy;
    /** Dialogue tags to include even when the lesson content is chosen by id. */
    dialogueTags?: string[];
}
