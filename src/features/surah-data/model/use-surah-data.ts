import { useState, useEffect } from "react";
import quranData from "@/shared/data/quran-surahs.json";
import { Surah } from "@/entities/quran";
import { getReciterSettings } from "@/shared/lib/reciter-settings";
import { getSurahWithTextAndAudio, QuranApiAyah } from "@/shared/lib/quran-api";
import { SurahPageData } from "./types";

export function useSurahData(surahId: string): SurahPageData {
    const [ayahs, setAyahs] = useState<QuranApiAyah[]>([]);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [selectedReciter, setSelectedReciter] = useState<string>("");
    const [dataError, setDataError] = useState<string | null>(null);

    // Находим суру по ID
    const surahs = quranData as Surah[];
    const surah = surahs.find((s) => s.id === parseInt(surahId));

    // Находим предыдущую и следующую суры
    const currentIndex = surahs.findIndex((s) => s.id === parseInt(surahId));
    const previousSurah = currentIndex > 0 ? surahs[currentIndex - 1] : null;
    const nextSurah = currentIndex < surahs.length - 1 ? surahs[currentIndex + 1] : null;

    // Функция для загрузки данных суры
    const loadSurahData = async () => {
        if (!surah) return;

        try {
            setIsLoadingData(true);
            setDataError(null);

            // Получаем настройки чтеца
            const reciterSettings = getReciterSettings();
            setSelectedReciter(reciterSettings.selectedReciter);

            // Получаем текст и аудио суры
            const { text, audio } = await getSurahWithTextAndAudio(
                surah.id,
                reciterSettings.selectedReciter
            );

            // Объединяем текст и аудио данные
            const mergedAyahs = text.ayahs.map((textAyah, index) => ({
                ...textAyah,
                audio: audio.ayahs[index]?.audio || undefined,
            }));

            setAyahs(mergedAyahs);
        } catch (error) {
            console.error("Error loading surah data:", error);
            setDataError("Error loading surah data. Please try again later.");
        } finally {
            setIsLoadingData(false);
        }
    };

    // Загружаем данные при изменении суры
    useEffect(() => {
        if (surah) {
            loadSurahData();
        }
    }, [surah?.id]);

    // Подписываемся на изменения настроек чтеца
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === "tajweed-reciter-settings" && surah) {
                loadSurahData();
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, [surah]);

    return {
        surah: surah ?? null,
        ayahs,
        isLoadingData,
        dataError,
        selectedReciter,
        previousSurah,
        nextSurah,
    };
} 