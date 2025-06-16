"use client";

import { useI18n } from "@/shared/lib/i18n/context";

interface LetterProgressCardProps {
  currentIndex: number;
  totalLetters: number;
}

export function LetterProgressCard({
  currentIndex,
  totalLetters,
}: LetterProgressCardProps) {
  const { t } = useI18n();

  const progressPercentage =
    totalLetters > 0 ? ((currentIndex + 1) / totalLetters) * 100 : 0;

  return (
    <div className="bg-secondary rounded-3xl p-6">
      <h3 className="text-lg font-semibold text-[#E0E0E0] mb-4">
        {t("alphabet.progressAlphabet")}
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-[#E0E0E0]/70">{t("alphabet.letter")}</span>
          <span className="text-[#E0E0E0]">
            {currentIndex + 1} {t("alphabet.of")} {totalLetters}
          </span>
        </div>
        <div className="w-full bg-primary rounded-full h-2">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-accent to-accent/80"
            style={{
              width: `${progressPercentage}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
