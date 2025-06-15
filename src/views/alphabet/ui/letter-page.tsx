"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Play, Pause, Volume2, CheckCircle } from "lucide-react";
import alphabetData from "@/shared/data/arabic-alphabet.json";
import { useRouter } from "next/navigation";
import { ArabicLetter } from "@/entities/alphabet";
import Image from "next/image";
import {
  isLetterLearned,
  markLetterAsLearned,
  unmarkLetterAsLearned,
} from "@/shared/lib/learning-progress";
import { useI18n } from "@/shared/lib/i18n/context";

interface LetterPageProps {
  letterId: string;
}

export function LetterPage({ letterId }: LetterPageProps) {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLearned, setIsLearned] = useState(false);
  const { t } = useI18n();

  // Находим букву по ID
  const letters = alphabetData as ArabicLetter[];
  const letter = letters.find((l) => l.id === letterId);

  // Загружаем состояние из localStorage при монтировании
  useEffect(() => {
    if (letter) {
      setIsLearned(isLetterLearned(letter.id));
    }
  }, [letter]);

  // Находим предыдущую и следующую буквы
  const currentIndex = letters.findIndex((l) => l.id === letterId);
  const previousLetter = currentIndex > 0 ? letters[currentIndex - 1] : null;
  const nextLetter =
    currentIndex < letters.length - 1 ? letters[currentIndex + 1] : null;

  if (!letter) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#E0E0E0] mb-4">
            {t("alphabet.letterNotFound")}
          </h1>
          <button
            onClick={() => router.push("/alphabet")}
            className="px-6 py-3 bg-accent text-white rounded-2xl hover:bg-accent/80 transition-colors"
          >
            {t("alphabet.returnToAlphabet")}
          </button>
        </div>
      </div>
    );
  }

  const handleBack = () => {
    router.push("/alphabet");
  };

  const handlePreviousLetter = () => {
    if (previousLetter) {
      router.push(`/alphabet/${previousLetter.id}`);
    }
  };

  const handleNextLetter = () => {
    if (nextLetter) {
      router.push(`/alphabet/${nextLetter.id}`);
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const markAsLearned = () => {
    if (letter) {
      const newIsLearned = !isLearned;
      setIsLearned(newIsLearned);

      if (newIsLearned) {
        markLetterAsLearned(letter.id);
        console.log(`Буква ${letter.name} отмечена как изученная`);
      } else {
        unmarkLetterAsLearned(letter.id);
        console.log(`Буква ${letter.name} отмечена как неизученная`);
      }
    }
  };

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
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-5xl font-bold text-[#E0E0E0] font-arabic">
                  {letter.letter}
                </h1>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#E0E0E0]">
                    {letter.name}
                  </h2>
                  <p className="text-[#E0E0E0]/70 text-sm">
                    {letter.transliteration}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Letter Display */}
              <div className="bg-secondary rounded-3xl p-8">
                <h3 className="text-lg font-semibold text-[#E0E0E0] mb-6">
                  {t("alphabet.letterForms")}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="bg-primary rounded-2xl p-6 mb-3 aspect-square flex items-center justify-center">
                      <div className="text-4xl md:text-5xl text-[#E0E0E0] font-arabic">
                        {letter.positions.final}
                      </div>
                    </div>
                    <p className="text-sm text-[#E0E0E0]/70">
                      {t("alphabet.atEnd")}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-primary rounded-2xl p-6 mb-3 aspect-square flex items-center justify-center">
                      <div className="text-4xl md:text-5xl text-[#E0E0E0] font-arabic">
                        {letter.positions.medial}
                      </div>
                    </div>
                    <p className="text-sm text-[#E0E0E0]/70">
                      {t("alphabet.inMiddle")}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-primary rounded-2xl p-6 mb-3 aspect-square flex items-center justify-center">
                      <div className="text-4xl md:text-5xl text-[#E0E0E0] font-arabic">
                        {letter.positions.initial}
                      </div>
                    </div>
                    <p className="text-sm text-[#E0E0E0]/70">
                      {t("alphabet.atBeginning")}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-primary rounded-2xl p-6 mb-3 aspect-square flex items-center justify-center">
                      <div className="text-4xl md:text-5xl text-[#E0E0E0] font-arabic">
                        {letter.positions.isolated}
                      </div>
                    </div>
                    <p className="text-sm text-[#E0E0E0]/70">
                      {t("alphabet.isolated")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Articulation Point Image */}
              <div className="bg-secondary rounded-3xl p-6">
                <h3 className="text-lg font-semibold text-[#E0E0E0] mb-4">
                  {t("alphabet.articulationPoint")}
                </h3>
                <div className="bg-white flex justify-center items-center rounded-3xl p-2 mb-4">
                  <Image
                    src={letter.imageUrl}
                    alt={`${t("alphabet.articulationPoint")} ${letter.name}`}
                    width={100}
                    height={100}
                    className="w-full h-full sm:w-[400px] object-cover rounded-lg"
                  />
                </div>
              </div>

              {/* Audio and Practice */}
              <div className="bg-secondary rounded-3xl p-6">
                <h3 className="text-lg font-semibold text-[#E0E0E0] mb-4">
                  {t("alphabet.pronunciation")}
                </h3>
                <div className="flex items-center gap-4 mb-6">
                  <button
                    onClick={toggleAudio}
                    className="flex items-center gap-3 px-6 py-3 bg-accent text-white rounded-2xl hover:bg-accent/80 transition-colors"
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    <Volume2 size={20} />
                    {isPlaying ? t("alphabet.stop") : t("alphabet.listen")}
                  </button>
                  <audio
                    ref={audioRef}
                    src={letter.audioUrl}
                    onEnded={() => setIsPlaying(false)}
                    onError={() => {
                      console.error("Ошибка загрузки аудио");
                      setIsPlaying(false);
                    }}
                  />
                </div>
                <div className="bg-primary rounded-2xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-accent rounded-full"></div>
                    <span className="text-[#E0E0E0]/70 text-sm">
                      {t("alphabet.articulationPoint")}:
                    </span>
                    <span className="text-[#E0E0E0] font-medium">
                      {letter.articulationPoint}
                    </span>
                  </div>
                </div>
              </div>

              {/* Examples */}
              <div className="bg-secondary rounded-3xl p-6">
                <h3 className="text-lg font-semibold text-[#E0E0E0] mb-4">
                  {t("alphabet.examples")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[...letter.examples].reverse().map((example, index) => (
                    <div
                      key={index}
                      className="bg-primary rounded-2xl p-4 text-center"
                    >
                      <div className="text-2xl md:text-3xl text-[#E0E0E0] font-arabic mb-2">
                        {example}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress */}
              <div className="bg-secondary rounded-3xl p-6">
                <h3 className="text-lg font-semibold text-[#E0E0E0] mb-4">
                  {t("alphabet.learningLetter")}
                </h3>
                <button
                  onClick={markAsLearned}
                  className={`flex items-center gap-2 px-4 py-2 rounded-2xl transition-colors ${
                    isLearned
                      ? "bg-green-500/20 text-green-400 hover:bg-red-500/20 hover:text-red-400"
                      : "bg-accent text-white hover:bg-accent/80"
                  }`}
                >
                  <CheckCircle size={20} />
                  {isLearned
                    ? t("alphabet.letterLearned")
                    : t("alphabet.markAsLearned")}
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Letter Info */}
              <div className="bg-secondary rounded-3xl p-6">
                <h3 className="text-lg font-semibold text-[#E0E0E0] mb-4">
                  {t("alphabet.aboutLetter")}
                </h3>
                <div className="space-y-3">
                  <div className="text-center mb-4">
                    <div className="text-6xl text-[#E0E0E0] font-arabic mb-2">
                      {letter.letter}
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-[#E0E0E0]/60">
                    <div className="flex justify-between">
                      <span>{t("alphabet.name")}</span>
                      <span className="text-[#E0E0E0]">{letter.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t("alphabet.transliteration")}</span>
                      <span className="text-[#E0E0E0]">
                        {letter.transliteration}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t("alphabet.articulationPoint")}:</span>
                      <span className="text-[#E0E0E0]">
                        {letter.articulationPoint}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t("alphabet.status")}</span>
                      <span
                        className={`${
                          isLearned ? "text-green-400" : "text-yellow-400"
                        }`}
                      >
                        {isLearned
                          ? t("alphabet.learned")
                          : t("alphabet.notLearned")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="bg-secondary rounded-3xl p-6">
                <h3 className="text-lg font-semibold text-[#E0E0E0] mb-4">
                  {t("lessons.navigation")}
                </h3>
                <div className="space-y-3">
                  {/* Previous Letter */}
                  {previousLetter && (
                    <button
                      onClick={handlePreviousLetter}
                      className="w-full text-left p-3 bg-[#E0E0E0]/5 rounded-2xl hover:bg-[#E0E0E0]/10 transition-colors"
                    >
                      <div className="text-sm text-[#E0E0E0]/60 mb-1">
                        {t("alphabet.previousLetter")}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-arabic">
                          {previousLetter.letter}
                        </span>
                        <span className="text-[#E0E0E0] font-medium">
                          {previousLetter.name}
                        </span>
                      </div>
                    </button>
                  )}

                  {/* Next Letter */}
                  {nextLetter && (
                    <button
                      onClick={handleNextLetter}
                      className="w-full text-left p-3 bg-[#E0E0E0]/5 rounded-2xl hover:bg-[#E0E0E0]/10 transition-colors"
                    >
                      <div className="text-sm text-[#E0E0E0]/60 mb-1">
                        {t("alphabet.nextLetter")}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-arabic">
                          {nextLetter.letter}
                        </span>
                        <span className="text-[#E0E0E0] font-medium">
                          {nextLetter.name}
                        </span>
                      </div>
                    </button>
                  )}
                </div>
              </div>

              {/* Progress */}
              <div className="bg-secondary rounded-3xl p-6">
                <h3 className="text-lg font-semibold text-[#E0E0E0] mb-4">
                  {t("alphabet.progressAlphabet")}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#E0E0E0]/70">
                      {t("alphabet.letter")}
                    </span>
                    <span className="text-[#E0E0E0]">
                      {currentIndex + 1} {t("alphabet.of")} {letters.length}
                    </span>
                  </div>
                  <div className="w-full bg-primary rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-accent to-accent/80"
                      style={{
                        width: `${
                          ((currentIndex + 1) / letters.length) * 100
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
