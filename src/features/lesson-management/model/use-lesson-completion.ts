"use client";

import { useState, useEffect } from "react";
import { isLessonCompleted, markLessonAsCompleted, unmarkLessonAsCompleted } from "@/shared/lib/learning-progress";
import type { LessonCompletionState, LessonCompletionActions } from "./types";

export function useLessonCompletion(lessonId: string): LessonCompletionState & LessonCompletionActions {
    const [isCompleted, setIsCompleted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsCompleted(isLessonCompleted(lessonId));
    }, [lessonId]);

    const toggleCompletion = async () => {
        setIsLoading(true);

        try {
            const newIsCompleted = !isCompleted;
            setIsCompleted(newIsCompleted);

            if (newIsCompleted) {
                markLessonAsCompleted(lessonId);
            } else {
                unmarkLessonAsCompleted(lessonId);
            }
        } catch (error) {
            console.error('Error toggling lesson completion:', error);
            // Revert state on error
            setIsCompleted(!isCompleted);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isCompleted,
        isLoading,
        toggleCompletion,
    };
}
