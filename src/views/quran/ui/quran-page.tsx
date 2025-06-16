"use client";

import { SurahList } from "@/widgets/surah-list";

// Features
import { useQuranFiltering } from "@/features/quran-filtering";

// Widgets
import { QuranHero } from "@/widgets/quran-hero";
import { QuranFilters } from "@/widgets/quran-filters";

export function QuranPage() {
  // Используем feature для фильтрации
  const { filters, setters, filteredAndSortedSurahs } = useQuranFiltering();

  return (
    <div className="min-h-screen relative">
      <div className="relative py-20 sm:py-16">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          {/* Hero Section */}
          <QuranHero />

          {/* Search and Filters */}
          <QuranFilters
            filter={filters.filter}
            searchQuery={filters.searchQuery}
            sortBy={filters.sortBy}
            onFilterChange={setters.setFilter}
            onSearchChange={setters.setSearchQuery}
            onSortChange={setters.setSortBy}
          />

          {/* Surah List */}
          <div className="space-y-6">
            <SurahList surahs={filteredAndSortedSurahs} />
          </div>
        </div>
      </div>
    </div>
  );
}
