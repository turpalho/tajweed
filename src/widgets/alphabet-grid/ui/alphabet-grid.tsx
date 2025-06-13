"use client";

import { ArabicLetter } from "@/entities/alphabet";

interface AlphabetGridProps {
  letters: ArabicLetter[];
}

export function AlphabetGrid({ letters }: AlphabetGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {letters.map((letter) => (
        <div
          key={letter.id}
          className="group relative cursor-pointer"
          onClick={() => console.log("Open letter", letter.id)}
        >
          {/* Glass morphism card */}
          <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:bg-white/15 text-center">
            <div className="text-5xl mb-4 font-arabic text-white group-hover:scale-110 transition-transform duration-300">
              {letter.letter}
            </div>
            <div className="text-lg font-semibold text-white mb-2 group-hover:text-white/90 transition-colors">
              {letter.name}
            </div>
            <div className="text-sm text-white/60 font-light mb-3">
              {letter.transliteration}
            </div>
            <div className="text-xs text-white/50 font-light">
              {letter.articulationPoint}
            </div>

            {/* Status indicator */}
            <div
              className={`absolute top-4 right-4 w-3 h-3 rounded-full ${
                letter.isLearned
                  ? "bg-green-400 shadow-lg shadow-green-400/50"
                  : "bg-white/30"
              }`}
            ></div>

            {/* Learned indicator */}
            {letter.isLearned && (
              <div className="absolute bottom-3 left-3 text-green-400 text-xs font-medium">
                ✓ Изучена
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
