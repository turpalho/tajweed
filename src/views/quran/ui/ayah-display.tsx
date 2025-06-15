"use client";

import { QuranApiAyah } from "@/shared/lib/quran-api";
import { useEffect, useRef } from "react";
import { Play, Pause } from "lucide-react";
import { useI18n } from "@/shared/lib/i18n/context";

interface AyahDisplayProps {
  ayahs: QuranApiAyah[];
  currentAyahNumber: number | null;
  isPlaying: boolean;
  onPlayAyah: (ayahIndex: number) => void;
}

export function AyahDisplay({
  ayahs,
  currentAyahNumber,
  isPlaying,
  onPlayAyah,
}: AyahDisplayProps) {
  const { t } = useI18n();
  const ayahRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  // Автоматически прокручивать к текущему аяту
  useEffect(() => {
    if (currentAyahNumber && isPlaying) {
      const currentRef = ayahRefs.current[currentAyahNumber];
      if (currentRef) {
        currentRef.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [currentAyahNumber, isPlaying]);

  return (
    <div className="bg-secondary rounded-3xl py-8 px-2">
      <h3 className="text-lg px-6 font-semibold text-[#E0E0E0]">
        {t("quran.surahText")}
      </h3>

      <div className="space-y-1 rounded-2xl max-h-[500px] overflow-y-auto custom-scrollbar">
        {ayahs.map((ayah, index) => (
          <div
            key={ayah.number}
            ref={(el) => {
              ayahRefs.current[ayah.number] = el;
            }}
            className={`
              p-4 transition-all duration-300
              ${
                currentAyahNumber === ayah.number && isPlaying
                  ? "bg-accent/20 border-2 border-accent shadow-lg"
                  : "bg-primary hover:bg-[#E0E0E0]/5"
              }
            `}
          >
            <div className="flex justify-between items-start gap-4">
              {/* Play button */}
              <button
                onClick={() => onPlayAyah(index)}
                className={`
                  p-2 rounded-full transition-colors
                  ${
                    currentAyahNumber === ayah.number && isPlaying
                      ? "bg-accent text-white hover:bg-accent/80"
                      : "bg-[#E0E0E0]/10 text-[#E0E0E0] hover:bg-[#E0E0E0]/20"
                  }
                `}
                title={
                  currentAyahNumber === ayah.number && isPlaying
                    ? t("quran.pause")
                    : t("quran.playAyah")
                }
              >
                {currentAyahNumber === ayah.number && isPlaying ? (
                  <Pause size={16} />
                ) : (
                  <Play size={16} />
                )}
              </button>

              {/* Номер аята в арабском стиле */}
              <div className="flex items-center justify-center w-10 h-10 bg-accent/20 rounded-full">
                <span className="text-accent font-bold">
                  {ayah.numberInSurah}
                </span>
              </div>
            </div>

            <div className="flex-1 flex justify-center items-center">
              <p className="text-2xl text-[#E0E0E0] font-arabic leading-loose text-right">
                {ayah.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 1.5px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1a1a1a;
          border-radius: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e67e22;
          border-radius: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d35400;
        }
      `}</style>
    </div>
  );
}
