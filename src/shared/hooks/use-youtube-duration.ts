"use client";

import { useState, useEffect, useRef } from 'react';
import { getYouTubeVideoDuration } from '@/shared/lib/youtube-player';

interface UseYouTubeDurationReturn {
    duration: number | null;
    isLoading: boolean;
    error: string | null;
}

// Кэш для хранения длительности видео
const durationCache = new Map<string, number>();
const pendingRequests = new Map<string, Promise<number | null>>();

export function useYouTubeDuration(
    videoUrl: string,
    fallbackDuration?: number,
    enabled: boolean = true
): UseYouTubeDurationReturn {
    const [duration, setDuration] = useState<number | null>(fallbackDuration || null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const isMountedRef = useRef(true);

    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    useEffect(() => {
        if (!enabled || !videoUrl) return;

        // Проверяем кэш
        if (durationCache.has(videoUrl)) {
            const cachedDuration = durationCache.get(videoUrl);
            if (isMountedRef.current) {
                setDuration(cachedDuration || fallbackDuration || null);
                setIsLoading(false);
                setError(null);
            }
            return;
        }

        // Проверяем, есть ли уже pending запрос для этого URL
        if (pendingRequests.has(videoUrl)) {
            const existingPromise = pendingRequests.get(videoUrl);
            if (existingPromise) {
                if (isMountedRef.current) {
                    setIsLoading(true);
                    setError(null);
                }

                existingPromise.then((realDuration) => {
                    if (isMountedRef.current) {
                        if (realDuration !== null) {
                            setDuration(realDuration);
                            durationCache.set(videoUrl, realDuration);
                        } else {
                            setError('Не удалось получить длительность видео');
                            if (fallbackDuration) {
                                setDuration(fallbackDuration);
                            }
                        }
                        setIsLoading(false);
                    }
                }).catch(() => {
                    if (isMountedRef.current) {
                        setError('Ошибка при получении длительности видео');
                        if (fallbackDuration) {
                            setDuration(fallbackDuration);
                        }
                        setIsLoading(false);
                    }
                });
            }
            return;
        }

        const fetchDuration = async () => {
            if (!isMountedRef.current) return;

            setIsLoading(true);
            setError(null);

            try {
                // Создаем промис и добавляем в pending requests
                const durationPromise = getYouTubeVideoDuration(videoUrl);
                pendingRequests.set(videoUrl, durationPromise);

                const realDuration = await durationPromise;

                // Удаляем из pending requests
                pendingRequests.delete(videoUrl);

                if (!isMountedRef.current) return;

                if (realDuration !== null) {
                    setDuration(realDuration);
                    durationCache.set(videoUrl, realDuration);
                } else {
                    setError('Не удалось получить длительность видео');
                    if (fallbackDuration) {
                        setDuration(fallbackDuration);
                    }
                }
            } catch (err) {
                pendingRequests.delete(videoUrl);

                if (!isMountedRef.current) return;

                console.error('Error fetching YouTube duration:', err);
                setError('Ошибка при получении длительности видео');
                if (fallbackDuration) {
                    setDuration(fallbackDuration);
                }
            } finally {
                if (isMountedRef.current) {
                    setIsLoading(false);
                }
            }
        };

        fetchDuration();
    }, [videoUrl, fallbackDuration, enabled]);

    return { duration, isLoading, error };
} 