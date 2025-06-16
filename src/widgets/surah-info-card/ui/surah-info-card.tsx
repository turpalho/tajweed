"use client";

import { Surah } from "@/entities/quran";
import { useI18n } from "@/shared/lib/i18n/context";
import { useLocalizedText } from "@/shared/lib/localized-data";

interface SurahInfoCardProps {
  surah: Surah;
  isRead: boolean;
}

export function SurahInfoCard({ surah, isRead }: SurahInfoCardProps) {
  const { t } = useI18n();
  const { getLocalizedText } = useLocalizedText();

  return (
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
              {getLocalizedText(surah.translation)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>{t("alphabet.transliteration")}</span>
            <span className="text-[#E0E0E0]">{surah.transliteration}</span>
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
              className={`${isRead ? "text-green-400" : "text-yellow-400"}`}
            >
              {isRead ? t("quran.read") : t("alphabet.notLearned")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
