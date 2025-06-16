"use client";

import { useState, useEffect, useMemo } from "react";
import { getLearningProgress, markLetterAsLearned as markLetter, unmarkLetterAsLearned as unmarkLetter } from "@/shared/lib/learning-progress";
import arabicAlphabetData from "@/shared/data/arabic-alphabet.json";
import type { ArabicLetter } from "@/entities/alphabet";
import type { AlphabetLearningState, AlphabetLearningActions } from "./types";

export function useAlphabetLearning(): AlphabetLearningState & AlphabetLearningActions {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    // Получаем обогащенные данные букв
    const { letters, learnedCount } = useMemo(() => {
        try {
            const progress = getLearningProgress();

            // Обогащаем данные букв информацией о прогрессе
            const enrichedLetters = arabicAlphabetData.map((letter) => ({
                ...letter,
                isLearned: progress.learnedLetters.includes(letter.id),
            })) as ArabicLetter[];

            const learned = progress.learnedLetters.length;

            return {
                letters: enrichedLetters,
                learnedCount: learned,
            };
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
            return {
                letters: [],
                learnedCount: 0,
            };
        }
    }, [refreshTrigger]);

    const totalCount = arabicAlphabetData.length;
    const progressPercentage = totalCount > 0 ? Math.round((learnedCount / totalCount) * 100) : 0;

    // Симулируем загрузку
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 100);

        return () => clearTimeout(timer);
    }, [refreshTrigger]);

    const refreshLetters = () => {
        setIsLoading(true);
        setError(null);
        setRefreshTrigger(prev => prev + 1);
    };

    const markLetterAsLearned = (letterId: string) => {
        try {
            markLetter(letterId);
            refreshLetters();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error marking letter as learned');
        }
    };

    const unmarkLetterAsLearned = (letterId: string) => {
        try {
            unmarkLetter(letterId);
            refreshLetters();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error unmarking letter');
        }
    };

    return {
        letters,
        learnedCount,
        totalCount,
        progressPercentage,
        isLoading,
        error,
        refreshLetters,
        markLetterAsLearned,
        unmarkLetterAsLearned,
    };
} 