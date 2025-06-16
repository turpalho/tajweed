"use client";

import { useState, useEffect, useMemo } from "react";
import lessonsData from "@/shared/data/lessons.json";
import type { Lesson } from "@/entities/lesson";
import type { LessonDataState, LessonDataActions } from "./types";

export function useLessonData(lessonId: string): LessonDataState & LessonDataActions {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Загружаем все уроки и находим текущий
    const allLessons = useMemo(() => [...lessonsData["1"], ...lessonsData["2"]] as Lesson[], []);
    const lesson = useMemo(() => allLessons.find((l) => l.id === lessonId) || null, [allLessons, lessonId]);

    // Получаем уроки текущего курса
    const courseLessons = useMemo(() => {
        if (!lesson) return [];
        return lessonsData[lesson.courseId as "1" | "2"] as Lesson[] || [];
    }, [lesson]);

    // Находим текущий индекс и соседние уроки
    const currentIndex = useMemo(() =>
        courseLessons.findIndex((l: Lesson) => l.id === lessonId),
        [courseLessons, lessonId]
    );

    const previousLesson = useMemo(() =>
        currentIndex > 0 ? courseLessons[currentIndex - 1] : null,
        [courseLessons, currentIndex]
    );

    const nextLesson = useMemo(() =>
        currentIndex < courseLessons.length - 1 ? courseLessons[currentIndex + 1] : null,
        [courseLessons, currentIndex]
    );

    const loadLesson = () => {
        setIsLoading(true);
        setError(null);

        try {
            // Здесь можно добавить дополнительную логику загрузки
            // Например, загрузку из API
            setIsLoading(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
            setIsLoading(false);
        }
    };

    const refreshLesson = () => {
        loadLesson();
    };

    useEffect(() => {
        if (!lesson) {
            setError('Урок не найден');
        }
        setIsLoading(false);
    }, [lesson]);

    return {
        lesson,
        previousLesson,
        nextLesson,
        courseLessons,
        currentIndex,
        isLoading,
        error,
        loadLesson,
        refreshLesson,
    };
} 