"use client";

import { useRouter } from "next/navigation";
import type { LessonNavigationState } from "./types";

export function useLessonNavigation(): LessonNavigationState {
    const router = useRouter();

    const onLessonClick = (lessonId: string) => {
        router.push(`/lessons/${lessonId}`);
    };

    return {
        onLessonClick,
    };
}
