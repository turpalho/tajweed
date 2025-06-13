interface LearningProgressProps {
  totalProgress: number;
  learnedLetters: number;
  completedLessons: number;
  readSurahs: number;
}

export function LearningProgress({
  totalProgress,
  learnedLetters,
  completedLessons,
  readSurahs,
}: LearningProgressProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            Прогресс обучения
          </h2>
          <p className="font-light" style={{ color: "var(--text-secondary)" }}>
            Ваши достижения
          </p>
        </div>

        {/* Main progress circle */}
        <div className="flex justify-center mb-10">
          <div className="relative">
            <svg
              className="w-32 h-32 transform -rotate-90"
              viewBox="0 0 120 120"
            >
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="8"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="url(#mainProgressGradient)"
                strokeWidth="8"
                strokeDasharray={`${(totalProgress / 100) * 314.16} 314.16`}
                className="transition-all duration-1000 ease-out drop-shadow-lg"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient
                  id="mainProgressGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#ED6F4C" />
                  <stop offset="50%" stopColor="#ED6F4C" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ED6F4C" stopOpacity="0.6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-white">
                {totalProgress}%
              </span>
              <span
                className="text-sm font-light"
                style={{ color: "var(--text-secondary)" }}
              >
                завершено
              </span>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="text-center group">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 group-hover:bg-white/10 transition-all duration-300">
              <div
                className="text-3xl font-bold mb-1"
                style={{ color: "#ED6F4C" }}
              >
                {learnedLetters}
              </div>
              <div
                className="text-sm font-light"
                style={{ color: "var(--text-secondary)" }}
              >
                Изученных букв
              </div>
            </div>
          </div>
          <div className="text-center group">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 group-hover:bg-white/10 transition-all duration-300">
              <div
                className="text-3xl font-bold mb-1"
                style={{ color: "#ED6F4CCC" }}
              >
                {completedLessons}
              </div>
              <div
                className="text-sm font-light"
                style={{ color: "var(--text-secondary)" }}
              >
                Завершенных уроков
              </div>
            </div>
          </div>
          <div className="text-center group">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 group-hover:bg-white/10 transition-all duration-300">
              <div
                className="text-3xl font-bold mb-1"
                style={{ color: "#ED6F4C80" }}
              >
                {readSurahs}
              </div>
              <div
                className="text-sm font-light"
                style={{ color: "var(--text-secondary)" }}
              >
                Прочитанных сур
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
