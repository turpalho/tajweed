import { useI18n } from './i18n/context';
import type { LocalizedText } from '@/entities/quran';

export function useLocalizedText() {
    const { locale } = useI18n();

    const getLocalizedText = (text: LocalizedText | string): string => {
        if (typeof text === 'string') {
            return text; // Return string as-is for backwards compatibility
        }
        return text[locale as keyof LocalizedText] || text.ru;
    };

    return { getLocalizedText };
}