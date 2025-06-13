'use client'

export interface Surah {
    id: number;
    name: string;
    nameArabic: string;
    transliteration: string;
    translation: string;
    verses: number;
    revelationType: 'meccan' | 'medinan';
    audioUrl?: string;
    duration?: number;
}

export interface Verse {
    id: number;
    surahId: number;
    verseNumber: number;
    textArabic: string;
    transliteration: string;
    translation: string;
    audioUrl?: string;
    tajweedRules: TajweedRule[];
}

export interface TajweedRule {
    type: 'idgham' | 'izhar' | 'iqlab' | 'ikhfa' | 'madd' | 'ghunna' | 'qalqalah';
    startIndex: number;
    endIndex: number;
    color: string;
    description: string;
} 