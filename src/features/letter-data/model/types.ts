import type { ArabicLetter } from "@/entities/alphabet";

export interface LetterDataState {
    letter: ArabicLetter | null;
    previousLetter: ArabicLetter | null;
    nextLetter: ArabicLetter | null;
    currentIndex: number;
    totalLetters: number;
    isLoading: boolean;
    error: string | null;
}

export interface LetterNavigationState {
    previousLetter: ArabicLetter | null;
    nextLetter: ArabicLetter | null;
    currentIndex: number;
    totalLetters: number;
} 