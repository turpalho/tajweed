"use client";

import { useState, useEffect } from "react";
import type { DownloadSettings, StorageInfo, DownloadSettingsState, DownloadSettingsActions } from "./types";

const STORAGE_KEY = 'tajweed-download-settings';

const DEFAULT_SETTINGS: DownloadSettings = {
    videoQuality: '720p',
    autoDownloadWifi: false,
};

const DEFAULT_STORAGE_INFO: StorageInfo = {
    usedSpace: 1200, // 1.2 ГБ в МБ
    totalSpace: 16000, // 16 ГБ в МБ
    cacheSize: 245,
};

function getDownloadSettings(): DownloadSettings {
    if (typeof window === 'undefined') {
        return DEFAULT_SETTINGS;
    }

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            return { ...DEFAULT_SETTINGS, ...parsed };
        }
    } catch (error) {
        console.error('Error loading download settings:', error);
    }

    return DEFAULT_SETTINGS;
}

function saveDownloadSettings(settings: Partial<DownloadSettings>): void {
    if (typeof window === 'undefined') {
        return;
    }

    try {
        const current = getDownloadSettings();
        const updated = { ...current, ...settings };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
        console.error('Error saving download settings:', error);
    }
}

export function useDownloadSettings(): DownloadSettingsState & DownloadSettingsActions {
    const [settings, setSettings] = useState<DownloadSettings>(DEFAULT_SETTINGS);
    const [storageInfo, setStorageInfo] = useState<StorageInfo>(DEFAULT_STORAGE_INFO);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const loadedSettings = getDownloadSettings();
        setSettings(loadedSettings);
        setIsLoaded(true);
    }, []);

    const updateVideoQuality = (quality: '1080p' | '720p' | '480p') => {
        const newSettings = { ...settings, videoQuality: quality };
        setSettings(newSettings);
        saveDownloadSettings({ videoQuality: quality });
    };

    const toggleAutoDownload = () => {
        const newSettings = { ...settings, autoDownloadWifi: !settings.autoDownloadWifi };
        setSettings(newSettings);
        saveDownloadSettings({ autoDownloadWifi: newSettings.autoDownloadWifi });
    };

    const clearCache = async () => {
        try {
            // Здесь можно добавить логику очистки кэша
            console.log("Clearing cache...");

            // Обновляем информацию о хранилище
            setStorageInfo(prev => ({
                ...prev,
                cacheSize: 0,
                usedSpace: prev.usedSpace - prev.cacheSize,
            }));
        } catch (error) {
            console.error('Error clearing cache:', error);
        }
    };

    const manageDownloads = () => {
        // Здесь можно открыть модальное окно или перейти на страницу управления загрузками
        console.log("Opening downloads manager...");
    };

    return {
        settings,
        storageInfo,
        isLoaded,
        updateVideoQuality,
        toggleAutoDownload,
        clearCache,
        manageDownloads,
    };
} 