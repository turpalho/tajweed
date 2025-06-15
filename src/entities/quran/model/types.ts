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
    pdfUrl?: string;
    duration?: number;
    description?: string;
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

// Типы для Quran API
export interface QuranEdition {
    identifier: string;
    language: string;
    name: string;
    englishName: string;
    format: 'text' | 'audio';
    type: 'translation' | 'tafsir' | 'quran' | 'transliteration';
}

export interface QuranReciter {
    identifier: string;
    name: string;
    englishName: string;
    language: string;
    bitrate?: string;
}

export interface QuranApiSurah {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    numberOfAyahs: number;
    revelationType: string;
}

export interface QuranApiAyah {
    number: number;
    text: string;
    audio?: string;
    audioSecondary?: string[];
    surah: QuranApiSurah;
    numberInSurah: number;
    juz: number;
    manzil: number;
    page: number;
    ruku: number;
    hizbQuarter: number;
    sajda: boolean;
}

export interface QuranApiResponse<T> {
    code: number;
    status: string;
    data: T;
}

export interface QuranApiSurahData {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    revelationType: string;
    numberOfAyahs: number;
    ayahs: QuranApiAyah[];
    edition: QuranEdition;
}