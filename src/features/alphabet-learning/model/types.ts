import type { ArabicLetter } from "@/entities/alphabet";

export interface AlphabetLearningState {
    letters: ArabicLetter[];
    learnedCount: number;
    totalCount: number;
    progressPercentage: number;
    isLoading: boolean;
    error: string | null;
}

export interface AlphabetLearningActions {
    refreshLetters: () => void;
    markLetterAsLearned: (letterId: string) => void;
    unmarkLetterAsLearned: (letterId: string) => void;
} 