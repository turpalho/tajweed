"use client";

import { useRouter } from "next/navigation";
import { useI18n } from "@/shared/lib/i18n/context";
import { useLocalizedText } from "@/shared/lib/localized-data";
import type { Lesson } from "@/entities/lesson";

interface LessonNavigationControlsProps {
  previousLesson: Lesson | null;
  nextLesson: Lesson | null;
}

export function LessonNavigationControls({
  previousLesson,
  nextLesson,
}: LessonNavigationControlsProps) {
  const router = useRouter();
  const { t } = useI18n();
  const { getLocalizedText } = useLocalizedText();

  const handlePreviousLesson = () => {
    if (previousLesson) {
      router.push(`/lessons/${previousLesson.id}`);
    }
  };

  const handleNextLesson = () => {
    if (nextLesson) {
      router.push(`/lessons/${nextLesson.id}`);
    }
  };

  return (
    <div className="bg-secondary rounded-3xl p-6">
      <h3 className="text-lg font-semibold text-[#E0E0E0] mb-4">
        {t("lessons.navigation")}
      </h3>
      <div className="space-y-3">
        {/* Previous Lesson */}
        {previousLesson && (
          <button
            onClick={handlePreviousLesson}
            className="w-full text-left p-3 bg-[#E0E0E0]/5 rounded-2xl hover:bg-[#E0E0E0]/10 transition-colors"
          >
            <div className="text-sm text-[#E0E0E0]/60 mb-1">
              {t("lessons.previousLesson")}
            </div>
            <div className="text-[#E0E0E0] font-medium">
              {getLocalizedText(previousLesson.title)}
            </div>
          </button>
        )}

        {/* Next Lesson */}
        {nextLesson && (
          <button
            onClick={handleNextLesson}
            className="w-full text-left p-3 bg-[#E0E0E0]/5 rounded-2xl hover:bg-[#E0E0E0]/10 transition-colors"
          >
            <div className="text-sm text-[#E0E0E0]/60 mb-1">
              {t("lessons.nextLesson")}
            </div>
            <div className="text-[#E0E0E0] font-medium">
              {getLocalizedText(nextLesson.title)}
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
