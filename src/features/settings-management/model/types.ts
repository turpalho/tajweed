import type { AppSettings } from "@/shared/lib/app-settings";

export interface SettingsState {
    settings: AppSettings;
    isLoaded: boolean;
    isLoading: boolean;
}

export interface SettingsActions {
    updateSettings: (newSettings: Partial<AppSettings>) => Promise<void>;
    resetSettings: () => Promise<void>;
}
