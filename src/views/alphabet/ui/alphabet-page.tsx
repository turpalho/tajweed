"use client";

import { useAlphabetLearning } from "@/features/alphabet-learning";
import { AlphabetGrid } from "@/widgets/alphabet-grid";
import { AlphabetProgressCard } from "@/widgets/alphabet-progress-card";
import { PageHero } from "@/widgets/page-hero";
import { useI18n } from "@/shared/lib/i18n/context";

export function AlphabetPage() {
  const { t } = useI18n();
  const {
    letters,
    learnedCount,
    totalCount,
    progressPercentage,
    isLoading,
    error,
  } = useAlphabetLearning();

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-accent text-white rounded-2xl hover:bg-accent/80 transition-colors"
          >
            {t("common.reload")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <div className="relative py-20 sm:py-16">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          {/* Hero Section */}
          <PageHero title={t("alphabet.title")} />

          {/* Progress Card */}
          <AlphabetProgressCard
            learnedCount={learnedCount}
            totalCount={totalCount}
            progressPercentage={progressPercentage}
          />

          {/* Alphabet Grid */}
          <div className="space-y-6">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="text-[#E0E0E0]/70">{t("common.loading")}</div>
              </div>
            ) : (
              <AlphabetGrid letters={letters} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
