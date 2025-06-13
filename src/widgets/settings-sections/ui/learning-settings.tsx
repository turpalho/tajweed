"use client";

export function LearningSettings() {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
      <h3 className="text-2xl font-semibold text-white mb-6">
        📚 Настройки обучения
      </h3>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-3">
            Ежедневная цель (минуты)
          </label>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3">
            <input
              type="number"
              min="5"
              max="120"
              defaultValue="30"
              className="bg-transparent text-white w-full outline-none text-sm font-medium placeholder-white/50"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-2xl border border-white/10">
            <input
              type="checkbox"
              id="notifications"
              className="w-4 h-4 rounded accent-orange-500"
              defaultChecked
            />
            <label
              htmlFor="notifications"
              className="text-sm text-white/80 font-light"
            >
              Уведомления о занятиях
            </label>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-2xl border border-white/10">
            <input
              type="checkbox"
              id="reminders"
              className="w-4 h-4 rounded accent-orange-500"
              defaultChecked
            />
            <label
              htmlFor="reminders"
              className="text-sm text-white/80 font-light"
            >
              Ежедневные напоминания
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-3">
            Время напоминаний
          </label>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3">
            <input
              type="time"
              defaultValue="20:00"
              className="bg-transparent text-white w-full outline-none text-sm font-medium"
            />
          </div>
        </div>

        <div className="pt-6 border-t border-white/10">
          <div
            className="w-full px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-sm font-medium text-white/80 hover:bg-white/20 transition-colors cursor-pointer text-center mb-3"
            onClick={() => console.log("Reset progress")}
          >
            ⚠️ Сбросить прогресс обучения
          </div>
          <p className="text-xs text-white/50 text-center font-light">
            Это действие нельзя отменить
          </p>
        </div>
      </div>
    </div>
  );
}
