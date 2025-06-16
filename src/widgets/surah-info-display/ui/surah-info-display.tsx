"use client";

import { Surah } from "@/entities/quran";
import { useI18n } from "@/shared/lib/i18n/context";
import { useLocalizedText } from "@/shared/lib/localized-data";
import { formatDuration } from "@/shared/lib/utils";
import { useAppSettings } from "@/shared/hooks/use-app-settings";

interface SurahInfoDisplayProps {
  surah: Surah;
}

export function SurahInfoDisplay({ surah }: SurahInfoDisplayProps) {
  const { t } = useI18n();
  const { getLocalizedText } = useLocalizedText();
  const { settings } = useAppSettings();

  return (
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
          {getLocalizedText(surah.translation)}
        </div>
      </div>
      <div className="bg-primary rounded-2xl p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-accent">{surah.verses}</div>
            <div className="text-sm text-[#E0E0E0]/70">{t("quran.verses")}</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent">{surah.id}</div>
            <div className="text-sm text-[#E0E0E0]/70">{t("quran.number")}</div>
          </div>
          <div>
            <div className="text-lg font-bold text-accent capitalize">
              {surah.revelationType === "meccan"
                ? t("quran.meccan")
                : t("quran.medinan")}
            </div>
            <div className="text-sm text-[#E0E0E0]/70">{t("quran.type")}</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent">
              {surah.duration ? formatDuration(surah.duration) : "N/A"}
            </div>
            <div className="text-sm text-[#E0E0E0]/70">
              {t("quran.duration")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
