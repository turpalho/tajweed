"use client";

import { CheckCircle, Play, Clock } from "lucide-react";
import { useI18n } from "@/shared/lib/i18n/context";
import { useLocalizedText } from "@/shared/lib/localized-data";
import type { Lesson } from "@/entities/lesson";

interface LessonItemProps {
  lesson: Lesson;
  onLessonClick: (lessonId: string) => void;
}

export function LessonItem({ lesson, onLessonClick }: LessonItemProps) {
  const { t } = useI18n();
  const { getLocalizedText } = useLocalizedText();

  const getStatusIcon = (status: Lesson["status"]) => {
    switch (status) {
      case "completed":
        return CheckCircle;
      case "in_progress":
        return Play;
      case "not_started":
        return Clock;
      default:
        return Clock;
    }
  };

  const getStatusText = (status: Lesson["status"]) => {
    switch (status) {
      case "completed":
        return t("lessons.completed");
      case "in_progress":
        return t("lessons.inProgress");
      case "not_started":
        return t("lessons.notStarted");
      default:
        return t("lessons.notStarted");
    }
  };

  const getActionText = (status: Lesson["status"]) => {
    switch (status) {
      case "completed":
        return t("lessons.rewatch");
      case "in_progress":
        return t("lessons.continue");
      case "not_started":
        return t("lessons.start");
      default:
        return t("lessons.start");
    }
  };

  const StatusIcon = getStatusIcon(lesson.status);

  return (
    <div
      className="group relative cursor-pointer"
      onClick={() => onLessonClick(lesson.id)}
    >
      <div className="relative bg-secondary rounded-3xl p-4 md:p-6 hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] hover:bg-[#E0E0E0]/15">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-[#E0E0E0]/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-[#E0E0E0]/30 group-hover:bg-[#E0E0E0]/30 transition-colors flex-shrink-0">
              <StatusIcon
                size={24}
                color={lesson.status === "completed" ? "#ED6F4C" : "#E0E0E0"}
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-base md:text-lg text-[#E0E0E0] mb-1 group-hover:text-[#E0E0E0]/90 transition-colors">
                {getLocalizedText(lesson.title)}
              </h3>
              <p className="text-sm text-[#E0E0E0]/70 mb-2 font-light line-clamp-2">
                {getLocalizedText(lesson.description)}
              </p>
              <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs text-[#E0E0E0]/50">
                <span>
                  {t("lessons.lesson")} {lesson.order}
                </span>
                <span
                  className={`px-2 py-1 rounded-full backdrop-blur-sm border text-xs ${
                    lesson.status === "completed"
                      ? "bg-accent/20 text-accent border-accent/30"
                      : lesson.status === "in_progress"
                      ? "bg-accent/20 text-accent border-accent/30"
                      : "bg-[#E0E0E0]/10 text-[#E0E0E0]/60 border-[#E0E0E0]/20"
                  }`}
                >
                  {getStatusText(lesson.status)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-end md:flex-col md:items-end">
            <div className="px-4 py-2 bg-secondary backdrop-blur-sm border border-[#E0E0E0]/20 rounded-2xl text-sm font-medium text-[#E0E0E0] hover:bg-[#E0E0E0]/30 transition-colors cursor-pointer">
              {getActionText(lesson.status)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
