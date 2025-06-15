"use client";

import { useI18n } from "@/shared/lib/i18n/context";
import {
  languageNames,
  languageFlags,
  locales,
  type Locale,
} from "@/shared/lib/i18n";
import { saveAppSettings } from "@/shared/lib/app-settings";

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  const handleLanguageChange = (lang: Locale) => {
    setLocale(lang);
    // Синхронизируем с настройками приложения
    saveAppSettings({ interfaceLanguage: lang });
  };

  return (
    <div className="flex gap-1">
      {locales.map((lang) => (
        <button
          key={lang}
          onClick={() => handleLanguageChange(lang)}
          className={`px-3 py-2 rounded-md transition-colors text-sm flex items-center gap-1 ${
            locale === lang
              ? "bg-accent text-white shadow-md"
              : "bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
          }`}
        >
          <span>{languageFlags[lang]}</span>
          <span className="hidden sm:inline">{languageNames[lang]}</span>
        </button>
      ))}
    </div>
  );
}
