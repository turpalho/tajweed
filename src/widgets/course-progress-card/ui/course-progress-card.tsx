"use client";

import { useI18n } from "@/shared/lib/i18n/context";
import type { Lesson } from "@/entities/lesson";

interface CourseProgressCardProps {
  currentLesson: Lesson;
  courseLessons: Lesson[];
}

export function CourseProgressCard({
  currentLesson,
  courseLessons,
}: CourseProgressCardProps) {
  const { t } = useI18n();

  const completedLessons = currentLesson.order - 1;
  const totalLessons = courseLessons.length;
  const progressPercentage = (completedLessons / totalLessons) * 100;

  return (
    <div className="bg-secondary rounded-3xl p-6">
      <h3 className="text-lg font-semibold text-[#E0E0E0] mb-4">
        {t("lessons.progressCourse")}
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-[#E0E0E0]/70">
            {t("lessons.completedLessons")}
          </span>
          <span className="text-[#E0E0E0]">
            {completedLessons} {t("alphabet.of")} {totalLessons}
          </span>
        </div>
        <div className="w-full bg-primary rounded-full h-2">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-accent to-accent/80 transition-all duration-300"
            style={{
              width: `${progressPercentage}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
