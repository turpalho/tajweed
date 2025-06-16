import type { QuranReciter } from "@/shared/lib/quran-api";
import type { ReciterSettings } from "@/shared/lib/reciter-settings";

export interface ReciterManagementState {
    reciters: QuranReciter[];
    settings: ReciterSettings;
    loading: boolean;
    error: string | null;
}

export interface ReciterManagementActions {
    updateReciter: (reciterIdentifier: string) => void;
    retryLoading: () => void;
} 