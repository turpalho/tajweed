import { useI18n } from './context';

// Альтернативный хук для совместимости
export function useTranslation() {
    const { t, locale, setLocale } = useI18n();

    return {
        t,
        locale,
        setLocale,
    };
}
