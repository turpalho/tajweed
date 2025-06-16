"use client";

import { useI18n } from "@/shared/lib/i18n/context";
import type { ArabicLetter } from "@/entities/alphabet";

interface LetterExamplesProps {
  letter: ArabicLetter;
}

export function LetterExamples({ letter }: LetterExamplesProps) {
  const { t } = useI18n();

  return (
    <div className="bg-secondary rounded-3xl p-6">
      <h3 className="text-lg font-semibold text-[#E0E0E0] mb-4">
        {t("alphabet.examples")}
      </h3>

      {/* Desktop */}
      <div className="hidden sm:grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...letter.examples].reverse().map((example, index) => (
          <div key={index} className="bg-primary rounded-2xl p-4 text-center">
            <div className="text-2xl md:text-3xl text-[#E0E0E0] font-arabic mb-2">
              {example}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile */}
      <div className="sm:hidden grid grid-cols-1 md:grid-cols-3 gap-4">
        {letter.examples.map((example, index) => (
          <div key={index} className="bg-primary rounded-2xl p-4 text-center">
            <div className="text-2xl md:text-3xl text-[#E0E0E0] font-arabic mb-2">
              {example}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
