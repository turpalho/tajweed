"use client";

import { useState, useMemo } from "react";
import { SurahList } from "@/widgets/surah-list";
import { Surah } from "@/entities/quran";
import { useI18n } from "@/shared/lib/i18n/context";
import { useLocalizedText } from "@/shared/lib/localized-data";
import quranData from "@/shared/data/quran-surahs.json";

export function QuranPage() {
  const { t } = useI18n();
  const { getLocalizedText } = useLocalizedText();
  const [filter, setFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");

  const surahs = quranData as Surah[];

  // Применяем фильтрацию, поиск и сортировку
  const filteredAndSortedSurahs = useMemo(() => {
    let result = [...surahs];

    // Фильтрация по типу
    if (filter && filter !== "") {
      if (filter === "meccan" || filter === "medinan") {
        result = result.filter((surah) => surah.revelationType === filter);
      }
      // Здесь можно добавить логику для "favorites" когда будет реализована
    }

    // Поиск по названию
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (surah) =>
          surah.name.toLowerCase().includes(query) ||
          surah.nameArabic.includes(searchQuery) ||
          surah.transliteration.toLowerCase().includes(query) ||
          getLocalizedText(surah.translation).toLowerCase().includes(query) ||
          getLocalizedText(surah.description).toLowerCase().includes(query)
      );
    }

    // Сортировка
    if (sortBy) {
      switch (sortBy) {
        case "number":
          result.sort((a, b) => a.id - b.id);
          break;
        case "name":
          result.sort((a, b) =>
            getLocalizedText(a.translation).localeCompare(
              getLocalizedText(b.translation)
            )
          );
          break;
        case "duration":
          result.sort((a, b) => {
            const durationA = a.duration || 0;
            const durationB = b.duration || 0;
            return durationB - durationA; // По убыванию длительности
          });
          break;
        default:
          // По умолчанию по номеру
          result.sort((a, b) => a.id - b.id);
      }
    }

    return result;
  }, [surahs, filter, searchQuery, sortBy, getLocalizedText]);

  return (
    <div className="min-h-screen relative">
      <div className="relative py-20 sm:py-16">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          {/* Hero Section */}
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-[#E0E0E0] leading-tight tracking-tight">
              {t("quran.sacred")} <br />
              <span
                className="bg-gradient-to-r bg-clip-text text-transparent ml-3"
                style={{
                  backgroundImage: `linear-gradient(to right, #ED6F4C, #ED6F4C80, #ED6F4CCC)`,
                }}
              >
                {t("quran.title")}
              </span>
            </h1>
          </div>

          {/* Search and Filters */}
          <div className="bg-secondary rounded-3xl p-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="bg-primary border border-[#E0E0E0]/20 rounded-2xl px-4 py-3 flex-1">
                <select
                  className="bg-transparent text-[#E0E0E0] w-full outline-none text-sm font-medium"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="" className="bg-gray-800">
                    {t("quran.allSurahs")}
                  </option>
                  <option value="meccan" className="bg-gray-800">
                    {t("quran.meccanSurahs")}
                  </option>
                  <option value="medinan" className="bg-gray-800">
                    {t("quran.medinanSurahs")}
                  </option>
                  <option value="favorites" className="bg-gray-800">
                    {t("quran.favorites")}
                  </option>
                </select>
              </div>
              <div className="bg-primary border border-[#E0E0E0]/20 rounded-2xl px-4 py-3 flex-1">
                <input
                  type="text"
                  placeholder={t("quran.searchPlaceholder")}
                  className="bg-transparent text-[#E0E0E0] placeholder-[#E0E0E0]/50 w-full outline-none text-sm font-light"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="bg-primary border border-[#E0E0E0]/20 rounded-2xl px-4 py-3 flex-1">
                <select
                  className="bg-transparent text-[#E0E0E0] w-full outline-none text-sm font-medium"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="" className="bg-gray-800">
                    {t("quran.sort")}
                  </option>
                  <option value="number" className="bg-gray-800">
                    {t("quran.sortByNumber")}
                  </option>
                  <option value="name" className="bg-gray-800">
                    {t("quran.sortByName")}
                  </option>
                  <option value="duration" className="bg-gray-800">
                    {t("quran.sortByDuration")}
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Surah List */}
          <div className="space-y-6">
            <SurahList surahs={filteredAndSortedSurahs} />
          </div>
        </div>
      </div>
    </div>
  );
}
