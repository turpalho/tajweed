"use client";

import { useState } from "react";
import { Course, Lesson } from "@/entities/lesson";

// Моковые данные уроков для каждого курса
const mockLessons: Record<string, Lesson[]> = {
  "1": [
    // Основы таджвида
    {
      id: "1-1",
      title: "Введение в таджвид",
      description: "Основные понятия и значение таджвида в исламе",
      duration: 900, // 15 минут
      videoUrl: "/videos/intro-tajweed.mp4",
      thumbnail: "/thumbnails/intro.jpg",
      courseId: "1",
      order: 1,
      status: "completed",
    },
    {
      id: "1-2",
      title: "Арабский алфавит",
      description: "Изучение всех 28 букв арабского алфавита",
      duration: 1200, // 20 минут
      videoUrl: "/videos/alphabet.mp4",
      thumbnail: "/thumbnails/alphabet.jpg",
      courseId: "1",
      order: 2,
      status: "completed",
    },
    {
      id: "1-3",
      title: "Харакаты (огласовки)",
      description: "Изучение фатха, касра, дамма и их правильное произношение",
      duration: 1080, // 18 минут
      videoUrl: "/videos/harakats.mp4",
      thumbnail: "/thumbnails/harakats.jpg",
      courseId: "1",
      order: 3,
      status: "in_progress",
    },
    {
      id: "1-4",
      title: "Мадд (удлинение)",
      description: "Правила удлинения гласных звуков",
      duration: 960, // 16 минут
      videoUrl: "/videos/madd.mp4",
      thumbnail: "/thumbnails/madd.jpg",
      courseId: "1",
      order: 4,
      status: "not_started",
    },
  ],
  "2": [
    // Продвинутые правила
    {
      id: "2-1",
      title: "Идгам (слияние)",
      description: "Правила слияния букв при чтении Корана",
      duration: 1500, // 25 минут
      videoUrl: "/videos/idgam.mp4",
      thumbnail: "/thumbnails/idgam.jpg",
      courseId: "2",
      order: 1,
      status: "completed",
    },
    {
      id: "2-2",
      title: "Икляб (замена)",
      description: "Правило замены звуков в определенных случаях",
      duration: 1200, // 20 минут
      videoUrl: "/videos/iklyab.mp4",
      thumbnail: "/thumbnails/iklyab.jpg",
      courseId: "2",
      order: 2,
      status: "not_started",
    },
    {
      id: "2-3",
      title: "Ихфа (сокрытие)",
      description: "Правила сокрытия звуков при чтении",
      duration: 1800, // 30 минут
      videoUrl: "/videos/ihfa.mp4",
      thumbnail: "/thumbnails/ihfa.jpg",
      courseId: "2",
      order: 3,
      status: "not_started",
    },
  ],
};

// Обновленные данные курсов с уроками
const mockCourses: Course[] = [
  {
    id: "1",
    title: "Основы таджвида",
    description: "Базовые правила чтения Корана и произношения арабских букв",
    lessons: mockLessons["1"],
    totalDuration: 3600, // 60 минут
    completedLessons: 3,
  },
  {
    id: "2",
    title: "Продвинутые правила",
    description:
      "Сложные правила таджвида и их применение в различных контекстах",
    lessons: mockLessons["2"],
    totalDuration: 4800, // 80 минут
    completedLessons: 1,
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
        return "✅";
      case "in_progress":
        return "🔄";
      case "not_started":
        return "⏳";
      default:
        return "⏳";
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
      {lessons.map((lesson) => (
        <div
          key={lesson.id}
          className="group relative cursor-pointer"
          onClick={() => onLessonClick(lesson.id)}
        >
          {/* Glass morphism card */}
          <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-4 md:p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/15">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-2xl flex items-center justify-center text-xl md:text-2xl backdrop-blur-sm border border-white/30 group-hover:bg-white/30 transition-colors flex-shrink-0">
                  {getStatusIcon(lesson.status)}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-base md:text-lg text-white mb-1 group-hover:text-white/90 transition-colors">
                    {lesson.title}
                  </h3>
                  <p className="text-sm text-white/70 mb-2 font-light line-clamp-2">
                    {lesson.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs text-white/50">
                    <span>{Math.floor(lesson.duration / 60)} мин</span>
                    <span>Урок {lesson.order}</span>
                    <span
                      className={`px-2 py-1 rounded-full backdrop-blur-sm border text-xs ${
                        lesson.status === "completed"
                          ? "bg-green-500/20 text-green-300 border-green-500/30"
                          : lesson.status === "in_progress"
                          ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                          : "bg-white/10 text-white/60 border-white/20"
                      }`}
                    >
                      {getStatusText(lesson.status)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end md:flex-col md:items-end">
                <div className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-sm font-medium text-white hover:bg-white/30 transition-colors cursor-pointer">
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
      ))}
    </div>
  );
}

export function LessonsPage() {
  const [activeTab, setActiveTab] = useState<"1" | "2">("1");

  const activeCourse = mockCourses.find((course) => course.id === activeTab);
  const lessons = mockLessons[activeTab] || [];

  const handleLessonClick = (lessonId: string) => {
    console.log("Navigate to lesson", lessonId);
    // Здесь будет навигация на страницу урока
    // router.push(`/lessons/${lessonId}`);
  };

  return (
    <div className="min-h-screen relative md:pr-0">
      <div className="relative py-16">
        <div className="max-w-4xl mx-auto flex flex-col gap-8 md:px-0">
          {/* Hero Section */}
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
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
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-2 shadow-2xl max-w-full overflow-hidden">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab("1")}
                  className={`px-4 md:px-6 py-3 rounded-2xl font-medium transition-all duration-300 text-sm md:text-base ${
                    activeTab === "1"
                      ? "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/30"
                      : "text-white/60 hover:text-white/80 hover:bg-white/5"
                  }`}
                >
                  Основы таджвида
                </button>
                <button
                  onClick={() => setActiveTab("2")}
                  className={`px-4 md:px-6 py-3 rounded-2xl font-medium transition-all duration-300 text-sm md:text-base ${
                    activeTab === "2"
                      ? "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/30"
                      : "text-white/60 hover:text-white/80 hover:bg-white/5"
                  }`}
                >
                  Продвинутые правила
                </button>
              </div>
            </div>
          </div>

          {/* Course Info */}
          {activeCourse && (
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                <div className="mb-4 md:mb-0">
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
                    {activeCourse.title}
                  </h2>
                  <p className="text-white/70 text-base md:text-lg font-light leading-relaxed">
                    {activeCourse.description}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-white/60 font-light">
                    {activeCourse.completedLessons} из{" "}
                    {activeCourse.lessons.length} уроков
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="w-full bg-white/10 rounded-full h-3 backdrop-blur-sm border border-white/20">
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
                <span className="text-sm text-white/60 font-light">
                  Общая длительность:{" "}
                  {Math.floor(activeCourse.totalDuration / 60)} минут
                </span>
                <span className="text-sm text-white/60 font-light">
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
