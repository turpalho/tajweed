"use client";

import { useState, useEffect } from "react";
import { Volume2 } from "lucide-react";
import { useI18n } from "@/shared/lib/i18n/context";
import {
  getAudioEditions,
  QuranReciter,
  POPULAR_RECITERS,
} from "@/shared/lib/quran-api";
import {
  getReciterSettings,
  saveReciterSettings,
} from "@/shared/lib/reciter-settings";
import type { ReciterSettings } from "@/shared/lib/reciter-settings";

const DEFAULT_RECITER_SETTINGS: ReciterSettings = {
  selectedReciter: "ar.alafasy",
  volume: 0.8,
  autoplay: false,
  repeat: false,
};

export function ReciterSettings() {
  const { t } = useI18n();
  const [reciters, setReciters] = useState<QuranReciter[]>([]);
  const [settings, setSettings] = useState<ReciterSettings>(
    DEFAULT_RECITER_SETTINGS
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Загружаем настройки только на клиенте
    const loadedSettings = getReciterSettings();
    setSettings(loadedSettings);
    loadReciters();
  }, []);

  const loadReciters = async () => {
    try {
      setLoading(true);
      const allReciters = await getAudioEditions();

      // Сортируем чтецов: сначала популярные, потом остальные по алфавиту
      const popularReciters = allReciters
        .filter((r) => POPULAR_RECITERS.includes(r.identifier))
        .sort(
          (a, b) =>
            POPULAR_RECITERS.indexOf(a.identifier) -
            POPULAR_RECITERS.indexOf(b.identifier)
        );

      const otherReciters = allReciters
        .filter((r) => !POPULAR_RECITERS.includes(r.identifier))
        .sort((a, b) => a.englishName.localeCompare(b.englishName));

      setReciters([...popularReciters, ...otherReciters]);
    } catch (err) {
      setError(t("settings.loadingRecitersError"));
      console.error("Error loading reciters:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = (newSettings: Partial<ReciterSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    saveReciterSettings(newSettings);
  };

  const handleReciterChange = (reciterIdentifier: string) => {
    updateSettings({ selectedReciter: reciterIdentifier });
  };

  const getReciterDisplayName = (reciter: QuranReciter) => {
    // Показываем арабское имя если есть, иначе английское
    return reciter.name || reciter.englishName;
  };

  const isPopularReciter = (identifier: string) => {
    return POPULAR_RECITERS.includes(identifier);
  };

  if (loading) {
    return (
      <div className="bg-secondary rounded-3xl p-8">
        <div className="flex items-center gap-2 mb-6">
          <Volume2 size={24} color="#E0E0E0" />
          <h3 className="text-xl font-semibold text-[#E0E0E0]">
            {t("settings.reciterSettings")}
          </h3>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-secondary rounded-3xl p-8">
        <div className="flex items-center gap-2 mb-6">
          <Volume2 size={24} color="#E0E0E0" />
          <h3 className="text-xl font-semibold text-[#E0E0E0]">
            {t("settings.reciterSettings")}
          </h3>
        </div>
        <div className="text-center py-8">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={loadReciters}
            className="px-4 py-2 bg-accent text-white rounded-xl hover:bg-accent/80 transition-colors"
          >
            {t("settings.retryAttempt")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-secondary rounded-3xl p-8">
      <div className="flex items-center gap-2 mb-6">
        <Volume2 size={24} color="#E0E0E0" />
        <h3 className="text-xl font-semibold text-[#E0E0E0]">
          {t("settings.reciterSettings")}
        </h3>
      </div>

      <div className="space-y-6">
        {/* Выбор чтеца */}
        <div>
          <label className="block text-sm font-medium text-[#E0E0E0]/80 mb-3">
            {t("settings.quranReciter")}
          </label>
          <div className="bg-primary border border-[#E0E0E0]/20 rounded-2xl px-4 py-3">
            <select
              value={settings.selectedReciter}
              onChange={(e) => handleReciterChange(e.target.value)}
              className="bg-transparent text-[#E0E0E0] w-full outline-none text-sm font-medium"
            >
              {reciters.map((reciter) => (
                <option
                  key={reciter.identifier}
                  value={reciter.identifier}
                  className="bg-gray-800"
                >
                  {isPopularReciter(reciter.identifier) && "⭐ "}
                  {getReciterDisplayName(reciter)}
                  {reciter.bitrate && ` (${reciter.bitrate})`}
                </option>
              ))}
            </select>
          </div>
          <div className="text-xs text-[#E0E0E0]/60 mt-2">
            {t("settings.popularReciters")}
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #ed6f4c;
          cursor: pointer;
        }

        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #ed6f4c;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}
