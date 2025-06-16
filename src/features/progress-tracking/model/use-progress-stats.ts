"use client";

import { useState, useEffect } from "react";
import { getProgressStats } from "@/shared/lib/learning-progress";
import { useAppSettings } from "@/shared/hooks/use-app-settings";
import quranData from "@/shared/data/quran-surahs.json";
import alphabetData from "@/shared/data/arabic-alphabet.json";
import lessonsData from "@/shared/data/lessons.json";
import type { ProgressData } from "./types";

export function useProgressStats() {
    const { isLoaded } = useAppSettings();
    const [progressData, setProgressData] = useState<ProgressData>({
        totalProgress: 0,
        learnedLetters: 0,
        completedLessons: 0,
        readSurahs: 0,
    });

    useEffect(() => {
        if (!isLoaded) return;

        const stats = getProgressStats();

        // Вычисляем общий прогресс
        const totalSurahs = quranData.length;
        const totalLetters = alphabetData.length;
        const totalLessons = lessonsData["1"].length + lessonsData["2"].length;

        const surahProgress = (stats.readSurahsCount / totalSurahs) * 100;
        const letterProgress = (stats.learnedLettersCount / totalLetters) * 100;
        const lessonProgress = (stats.completedLessonsCount / totalLessons) * 100;

        // Средний прогресс по всем категориям
        const totalProgress = Math.round(
            (surahProgress + letterProgress + lessonProgress) / 3
        );

        setProgressData({
            totalProgress,
            learnedLetters: stats.learnedLettersCount,
            completedLessons: stats.completedLessonsCount,
            readSurahs: stats.readSurahsCount,
        });
    }, [isLoaded]);

    return progressData;
}
