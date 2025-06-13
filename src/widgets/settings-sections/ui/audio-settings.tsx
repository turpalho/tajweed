export function AudioSettings() {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
      <h3 className="text-2xl font-semibold text-white mb-6">
        🔊 Аудио настройки
      </h3>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-3">
            Чтец по умолчанию
          </label>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3">
            <select className="bg-transparent text-white w-full outline-none text-sm font-medium">
              <option value="" className="bg-gray-800">
                Абдур-Рахман ас-Судайс
              </option>
              <option value="ghamidi" className="bg-gray-800">
                Саад аль-Гамиди
              </option>
              <option value="afasy" className="bg-gray-800">
                Мишари аль-Афаси
              </option>
              <option value="zumayli" className="bg-gray-800">
                Маджид аль-Зумайли
              </option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-3">
            Скорость воспроизведения
          </label>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3">
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              defaultValue="1"
              className="w-full accent-orange-500"
            />
            <div className="flex justify-between text-xs text-white/50 mt-2 font-light">
              <span>0.5x</span>
              <span>1x</span>
              <span>2x</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-3">
            Качество аудио
          </label>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3">
            <select className="bg-transparent text-white w-full outline-none text-sm font-medium">
              <option value="high" className="bg-gray-800">
                Высокое (320 kbps)
              </option>
              <option value="medium" className="bg-gray-800">
                Среднее (192 kbps)
              </option>
              <option value="low" className="bg-gray-800">
                Низкое (128 kbps)
              </option>
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-2xl border border-white/10">
          <input
            type="checkbox"
            id="autoRepeat"
            className="w-4 h-4 rounded accent-orange-500"
          />
          <label
            htmlFor="autoRepeat"
            className="text-sm text-white/80 font-light"
          >
            Автоповтор аятов
          </label>
        </div>
      </div>
    </div>
  );
}
