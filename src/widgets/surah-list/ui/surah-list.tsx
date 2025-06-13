"use client";

import { Surah } from "@/entities/quran";

interface SurahListProps {
  surahs: Surah[];
}

export function SurahList({ surahs }: SurahListProps) {
  return (
    <div className="space-y-4">
      {surahs.map((surah) => (
        <div key={surah.id} className="group relative cursor-pointer">
          {/* Glass morphism card */}
          <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/15">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl flex items-center justify-center text-xl font-bold text-white group-hover:bg-white/30 transition-colors flex-shrink-0">
                  {surah.id}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-2xl text-white mb-2 group-hover:text-white/90 transition-colors">
                    {surah.nameArabic}
                  </h3>
                  <p className="text-lg text-white/80 mb-1 font-light">
                    {surah.transliteration}
                  </p>
                  <p className="text-sm text-white/60 font-light">
                    {surah.translation}
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-6">
                {/* Info */}
                <div className="text-right space-y-1 min-w-0 flex-shrink-0">
                  <div className="text-sm text-white/70 font-light">
                    {surah.verses} аятов
                  </div>
                  <div className="text-xs text-white/50 font-light">
                    {surah.revelationType === "meccan"
                      ? "Мекканская"
                      : "Мединская"}
                  </div>
                  {surah.duration && (
                    <div className="text-xs text-white/50 font-light">
                      {Math.floor(surah.duration / 60)}:
                      {(surah.duration % 60).toString().padStart(2, "0")} мин
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col space-y-3 min-w-0 flex-shrink-0">
                  <div
                    className="px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-sm font-medium text-white hover:bg-white/30 transition-colors cursor-pointer text-center"
                    onClick={() => console.log("Open surah", surah.id)}
                  >
                    📖 Читать
                  </div>
                  {surah.audioUrl && (
                    <div
                      className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-sm font-medium text-white/80 hover:bg-white/20 transition-colors cursor-pointer text-center"
                      onClick={() => console.log("Play audio", surah.id)}
                    >
                      🔊 Слушать
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
