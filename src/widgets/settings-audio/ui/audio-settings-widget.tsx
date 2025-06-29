"use client";

import { Volume2 } from "lucide-react";
import { useI18n } from "@/shared/lib/i18n/context";
import { useAppSettings } from "@/shared/hooks/use-app-settings";

export function AudioSettingsWidget() {
  const { t } = useI18n();
  const { settings, updateSettings } = useAppSettings();

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(e.target.value) / 100;
    updateSettings({ masterVolume: volume });
  };

  const handleBackgroundMusicToggle = () => {
    updateSettings({ backgroundMusic: !settings.backgroundMusic });
  };

  const handleSoundEffectsToggle = () => {
    updateSettings({ soundEffects: !settings.soundEffects });
  };

  return (
    <div className="bg-secondary rounded-3xl p-8">
      <div className="flex items-center gap-2 mb-6">
        <Volume2 size={24} color="#E0E0E0" />
        <h3 className="text-xl font-semibold text-[#E0E0E0]">
          {t("settings.audioSettings")}
        </h3>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-[#E0E0E0]/80 mb-3">
            {t("settings.masterVolume")}:{" "}
            {Math.round(settings.masterVolume * 100)}%
          </label>
          <div className="bg-primary border border-[#E0E0E0]/20 rounded-2xl px-4 py-3">
            <input
              type="range"
              min="0"
              max="100"
              value={settings.masterVolume * 100}
              onChange={handleVolumeChange}
              className="w-full h-2 bg-[#E0E0E0]/20 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-primary rounded-2xl border border-[#E0E0E0]/10">
          <input
            type="checkbox"
            id="backgroundMusic"
            checked={settings.backgroundMusic}
            onChange={handleBackgroundMusicToggle}
            className="w-4 h-4 rounded accent-orange-500"
          />
          <label
            htmlFor="backgroundMusic"
            className="text-sm text-[#E0E0E0]/80 font-light"
          >
            {t("settings.backgroundMusicInterface")}
          </label>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-primary rounded-2xl border border-[#E0E0E0]/10">
          <input
            type="checkbox"
            id="soundEffects"
            checked={settings.soundEffects}
            onChange={handleSoundEffectsToggle}
            className="w-4 h-4 rounded accent-orange-500"
          />
          <label
            htmlFor="soundEffects"
            className="text-sm text-[#E0E0E0]/80 font-light"
          >
            {t("settings.soundEffects")}
          </label>
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
