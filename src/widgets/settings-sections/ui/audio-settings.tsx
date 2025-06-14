import { Volume2 } from "lucide-react";

export function AudioSettings() {
  return (
    <div className="bg-secondary rounded-3xl p-8">
      <div className="flex items-center gap-2 mb-6">
        <Volume2 size={24} color="#E0E0E0" />
        <h3 className="text-xl font-semibold text-[#E0E0E0]">
          Аудио настройки
        </h3>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-[#E0E0E0]/80 mb-3">
            Чтец по умолчанию
          </label>
          <div className="bg-primary border border-[#E0E0E0]/20 rounded-2xl px-4 py-3">
            <select className="bg-transparent text-[#E0E0E0] w-full outline-none text-sm font-medium">
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

        <div className="flex items-center space-x-3 p-3 bg-primary rounded-2xl border border-[#E0E0E0]/10">
          <input
            type="checkbox"
            id="autoRepeat"
            className="w-4 h-4 rounded accent-orange-500"
          />
          <label
            htmlFor="autoRepeat"
            className="text-sm text-[#E0E0E0]/80 font-light"
          >
            Автоповтор аятов
          </label>
        </div>
      </div>
    </div>
  );
}
