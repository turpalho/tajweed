import { QuranApiAyah } from "@/shared/lib/quran-api";
import { Surah } from "@/entities/quran";

export interface SurahPageData {
    surah: Surah | null;
    ayahs: QuranApiAyah[];
    isLoadingData: boolean;
    dataError: string | null;
    selectedReciter: string;
    previousSurah: Surah | null;
    nextSurah: Surah | null;
} 