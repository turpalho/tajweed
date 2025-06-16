'use client'

export interface LocalizedText {
    ru: string;
    en: string;
    ar: string;
}

export interface ArabicLetter {
    id: string;
    letter: string;
    name: LocalizedText;
    transliteration: string;
    audioUrl: string;
    imageUrl?: string;
    positions: {
        isolated: string;
        initial: string;
        medial: string;
        final: string;
    };
    articulationPoint: LocalizedText;
    examples: string[];
    isLearned: boolean;
} 