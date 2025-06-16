"use client";

import { useI18n } from "@/shared/lib/i18n/context";

interface QuranProgressCardProps {
  currentIndex: number;
  totalSurahs: number;
}

export function QuranProgressCard({
  currentIndex,
  totalSurahs,
}: QuranProgressCardProps) {
  const { t } = useI18n();

  return (
    <div className="bg-secondary rounded-3xl p-6">
      <h3 className="text-lg font-semibold text-[#E0E0E0] mb-4">
        {t("quran.progressQuran")}
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-[#E0E0E0]/70">{t("quran.surah")}</span>
          <span className="text-[#E0E0E0]">
            {currentIndex + 1} {t("alphabet.of")} {totalSurahs}
          </span>
        </div>
        <div className="w-full bg-primary rounded-full h-2">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-accent to-accent/80"
            style={{
              width: `${((currentIndex + 1) / totalSurahs) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
