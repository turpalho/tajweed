"use client";

import { useI18n } from "@/shared/lib/i18n/context";
import type { CourseWithProgress } from "@/features/course-management";

interface CourseInfoCardProps {
  course: CourseWithProgress;
}

export function CourseInfoCard({ course }: CourseInfoCardProps) {
  const { t } = useI18n();

  return (
    <div className="bg-secondary rounded-3xl p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl md:text-2xl font-bold text-[#E0E0E0] mb-3">
            {t(course.title)}
          </h2>
          <p className="text-[#E0E0E0]/70 text-base md:text-lg font-light leading-relaxed">
            {t(course.description)}
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-[#E0E0E0]/60 font-light">
            {course.completedLessons} {t("alphabet.of")} {course.lessons.length}{" "}
            {t("lessons.videoLessons")}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div>
        <div className="w-full bg-primary rounded-full h-3">
          <div
            className="h-3 rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${course.progressPercentage}%`,
              background: `linear-gradient(to right, #ED6F4C, #ED6F4C80)`,
              boxShadow: "0 0 20px rgba(237, 111, 76, 0.3)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
