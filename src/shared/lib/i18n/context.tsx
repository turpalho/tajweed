"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Locale, getTranslation } from "./index";
import { getAppSettings } from "@/shared/lib/app-settings";

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  // Устанавливаем русский язык по умолчанию
  const [locale, setLocaleState] = useState<Locale>("ru");

  useEffect(() => {
    // Приоритет загрузки языка:
    // 1. Из настроек приложения
    // 2. Из localStorage
    // 3. Из браузера
    // 4. Русский по умолчанию

    try {
      const appSettings = getAppSettings();
      const settingsLocale = appSettings.interfaceLanguage;

      if (settingsLocale && ["en", "ru", "ar"].includes(settingsLocale)) {
        setLocaleState(settingsLocale);
        localStorage.setItem("locale", settingsLocale);
        document.documentElement.lang = settingsLocale;
        console.log("I18n initialized from app settings:", settingsLocale);
        return;
      }
    } catch (error) {
      console.warn("Error loading locale from app settings:", error);
    }

    // Получаем сохраненную локаль из localStorage
    const savedLocale = localStorage.getItem("locale") as Locale;

    if (savedLocale && ["en", "ru", "ar"].includes(savedLocale)) {
      setLocaleState(savedLocale);
      document.documentElement.lang = savedLocale;
      console.log("I18n initialized from localStorage:", savedLocale);
    } else {
      // Определяем локаль по браузеру
      const browserLocale = navigator.language.split("-")[0] as Locale;

      if (["en", "ru", "ar"].includes(browserLocale)) {
        setLocaleState(browserLocale);
        localStorage.setItem("locale", browserLocale);
        document.documentElement.lang = browserLocale;
        console.log("I18n initialized from browser:", browserLocale);
      } else {
        // Устанавливаем русский по умолчанию
        setLocaleState("ru");
        localStorage.setItem("locale", "ru");
        document.documentElement.lang = "ru";
        console.log("I18n initialized with default: ru");
      }
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
    // Обновляем lang атрибут документа
    document.documentElement.lang = newLocale;
    console.log("Locale changed to:", newLocale);
  };

  const t = (key: string): string => {
    const translation = getTranslation(locale, key);
    // Логируем только если перевод не найден
    if (translation === key) {
      console.warn(
        `Translation not found for key "${key}" in locale "${locale}"`
      );
    }
    return translation;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
