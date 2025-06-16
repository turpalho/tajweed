import { useState, useMemo } from "react";
import { Surah } from "@/entities/quran";
import { useLocalizedText } from "@/shared/lib/localized-data";
import quranData from "@/shared/data/quran-surahs.json";
import { QuranFilters } from "./types";

export function useQuranFiltering() {
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

    const filters: QuranFilters = {
        filter,
        searchQuery,
        sortBy,
    };

    const setters = {
        setFilter,
        setSearchQuery,
        setSortBy,
    };

    return {
        filters,
        setters,
        filteredAndSortedSurahs,
    };
} 