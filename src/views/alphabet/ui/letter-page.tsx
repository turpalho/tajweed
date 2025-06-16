"use client";

import { useLetterData } from "@/features/letter-data";
import { LetterPageHeader } from "@/widgets/letter-page-header";
import { LetterFormsDisplay } from "@/widgets/letter-forms-display";
import { LetterArticulationPoint } from "@/widgets/letter-articulation-point";
import { LetterAudioPlayer } from "@/widgets/letter-audio-player";
import { LetterExamples } from "@/widgets/letter-examples";
import { LetterLearningControl } from "@/widgets/letter-learning-control";
import { LetterInfoCard } from "@/widgets/letter-info-card";
import { LetterNavigationCard } from "@/widgets/letter-navigation-card";
import { LetterProgressCard } from "@/widgets/letter-progress-card";
import { useI18n } from "@/shared/lib/i18n/context";
import { useRouter } from "next/navigation";

interface LetterPageProps {
  letterId: string;
}

export function LetterPage({ letterId }: LetterPageProps) {
  const { t } = useI18n();
  const router = useRouter();

  const {
    letter,
    previousLetter,
    nextLetter,
    currentIndex,
    totalLetters,
    isLoading,
    error,
  } = useLetterData(letterId);

  if (error || !letter) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#E0E0E0] mb-4">
            {t("alphabet.letterNotFound")}
          </h1>
          <button
            onClick={() => router.push("/alphabet")}
            className="px-6 py-3 bg-accent text-white rounded-2xl hover:bg-accent/80 transition-colors"
          >
            {t("alphabet.returnToAlphabet")}
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-[#E0E0E0]/70">{t("common.loading")}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <div className="relative py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <LetterPageHeader letter={letter} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Letter Forms */}
              <LetterFormsDisplay letter={letter} />

              {/* Articulation Point */}
              <LetterArticulationPoint letter={letter} />

              {/* Audio Player */}
              <LetterAudioPlayer letter={letter} />

              {/* Examples */}
              <LetterExamples letter={letter} />

              {/* Learning Control */}
              <LetterLearningControl letter={letter} />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Letter Info */}
              <LetterInfoCard letter={letter} />

              {/* Navigation */}
              <LetterNavigationCard
                previousLetter={previousLetter}
                nextLetter={nextLetter}
              />

              {/* Progress */}
              <LetterProgressCard
                currentIndex={currentIndex}
                totalLetters={totalLetters}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
