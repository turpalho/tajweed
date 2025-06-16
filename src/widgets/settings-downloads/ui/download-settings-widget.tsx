"use client";

import { Download, Folder, Trash } from "lucide-react";
import { useI18n } from "@/shared/lib/i18n/context";
import { useDownloadSettings } from "@/features/download-settings";

export function DownloadSettingsWidget() {
  const { t } = useI18n();
  const {
    settings,
    storageInfo,
    isLoaded,
    updateVideoQuality,
    toggleAutoDownload,
    clearCache,
    manageDownloads,
  } = useDownloadSettings();

  if (!isLoaded) {
    return (
      <div className="bg-secondary rounded-3xl p-8">
        <div className="flex items-center gap-2 mb-6">
          <Download size={24} color="#E0E0E0" />
          <h3 className="text-xl font-semibold text-[#E0E0E0]">
            {t("settings.downloadAndStorage")}
          </h3>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
        </div>
      </div>
    );
  }

  const usagePercentage =
    (storageInfo.usedSpace / storageInfo.totalSpace) * 100;

  return (
    <div className="bg-secondary rounded-3xl p-8">
      <div className="flex items-center gap-2 mb-6">
        <Download size={24} color="#E0E0E0" />
        <h3 className="text-xl font-semibold text-[#E0E0E0]">
          {t("settings.downloadAndStorage")}
        </h3>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-[#E0E0E0]/80 mb-3">
            {t("settings.videoQuality")}
          </label>
          <div className="bg-primary border border-[#E0E0E0]/20 rounded-2xl px-4 py-3">
            <select
              value={settings.videoQuality}
              onChange={(e) =>
                updateVideoQuality(e.target.value as "1080p" | "720p" | "480p")
              }
              className="bg-transparent text-[#E0E0E0] w-full outline-none text-sm font-medium"
            >
              <option value="1080p" className="bg-gray-800">
                1080p ({t("settings.high")})
              </option>
              <option value="720p" className="bg-gray-800">
                720p ({t("settings.medium")})
              </option>
              <option value="480p" className="bg-gray-800">
                480p ({t("settings.low")})
              </option>
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-primary rounded-2xl border border-[#E0E0E0]/10">
          <input
            type="checkbox"
            id="autoDownload"
            checked={settings.autoDownloadWifi}
            onChange={toggleAutoDownload}
            className="w-4 h-4 rounded accent-orange-500"
          />
          <label
            htmlFor="autoDownload"
            className="text-sm text-[#E0E0E0]/80 font-light"
          >
            {t("settings.autoDownloadWifi")}
          </label>
        </div>

        <div className="bg-primary border border-[#E0E0E0]/10 rounded-2xl p-4">
          <div className="flex justify-between text-sm mb-3">
            <span className="text-[#E0E0E0]/80 font-light">
              {t("settings.usedSpace")}
            </span>
            <span className="text-[#E0E0E0]/60 font-light">
              {(storageInfo.usedSpace / 1000).toFixed(1)} ГБ {t("courses.of")}{" "}
              {(storageInfo.totalSpace / 1000).toFixed(0)} ГБ
            </span>
          </div>
          <div className="w-full bg-primary rounded-full h-3 border border-[#E0E0E0]/20">
            <div
              className="h-3 rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${Math.min(usagePercentage, 100)}%`,
                background: `linear-gradient(to right, #ED6F4C, #ED6F4C80)`,
                boxShadow: "0 0 10px rgba(237, 111, 76, 0.3)",
              }}
            ></div>
          </div>
        </div>

        <div className="space-y-3">
          <div
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary border border-[#E0E0E0]/20 rounded-2xl text-sm font-medium text-[#E0E0E0]/80 hover:bg-[#E0E0E0]/20 transition-colors cursor-pointer text-center"
            onClick={clearCache}
          >
            <Trash size={16} color="#E0E0E0" />
            {t("settings.clearCacheSize").replace(
              "{size}",
              storageInfo.cacheSize.toString()
            )}
          </div>
          <div
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary border border-[#E0E0E0]/20 rounded-2xl text-sm font-medium text-[#E0E0E0]/80 hover:bg-[#E0E0E0]/20 transition-colors cursor-pointer text-center"
            onClick={manageDownloads}
          >
            <Folder size={16} color="#E0E0E0" />
            {t("settings.manageDownloads")}
          </div>
        </div>
      </div>
    </div>
  );
}
