export interface LocalizedText {
    ru: string;
    en: string;
    ar: string;
}

export interface Lesson {
    id: string;
    title: LocalizedText;
    description: LocalizedText;
    duration: number; // в секундах
    videoUrl: string;
    thumbnail: string;
    courseId: string;
    order: number;
    status: 'not_started' | 'in_progress' | 'completed';
}

export interface Course {
    id: string;
    title: string;
    description: string;
    lessons: Lesson[];
    totalDuration: number;
    completedLessons: number;
} 