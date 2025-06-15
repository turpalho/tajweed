"use client";

import { useState, useEffect } from 'react';
import { getAppSettings, saveAppSettings, AppSettings } from '@/shared/lib/app-settings';
import { useI18n } from '@/shared/lib/i18n/context';

export function useAppSettings() {
    const { setLocale } = useI18n();

    const [settings, setSettings] = useState<AppSettings>({
        masterVolume: 0.8,
        backgroundMusic: false,
        soundEffects: true,
        arabicFontSize: 18,
        interfaceLanguage: "ru" as const,
        theme: "dark" as const,
        autoSave: true,
    });

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Загружаем настройки
        const loadedSettings = getAppSettings();
        setSettings(loadedSettings);

        // Синхронизируем язык с нашей системой локализации
        setLocale(loadedSettings.interfaceLanguage);

        setIsLoaded(true);
    }, [setLocale]);

    const updateSettings = (newSettings: Partial<AppSettings>) => {
        const updated = { ...settings, ...newSettings };
        setSettings(updated);
        saveAppSettings(newSettings);

        // Обновляем язык в системе локализации если он изменился
        if (newSettings.interfaceLanguage) {
            setLocale(newSettings.interfaceLanguage);
        }
    };

    return {
        settings,
        updateSettings,
        isLoaded,
    };
} 