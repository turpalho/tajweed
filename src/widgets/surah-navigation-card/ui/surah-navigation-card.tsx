"use client";

import { Surah } from "@/entities/quran";
import { useI18n } from "@/shared/lib/i18n/context";

interface SurahNavigationCardProps {
  previousSurah: Surah | null;
  nextSurah: Surah | null;
  onPreviousSurah: () => void;
  onNextSurah: () => void;
}

export function SurahNavigationCard({
  previousSurah,
  nextSurah,
  onPreviousSurah,
  onNextSurah,
}: SurahNavigationCardProps) {
  const { t } = useI18n();

  return (
    <div className="bg-secondary rounded-3xl p-6">
      <h3 className="text-lg font-semibold text-[#E0E0E0] mb-4">
        {t("quran.navigation")}
      </h3>
      <div className="space-y-3">
        {/* Previous Surah */}
        {previousSurah && (
          <button
            onClick={onPreviousSurah}
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
            onClick={onNextSurah}
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
  );
}
