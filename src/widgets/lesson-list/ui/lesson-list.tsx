"use client";

import { LessonItem } from "./lesson-item";
import type { Lesson } from "@/entities/lesson";

interface LessonListProps {
  lessons: Lesson[];
  onLessonClick: (lessonId: string) => void;
}

export function LessonList({ lessons, onLessonClick }: LessonListProps) {
  return (
    <div className="flex flex-col gap-3">
      {lessons.map((lesson) => (
        <LessonItem
          key={lesson.id}
          lesson={lesson}
          onLessonClick={onLessonClick}
        />
      ))}
    </div>
  );
}
