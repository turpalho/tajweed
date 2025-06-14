"use client";

import { useState } from "react";
import { ArrowLeft, Play, CheckCircle } from "lucide-react";
import lessonsData from "@/shared/data/lessons.json";
import { useRouter } from "next/navigation";

interface LessonPageProps {
  lessonId: string;
}

export function LessonPage({ lessonId }: LessonPageProps) {
  const router = useRouter();
  const [isCompleted, setIsCompleted] = useState(false);

  // Находим урок по ID
  const allLessons = [...lessonsData["1"], ...lessonsData["2"]];
  const lesson = allLessons.find((l) => l.id === lessonId);

  // Находим предыдущий и следующий уроки в том же курсе
  const courseLessons = lessonsData[lesson?.courseId as "1" | "2"] || [];
  const currentIndex = courseLessons.findIndex((l) => l.id === lessonId);
  const previousLesson =
    currentIndex > 0 ? courseLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < courseLessons.length - 1
      ? courseLessons[currentIndex + 1]
      : null;

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#E0E0E0] mb-4">
            Урок не найден
          </h1>
          <button
            onClick={() => router.push("/lessons")}
            className="px-6 py-3 bg-accent text-white rounded-2xl hover:bg-accent/80 transition-colors"
          >
            Вернуться к урокам
          </button>
        </div>
      </div>
    );
  }

  const handleBack = () => {
    router.push("/lessons");
  };

  const handlePreviousLesson = () => {
    if (previousLesson) {
      router.push(`/lessons/${previousLesson.id}`);
    }
  };

  const handleNextLesson = () => {
    if (nextLesson) {
      router.push(`/lessons/${nextLesson.id}`);
    }
  };

  const markAsCompleted = () => {
    setIsCompleted(true);
    // Здесь можно добавить логику для сохранения прогресса
    console.log(`Урок ${lessonId} отмечен как завершенный`);
  };

  // Получаем YouTube ID из URL
  const getYouTubeId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const youtubeId = getYouTubeId(lesson.videoUrl);

  return (
    <div className="min-h-screen relative">
      <div className="relative py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={handleBack}
              className="p-3 bg-secondary rounded-2xl hover:bg-[#E0E0E0]/15 transition-colors"
            >
              <ArrowLeft size={24} color="#E0E0E0" />
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#E0E0E0] mb-1">
                {lesson.title}
              </h1>
              <p className="text-[#E0E0E0]/70 text-sm">
                Урок {lesson.order} • {Math.floor(lesson.duration / 60)} минут
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Video Player */}
            <div className="lg:col-span-2">
              <div className="rounded-3xl mb-6">
                {youtubeId ? (
                  <div className="aspect-video rounded-2xl overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1&playsinline=1&enablejsapi=1`}
                      title={lesson.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-primary rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <Play
                        size={48}
                        color="#E0E0E0"
                        className="mx-auto mb-4"
                      />
                      <p className="text-[#E0E0E0]/70">Видео недоступно</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Video Controls */}
              <div className="bg-secondary rounded-3xl p-6">
                <h3 className="text-lg font-semibold text-[#E0E0E0] mb-4">
                  Управление уроком
                </h3>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={markAsCompleted}
                    disabled={isCompleted}
                    className={`flex items-center gap-2 px-4 py-2 rounded-2xl transition-colors ${
                      isCompleted
                        ? "bg-green-500/20 text-green-400 cursor-not-allowed"
                        : "bg-accent text-white hover:bg-accent/80"
                    }`}
                  >
                    <CheckCircle size={20} />
                    {isCompleted ? "Урок завершен" : "Отметить как завершенный"}
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Lesson Info */}
              <div className="bg-secondary rounded-3xl p-6">
                <h3 className="text-lg font-semibold text-[#E0E0E0] mb-4">
                  О уроке
                </h3>
                <p className="text-[#E0E0E0]/70 mb-4 leading-relaxed">
                  {lesson.description}
                </p>
                <div className="space-y-2 text-sm text-[#E0E0E0]/60">
                  <div className="flex justify-between">
                    <span>Длительность:</span>
                    <span>{Math.floor(lesson.duration / 60)} минут</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Номер урока:</span>
                    <span>{lesson.order}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Курс:</span>
                    <span>
                      {lesson.courseId === "1"
                        ? "Основы таджвида"
                        : "Продвинутые правила"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="bg-secondary rounded-3xl p-6">
                <h3 className="text-lg font-semibold text-[#E0E0E0] mb-4">
                  Навигация
                </h3>
                <div className="space-y-3">
                  {/* Previous Lesson */}
                  {previousLesson && (
                    <button
                      onClick={handlePreviousLesson}
                      className="w-full text-left p-3 bg-[#E0E0E0]/5 rounded-2xl hover:bg-[#E0E0E0]/10 transition-colors"
                    >
                      <div className="text-sm text-[#E0E0E0]/60 mb-1">
                        Предыдущий урок
                      </div>
                      <div className="text-[#E0E0E0] font-medium">
                        {previousLesson.title}
                      </div>
                    </button>
                  )}

                  {/* Next Lesson */}
                  {nextLesson && (
                    <button
                      onClick={handleNextLesson}
                      className="w-full text-left p-3 bg-[#E0E0E0]/5 rounded-2xl hover:bg-[#E0E0E0]/10 transition-colors"
                    >
                      <div className="text-sm text-[#E0E0E0]/60 mb-1">
                        Следующий урок
                      </div>
                      <div className="text-[#E0E0E0] font-medium">
                        {nextLesson.title}
                      </div>
                    </button>
                  )}
                </div>
              </div>

              {/* Progress */}
              <div className="bg-secondary rounded-3xl p-6">
                <h3 className="text-lg font-semibold text-[#E0E0E0] mb-4">
                  Прогресс курса
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#E0E0E0]/70">Завершено:</span>
                    <span className="text-[#E0E0E0]">
                      {lesson.order - 1} из {courseLessons.length}
                    </span>
                  </div>
                  <div className="w-full bg-primary rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-accent to-accent/80"
                      style={{
                        width: `${
                          ((lesson.order - 1) / courseLessons.length) * 100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
