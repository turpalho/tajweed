"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLocalizedText } from "@/shared/lib/localized-data";
import type { ArabicLetter } from "@/entities/alphabet";

interface LetterPageHeaderProps {
  letter: ArabicLetter;
}

export function LetterPageHeader({ letter }: LetterPageHeaderProps) {
  const router = useRouter();
  const { getLocalizedText } = useLocalizedText();

  const handleBack = () => {
    router.push("/alphabet");
  };

  return (
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
              {getLocalizedText(letter.name)}
            </h2>
            <p className="text-[#E0E0E0]/70 text-sm">
              {letter.transliteration}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
