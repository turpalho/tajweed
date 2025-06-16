'use client'

export interface LocalizedText {
    ru: string;
    en: string;
    ar: string;
}

export interface Lesson {
    id: string;
    title: LocalizedText;
    description: LocalizedText;
    duration: number;
    videoUrl: string;
    thumbnail: string;
    courseId: string;
    order: number;
    status: 'not_started' | 'in_progress' | 'completed';
}

export interface LessonsData {
    [courseId: string]: Lesson[];
} 