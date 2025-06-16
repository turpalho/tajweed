"use client";

import { useState, useEffect } from "react";
import { Surah } from "@/entities/quran";
import { BookOpen, Volume2, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/shared/lib/i18n/context";
import { getLearningProgress } from "@/shared/lib/learning-progress";
import { useLocalizedText } from "@/shared/lib/localized-data";

interface SurahListProps {
  surahs: Surah[];
}

export function SurahList({ surahs }: SurahListProps) {
  const router = useRouter();
  const { t } = useI18n();
  const { getLocalizedText } = useLocalizedText();
  const [readSurahs, setReadSurahs] = useState<number[]>([]);

  useEffect(() => {
    const progress = getLearningProgress();
    setReadSurahs(progress.readSurahs);
  }, []);

  const handleSurahClick = (surahId: number) => {
    router.push(`/quran/${surahId}`);
  };

  const handleReadClick = (e: React.MouseEvent, surahId: number) => {
    e.stopPropagation();
    router.push(`/quran/${surahId}`);
  };

  return (
    <div className="flex flex-col gap-4">
      {surahs.map((surah) => {
        const isRead = readSurahs.includes(surah.id);

        return (
          <div
            key={surah.id}
            className="group relative cursor-pointer"
            onClick={() => handleSurahClick(surah.id)}
          >
            {/* Glass morphism card */}
            <div className="relative bg-secondary rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] hover:bg-[#E0E0E0]/15">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-primary border border-[#E0E0E0]/30 rounded-2xl flex items-center justify-center text-xl font-bold text-[#E0E0E0] group-hover:bg-[#E0E0E0]/30 transition-colors flex-shrink-0 relative">
                    {surah.id}
                    {/* Status indicator */}
                    {isRead && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle size={14} className="text-white" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-2xl text-[#E0E0E0] mb-2 group-hover:text-[#E0E0E0]/90 transition-colors">
                      {surah.nameArabic}
                    </h3>
                    <p className="text-lg text-[#E0E0E0]/80 mb-1 font-light">
                      {surah.transliteration}
                    </p>
                    <p className="text-sm text-[#E0E0E0]/60 font-light">
                      {getLocalizedText(surah.translation)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  {/* Info */}
                  <div className="text-right space-y-1 min-w-0 flex-shrink-0">
                    <div className="text-sm text-[#E0E0E0]/70 font-light">
                      {surah.verses} {t("quran.verses")}
                    </div>
                    <div className="text-xs text-[#E0E0E0]/50 font-light">
                      {surah.revelationType === "meccan"
                        ? t("quran.meccan")
                        : t("quran.medinan")}
                    </div>
                    {surah.duration && (
                      <div className="text-xs text-[#E0E0E0]/50 font-light">
                        {Math.floor(surah.duration / 60)}:
                        {(surah.duration % 60).toString().padStart(2, "0")}{" "}
                        {t("quran.minutes")}
                      </div>
                    )}
                    {isRead && (
                      <div className="text-xs text-green-400 font-medium">
                        {t("quran.read")}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-3 min-w-0 flex-shrink-0">
                    <div
                      className="px-6 py-3 bg-primary border border-[#E0E0E0]/30 rounded-2xl text-sm font-medium text-[#E0E0E0] hover:bg-[#E0E0E0]/30 transition-colors cursor-pointer text-center flex items-center justify-center gap-2"
                      onClick={(e) => handleReadClick(e, surah.id)}
                    >
                      <BookOpen size={16} color="#E0E0E0" />
                      {t("quran.readButton")}
                    </div>
                    {surah.audioUrl && (
                      <div
                        className="px-6 py-3 bg-primary border border-[#E0E0E0]/20 rounded-2xl text-sm font-medium text-[#E0E0E0]/80 hover:bg-[#E0E0E0]/20 transition-colors cursor-pointer text-center flex items-center justify-center gap-2"
                        onClick={(e) => handleReadClick(e, surah.id)}
                      >
                        <Volume2 size={16} color="#E0E0E0" />
                        {t("quran.listenButton")}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
