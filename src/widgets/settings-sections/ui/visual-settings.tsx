import { Card } from "@/shared/ui";

export function VisualSettings() {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
      <h3 className="text-2xl font-semibold text-white mb-6">
        🎨 Визуальные настройки
      </h3>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-3">
            Размер арабского шрифта
          </label>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3">
            <input
              type="range"
              min="14"
              max="32"
              step="2"
              defaultValue="18"
              className="w-full accent-orange-500"
            />
            <div className="flex justify-between text-xs text-white/50 mt-2 font-light">
              <span>14px</span>
              <span>24px</span>
              <span>32px</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-3">
            Тема приложения
          </label>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3">
            <select className="bg-transparent text-white w-full outline-none text-sm font-medium">
              <option value="light" className="bg-gray-800">
                Светлая
              </option>
              <option value="dark" className="bg-gray-800">
                Темная
              </option>
              <option value="auto" className="bg-gray-800">
                Автоматически
              </option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-3">
            Язык интерфейса
          </label>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3">
            <select className="bg-transparent text-white w-full outline-none text-sm font-medium">
              <option value="ru" className="bg-gray-800">
                Русский
              </option>
              <option value="en" className="bg-gray-800">
                English
              </option>
              <option value="ar" className="bg-gray-800">
                العربية
              </option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-4">
            Цветовая схема правил таджвида
          </label>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded shadow-lg"></div>
                <span className="text-white/70 font-light">Идгам</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-blue-500 rounded shadow-lg"></div>
                <span className="text-white/70 font-light">Изхар</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-red-500 rounded shadow-lg"></div>
                <span className="text-white/70 font-light">Икляб</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-yellow-500 rounded shadow-lg"></div>
                <span className="text-white/70 font-light">Ихфа</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-purple-500 rounded shadow-lg"></div>
                <span className="text-white/70 font-light">Мадд</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-orange-500 rounded shadow-lg"></div>
                <span className="text-white/70 font-light">Гунна</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
