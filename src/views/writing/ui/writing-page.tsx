"use client";

import { ArabicLetter } from "@/entities/alphabet";

// Используем те же моковые данные, но адаптируем для прописей
const mockLettersForWriting: ArabicLetter[] = [
  {
    id: "1",
    letter: "ا",
    name: "Алиф",
    transliteration: "Alif",
    audioUrl: "/audio/alif.mp3",
    positions: {
      isolated: "ا",
      initial: "ا",
      medial: "ـا",
      final: "ـا",
    },
    articulationPoint: "Горло",
    examples: ["أب", "إسلام", "أمل"],
    isLearned: true,
  },
  // Остальные буквы...
];

export function WritingPage() {
  const downloadedCount = mockLettersForWriting.filter(
    (letter) => letter.isLearned
  ).length;

  return (
    <div className="min-h-screen relative">
      <div className="relative z-10 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
              Прописи
              <span
                className="bg-gradient-to-r bg-clip-text text-transparent ml-3"
                style={{
                  backgroundImage: `linear-gradient(to right, #ED6F4C, #ED6F4C80, #ED6F4CCC)`,
                }}
              >
                букв
              </span>
            </h1>

            <p
              className="text-xl max-w-2xl mx-auto leading-relaxed font-light mb-8"
              style={{ color: "var(--text-secondary)" }}
            >
              Изучайте написание арабских букв с помощью PDF прописей и видео
            </p>
          </div>

          {/* Stats Card */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl mb-12">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
              <h3 className="text-2xl font-semibold text-white mb-4 md:mb-0">
                Доступные материалы
              </h3>
              <div className="px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-white font-medium hover:bg-white/30 transition-colors cursor-pointer">
                📄 Скачать все PDF
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">28</div>
                <div className="text-sm text-white/60 font-light">
                  PDF прописей
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">28</div>
                <div className="text-sm text-white/60 font-light">
                  Видео уроков
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  {downloadedCount}
                </div>
                <div className="text-sm text-white/60 font-light">Скачано</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  {28 - downloadedCount}
                </div>
                <div className="text-sm text-white/60 font-light">Осталось</div>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl mb-12">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 flex-1">
                <select className="bg-transparent text-white w-full outline-none text-sm font-medium">
                  <option value="" className="bg-gray-800">
                    Все буквы
                  </option>
                  <option value="downloaded" className="bg-gray-800">
                    Скачанные
                  </option>
                  <option value="not_downloaded" className="bg-gray-800">
                    Не скачанные
                  </option>
                </select>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 flex-1">
                <input
                  type="text"
                  placeholder="Поиск буквы..."
                  className="bg-transparent text-white placeholder-white/50 w-full outline-none text-sm font-light"
                />
              </div>
            </div>
          </div>

          {/* Letters Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mockLettersForWriting.map((letter) => (
              <div key={letter.id} className="group relative cursor-pointer">
                {/* Glass morphism card */}
                <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:bg-white/15 text-center">
                  <div className="text-6xl mb-4 font-arabic text-white group-hover:scale-110 transition-transform duration-300">
                    {letter.letter}
                  </div>
                  <div className="text-lg font-semibold text-white mb-3 group-hover:text-white/90 transition-colors">
                    {letter.name}
                  </div>
                  <div className="text-sm text-white/60 font-light mb-6">
                    {letter.transliteration}
                  </div>

                  <div className="space-y-3">
                    <div className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-sm font-medium text-white hover:bg-white/30 transition-colors cursor-pointer">
                      📄 PDF пропись
                    </div>
                    <div className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-sm font-medium text-white/80 hover:bg-white/20 transition-colors cursor-pointer">
                      🎥 Видео урок
                    </div>
                  </div>

                  <div className="text-xs text-white/50 mt-4 font-light">
                    {letter.isLearned ? "✓ Скачано" : "⏳ Не скачано"}
                  </div>

                  {/* Status indicator */}
                  <div
                    className={`absolute top-4 right-4 w-3 h-3 rounded-full ${
                      letter.isLearned
                        ? "bg-green-400 shadow-lg shadow-green-400/50"
                        : "bg-white/30"
                    }`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
