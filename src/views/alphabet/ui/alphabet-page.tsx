"use client";

import { useState, useEffect } from "react";
import { AlphabetGrid } from "@/widgets/alphabet-grid";
import { ArabicLetter } from "@/entities/alphabet";
import { useI18n } from "@/shared/lib/i18n/context";
import arabicAlphabetData from "@/shared/data/arabic-alphabet.json";
import { getLearningProgress } from "@/shared/lib/learning-progress";

export function AlphabetPage() {
  const { t } = useI18n();
  const [letters, setLetters] = useState<ArabicLetter[]>([]);
  const [learnedCount, setLearnedCount] = useState(0);

  useEffect(() => {
    const progress = getLearningProgress();

    // Обогащаем данные букв информацией о прогрессе
    const enrichedLetters = arabicAlphabetData.map((letter) => ({
      ...letter,
      isLearned: progress.learnedLetters.includes(letter.id),
    }));

    setLetters(enrichedLetters);
    setLearnedCount(progress.learnedLetters.length);
  }, []);

  return (
    <div className="min-h-screen relative">
      <div className="relative py-20 sm:py-16">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          {/* Hero Section */}
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-[#E0E0E0] leading-tight tracking-tight">
              <span
                className="bg-gradient-to-r bg-clip-text text-transparent ml-3"
                style={{
                  backgroundImage: `linear-gradient(to right, #ED6F4C, #ED6F4C80, #ED6F4CCC)`,
                }}
              >
                {t("alphabet.title")}
              </span>
            </h1>
          </div>

          {/* Progress Card */}
          <div className="bg-secondary rounded-3xl p-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
              <div>
                <h3 className="text-2xl font-semibold text-[#E0E0E0] mb-2">
                  {t("alphabet.learningProgress")}
                </h3>
                <p className="text-[#E0E0E0]/70 font-light">
                  {learnedCount} {t("alphabet.of")} {letters.length}{" "}
                  {t("alphabet.lettersLearned")}
                </p>
              </div>
              <div className="text-right mt-4 md:mt-0">
                <div className="text-4xl font-bold text-[#E0E0E0] mb-1">
                  {letters.length > 0
                    ? Math.round((learnedCount / letters.length) * 100)
                    : 0}
                  %
                </div>
                <div className="text-sm text-[#E0E0E0]/60 font-light">
                  {t("alphabet.completed")}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-primary rounded-full h-3 backdrop-blur-sm border border-[#E0E0E0]/20">
              <div
                className="h-3 rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${
                    letters.length > 0
                      ? (learnedCount / letters.length) * 100
                      : 0
                  }%`,
                  background: `linear-gradient(to right, #ED6F4C, #ED6F4C80)`,
                  boxShadow: "0 0 20px rgba(237, 111, 76, 0.3)",
                }}
              />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#E0E0E0] mb-1">
                  {letters.length}
                </div>
                <div className="text-sm text-[#E0E0E0]/60 font-light">
                  {t("alphabet.totalLetters")}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#E0E0E0] mb-1">
                  {learnedCount}
                </div>
                <div className="text-sm text-[#E0E0E0]/60 font-light">
                  {t("alphabet.learned")}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#E0E0E0] mb-1">
                  {letters.length - learnedCount}
                </div>
                <div className="text-sm text-[#E0E0E0]/60 font-light">
                  {t("alphabet.remaining")}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#E0E0E0] mb-1">4</div>
                <div className="text-sm text-[#E0E0E0]/60 font-light">
                  {t("alphabet.forms")}
                </div>
              </div>
            </div>
          </div>

          {/* Alphabet Grid */}
          <div className="space-y-6">
            <AlphabetGrid letters={letters} />
          </div>
        </div>
      </div>
    </div>
  );
}
