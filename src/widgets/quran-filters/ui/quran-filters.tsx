"use client";

import { useI18n } from "@/shared/lib/i18n/context";

interface QuranFiltersProps {
  filter: string;
  searchQuery: string;
  sortBy: string;
  onFilterChange: (filter: string) => void;
  onSearchChange: (query: string) => void;
  onSortChange: (sort: string) => void;
}

export function QuranFilters({
  filter,
  searchQuery,
  sortBy,
  onFilterChange,
  onSearchChange,
  onSortChange,
}: QuranFiltersProps) {
  const { t } = useI18n();

  return (
    <div className="bg-secondary rounded-3xl p-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="bg-primary border border-[#E0E0E0]/20 rounded-2xl px-4 py-3 flex-1">
          <select
            className="bg-transparent text-[#E0E0E0] w-full outline-none text-sm font-medium"
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
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
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div className="bg-primary border border-[#E0E0E0]/20 rounded-2xl px-4 py-3 flex-1">
          <select
            className="bg-transparent text-[#E0E0E0] w-full outline-none text-sm font-medium"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
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
  );
}
