"use client";

import { useLetterLearning } from "@/features/learn-letter";
import { useI18n } from "@/shared/lib/i18n/context";
import { useLocalizedText } from "@/shared/lib/localized-data";
import type { ArabicLetter } from "@/entities/alphabet";

interface LetterInfoCardProps {
  letter: ArabicLetter;
}

export function LetterInfoCard({ letter }: LetterInfoCardProps) {
  const { t } = useI18n();
  const { getLocalizedText } = useLocalizedText();
  const { isLearned } = useLetterLearning(letter.id, letter.audioUrl);

  return (
    <div className="bg-secondary rounded-3xl p-6">
      <h3 className="text-lg font-semibold text-[#E0E0E0] mb-4">
        {t("alphabet.aboutLetter")}
      </h3>
      <div className="space-y-3">
        <div className="text-center mb-4">
          <div className="text-6xl text-[#E0E0E0] font-arabic mb-2">
            {letter.letter}
          </div>
        </div>
        <div className="space-y-2 text-sm text-[#E0E0E0]/60">
          <div className="flex justify-between">
            <span>{t("alphabet.name")}</span>
            <span className="text-[#E0E0E0]">
              {getLocalizedText(letter.name)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>{t("alphabet.transliteration")}</span>
            <span className="text-[#E0E0E0]">{letter.transliteration}</span>
          </div>
          <div className="flex justify-between">
            <span>{t("alphabet.articulationPoint")}:</span>
            <span className="text-[#E0E0E0]">
              {getLocalizedText(letter.articulationPoint)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>{t("alphabet.status")}</span>
            <span
              className={`${isLearned ? "text-green-400" : "text-yellow-400"}`}
            >
              {isLearned ? t("alphabet.learned") : t("alphabet.notLearned")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
