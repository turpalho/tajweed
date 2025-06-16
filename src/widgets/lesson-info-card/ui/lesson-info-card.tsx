"use client";

import { useI18n } from "@/shared/lib/i18n/context";
import { useLocalizedText } from "@/shared/lib/localized-data";
import { useYouTubeDuration } from "@/shared/hooks/use-youtube-duration";
import { formatDurationInMinutes } from "@/shared/lib/youtube-player";
import type { Lesson } from "@/entities/lesson";

interface LessonInfoCardProps {
  lesson: Lesson;
}

export function LessonInfoCard({ lesson }: LessonInfoCardProps) {
  const { t } = useI18n();
  const { getLocalizedText } = useLocalizedText();

  // Получаем реальную длительность видео
  const { duration: realDuration, isLoading: isDurationLoading } =
    useYouTubeDuration(
      lesson.videoUrl || "",
      lesson.duration, // fallback из JSON
      !!lesson.videoUrl // enabled только если есть URL
    );

  // Используем реальную длительность или fallback
  const displayDuration = realDuration || lesson.duration;
  const durationText = isDurationLoading
    ? t("common.loading")
    : formatDurationInMinutes(displayDuration);

  return (
    <div className="bg-secondary rounded-3xl p-6">
      <h3 className="text-lg font-semibold text-[#E0E0E0] mb-4">
        {t("lessons.aboutLesson")}
      </h3>
      <p className="text-[#E0E0E0]/70 mb-4 leading-relaxed">
        {getLocalizedText(lesson.description)}
      </p>
      <div className="space-y-2 text-sm text-[#E0E0E0]/60">
        <div className="flex justify-between">
          <span>{t("lessons.duration")}</span>
          <span className={isDurationLoading ? "animate-pulse" : ""}>
            {durationText}
          </span>
        </div>
        <div className="flex justify-between">
          <span>{t("lessons.lessonNumber")}</span>
          <span>{lesson.order}</span>
        </div>
        <div className="flex justify-between">
          <span>{t("lessons.course")}:</span>
          <span>
            {lesson.courseId === "1"
              ? t("lessons.basicTajweed")
              : t("lessons.advancedRules")}
          </span>
        </div>
      </div>
    </div>
  );
}
