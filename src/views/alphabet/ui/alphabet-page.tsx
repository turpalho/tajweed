import { AlphabetGrid } from "@/widgets/alphabet-grid";
import { ArabicLetter } from "@/entities/alphabet";
import arabicAlphabetData from "@/shared/data/arabic-alphabet.json";

export function AlphabetPage() {
  const letters: ArabicLetter[] = arabicAlphabetData;
  const learnedCount = letters.filter((letter) => letter.isLearned).length;

  return (
    <div className="min-h-screen relative">
      <div className="relative py-16">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          {/* Hero Section */}
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight">
              Арабский
              <br />
              <span
                className="bg-gradient-to-r bg-clip-text text-transparent ml-3"
                style={{
                  backgroundImage: `linear-gradient(to right, #ED6F4C, #ED6F4C80, #ED6F4CCC)`,
                }}
              >
                алфавит
              </span>
            </h1>
          </div>

          {/* Progress Card */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-2">
                  Прогресс изучения
                </h3>
                <p className="text-white/70 font-light">
                  {learnedCount} из {letters.length} букв изучено
                </p>
              </div>
              <div className="text-right mt-4 md:mt-0">
                <div className="text-4xl font-bold text-white mb-1">
                  {Math.round((learnedCount / letters.length) * 100)}%
                </div>
                <div className="text-sm text-white/60 font-light">
                  завершено
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-white/10 rounded-full h-3 backdrop-blur-sm border border-white/20">
              <div
                className="h-3 rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${(learnedCount / letters.length) * 100}%`,
                  background: `linear-gradient(to right, #ED6F4C, #ED6F4C80)`,
                  boxShadow: "0 0 20px rgba(237, 111, 76, 0.3)",
                }}
              />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">
                  {letters.length}
                </div>
                <div className="text-sm text-white/60 font-light">
                  всего букв
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">
                  {learnedCount}
                </div>
                <div className="text-sm text-white/60 font-light">изучено</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">
                  {letters.length - learnedCount}
                </div>
                <div className="text-sm text-white/60 font-light">осталось</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">4</div>
                <div className="text-sm text-white/60 font-light">формы</div>
              </div>
            </div>
          </div>

          {/* Alphabet Grid */}
          <div className="space-y-6">
            <AlphabetGrid letters={letters} />
          </div>
        </div>
      </div>
    </div>
  );
}
