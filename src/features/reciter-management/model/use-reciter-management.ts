"use client";

import { useState, useEffect } from "react";
import { useI18n } from "@/shared/lib/i18n/context";
import {
    getAudioEditions,
    QuranReciter,
    POPULAR_RECITERS,
} from "@/shared/lib/quran-api";
import {
    getReciterSettings,
    saveReciterSettings,
} from "@/shared/lib/reciter-settings";
import type { ReciterSettings } from "@/shared/lib/reciter-settings";
import type { ReciterManagementState, ReciterManagementActions } from "./types";

const DEFAULT_RECITER_SETTINGS: ReciterSettings = {
    selectedReciter: "ar.alafasy",
    volume: 0.8,
    autoplay: false,
    repeat: false,
};

export function useReciterManagement(): ReciterManagementState & ReciterManagementActions {
    const { t } = useI18n();
    const [reciters, setReciters] = useState<QuranReciter[]>([]);
    const [settings, setSettings] = useState<ReciterSettings>(
        DEFAULT_RECITER_SETTINGS
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Загружаем настройки только на клиенте
        const loadedSettings = getReciterSettings();
        setSettings(loadedSettings);
        loadReciters();
    }, []);

    const loadReciters = async () => {
        try {
            setLoading(true);
            setError(null);
            const allReciters = await getAudioEditions();

            // Сортируем чтецов: сначала популярные, потом остальные по алфавиту
            const popularReciters = allReciters
                .filter((r) => POPULAR_RECITERS.includes(r.identifier))
                .sort(
                    (a, b) =>
                        POPULAR_RECITERS.indexOf(a.identifier) -
                        POPULAR_RECITERS.indexOf(b.identifier)
                );

            const otherReciters = allReciters
                .filter((r) => !POPULAR_RECITERS.includes(r.identifier))
                .sort((a, b) => a.englishName.localeCompare(b.englishName));

            setReciters([...popularReciters, ...otherReciters]);
        } catch (err) {
            setError(t("settings.loadingRecitersError"));
            console.error("Error loading reciters:", err);
        } finally {
            setLoading(false);
        }
    };

    const updateReciter = (reciterIdentifier: string) => {
        const newSettings = { ...settings, selectedReciter: reciterIdentifier };
        setSettings(newSettings);
        saveReciterSettings({ selectedReciter: reciterIdentifier });
    };

    const retryLoading = () => {
        loadReciters();
    };

    return {
        reciters,
        settings,
        loading,
        error,
        updateReciter,
        retryLoading,
    };
} 