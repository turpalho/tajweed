import type { Lesson } from "@/entities/lesson";

export interface LessonDataState {
    lesson: Lesson | null;
    previousLesson: Lesson | null;
    nextLesson: Lesson | null;
    courseLessons: Lesson[];
    currentIndex: number;
    isLoading: boolean;
    error: string | null;
}

export interface LessonDataActions {
    loadLesson: (lessonId: string) => void;
    refreshLesson: () => void;
} 