import { Lesson } from "@/entities/lesson";

export interface LessonCompletionState {
    isCompleted: boolean;
    isLoading: boolean;
}

export interface LessonCompletionActions {
    toggleCompletion: () => void;
}

export interface LessonNavigationState {
    previousLesson: Lesson | null;
    nextLesson: Lesson | null;
    currentIndex: number;
}

export interface LessonNavigationActions {
    goToPrevious: () => void;
    goToNext: () => void;
}
