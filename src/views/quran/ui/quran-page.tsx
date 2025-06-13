import { SurahList } from "@/widgets/surah-list";
import { Surah } from "@/entities/quran";

// Моковые данные для демонстрации
const mockSurahs: Surah[] = [
  {
    id: 1,
    name: "Al-Fatiha",
    nameArabic: "الفاتحة",
    transliteration: "Al-Fātiḥah",
    translation: "Открывающая",
    verses: 7,
    revelationType: "meccan",
    audioUrl: "/audio/surah1.mp3",
    duration: 120,
  },
  {
    id: 2,
    name: "Al-Baqarah",
    nameArabic: "البقرة",
    transliteration: "Al-Baqarah",
    translation: "Корова",
    verses: 286,
    revelationType: "medinan",
    audioUrl: "/audio/surah2.mp3",
    duration: 7200,
  },
  {
    id: 3,
    name: "Ali Imran",
    nameArabic: "آل عمران",
    transliteration: "Āl ʿImrān",
    translation: "Семейство Имрана",
    verses: 200,
    revelationType: "medinan",
    audioUrl: "/audio/surah3.mp3",
    duration: 4800,
  },
];

export function QuranPage() {
  return (
    <div className="min-h-screen relative">
      <div className="relative py-16">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          {/* Hero Section */}
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight">
              Священный
              <span
                className="bg-gradient-to-r bg-clip-text text-transparent ml-3"
                style={{
                  backgroundImage: `linear-gradient(to right, #ED6F4C, #ED6F4C80, #ED6F4CCC)`,
                }}
              >
                Коран
              </span>
            </h1>
          </div>

          {/* Search and Filters */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 flex-1">
                <select className="bg-transparent text-white w-full outline-none text-sm font-medium">
                  <option value="" className="bg-gray-800">
                    Все суры
                  </option>
                  <option value="meccan" className="bg-gray-800">
                    Мекканские
                  </option>
                  <option value="medinan" className="bg-gray-800">
                    Мединские
                  </option>
                  <option value="favorites" className="bg-gray-800">
                    Избранные
                  </option>
                </select>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 flex-1">
                <input
                  type="text"
                  placeholder="Поиск по названию суры..."
                  className="bg-transparent text-white placeholder-white/50 w-full outline-none text-sm font-light"
                />
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 flex-1">
                <select className="bg-transparent text-white w-full outline-none text-sm font-medium">
                  <option value="" className="bg-gray-800">
                    Сортировка
                  </option>
                  <option value="number" className="bg-gray-800">
                    По номеру
                  </option>
                  <option value="name" className="bg-gray-800">
                    По названию
                  </option>
                  <option value="duration" className="bg-gray-800">
                    По длительности
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Recently Listened */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-xl font-semibold text-white">
              Последние прослушанные
            </h3>
            <div className="flex space-x-6 overflow-x-auto pb-2">
              <div className="text-center min-w-[80px]">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl flex items-center justify-center mb-3 text-lg font-bold text-white hover:bg-white/30 transition-colors cursor-pointer">
                  1
                </div>
                <div className="text-xs text-white/70 font-light">
                  Аль-Фатиха
                </div>
              </div>
              <div className="text-center min-w-[80px]">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl flex items-center justify-center mb-3 text-lg font-bold text-white hover:bg-white/30 transition-colors cursor-pointer">
                  2
                </div>
                <div className="text-xs text-white/70 font-light">
                  Аль-Бакара
                </div>
              </div>
              <div className="text-center min-w-[80px]">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl flex items-center justify-center mb-3 text-lg font-bold text-white hover:bg-white/30 transition-colors cursor-pointer">
                  3
                </div>
                <div className="text-xs text-white/70 font-light">
                  Али Имран
                </div>
              </div>
            </div>
          </div>

          {/* Surah List */}
          <div className="space-y-6">
            <SurahList surahs={mockSurahs} />
          </div>
        </div>
      </div>
    </div>
  );
}
