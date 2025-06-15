"use client";

import { Card, Button, Progress } from "@/shared/ui";
import { Course } from "@/entities/lesson";
import { useI18n } from "@/shared/lib/i18n/context";

interface CourseListProps {
  courses: Course[];
}

export function CourseList({ courses }: CourseListProps) {
  const { t } = useI18n();

  return (
    <div className="flex flex-col gap-3">
      {courses.map((course) => (
        <Card key={course.id} className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {course.title}
              </h3>
              <p className="text-gray-600 mb-4">{course.description}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">
                {course.completedLessons} {t("courses.of")}{" "}
                {course.lessons.length || 0} {t("courses.lessons")}
              </div>
            </div>
          </div>

          <Progress
            value={
              course.lessons.length
                ? (course.completedLessons / course.lessons.length) * 100
                : 0
            }
            className="mb-4"
          />

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {t("courses.totalDuration")}:{" "}
              {Math.floor(course.totalDuration / 60)} {t("quran.minutes")}
            </span>
            <Button
              onClick={() => console.log("Navigate to course", course.id)}
            >
              {t("courses.continueStudy")}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
