"use client";

export function AboutSettings() {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
      <h3 className="text-2xl font-semibold text-white mb-6">
        ℹ️ О приложении
      </h3>

      <div className="space-y-6">
        <div className="text-center mb-8 p-6 bg-white/5 rounded-2xl border border-white/10">
          <div className="text-6xl mb-4">📖</div>
          <div className="text-2xl font-bold text-white mb-2">Таджвид</div>
          <div className="text-sm text-white/60 font-light">Версия 1.0.0</div>
        </div>

        <div className="space-y-3">
          <div
            className="w-full px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-sm font-medium text-white/80 hover:bg-white/20 transition-colors cursor-pointer text-center"
            onClick={() => console.log("Feedback")}
          >
            💬 Обратная связь
          </div>
          <div
            className="w-full px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-sm font-medium text-white/80 hover:bg-white/20 transition-colors cursor-pointer text-center"
            onClick={() => console.log("Privacy policy")}
          >
            🔒 Политика конфиденциальности
          </div>
          <div
            className="w-full px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-sm font-medium text-white/80 hover:bg-white/20 transition-colors cursor-pointer text-center"
            onClick={() => console.log("Licenses")}
          >
            📋 Лицензии
          </div>
        </div>

        <div className="text-center text-xs text-white/50 pt-6 border-t border-white/10 font-light leading-relaxed">
          <p className="mb-1">© 2024 Приложение для изучения таджвида</p>
          <p>Разработано с заботой о мусульманах</p>
        </div>
      </div>
    </div>
  );
}
