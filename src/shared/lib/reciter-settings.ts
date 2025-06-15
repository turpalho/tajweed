export interface ReciterSettings {
    selectedReciter: string;
    volume: number;
    autoplay: boolean;
    repeat: boolean;
}

const STORAGE_KEY = 'tajweed-reciter-settings';

const DEFAULT_SETTINGS: ReciterSettings = {
    selectedReciter: 'ar.alafasy', // Мишари Рашид аль-Афаси по умолчанию
    volume: 0.8,
    autoplay: false,
    repeat: false,
};

export function getReciterSettings(): ReciterSettings {
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
        console.error('Error loading reciter settings:', error);
    }

    return DEFAULT_SETTINGS;
}

export function saveReciterSettings(settings: Partial<ReciterSettings>): void {
    if (typeof window === 'undefined') {
        return;
    }

    try {
        const current = getReciterSettings();
        const updated = { ...current, ...settings };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
        console.error('Error saving reciter settings:', error);
    }
}

export function updateSelectedReciter(reciterIdentifier: string): void {
    saveReciterSettings({ selectedReciter: reciterIdentifier });
}

export function updateVolume(volume: number): void {
    saveReciterSettings({ volume: Math.max(0, Math.min(1, volume)) });
}

export function updateAutoplay(autoplay: boolean): void {
    saveReciterSettings({ autoplay });
}

export function updateRepeat(repeat: boolean): void {
    saveReciterSettings({ repeat });
} 