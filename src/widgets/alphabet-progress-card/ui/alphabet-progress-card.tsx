"use client";

import { useI18n } from "@/shared/lib/i18n/context";

interface AlphabetProgressCardProps {
  learnedCount: number;
  totalCount: number;
  progressPercentage: number;
}

export function AlphabetProgressCard({
  learnedCount,
  totalCount,
  progressPercentage,
}: AlphabetProgressCardProps) {
  const { t } = useI18n();

  return (
    <div className="bg-secondary rounded-3xl p-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <div>
          <h3 className="text-2xl font-semibold text-[#E0E0E0] mb-2">
            {t("alphabet.learningProgress")}
          </h3>
          <p className="text-[#E0E0E0]/70 font-light">
            {learnedCount} {t("alphabet.of")} {totalCount}{" "}
            {t("alphabet.lettersLearned")}
          </p>
        </div>
        <div className="text-right mt-4 md:mt-0">
          <div className="text-4xl font-bold text-[#E0E0E0] mb-1">
            {progressPercentage}%
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
            width: `${progressPercentage}%`,
            background: `linear-gradient(to right, #ED6F4C, #ED6F4C80)`,
            boxShadow: "0 0 20px rgba(237, 111, 76, 0.3)",
          }}
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="text-center">
          <div className="text-2xl font-bold text-[#E0E0E0] mb-1">
            {totalCount}
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
            {totalCount - learnedCount}
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
  );
}
