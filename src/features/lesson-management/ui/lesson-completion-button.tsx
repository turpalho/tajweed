"use client";

import { CheckCircle } from "lucide-react";
import { useI18n } from "@/shared/lib/i18n/context";
import { useLessonCompletion } from "../model/use-lesson-completion";

interface LessonCompletionButtonProps {
  lessonId: string;
}

export function LessonCompletionButton({
  lessonId,
}: LessonCompletionButtonProps) {
  const { t } = useI18n();
  const { isCompleted, isLoading, toggleCompletion } =
    useLessonCompletion(lessonId);

  return (
    <button
      onClick={toggleCompletion}
      disabled={isLoading}
      className={`flex items-center gap-2 px-4 py-2 rounded-2xl transition-colors ${
        isCompleted
          ? "bg-green-500/20 text-green-400 hover:bg-red-500/20 hover:text-red-400"
          : "bg-accent text-white hover:bg-accent/80"
      } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <CheckCircle size={20} />
      {isCompleted
        ? t("lessons.lessonCompleted")
        : t("lessons.markAsCompleted")}
    </button>
  );
}
