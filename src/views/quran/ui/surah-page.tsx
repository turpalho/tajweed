"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowLeft, CheckCircle, FileText, Download } from "lucide-react";
import quranData from "@/shared/data/quran-surahs.json";
import { useRouter } from "next/navigation";
import { Surah } from "@/entities/quran";
import { formatDuration } from "@/shared/lib/utils";
import { AudioPlayer, AudioPlayerHandle } from "./audio-player";
import { AyahDisplay } from "./ayah-display";
import {
  isSurahRead,
  markSurahAsRead,
  unmarkSurahAsRead,
} from "@/shared/lib/learning-progress";
import { getReciterSettings } from "@/shared/lib/reciter-settings";
import { getSurahWithTextAndAudio, QuranApiAyah } from "@/shared/lib/quran-api";
import { useI18n } from "@/shared/lib/i18n/context";
import { useAppSettings } from "@/shared/hooks/use-app-settings";

interface SurahPageProps {
  surahId: string;
}

export function SurahPage({ surahId }: SurahPageProps) {
  const router = useRouter();
  const audioPlayerRef = useRef<AudioPlayerHandle>(null);
  const [isRead, setIsRead] = useState(false);
  const [ayahs, setAyahs] = useState<QuranApiAyah[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [selectedReciter, setSelectedReciter] = useState<string>("");
  const [dataError, setDataError] = useState<string | null>(null);
  const [currentAyahNumber, setCurrentAyahNumber] = useState<number | null>(
    null
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const { t } = useI18n();
  const { settings, isLoaded } = useAppSettings();

  // Находим суру по ID
  const surahs = quranData as Surah[];
  const surah = surahs.find((s) => s.id === parseInt(surahId));

  // Загружаем состояние из localStorage при монтировании
  useEffect(() => {
    if (surah) {
      setIsRead(isSurahRead(surah.id));
    }
  }, [surah]);

  // Загружаем данные при изменении суры
  useEffect(() => {
    if (surah) {
      loadSurahData();
    }
  }, [surah?.id]);

  // Подписываемся на изменения настроек чтеца
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "tajweed-reciter-settings" && surah) {
        loadSurahData();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [surah]);

  // Функция для загрузки данных суры
  const loadSurahData = async () => {
    if (!surah) return;

    try {
      setIsLoadingData(true);
      setDataError(null);

      // Получаем настройки чтеца
      const reciterSettings = getReciterSettings();
      setSelectedReciter(reciterSettings.selectedReciter);

      // Получаем текст и аудио суры
      const { text, audio } = await getSurahWithTextAndAudio(
        surah.id,
        reciterSettings.selectedReciter
      );

      // Объединяем текст и аудио данные
      const mergedAyahs = text.ayahs.map((textAyah, index) => ({
        ...textAyah,
        audio: audio.ayahs[index]?.audio || undefined,
      }));

      setAyahs(mergedAyahs);
    } catch (error) {
      console.error("Error loading surah data:", error);
      setDataError("Error loading surah data. Please try again later.");
    } finally {
      setIsLoadingData(false);
    }
  };

  // Находим предыдущую и следующую суры
  const currentIndex = surahs.findIndex((s) => s.id === parseInt(surahId));
  const previousSurah = currentIndex > 0 ? surahs[currentIndex - 1] : null;
  const nextSurah =
    currentIndex < surahs.length - 1 ? surahs[currentIndex + 1] : null;

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

  const handleBack = () => {
    router.push("/quran");
  };

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

  const markAsRead = () => {
    if (surah) {
      const newIsRead = !isRead;
      setIsRead(newIsRead);

      if (newIsRead) {
        markSurahAsRead(surah.id);
      } else {
        unmarkSurahAsRead(surah.id);
      }
    }
  };

  const openPdf = () => {
    if (surah.pdfUrl) {
      window.open(surah.pdfUrl, "_blank");
    }
  };

  return (
    <div className="min-h-screen relative">
      <div className="relative py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={handleBack}
              className="p-3 bg-secondary rounded-2xl hover:bg-[#E0E0E0]/15 transition-colors"
            >
              <ArrowLeft size={24} color="#E0E0E0" />
            </button>
            <div>
              <div className="flex items-center gap-4 mb-2">
                <h1
                  className="font-bold text-[#E0E0E0] font-arabic"
                  style={{
                    fontSize: `${settings.arabicFontSize * 2.5}px`,
                    lineHeight: 1.2,
                  }}
                >
                  {surah.nameArabic}
                </h1>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#E0E0E0]">
                    {surah.name}
                  </h2>
                  <p className="text-[#E0E0E0]/70 text-sm">
                    {surah.transliteration} - {surah.translation}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Surah Display */}
              <div className="bg-secondary rounded-3xl p-8">
                <h3 className="text-lg font-semibold text-[#E0E0E0] mb-6">
                  {t("quran.surahInfo")}
                </h3>
                <div className="text-center mb-8">
                  <div
                    className="text-[#E0E0E0] font-arabic mb-4"
                    style={{
                      fontSize: `${settings.arabicFontSize * 3}px`,
                      lineHeight: 1.5,
                    }}
                  >
                    {surah.nameArabic}
                  </div>
                  <div className="text-2xl md:text-3xl text-[#E0E0E0] mb-2">
                    {surah.name}
                  </div>
                  <div className="text-lg text-[#E0E0E0]/70">
                    {surah.translation}
                  </div>
                </div>
                <div className="bg-primary rounded-2xl p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-accent">
                        {surah.verses}
                      </div>
                      <div className="text-sm text-[#E0E0E0]/70">
                        {t("quran.verses")}
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-accent">
                        {surah.id}
                      </div>
                      <div className="text-sm text-[#E0E0E0]/70">
                        {t("quran.number")}
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-accent capitalize">
                        {surah.revelationType === "meccan"
                          ? t("quran.meccan")
                          : t("quran.medinan")}
                      </div>
                      <div className="text-sm text-[#E0E0E0]/70">
                        {t("quran.type")}
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-accent">
                        {surah.duration
                          ? formatDuration(surah.duration)
                          : "N/A"}
                      </div>
                      <div className="text-sm text-[#E0E0E0]/70">
                        {t("quran.duration")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ayah Display */}
              {!isLoadingData && ayahs.length > 0 && (
                <AyahDisplay
                  ayahs={ayahs}
                  currentAyahNumber={currentAyahNumber}
                  isPlaying={isPlaying}
                  onPlayAyah={(ayahIndex) => {
                    // Передаем индекс аята в AudioPlayer через ref
                    if (audioPlayerRef.current) {
                      audioPlayerRef.current.playSpecificAyah(ayahIndex);
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
                <div className="bg-secondary rounded-3xl p-6">
                  <div className="flex items-center justify-center py-8">
                    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                    <span className="ml-3 text-[#E0E0E0]">
                      {t("quran.loadingSurahData")}
                    </span>
                  </div>
                </div>
              )}

              {/* PDF Actions */}
              <div className="bg-secondary rounded-3xl p-6">
                <h3 className="text-lg font-semibold text-[#E0E0E0] mb-4">
                  {t("quran.studyMaterials")}
                </h3>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <button
                    onClick={openPdf}
                    className="flex items-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-600/80 transition-colors"
                  >
                    <FileText size={20} />
                    {t("quran.openPdf")}
                  </button>
                  <a
                    href={surah.pdfUrl}
                    download
                    className="flex items-center gap-3 px-6 py-3 bg-green-600 text-white rounded-2xl hover:bg-green-600/80 transition-colors"
                  >
                    <Download size={20} />
                    {t("quran.downloadPdf")}
                  </a>
                </div>

                {surah.description && (
                  <div className="bg-primary rounded-2xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-3 h-3 bg-accent rounded-full mt-1"></div>
                      <div>
                        <span className="text-[#E0E0E0]/70 text-sm block mb-1">
                          {t("quran.aboutSurah")}
                        </span>
                        <span className="text-[#E0E0E0] text-sm">
                          {surah.description}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Progress */}
              <div className="bg-secondary rounded-3xl p-6">
                <h3 className="text-lg font-semibold text-[#E0E0E0] mb-4">
                  {t("quran.learningSurah")}
                </h3>
                <button
                  onClick={markAsRead}
                  className={`flex items-center gap-2 px-4 py-2 rounded-2xl transition-colors ${
                    isRead
                      ? "bg-green-500/20 text-green-400 hover:bg-red-500/20 hover:text-red-400"
                      : "bg-accent text-white hover:bg-accent/80"
                  }`}
                >
                  <CheckCircle size={20} />
                  {isRead ? t("quran.surahRead") : t("quran.markAsRead")}
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Surah Info */}
              <div className="bg-secondary rounded-3xl p-6">
                <h3 className="text-lg font-semibold text-[#E0E0E0] mb-4">
                  {t("quran.aboutSurahSection")}
                </h3>
                <div className="space-y-3">
                  <div className="text-center mb-4">
                    <div className="text-4xl text-[#E0E0E0] font-arabic mb-2">
                      {surah.nameArabic}
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-[#E0E0E0]/60">
                    <div className="flex justify-between">
                      <span>{t("alphabet.name")}</span>
                      <span className="text-[#E0E0E0]">{surah.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t("quran.translation")}:</span>
                      <span className="text-[#E0E0E0]">
                        {surah.translation}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t("alphabet.transliteration")}</span>
                      <span className="text-[#E0E0E0]">
                        {surah.transliteration}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t("quran.verses")}:</span>
                      <span className="text-[#E0E0E0]">{surah.verses}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t("quran.type")}:</span>
                      <span className="text-[#E0E0E0]">
                        {surah.revelationType === "meccan"
                          ? t("quran.meccan")
                          : t("quran.medinan")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t("alphabet.status")}</span>
                      <span
                        className={`${
                          isRead ? "text-green-400" : "text-yellow-400"
                        }`}
                      >
                        {isRead ? t("quran.read") : t("alphabet.notLearned")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="bg-secondary rounded-3xl p-6">
                <h3 className="text-lg font-semibold text-[#E0E0E0] mb-4">
                  {t("quran.navigation")}
                </h3>
                <div className="space-y-3">
                  {/* Previous Surah */}
                  {previousSurah && (
                    <button
                      onClick={handlePreviousSurah}
                      className="w-full text-left p-3 bg-[#E0E0E0]/5 rounded-2xl hover:bg-[#E0E0E0]/10 transition-colors"
                    >
                      <div className="text-sm text-[#E0E0E0]/60 mb-1">
                        {t("quran.previousSurah")}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-arabic">
                          {previousSurah.nameArabic}
                        </span>
                        <span className="text-[#E0E0E0] font-medium text-sm">
                          {previousSurah.name}
                        </span>
                      </div>
                    </button>
                  )}

                  {/* Next Surah */}
                  {nextSurah && (
                    <button
                      onClick={handleNextSurah}
                      className="w-full text-left p-3 bg-[#E0E0E0]/5 rounded-2xl hover:bg-[#E0E0E0]/10 transition-colors"
                    >
                      <div className="text-sm text-[#E0E0E0]/60 mb-1">
                        {t("quran.nextSurah")}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-arabic">
                          {nextSurah.nameArabic}
                        </span>
                        <span className="text-[#E0E0E0] font-medium text-sm">
                          {nextSurah.name}
                        </span>
                      </div>
                    </button>
                  )}
                </div>
              </div>

              {/* Progress */}
              <div className="bg-secondary rounded-3xl p-6">
                <h3 className="text-lg font-semibold text-[#E0E0E0] mb-4">
                  {t("quran.progressQuran")}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#E0E0E0]/70">
                      {t("quran.surah")}
                    </span>
                    <span className="text-[#E0E0E0]">
                      {currentIndex + 1} {t("alphabet.of")} {surahs.length}
                    </span>
                  </div>
                  <div className="w-full bg-primary rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-accent to-accent/80"
                      style={{
                        width: `${((currentIndex + 1) / surahs.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
