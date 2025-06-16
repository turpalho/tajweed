"use client";

import { useLessonData } from "@/features/lesson-data";
import { LessonCompletionButton } from "@/features/lesson-management";
import { PageHeader } from "@/widgets/page-header";
import { YouTubePlayer } from "@/widgets/youtube-player";
import { LessonInfoCard } from "@/widgets/lesson-info-card";
import { LessonNavigationControls } from "@/widgets/lesson-navigation-controls";
import { CourseProgressCard } from "@/widgets/course-progress-card";
import { useI18n } from "@/shared/lib/i18n/context";
import { useLocalizedText } from "@/shared/lib/localized-data";

interface LessonPageProps {
  lessonId: string;
}

export function LessonPage({ lessonId }: LessonPageProps) {
  const { t } = useI18n();
  const { getLocalizedText } = useLocalizedText();

  const {
    lesson,
    previousLesson,
    nextLesson,
    courseLessons,
    isLoading,
    error,
  } = useLessonData(lessonId);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#E0E0E0]">{t("common.loading")}</div>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#E0E0E0] mb-4">
            {error || t("lessons.lessonNotFound")}
          </h1>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-accent text-white rounded-2xl hover:bg-accent/80 transition-colors"
          >
            {t("lessons.returnToLessons")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <div className="relative py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <PageHeader lesson={lesson} backUrl="/lessons" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Video Player */}
            <div className="lg:col-span-2">
              <div className="rounded-3xl mb-6">
                <YouTubePlayer
                  videoUrl={lesson.videoUrl}
                  title={getLocalizedText(lesson.title)}
                />
              </div>

              {/* Video Controls */}
              <div className="bg-secondary rounded-3xl p-6">
                <h3 className="text-lg font-semibold text-[#E0E0E0] mb-4">
                  {t("lessons.lessonControl")}
                </h3>
                <div className="flex flex-wrap gap-4">
                  <LessonCompletionButton lessonId={lesson.id} />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Lesson Info */}
              <LessonInfoCard lesson={lesson} />

              {/* Navigation */}
              <LessonNavigationControls
                previousLesson={previousLesson}
                nextLesson={nextLesson}
              />

              {/* Progress */}
              <CourseProgressCard
                currentLesson={lesson}
                courseLessons={courseLessons}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
