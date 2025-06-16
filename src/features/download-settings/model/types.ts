export interface DownloadSettings {
    videoQuality: '1080p' | '720p' | '480p';
    autoDownloadWifi: boolean;
}

export interface StorageInfo {
    usedSpace: number; // в МБ
    totalSpace: number; // в МБ
    cacheSize: number; // в МБ
}

export interface DownloadSettingsState {
    settings: DownloadSettings;
    storageInfo: StorageInfo;
    isLoaded: boolean;
}

export interface DownloadSettingsActions {
    updateVideoQuality: (quality: '1080p' | '720p' | '480p') => void;
    toggleAutoDownload: () => void;
    clearCache: () => Promise<void>;
    manageDownloads: () => void;
} 