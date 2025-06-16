"use client";

import { useRouter } from "next/navigation";
import { useI18n } from "@/shared/lib/i18n/context";
import { useLocalizedText } from "@/shared/lib/localized-data";
import type { ArabicLetter } from "@/entities/alphabet";

interface LetterNavigationCardProps {
  previousLetter: ArabicLetter | null;
  nextLetter: ArabicLetter | null;
}

export function LetterNavigationCard({
  previousLetter,
  nextLetter,
}: LetterNavigationCardProps) {
  const router = useRouter();
  const { t } = useI18n();
  const { getLocalizedText } = useLocalizedText();

  const handlePreviousLetter = () => {
    if (previousLetter) {
      router.push(`/alphabet/${previousLetter.id}`);
    }
  };

  const handleNextLetter = () => {
    if (nextLetter) {
      router.push(`/alphabet/${nextLetter.id}`);
    }
  };

  return (
    <div className="bg-secondary rounded-3xl p-6">
      <h3 className="text-lg font-semibold text-[#E0E0E0] mb-4">
        {t("lessons.navigation")}
      </h3>
      <div className="space-y-3">
        {/* Previous Letter */}
        {previousLetter && (
          <button
            onClick={handlePreviousLetter}
            className="w-full text-left p-3 bg-[#E0E0E0]/5 rounded-2xl hover:bg-[#E0E0E0]/10 transition-colors"
          >
            <div className="text-sm text-[#E0E0E0]/60 mb-1">
              {t("alphabet.previousLetter")}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-arabic">
                {previousLetter.letter}
              </span>
              <span className="text-[#E0E0E0] font-medium">
                {getLocalizedText(previousLetter.name)}
              </span>
            </div>
          </button>
        )}

        {/* Next Letter */}
        {nextLetter && (
          <button
            onClick={handleNextLetter}
            className="w-full text-left p-3 bg-[#E0E0E0]/5 rounded-2xl hover:bg-[#E0E0E0]/10 transition-colors"
          >
            <div className="text-sm text-[#E0E0E0]/60 mb-1">
              {t("alphabet.nextLetter")}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-arabic">{nextLetter.letter}</span>
              <span className="text-[#E0E0E0] font-medium">
                {getLocalizedText(nextLetter.name)}
              </span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
