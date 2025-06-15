"use client";

import { Palette } from "lucide-react";
import { useI18n } from "@/shared/lib/i18n/context";
import { useAppSettings } from "@/shared/hooks/use-app-settings";
import { languageNames, type Locale } from "@/shared/lib/i18n";

export function VisualSettings() {
  const { t, locale } = useI18n();
  const { settings, updateSettings } = useAppSettings();

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = parseInt(e.target.value);
    updateSettings({ arabicFontSize: size });
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const language = e.target.value as Locale;
    updateSettings({ interfaceLanguage: language });
  };

  return (
    <div className="bg-secondary rounded-3xl p-8">
      <div className="flex items-center gap-2 mb-6">
        <Palette size={24} color="#E0E0E0" />
        <h3 className="text-xl font-semibold text-[#E0E0E0]">
          {t("settings.visual")}
        </h3>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-[#E0E0E0]/80 mb-3">
            {t("settings.arabicFontSize")} {settings.arabicFontSize}px
          </label>
          <div className="bg-primary border border-[#E0E0E0]/20 rounded-2xl px-4 py-3">
            <input
              type="range"
              min="14"
              max="32"
              step="2"
              value={settings.arabicFontSize}
              onChange={handleFontSizeChange}
              className="w-full accent-orange-500"
            />
            <div className="flex justify-between text-xs text-[#E0E0E0]/50 mt-2 font-light">
              <span>14px</span>
              <span>24px</span>
              <span>32px</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#E0E0E0]/80 mb-3">
            {t("settings.interfaceLanguage")}
          </label>
          <div className="bg-primary border border-[#E0E0E0]/20 rounded-2xl px-4 py-3">
            <select
              value={locale}
              onChange={handleLanguageChange}
              className="bg-transparent text-[#E0E0E0] w-full outline-none text-sm font-medium"
            >
              <option value="ru" className="bg-gray-800">
                {languageNames.ru}
              </option>
              <option value="en" className="bg-gray-800">
                {languageNames.en}
              </option>
              <option value="ar" className="bg-gray-800">
                {languageNames.ar}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
