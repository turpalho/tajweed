"use client";

import { useState, useEffect } from "react";
import { getAppSettings, saveAppSettings, type AppSettings } from "@/shared/lib/app-settings";
import { useI18n } from "@/shared/lib/i18n/context";
import type { SettingsState, SettingsActions } from "./types";

const DEFAULT_SETTINGS: AppSettings = {
    masterVolume: 0.8,
    backgroundMusic: false,
    soundEffects: true,
    arabicFontSize: 18,
    interfaceLanguage: "ru",
    theme: "dark",
    autoSave: true,
};

export function useSettingsManagement(): SettingsState & SettingsActions {
    const { setLocale } = useI18n();
    const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loadedSettings = getAppSettings();
        setSettings(loadedSettings);
        setLocale(loadedSettings.interfaceLanguage);
        setIsLoaded(true);
    }, [setLocale]);

    const updateSettings = async (newSettings: Partial<AppSettings>) => {
        setIsLoading(true);

        try {
            const updated = { ...settings, ...newSettings };
            setSettings(updated);

            await saveAppSettings(newSettings);

            // Обновляем язык в системе локализации если он изменился
            if (newSettings.interfaceLanguage) {
                setLocale(newSettings.interfaceLanguage);
            }
        } catch (error) {
            console.error('Error updating settings:', error);
            // Revert on error
            setSettings(settings);
        } finally {
            setIsLoading(false);
        }
    };

    const resetSettings = async () => {
        setIsLoading(true);

        try {
            setSettings(DEFAULT_SETTINGS);
            await saveAppSettings(DEFAULT_SETTINGS);
            setLocale(DEFAULT_SETTINGS.interfaceLanguage);
        } catch (error) {
            console.error('Error resetting settings:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        settings,
        isLoaded,
        isLoading,
        updateSettings,
        resetSettings,
    };
}
