import en from "@/shared/locales/en.json";
import ru from "@/shared/locales/ru.json";
import ar from "@/shared/locales/ar.json";

export type Locale = "en" | "ru" | "ar";

export const locales: Locale[] = ["en", "ru", "ar"];
export const defaultLocale: Locale = "en";

export const translations = {
    en,
    ru,
    ar,
} as const;

export type TranslationKey = keyof typeof en;

// Функция для получения вложенного значения по пути
export function getNestedValue(
    obj: Record<string, unknown>,
    path: string,
): string {
    const result = path.split(".").reduce(
        (current: unknown, key) => (current as Record<string, unknown>)?.[key],
        obj,
    );
    return typeof result === "string" ? result : path;
}

// Функция для получения перевода
export function getTranslation(locale: Locale, key: string): string {
    const translation = translations[locale];

    // Прямой доступ к переводу по ключу
    const result = (translation as Record<string, unknown>)[key];

    if (typeof result === "string") {
        return result;
    }

    // Если прямого доступа нет, попробуем через точечную нотацию
    return getNestedValue(translation, key);
}

// Информация о языках
export const languageNames = {
    en: "English",
    ru: "Русский",
    ar: "العربية",
} as const;

export const languageFlags = {
    en: "🇺🇸",
    ru: "🇷🇺",
    ar: "🇸🇦",
} as const;

// Экспорт контекста и провайдера
export { I18nProvider, useI18n } from "./context";
