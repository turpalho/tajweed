"use client";

import { useState } from "react";
import { useI18n, languageNames, languageFlags, locales, type Locale } from "@/shared/lib/i18n";
import { saveAppSettings } from "@/shared/lib/app-settings";
import type { LanguageOption, LanguageSwitchingState, LanguageSwitchingActions } from "./types";

export function useLanguageSwitching(): LanguageSwitchingState & LanguageSwitchingActions {
    const { locale, setLocale } = useI18n();
    const [isChanging, setIsChanging] = useState(false);

    const availableLanguages: LanguageOption[] = locales.map(lang => ({
        code: lang,
        name: languageNames[lang],
        flag: languageFlags[lang],
    }));

    const changeLanguage = async (newLocale: Locale) => {
        if (newLocale === locale) return;

        setIsChanging(true);

        try {
            setLocale(newLocale);
            await saveAppSettings({ interfaceLanguage: newLocale });
        } catch (error) {
            console.error('Error changing language:', error);
        } finally {
            setIsChanging(false);
        }
    };

    return {
        currentLanguage: locale,
        availableLanguages,
        isChanging,
        changeLanguage,
    };
}
