"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
  Rewind,
  FastForward,
  AlertCircle,
} from "lucide-react";
import { Surah } from "@/entities/quran";
import {
  getReciterInfo,
  QuranReciter,
  QuranApiAyah,
} from "@/shared/lib/quran-api";
import { useI18n } from "@/shared/lib/i18n";

interface AudioPlayerProps {
  surah: Surah;
  ayahs: QuranApiAyah[];
  reciterIdentifier: string;
  previousSurah?: Surah | null;
  nextSurah?: Surah | null;
  onPreviousSurah?: () => void;
  onNextSurah?: () => void;
  onError?: string | null;
  onAyahChange?: (ayahNumber: number | null) => void;
  onPlayingStateChange?: (isPlaying: boolean) => void;
}

export interface AudioPlayerHandle {
  playSpecificAyah: (ayahIndex: number) => void;
}

export const AudioPlayer = forwardRef<AudioPlayerHandle, AudioPlayerProps>(
  (
    {
      surah,
      ayahs,
      reciterIdentifier,
      previousSurah,
      nextSurah,
      onPreviousSurah,
      onNextSurah,
      onError,
      onAyahChange,
      onPlayingStateChange,
    },
    ref
  ) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentAyahIndex, setCurrentAyahIndex] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [reciterInfo, setReciterInfo] = useState<QuranReciter | null>(null);

    const { t } = useI18n();

    // Получаем текущий аят
    const currentAyah = ayahs[currentAyahIndex];

    // Императивный API для родительского компонента
    useImperativeHandle(
      ref,
      () => ({
        playSpecificAyah: (ayahIndex: number) => {
          if (ayahIndex >= 0 && ayahIndex < ayahs.length) {
            setCurrentAyahIndex(ayahIndex);
            setCurrentTime(0);
            if (!isPlaying) {
              const audio = audioRef.current;
              if (audio && ayahs[ayahIndex]?.audio) {
                audio.src = ayahs[ayahIndex].audio!;
                audio
                  .play()
                  .then(() => setIsPlaying(true))
                  .catch(console.error);
              }
            }
          }
        },
      }),
      [ayahs, isPlaying]
    );

    // Загружаем информацию о чтеце
    useEffect(() => {
      const loadReciterInfo = async () => {
        const info = await getReciterInfo(reciterIdentifier);
        setReciterInfo(info);
      };
      loadReciterInfo();
    }, [reciterIdentifier]);

    // Обновляем родительский компонент о текущем аяте
    useEffect(() => {
      if (onAyahChange) {
        onAyahChange(currentAyah?.number || null);
      }
    }, [currentAyah, onAyahChange]);

    // Обновляем родительский компонент о состоянии воспроизведения
    useEffect(() => {
      if (onPlayingStateChange) {
        onPlayingStateChange(isPlaying);
      }
    }, [isPlaying, onPlayingStateChange]);

    // Обработчик окончания воспроизведения аята
    const handleAyahEnded = useCallback(() => {
      if (currentAyahIndex < ayahs.length - 1) {
        // Переходим к следующему аяту
        setCurrentAyahIndex(currentAyahIndex + 1);
      } else {
        // Конец суры
        setIsPlaying(false);
        setCurrentAyahIndex(0);
        if (nextSurah && onNextSurah) {
          onNextSurah();
        }
      }
    }, [currentAyahIndex, ayahs.length, nextSurah, onNextSurah]);

    // Обновляем источник аудио при изменении аята
    useEffect(() => {
      const audio = audioRef.current;
      if (!audio || !currentAyah?.audio) return;

      audio.src = currentAyah.audio;

      if (isPlaying) {
        audio.play().catch((error) => {
          console.error("Ошибка воспроизведения:", error);
          setIsPlaying(false);
        });
      }
    }, [currentAyahIndex, currentAyah]);

    useEffect(() => {
      const audio = audioRef.current;
      if (!audio) return;

      const handleTimeUpdate = () => {
        if (!isDragging && audio.currentTime) {
          setCurrentTime(audio.currentTime);
        }
      };

      const handleDurationChange = () => {
        if (audio.duration && !isNaN(audio.duration)) {
          setDuration(audio.duration);
        }
      };

      const handleLoadStart = () => setIsLoading(true);
      const handleCanPlay = () => setIsLoading(false);

      const handleLoadedMetadata = () => {
        if (audio.duration && !isNaN(audio.duration)) {
          setDuration(audio.duration);
        }
      };

      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("durationchange", handleDurationChange);
      audio.addEventListener("loadstart", handleLoadStart);
      audio.addEventListener("canplay", handleCanPlay);
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      audio.addEventListener("ended", handleAyahEnded);

      return () => {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("durationchange", handleDurationChange);
        audio.removeEventListener("loadstart", handleLoadStart);
        audio.removeEventListener("canplay", handleCanPlay);
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audio.removeEventListener("ended", handleAyahEnded);
      };
    }, [isDragging, handleAyahEnded]);

    const toggleAudio = () => {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          audioRef.current
            .play()
            .then(() => setIsPlaying(true))
            .catch((error) => {
              console.error("Ошибка воспроизведения:", error);
              setIsPlaying(false);
            });
        }
      }
    };

    const skipToAyah = (ayahIndex: number) => {
      if (ayahIndex >= 0 && ayahIndex < ayahs.length) {
        setCurrentAyahIndex(ayahIndex);
        setCurrentTime(0);
      }
    };

    const skipToPreviousAyah = () => {
      if (currentAyahIndex > 0) {
        skipToAyah(currentAyahIndex - 1);
      } else if (previousSurah && onPreviousSurah) {
        onPreviousSurah();
      }
    };

    const skipToNextAyah = () => {
      if (currentAyahIndex < ayahs.length - 1) {
        skipToAyah(currentAyahIndex + 1);
      } else if (nextSurah && onNextSurah) {
        onNextSurah();
      }
    };

    const skipTime = (seconds: number) => {
      if (!audioRef.current) return;

      const audio = audioRef.current;
      if (!audio.duration || isNaN(audio.duration)) return;

      const newTime = Math.max(
        0,
        Math.min(audio.duration, audio.currentTime + seconds)
      );
      audio.currentTime = newTime;
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!audioRef.current || !progressBarRef.current) return;

      const audio = audioRef.current;
      if (!audio.duration || isNaN(audio.duration)) return;

      const rect = progressBarRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, clickX / rect.width));
      const newTime = percentage * audio.duration;

      audio.currentTime = newTime;
      setCurrentTime(newTime);
    };

    const handleProgressMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(true);
      handleProgressClick(e);
    };

    const handleProgressMouseMove = useCallback(
      (e: MouseEvent) => {
        if (!isDragging || !audioRef.current || !progressBarRef.current) return;

        const audio = audioRef.current;
        if (!audio.duration || isNaN(audio.duration)) return;

        const rect = progressBarRef.current.getBoundingClientRect();
        const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        const percentage = clickX / rect.width;
        const newTime = percentage * audio.duration;

        setCurrentTime(newTime);
      },
      [isDragging]
    );

    const handleProgressMouseUp = useCallback(() => {
      if (!isDragging || !audioRef.current) return;

      audioRef.current.currentTime = currentTime;
      setIsDragging(false);
    }, [isDragging, currentTime]);

    useEffect(() => {
      if (isDragging) {
        document.addEventListener("mousemove", handleProgressMouseMove);
        document.addEventListener("mouseup", handleProgressMouseUp);

        return () => {
          document.removeEventListener("mousemove", handleProgressMouseMove);
          document.removeEventListener("mouseup", handleProgressMouseUp);
        };
      }
    }, [isDragging, handleProgressMouseMove, handleProgressMouseUp]);

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVolume = parseFloat(e.target.value);
      setVolume(newVolume);
      if (audioRef.current) {
        audioRef.current.volume = newVolume;
      }
      setIsMuted(newVolume === 0);
    };

    const toggleMute = () => {
      if (!audioRef.current) return;

      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    };

    const formatTime = (time: number) => {
      if (isNaN(time) || time === Infinity) return "0:00";
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    const progressPercentage =
      duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
      <div className="bg-secondary rounded-3xl p-6">
        <h3 className="text-lg font-semibold text-[#E0E0E0] mb-6">
          Аудио плеер
        </h3>

        {/* Информация о треке */}
        <div className="text-center mb-6">
          <div className="text-2xl font-bold text-[#E0E0E0] mb-1">
            {surah.name}
          </div>
          <div className="text-lg text-[#E0E0E0]/70 font-arabic">
            {surah.nameArabic}
          </div>
          {currentAyah && (
            <div className="text-sm text-[#E0E0E0]/60 mt-2">
              {t("quran.ayah")} {currentAyah.numberInSurah} {t("alphabet.of")}{" "}
              {ayahs.length}
            </div>
          )}
          {reciterInfo && (
            <div className="text-sm text-[#E0E0E0]/60">
              {t("quran.reciter")} {reciterInfo.name || reciterInfo.englishName}
            </div>
          )}
        </div>

        {/* Warning message if using fallback audio */}
        {onError && (
          <div className="mb-4 p-3 bg-yellow-500/20 rounded-2xl flex items-start gap-2">
            <AlertCircle size={18} className="text-yellow-500 mt-0.5" />
            <span className="text-sm text-yellow-500">{onError}</span>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-[#E0E0E0]/70 mb-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <div
            ref={progressBarRef}
            className="w-full h-3 bg-primary rounded-full cursor-pointer relative overflow-hidden group"
            onClick={handleProgressClick}
            onMouseDown={handleProgressMouseDown}
          >
            <div
              className="h-full bg-accent rounded-full transition-all duration-100 pointer-events-none"
              style={{ width: `${progressPercentage}%` }}
            />
            <div
              className={`absolute top-1/2 w-4 h-4 bg-accent rounded-full shadow-lg transition-all pointer-events-none ${
                isDragging ? "scale-125" : "group-hover:scale-110"
              }`}
              style={{
                left: `${progressPercentage}%`,
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 mb-6">
          {/* Предыдущий аят */}
          <button
            onClick={skipToPreviousAyah}
            disabled={currentAyahIndex === 0 && !previousSurah}
            className="p-3 bg-primary rounded-full hover:bg-[#E0E0E0]/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title={
              currentAyahIndex > 0
                ? t("quran.previousAyah")
                : t("quran.previousSurahButton")
            }
          >
            <SkipBack size={20} color="#E0E0E0" />
          </button>

          {/* -5 секунд */}
          <button
            onClick={() => skipTime(-5)}
            className="p-3 bg-primary rounded-full hover:bg-[#E0E0E0]/10 transition-colors"
            title={t("quran.backward5sec")}
          >
            <Rewind size={20} color="#E0E0E0" />
          </button>

          {/* Play/Pause */}
          <button
            onClick={toggleAudio}
            disabled={isLoading || !currentAyah?.audio}
            className="p-4 bg-accent text-white rounded-full hover:bg-accent/80 transition-colors disabled:opacity-50 mx-2"
            title={isPlaying ? t("quran.pause") : t("quran.play")}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause size={24} />
            ) : (
              <Play size={24} />
            )}
          </button>

          {/* +5 секунд */}
          <button
            onClick={() => skipTime(5)}
            className="p-3 bg-primary rounded-full hover:bg-[#E0E0E0]/10 transition-colors"
            title={t("quran.forward5sec")}
          >
            <FastForward size={20} color="#E0E0E0" />
          </button>

          {/* Следующий аят */}
          <button
            onClick={skipToNextAyah}
            disabled={currentAyahIndex === ayahs.length - 1 && !nextSurah}
            className="p-3 bg-primary rounded-full hover:bg-[#E0E0E0]/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title={
              currentAyahIndex < ayahs.length - 1
                ? t("quran.nextAyah")
                : t("quran.nextSurahButton")
            }
          >
            <SkipForward size={20} color="#E0E0E0" />
          </button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={toggleMute}
            className="p-2 bg-primary rounded-full hover:bg-[#E0E0E0]/10 transition-colors"
            title={isMuted ? t("quran.enableSound") : t("quran.disableSound")}
          >
            {isMuted || volume === 0 ? (
              <VolumeX size={18} color="#E0E0E0" />
            ) : (
              <Volume2 size={18} color="#E0E0E0" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="flex-1 h-2 bg-primary rounded-full appearance-none cursor-pointer volume-slider"
            title={`${t("quran.volume")} ${Math.round(
              (isMuted ? 0 : volume) * 100
            )}%`}
          />
          <span className="text-sm text-[#E0E0E0]/70 min-w-[3rem] text-right">
            {Math.round((isMuted ? 0 : volume) * 100)}%
          </span>
        </div>

        <audio
          ref={audioRef}
          preload="metadata"
          onError={(e) => {
            console.error("Ошибка загрузки аудио:", e);
            setIsPlaying(false);
            setIsLoading(false);
          }}
        />

        <style jsx>
          {`
            .volume-slider::-webkit-slider-thumb {
              appearance: none;
              width: 16px;
              height: 16px;
              border-radius: 50%;
              background: #e67e22;
              cursor: pointer;
              box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
            }

            .volume-slider::-moz-range-thumb {
              width: 16px;
              height: 16px;
              border-radius: 50%;
              background: #e67e22;
              cursor: pointer;
              border: none;
              box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
            }

            .volume-slider {
              background: linear-gradient(
                to right,
                #e67e22 0%,
                #e67e22 ${(isMuted ? 0 : volume) * 100}%,
                #2a2a2a ${(isMuted ? 0 : volume) * 100}%,
                #2a2a2a 100%
              );
            }
          `}
        </style>
      </div>
    );
  }
);

AudioPlayer.displayName = "AudioPlayer";
