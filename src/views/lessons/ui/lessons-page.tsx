"use client";

import { useState } from "react";
import { Course, Lesson } from "@/entities/lesson";
import { CheckCircle, Play, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import lessonsData from "@/shared/data/lessons.json";

// Обновленные данные курсов с реальными уроками
const mockCourses: Course[] = [
  {
    id: "1",
    title: "Основы таджвида",
    description: "Базовые правила чтения Корана и произношения арабских букв",
    lessons: lessonsData["1"] as Lesson[],
    totalDuration: lessonsData["1"].reduce(
      (total, lesson) => total + lesson.duration,
      0
    ),
    completedLessons: 0,
  },
  {
    id: "2",
    title: "Продвинутые правила",
    description:
      "Сложные правила таджвида и их применение в различных контекстах",
    lessons: lessonsData["2"] as Lesson[],
    totalDuration: lessonsData["2"].reduce(
      (total, lesson) => total + lesson.duration,
      0
    ),
    completedLessons: 0,
  },
];

interface LessonListProps {
  lessons: Lesson[];
  onLessonClick: (lessonId: string) => void;
}

function LessonList({ lessons, onLessonClick }: LessonListProps) {
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
        return "Завершен";
      case "in_progress":
        return "В процессе";
      case "not_started":
        return "Не начат";
      default:
        return "Не начат";
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {lessons.map((lesson) => {
        const StatusIcon = getStatusIcon(lesson.status);
        return (
          <div
            key={lesson.id}
            className="group relative cursor-pointer"
            onClick={() => onLessonClick(lesson.id)}
          >
            {/* Glass morphism card */}
            <div className="relative bg-secondary rounded-3xl p-4 md:p-6 hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] hover:bg-[#E0E0E0]/15">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-[#E0E0E0]/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-[#E0E0E0]/30 group-hover:bg-[#E0E0E0]/30 transition-colors flex-shrink-0">
                    <StatusIcon size={24} color="#E0E0E0" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-base md:text-lg text-[#E0E0E0] mb-1 group-hover:text-[#E0E0E0]/90 transition-colors">
                      {lesson.title}
                    </h3>
                    <p className="text-sm text-[#E0E0E0]/70 mb-2 font-light line-clamp-2">
                      {lesson.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs text-[#E0E0E0]/50">
                      <span>{Math.floor(lesson.duration / 60)} мин</span>
                      <span>Урок {lesson.order}</span>
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
                    {lesson.status === "completed"
                      ? "Пересмотреть"
                      : lesson.status === "in_progress"
                      ? "Продолжить"
                      : "Начать"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function LessonsPage() {
  const [activeTab, setActiveTab] = useState<"1" | "2">("1");
  const router = useRouter();

  const activeCourse = mockCourses.find((course) => course.id === activeTab);
  const lessons = (lessonsData[activeTab] as Lesson[]) || [];

  const handleLessonClick = (lessonId: string) => {
    router.push(`/lessons/${lessonId}`);
  };

  return (
    <div className="min-h-screen relative md:pr-0">
      <div className="relative py-20 sm:py-16">
        <div className="max-w-4xl mx-auto flex flex-col gap-6 md:px-0">
          {/* Hero Section */}
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-[#E0E0E0] leading-tight tracking-tight">
              Видео
              <span
                className="bg-gradient-to-r bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(to right, #ED6F4C, #ED6F4C80, #ED6F4CCC)`,
                }}
              >
                {" "}
                уроки
              </span>
            </h1>
          </div>

          {/* Tabs */}
          <div className="flex justify-center w-full">
            <div className="bg-secondary rounded-3xl p-2 shadow-2xl max-w-full overflow-hidden">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab("1")}
                  className={`px-4 md:px-6 py-3 rounded-2xl font-medium transition-all duration-300 text-sm md:text-base ${
                    activeTab === "1"
                      ? "bg-[#E0E0E0]/5 backdrop-blur-sm border border-[#E0E0E0]/10 text-[#E0E0E0]"
                      : "text-[#E0E0E0]/60 hover:text-[#E0E0E0]/80 hover:bg-[#E0E0E0]/5"
                  }`}
                >
                  Основы таджвида
                </button>
                <button
                  onClick={() => setActiveTab("2")}
                  className={`px-4 md:px-6 py-3 rounded-2xl font-medium transition-all duration-300 text-sm md:text-base ${
                    activeTab === "2"
                      ? "bg-[#E0E0E0]/5 backdrop-blur-sm border border-[#E0E0E0]/10 text-[#E0E0E0]"
                      : "text-[#E0E0E0]/60 hover:text-[#E0E0E0]/80 hover:bg-[#E0E0E0]/5"
                  }`}
                >
                  Продвинутые правила
                </button>
              </div>
            </div>
          </div>

          {/* Course Info */}
          {activeCourse && (
            <div className="bg-secondary rounded-3xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                <div className="mb-4 md:mb-0">
                  <h2 className="text-xl md:text-2xl font-bold text-[#E0E0E0] mb-3">
                    {activeCourse.title}
                  </h2>
                  <p className="text-[#E0E0E0]/70 text-base md:text-lg font-light leading-relaxed">
                    {activeCourse.description}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-[#E0E0E0]/60 font-light">
                    {activeCourse.completedLessons} из{" "}
                    {activeCourse.lessons.length} уроков
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="w-full bg-primary rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: `${
                        activeCourse.lessons.length
                          ? (activeCourse.completedLessons /
                              activeCourse.lessons.length) *
                            100
                          : 0
                      }%`,
                      background: `linear-gradient(to right, #ED6F4C, #ED6F4C80)`,
                      boxShadow: "0 0 20px rgba(237, 111, 76, 0.3)",
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <span className="text-sm text-[#E0E0E0]/60 font-light">
                  Общая длительность:{" "}
                  {Math.floor(activeCourse.totalDuration / 60)} минут
                </span>
                <span className="text-sm text-[#E0E0E0]/60 font-light">
                  {activeCourse.lessons.length} уроков в курсе
                </span>
              </div>
            </div>
          )}

          {/* Lesson List */}
          <div className="space-y-6">
            <LessonList lessons={lessons} onLessonClick={handleLessonClick} />
          </div>
        </div>
      </div>
    </div>
  );
}
