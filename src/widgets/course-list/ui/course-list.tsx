"use client";

import { Card, Button, Progress } from "@/shared/ui";
import { Course } from "@/entities/lesson";

interface CourseListProps {
  courses: Course[];
}

export function CourseList({ courses }: CourseListProps) {
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
                {course.completedLessons} из {course.lessons.length || 0} уроков
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
              Общая длительность: {Math.floor(course.totalDuration / 60)} мин
            </span>
            <Button
              onClick={() => console.log("Navigate to course", course.id)}
            >
              Продолжить изучение
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
