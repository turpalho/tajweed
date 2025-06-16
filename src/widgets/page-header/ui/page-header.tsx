"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/shared/lib/i18n/context";
import { useLocalizedText } from "@/shared/lib/localized-data";
import { useYouTubeDuration } from "@/shared/hooks/use-youtube-duration";
import { formatDurationInMinutes } from "@/shared/lib/youtube-player";
import type { Lesson } from "@/entities/lesson";

interface PageHeaderProps {
  lesson: Lesson;
  backUrl: string;
}

export function PageHeader({ lesson, backUrl }: PageHeaderProps) {
  const router = useRouter();
  const { t } = useI18n();
  const { getLocalizedText } = useLocalizedText();

  // Получаем реальную длительность видео
  const { duration: realDuration, isLoading: isDurationLoading } =
    useYouTubeDuration(
      lesson.videoUrl || "",
      lesson.duration,
      !!lesson.videoUrl
    );

  const displayDuration = realDuration || lesson.duration;
  const durationText = isDurationLoading
    ? t("common.loading")
    : formatDurationInMinutes(displayDuration);

  const handleBack = () => {
    router.push(backUrl);
  };

  return (
    <div className="flex items-center gap-4 mb-8">
      <button
        onClick={handleBack}
        className="p-3 bg-secondary rounded-2xl hover:bg-[#E0E0E0]/15 transition-colors"
      >
        <ArrowLeft size={24} color="#E0E0E0" />
      </button>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#E0E0E0] mb-1">
          {getLocalizedText(lesson.title)}
        </h1>
        <p className="text-[#E0E0E0]/70 text-sm">
          {t("lessons.lesson")} {lesson.order} • {durationText}
        </p>
      </div>
    </div>
  );
}
