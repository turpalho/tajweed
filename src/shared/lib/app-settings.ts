import type { Locale } from "./i18n";

export interface AppSettings {
    // Аудио настройки
    masterVolume: number;
    backgroundMusic: boolean;
    soundEffects: boolean;

    // Визуальные настройки
    arabicFontSize: number;
    interfaceLanguage: Locale;

    // Дополнительные настройки
    theme: 'dark' | 'light';
    autoSave: boolean;
}

const STORAGE_KEY = 'tajweed-app-settings';

const DEFAULT_SETTINGS: AppSettings = {
    masterVolume: 0.8,
    backgroundMusic: false,
    soundEffects: true,
    arabicFontSize: 18,
    interfaceLanguage: 'ru',
    theme: 'dark',
    autoSave: true,
};

export function getAppSettings(): AppSettings {
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
        console.error('Error loading app settings:', error);
    }

    return DEFAULT_SETTINGS;
}

export function saveAppSettings(settings: Partial<AppSettings>): void {
    if (typeof window === 'undefined') {
        return;
    }

    try {
        const current = getAppSettings();
        const updated = { ...current, ...settings };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

        // Синхронизируем с localStorage для системы локализации
        if (settings.interfaceLanguage) {
            localStorage.setItem("locale", settings.interfaceLanguage);
        }
    } catch (error) {
        console.error('Error saving app settings:', error);
    }
}

// Вспомогательные функции для обновления отдельных настроек
export function updateMasterVolume(volume: number): void {
    saveAppSettings({ masterVolume: Math.max(0, Math.min(1, volume)) });
}

export function toggleBackgroundMusic(): void {
    const settings = getAppSettings();
    saveAppSettings({ backgroundMusic: !settings.backgroundMusic });
}

export function toggleSoundEffects(): void {
    const settings = getAppSettings();
    saveAppSettings({ soundEffects: !settings.soundEffects });
}

export function updateArabicFontSize(size: number): void {
    saveAppSettings({ arabicFontSize: Math.max(14, Math.min(32, size)) });
}

export function updateInterfaceLanguage(language: Locale): void {
    saveAppSettings({ interfaceLanguage: language });
}

export function resetSettings(): void {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem("locale");
    }
} 