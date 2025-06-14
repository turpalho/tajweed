"use client";

import { Download, Folder, Trash } from "lucide-react";

export function DownloadSettings() {
  return (
    <div className="bg-secondary rounded-3xl p-8">
      <div className="flex items-center gap-2 mb-6">
        <Download size={24} color="#E0E0E0" />
        <h3 className="text-xl font-semibold text-[#E0E0E0]">
          Загрузки и хранение
        </h3>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-[#E0E0E0]/80 mb-3">
            Качество видео для загрузки
          </label>
          <div className="bg-primary border border-[#E0E0E0]/20 rounded-2xl px-4 py-3">
            <select className="bg-transparent text-[#E0E0E0] w-full outline-none text-sm font-medium">
              <option value="1080p" className="bg-gray-800">
                1080p (высокое)
              </option>
              <option value="720p" className="bg-gray-800">
                720p (среднее)
              </option>
              <option value="480p" className="bg-gray-800">
                480p (низкое)
              </option>
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-primary rounded-2xl border border-[#E0E0E0]/10">
          <input
            type="checkbox"
            id="autoDownload"
            className="w-4 h-4 rounded accent-orange-500"
          />
          <label
            htmlFor="autoDownload"
            className="text-sm text-[#E0E0E0]/80 font-light"
          >
            Автозагрузка при WiFi
          </label>
        </div>

        <div className="bg-primary border border-[#E0E0E0]/10 rounded-2xl p-4">
          <div className="flex justify-between text-sm mb-3">
            <span className="text-[#E0E0E0]/80 font-light">
              Использовано места
            </span>
            <span className="text-[#E0E0E0]/60 font-light">
              1.2 ГБ из 16 ГБ
            </span>
          </div>
          <div className="w-full bg-primary rounded-full h-3 border border-[#E0E0E0]/20">
            <div
              className="h-3 rounded-full w-1/8 transition-all duration-700 ease-out"
              style={{
                background: `linear-gradient(to right, #ED6F4C, #ED6F4C80)`,
                boxShadow: "0 0 10px rgba(237, 111, 76, 0.3)",
              }}
            ></div>
          </div>
        </div>

        <div className="space-y-3">
          <div
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary border border-[#E0E0E0]/20 rounded-2xl text-sm font-medium text-[#E0E0E0]/80 hover:bg-[#E0E0E0]/20 transition-colors cursor-pointer text-center"
            onClick={() => console.log("Clear cache")}
          >
            <Trash size={16} color="#E0E0E0" />
            Очистить кэш (245 МБ)
          </div>
          <div
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary border border-[#E0E0E0]/20 rounded-2xl text-sm font-medium text-[#E0E0E0]/80 hover:bg-[#E0E0E0]/20 transition-colors cursor-pointer text-center"
            onClick={() => console.log("Manage downloads")}
          >
            <Folder size={16} color="#E0E0E0" />
            Управление загрузками
          </div>
        </div>
      </div>
    </div>
  );
}
