"use client";

import { ArabicLetter } from "@/entities/alphabet";
import { useRouter } from "next/navigation";
import { useLocalizedText } from "@/shared/lib/localized-data";
import { useI18n } from "@/shared/lib/i18n/context";

interface AlphabetGridProps {
  letters: ArabicLetter[];
}

export function AlphabetGrid({ letters }: AlphabetGridProps) {
  const router = useRouter();
  const { getLocalizedText } = useLocalizedText();
  const { t } = useI18n();

  return (
    <div
      className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
      style={{ direction: "rtl" }}
    >
      {letters.map((letter) => (
        <div
          key={letter.id}
          className="group relative cursor-pointer"
          onClick={() => router.push(`/alphabet/${letter.id}`)}
        >
          {/* Glass morphism card */}
          <div className="relative bg-secondary rounded-3xl p-6 hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:bg-[#E0E0E0]/15 text-center">
            <div className="text-5xl mb-4 font-arabic text-[#E0E0E0] group-hover:scale-110 transition-transform duration-300">
              {letter.letter}
            </div>
            <div className="text-lg font-semibold text-[#E0E0E0] mb-2 group-hover:text-[#E0E0E0]/90 transition-colors">
              {getLocalizedText(letter.name)}
            </div>
            <div className="text-sm text-[#E0E0E0]/60 font-light mb-3">
              {letter.transliteration}
            </div>
            <div className="text-xs text-[#E0E0E0]/50 font-light">
              {getLocalizedText(letter.articulationPoint)}
            </div>

            {/* Status indicator - переместили влево для RTL */}
            <div
              className={`absolute top-4 left-4 w-3 h-3 rounded-full ${
                letter.isLearned
                  ? "bg-accent shadow-lg shadow-accent/50"
                  : "bg-[#E0E0E0]/30"
              }`}
            ></div>

            {/* Learned indicator - переместили вправо для RTL */}
            {letter.isLearned && (
              <div className="absolute bottom-3 right-3 text-accent text-xs font-medium">
                ✓ {t("alphabet.learned")}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
