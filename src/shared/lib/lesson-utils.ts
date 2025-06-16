import type { Lesson } from "@/entities/lesson";

export function formatLessonDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
        return `${hours}ч ${minutes}м`;
    }
    return `${minutes}м`;
}

export function calculateCourseProgress(lessons: Lesson[]): {
    completed: number;
    total: number;
    percentage: number;
} {
    const completed = lessons.filter(lesson => lesson.status === "completed").length;
    const total = lessons.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { completed, total, percentage };
}

export function getNextLesson(lessons: Lesson[], currentLessonId: string): Lesson | null {
    const currentIndex = lessons.findIndex(lesson => lesson.id === currentLessonId);
    return currentIndex !== -1 && currentIndex < lessons.length - 1
        ? lessons[currentIndex + 1]
        : null;
}

export function getPreviousLesson(lessons: Lesson[], currentLessonId: string): Lesson | null {
    const currentIndex = lessons.findIndex(lesson => lesson.id === currentLessonId);
    return currentIndex > 0 ? lessons[currentIndex - 1] : null;
}
