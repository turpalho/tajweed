'use client'

export interface LocalizedText {
    ru: string;
    en: string;
    ar: string;
}

export interface WritingLetter {
    letter: string;
    name: LocalizedText;
    transliteration: string;
}

export interface WritingGroup {
    id: string;
    title: LocalizedText;
    letters: WritingLetter[];
    pdfUrl: string;
    videoUrl: string;
    isDownloaded: boolean;
} 