"use client";

import { useCourseManagement } from "@/features/course-management";
import { CourseSelector } from "@/features/course-management";
import { useLessonNavigation } from "@/features/lesson-navigation";
import { CourseInfoCard } from "@/widgets/course-info-card";
import { LessonList } from "@/widgets/lesson-list";
import { useI18n } from "@/shared/lib/i18n/context";

export function LessonsPage() {
  const { t } = useI18n();
  const { activeTab, activeCourse, isLoading, setActiveTab } =
    useCourseManagement();

  const { onLessonClick } = useLessonNavigation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#E0E0E0]">{t("common.loading")}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <div className="relative py-20 sm:py-16">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          {/* Hero Section */}
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-[#E0E0E3] leading-tight tracking-tight">
              {t("nav.lessons")}
              <span
                className="bg-gradient-to-r bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(to right, #ED6F4C, #ED6F4C80, #ED6F4CCC)`,
                }}
              >
                {" "}
                {t("lessons.videoLessons")}
              </span>
            </h1>
          </div>

          {/* Course Selector */}
          <CourseSelector activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Course Info */}
          {activeCourse && <CourseInfoCard course={activeCourse} />}

          {/* Lesson List */}
          {activeCourse && (
            <div className="space-y-6">
              <LessonList
                lessons={activeCourse.lessons}
                onLessonClick={onLessonClick}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
