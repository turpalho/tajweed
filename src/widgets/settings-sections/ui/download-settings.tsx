"use client";

export function DownloadSettings() {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
      <h3 className="text-2xl font-semibold text-white mb-6">
        💾 Загрузки и хранение
      </h3>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-3">
            Качество видео для загрузки
          </label>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3">
            <select className="bg-transparent text-white w-full outline-none text-sm font-medium">
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

        <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-2xl border border-white/10">
          <input
            type="checkbox"
            id="autoDownload"
            className="w-4 h-4 rounded accent-orange-500"
          />
          <label
            htmlFor="autoDownload"
            className="text-sm text-white/80 font-light"
          >
            Автозагрузка при WiFi
          </label>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
          <div className="flex justify-between text-sm mb-3">
            <span className="text-white/80 font-light">Использовано места</span>
            <span className="text-white/60 font-light">1.2 ГБ из 16 ГБ</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-3 border border-white/20">
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
            className="w-full px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-sm font-medium text-white/80 hover:bg-white/20 transition-colors cursor-pointer text-center"
            onClick={() => console.log("Clear cache")}
          >
            🗑️ Очистить кэш (245 МБ)
          </div>
          <div
            className="w-full px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-sm font-medium text-white/80 hover:bg-white/20 transition-colors cursor-pointer text-center"
            onClick={() => console.log("Manage downloads")}
          >
            📁 Управление загрузками
          </div>
        </div>
      </div>
    </div>
  );
}
