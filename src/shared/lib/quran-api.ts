const QURAN_API_BASE_URL = 'https://api.alquran.cloud/v1';

// Кэш для хранения данных
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 минут

function getCacheKey(endpoint: string): string {
    return `quran-api-${endpoint}`;
}

function isValidCache(timestamp: number): boolean {
    return Date.now() - timestamp < CACHE_DURATION;
}

async function fetchWithCache<T>(endpoint: string): Promise<T> {
    const cacheKey = getCacheKey(endpoint);
    const cached = cache.get(cacheKey);

    if (cached && isValidCache(cached.timestamp)) {
        return cached.data as T;
    }

    try {
        const response = await fetch(`${QURAN_API_BASE_URL}${endpoint}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        cache.set(cacheKey, { data, timestamp: Date.now() });
        return data;
    } catch (error) {
        console.error(`Error fetching from Quran API:`, error);
        throw error;
    }
}

export interface QuranEdition {
    identifier: string;
    language: string;
    name: string;
    englishName: string;
    format: 'text' | 'audio';
    type: 'translation' | 'tafsir' | 'quran' | 'transliteration';
}

export interface QuranReciter extends QuranEdition {
    bitrate?: string;
}

export interface QuranApiSurah {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    numberOfAyahs: number;
    revelationType: string;
}

export interface QuranApiAyah {
    number: number;
    text: string;
    audio?: string;
    audioSecondary?: string[];
    surah: QuranApiSurah;
    numberInSurah: number;
    juz: number;
    manzil: number;
    page: number;
    ruku: number;
    hizbQuarter: number;
    sajda: boolean;
}

export interface QuranApiResponse<T> {
    code: number;
    status: string;
    data: T;
}

export interface QuranApiSurahData {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    revelationType: string;
    numberOfAyahs: number;
    ayahs: QuranApiAyah[];
    edition: QuranEdition;
}

// Получить все аудио издания (чтецов)
export async function getAudioEditions(): Promise<QuranReciter[]> {
    const response = await fetchWithCache<QuranApiResponse<QuranReciter[]>>('/edition?format=audio');
    return response.data.filter(edition => edition.language === 'ar'); // Только арабские чтецы
}

// Получить конкретную суру от определенного чтеца
export async function getSurahAudio(surahNumber: number, reciterIdentifier: string): Promise<QuranApiSurahData> {
    const response = await fetchWithCache<QuranApiResponse<QuranApiSurahData>>(`/surah/${surahNumber}/${reciterIdentifier}`);
    return response.data;
}

// Получить информацию о всех сурах
export async function getAllSurahs(): Promise<QuranApiSurah[]> {
    const response = await fetchWithCache<QuranApiResponse<{ surahs: QuranApiSurah[] }>>('/surah');
    return response.data.surahs;
}

// Получить один аят от определенного чтеца
export async function getAyahAudio(ayahNumber: number, reciterIdentifier: string): Promise<QuranApiAyah> {
    const response = await fetchWithCache<QuranApiResponse<QuranApiAyah>>(`/ayah/${ayahNumber}/${reciterIdentifier}`);
    return response.data;
}

// Популярные чтецы (можно настроить приоритет)
export const POPULAR_RECITERS = [
    'ar.alafasy',        // Мишари Рашид аль-Афаси
    'ar.husary',         // Махмуд Халиль аль-Хусари
    'ar.minshawi',       // Мухаммад Сиддик аль-Миншави
    'ar.sudais',         // Абдуррахман ас-Судайс
    'ar.shuraym',        // Сауд аш-Шурейм
    'ar.maher',          // Махер аль-Муайкли
    'ar.ajmy',           // Ахмад Али аль-Аджми
    'ar.hani',           // Хани ар-Рифаи
];

// Получить информацию о чтеце по идентификатору
export async function getReciterInfo(identifier: string): Promise<QuranReciter | null> {
    try {
        const reciters = await getAudioEditions();
        return reciters.find(r => r.identifier === identifier) || null;
    } catch (error) {
        console.error('Error getting reciter info:', error);
        return null;
    }
}

// Получить прямую ссылку на аудио суры
export function getSurahAudioUrl(surahNumber: number, reciterIdentifier: string): string {
    // Базовый URL для получения аудио суры
    return `${QURAN_API_BASE_URL}/surah/${surahNumber}/${reciterIdentifier}`;
}

// Получить полное аудио суры от чтеца
export async function getCompleteSurahAudioUrl(
    surahNumber: number,
    reciterIdentifier: string
): Promise<string | null> {
    try {
        const surahData = await getSurahAudio(surahNumber, reciterIdentifier);

        // Некоторые чтецы предоставляют полное аудио суры в первом аяте
        // с указанием в audioSecondary для остальных аятов
        if (surahData.ayahs && surahData.ayahs.length > 0) {
            const firstAyah = surahData.ayahs[0];

            // Проверяем, есть ли аудио для первого аята
            if (firstAyah.audio) {
                // Для некоторых чтецов первый аят содержит полную суру
                // Проверяем по наличию audioSecondary
                if (!firstAyah.audioSecondary || firstAyah.audioSecondary.length === 0) {
                    // Если нет audioSecondary, скорее всего это полная сура
                    return firstAyah.audio;
                } else {
                    // Если есть audioSecondary, это отдельные аяты
                    // Возвращаем первый аят как превью
                    return firstAyah.audio;
                }
            }
        }

        return null;
    } catch (error) {
        console.error('Error getting complete surah audio:', error);
        return null;
    }
}

// Получить список всех аудио URL для аятов суры
export async function getSurahAyahsAudioUrls(
    surahNumber: number,
    reciterIdentifier: string
): Promise<string[]> {
    try {
        const surahData = await getSurahAudio(surahNumber, reciterIdentifier);

        if (surahData.ayahs) {
            return surahData.ayahs
                .map(ayah => ayah.audio)
                .filter((url): url is string => url !== undefined);
        }

        return [];
    } catch (error) {
        console.error('Error getting surah ayahs audio:', error);
        return [];
    }
}

// Получить текст суры на арабском языке
export async function getSurahText(surahNumber: number): Promise<QuranApiSurahData> {
    const response = await fetchWithCache<QuranApiResponse<QuranApiSurahData>>(
        `/surah/${surahNumber}/quran-uthmani`
    );
    return response.data;
}

// Получить суру с текстом и аудио
export async function getSurahWithTextAndAudio(
    surahNumber: number,
    reciterIdentifier: string
): Promise<{
    text: QuranApiSurahData;
    audio: QuranApiSurahData;
}> {
    const [textData, audioData] = await Promise.all([
        getSurahText(surahNumber),
        getSurahAudio(surahNumber, reciterIdentifier)
    ]);

    return { text: textData, audio: audioData };
}

// Получить страницу Корана
export async function getQuranPage(
    pageNumber: number,
    edition: string = 'quran-uthmani'
): Promise<QuranApiAyah[]> {
    const response = await fetchWithCache<QuranApiResponse<QuranApiAyah[]>>(
        `/page/${pageNumber}/${edition}`
    );
    return response.data;
} 