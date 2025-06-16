"use client";

import { Play, Pause, Volume2 } from "lucide-react";
import { useLetterLearning } from "@/features/learn-letter";
import { useI18n } from "@/shared/lib/i18n/context";
import { useLocalizedText } from "@/shared/lib/localized-data";
import type { ArabicLetter } from "@/entities/alphabet";

interface LetterAudioPlayerProps {
  letter: ArabicLetter;
}

export function LetterAudioPlayer({ letter }: LetterAudioPlayerProps) {
  const { t } = useI18n();
  const { getLocalizedText } = useLocalizedText();
  const { isPlaying, playAudio, stopAudio } = useLetterLearning(
    letter.id,
    letter.audioUrl
  );

  const toggleAudio = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      playAudio();
    }
  };

  return (
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
      </div>
      <div className="bg-primary rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-accent rounded-full"></div>
          <span className="text-[#E0E0E0]/70 text-sm">
            {t("alphabet.articulationPoint")}:
          </span>
          <span className="text-[#E0E0E0] font-medium">
            {getLocalizedText(letter.articulationPoint)}
          </span>
        </div>
      </div>
    </div>
  );
}
