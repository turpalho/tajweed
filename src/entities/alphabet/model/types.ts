'use client'

export interface ArabicLetter {
    id: string;
    letter: string;
    name: string;
    transliteration: string;
    audioUrl: string;
    imageUrl: string;
    positions: {
        isolated: string;
        initial: string;
        medial: string;
        final: string;
    };
    articulationPoint: string;
    examples: string[];
    isLearned: boolean;
} 