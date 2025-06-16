"use client";

import { CheckCircle } from "lucide-react";
import { useLetterLearning } from "@/features/learn-letter";
import { useI18n } from "@/shared/lib/i18n/context";
import type { ArabicLetter } from "@/entities/alphabet";

interface LetterLearningControlProps {
  letter: ArabicLetter;
}

export function LetterLearningControl({ letter }: LetterLearningControlProps) {
  const { t } = useI18n();
  const { isLearned, toggleLearned } = useLetterLearning(
    letter.id,
    letter.audioUrl
  );

  return (
    <div className="bg-secondary rounded-3xl p-6">
      <h3 className="text-lg font-semibold text-[#E0E0E0] mb-4">
        {t("alphabet.learningLetter")}
      </h3>
      <button
        onClick={toggleLearned}
        className={`flex items-center gap-2 px-4 py-2 rounded-2xl transition-colors ${
          isLearned
            ? "bg-green-500/20 text-green-400 hover:bg-red-500/20 hover:text-red-400"
            : "bg-accent text-white hover:bg-accent/80"
        }`}
      >
        <CheckCircle size={20} />
        {isLearned ? t("alphabet.letterLearned") : t("alphabet.markAsLearned")}
      </button>
    </div>
  );
}
