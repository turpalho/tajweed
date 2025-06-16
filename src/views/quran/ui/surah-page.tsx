"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

import { AudioPlayer, AudioPlayerHandle } from "./audio-player";
import { AyahDisplay } from "./ayah-display";
import { useI18n } from "@/shared/lib/i18n/context";
import { useAppSettings } from "@/shared/hooks/use-app-settings";

// Features
import { useSurahData } from "@/features/surah-data";
import { useSurahReadingStatus } from "@/features/surah-reading-status";

// Widgets
import { SurahPageHeader } from "@/widgets/surah-page-header";
import { SurahInfoDisplay } from "@/widgets/surah-info-display";
import { SurahStudyMaterials } from "@/widgets/surah-study-materials";
import { SurahReadingControl } from "@/widgets/surah-reading-control";
import { SurahInfoCard } from "@/widgets/surah-info-card";
import { SurahNavigationCard } from "@/widgets/surah-navigation-card";
import { QuranProgressCard } from "@/widgets/quran-progress-card";
import { LoadingState } from "@/widgets/loading-state";

interface SurahPageProps {
  surahId: string;
}

export function SurahPage({ surahId }: SurahPageProps) {
  const router = useRouter();
  const audioPlayerRef = useRef<AudioPlayerHandle>(null);
  const [currentAyahNumber, setCurrentAyahNumber] = useState<number | null>(
    null
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const { t } = useI18n();
  const { isLoaded } = useAppSettings();

  // Загружаем данные суры
  const {
    surah,
    ayahs,
    isLoadingData,
    dataError,
    selectedReciter,
    previousSurah,
    nextSurah,
  } = useSurahData(surahId);

  // Управляем статусом прочтения
  const { isRead, toggleReadStatus } = useSurahReadingStatus(surah?.id);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#E0E0E0]">{t("common.loading")}</div>
      </div>
    );
  }

  if (!surah) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#E0E0E0] mb-4">
            {t("quran.surahNotFound")}
          </h1>
          <button
            onClick={() => router.push("/quran")}
            className="px-6 py-3 bg-accent text-white rounded-2xl hover:bg-accent/80 transition-colors"
          >
            {t("quran.returnToQuran")}
          </button>
        </div>
      </div>
    );
  }

  const handlePreviousSurah = () => {
    if (previousSurah) {
      router.push(`/quran/${previousSurah.id}`);
    }
  };

  const handleNextSurah = () => {
    if (nextSurah) {
      router.push(`/quran/${nextSurah.id}`);
    }
  };

  // Вычисляем индекс текущей суры
  const currentIndex = surah.id - 1; // ID начинается с 1, а индекс с 0
  const totalSurahs = 114; // Всего сур в Коране

  return (
    <div className="min-h-screen relative">
      <div className="relative py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <SurahPageHeader surah={surah} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Surah Display */}
              <SurahInfoDisplay surah={surah} />

              {/* Ayah Display */}
              {!isLoadingData && ayahs.length > 0 && (
                <AyahDisplay
                  ayahs={ayahs}
                  currentAyahNumber={currentAyahNumber}
                  isPlaying={isPlaying}
                  onPlayAyah={(ayahIndex) => {
                    // Получаем номер аята по индексу
                    const ayahNumber = ayahs[ayahIndex]?.number;

                    // Если этот аят уже воспроизводится, ставим на паузу
                    if (currentAyahNumber === ayahNumber && isPlaying) {
                      if (audioPlayerRef.current) {
                        audioPlayerRef.current.pauseAudio();
                      }
                    } else {
                      // Иначе начинаем воспроизведение этого аята
                      if (audioPlayerRef.current) {
                        audioPlayerRef.current.playSpecificAyah(ayahIndex);
                      }
                    }
                  }}
                />
              )}

              {/* Audio Player */}
              {!isLoadingData && ayahs.length > 0 && (
                <AudioPlayer
                  ref={audioPlayerRef}
                  surah={surah}
                  ayahs={ayahs}
                  reciterIdentifier={selectedReciter}
                  previousSurah={previousSurah}
                  nextSurah={nextSurah}
                  onPreviousSurah={handlePreviousSurah}
                  onNextSurah={handleNextSurah}
                  onError={dataError}
                  onAyahChange={setCurrentAyahNumber}
                  onPlayingStateChange={setIsPlaying}
                />
              )}

              {/* Loading state */}
              {isLoadingData && (
                <LoadingState message={t("quran.loadingSurahData")} />
              )}

              {/* Study Materials */}
              <SurahStudyMaterials surah={surah} />

              {/* Reading Control */}
              <SurahReadingControl
                isRead={isRead}
                onToggle={toggleReadStatus}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Surah Info */}
              <SurahInfoCard surah={surah} isRead={isRead} />

              {/* Navigation */}
              <SurahNavigationCard
                previousSurah={previousSurah}
                nextSurah={nextSurah}
                onPreviousSurah={handlePreviousSurah}
                onNextSurah={handleNextSurah}
              />

              {/* Progress */}
              <QuranProgressCard
                currentIndex={currentIndex}
                totalSurahs={totalSurahs}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
