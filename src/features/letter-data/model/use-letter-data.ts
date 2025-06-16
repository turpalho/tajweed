"use client";

import { useMemo } from "react";
import alphabetData from "@/shared/data/arabic-alphabet.json";
import type { ArabicLetter } from "@/entities/alphabet";
import type { LetterDataState } from "./types";

export function useLetterData(letterId: string): LetterDataState {
    const letters = alphabetData as ArabicLetter[];

    const { letter, currentIndex, previousLetter, nextLetter } = useMemo(() => {
        const currentLetter = letters.find((l) => l.id === letterId) || null;
        const index = letters.findIndex((l) => l.id === letterId);

        const prev = index > 0 ? letters[index - 1] : null;
        const next = index < letters.length - 1 ? letters[index + 1] : null;

        return {
            letter: currentLetter,
            currentIndex: index,
            previousLetter: prev,
            nextLetter: next,
        };
    }, [letterId, letters]);

    return {
        letter,
        previousLetter,
        nextLetter,
        currentIndex,
        totalLetters: letters.length,
        isLoading: false,
        error: letter ? null : "Letter not found",
    };
} 