import type { Locale } from "@/shared/lib/i18n";

export interface LanguageOption {
    code: Locale;
    name: string;
    flag: string;
}

export interface LanguageSwitchingState {
    currentLanguage: Locale;
    availableLanguages: LanguageOption[];
    isChanging: boolean;
}

export interface LanguageSwitchingActions {
    changeLanguage: (locale: Locale) => Promise<void>;
}
