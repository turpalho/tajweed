// Утилита для работы с YouTube Player API
interface YouTubePlayer {
    getDuration(): number;
}

interface YouTubeEvent {
    target: YouTubePlayer;
    data?: number;
}

interface YouTubeAPI {
    Player: new (element: HTMLElement, config: unknown) => YouTubePlayer;
}

declare global {
    interface Window {
        YT: YouTubeAPI;
        onYouTubeIframeAPIReady: () => void;
    }
}

// Загружаем YouTube API скрипт
export function loadYouTubeAPI(): Promise<void> {
    return new Promise((resolve) => {
        if (window.YT && window.YT.Player) {
            resolve();
            return;
        }

        window.onYouTubeIframeAPIReady = () => {
            resolve();
        };

        if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
            const script = document.createElement('script');
            script.src = 'https://www.youtube.com/iframe_api';
            script.async = true;
            document.head.appendChild(script);
        }
    });
}

// Получение YouTube ID из URL
export function getYouTubeId(url: string): string | null {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
}

// Безопасное удаление элемента
function safeRemoveElement(element: HTMLElement): void {
    try {
        if (element && element.parentNode) {
            element.parentNode.removeChild(element);
        }
    } catch (error) {
        console.warn('Element already removed from DOM:', error);
    }
}

// Получение длительности видео через Player API
export async function getYouTubeVideoDuration(videoUrl: string): Promise<number | null> {
    const videoId = getYouTubeId(videoUrl);
    if (!videoId) return null;

    try {
        await loadYouTubeAPI();

        return new Promise((resolve) => {
            let isResolved = false;

            // Создаем временный div для плеера с уникальным ID
            const tempDiv = document.createElement('div');
            const uniqueId = `temp-youtube-player-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            tempDiv.id = uniqueId;
            tempDiv.style.cssText = 'position: absolute; left: -9999px; top: -9999px; width: 1px; height: 1px; opacity: 0; pointer-events: none;';
            document.body.appendChild(tempDiv);

            // Таймаут для безопасности
            const timeoutId = setTimeout(() => {
                if (!isResolved) {
                    isResolved = true;
                    safeRemoveElement(tempDiv);
                    resolve(null);
                }
            }, 10000); // 10 секунд таймаут

            try {
                const player = new window.YT.Player(tempDiv, {
                    videoId: videoId,
                    width: 1,
                    height: 1,
                    playerVars: {
                        autoplay: 0,
                        controls: 0,
                        disablekb: 1,
                        fs: 0,
                        iv_load_policy: 3,
                        modestbranding: 1,
                        playsinline: 1,
                        rel: 0,
                        showinfo: 0
                    },
                    events: {
                        onReady: (event: YouTubeEvent) => {
                            if (!isResolved) {
                                try {
                                    const duration = event.target.getDuration();
                                    isResolved = true;
                                    clearTimeout(timeoutId);
                                    safeRemoveElement(tempDiv);
                                    resolve(duration ? Math.round(duration) : null);
                                } catch (error) {
                                    console.error('Error getting duration from player:', error);
                                    isResolved = true;
                                    clearTimeout(timeoutId);
                                    safeRemoveElement(tempDiv);
                                    resolve(null);
                                }
                            }
                        },
                        onError: (event: YouTubeEvent) => {
                            if (!isResolved) {
                                console.warn('YouTube player error:', event.data);
                                isResolved = true;
                                clearTimeout(timeoutId);
                                safeRemoveElement(tempDiv);
                                resolve(null);
                            }
                        }
                    }
                });
                console.log(player);
            } catch (playerError) {
                console.error('Error creating YouTube player:', playerError);
                if (!isResolved) {
                    isResolved = true;
                    clearTimeout(timeoutId);
                    safeRemoveElement(tempDiv);
                    resolve(null);
                }
            }
        });
    } catch (error) {
        console.error('Error getting YouTube video duration:', error);
        return null;
    }
}

// Форматирование длительности для отображения
export function formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Форматирование длительности в минутах
export function formatDurationInMinutes(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (remainingSeconds === 0) {
        return `${minutes} мин`;
    }

    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')} мин`;
}