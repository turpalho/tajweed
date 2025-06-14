"use client";

import { BookOpen, Info, MessageCircle, Lock, File } from "lucide-react";

export function AboutSettings() {
  return (
    <div className="bg-secondary rounded-3xl p-8">
      <div className="flex items-center gap-2 mb-6">
        <Info size={24} color="#E0E0E0" />
        <h3 className="text-xl font-semibold text-[#E0E0E0]">О приложении</h3>
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-center flex flex-col items-center justify-center mb-8 p-6 bg-primary rounded-2xl border border-[#E0E0E0]/10">
          <div className="text-6xl mb-4">
            <BookOpen size={68} color="#E0E0E0" />
          </div>
          <div className="text-2xl font-bold text-[#E0E0E0] mb-2">Таджвид</div>
          <div className="text-sm text-[#E0E0E0]/60 font-light">
            Версия 1.0.0
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary border border-[#E0E0E0]/20 rounded-2xl text-sm font-medium text-[#E0E0E0]/80 hover:bg-[#E0E0E0]/20 transition-colors cursor-pointer text-center"
            onClick={() => console.log("Feedback")}
          >
            <MessageCircle size={16} color="#E0E0E0" />
            Обратная связь
          </div>
          <div
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary border border-[#E0E0E0]/20 rounded-2xl text-sm font-medium text-[#E0E0E0]/80 hover:bg-[#E0E0E0]/20 transition-colors cursor-pointer text-center"
            onClick={() => console.log("Privacy policy")}
          >
            <Lock size={16} color="#E0E0E0" />
            Политика конфиденциальности
          </div>
          <div
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary border border-[#E0E0E0]/20 rounded-2xl text-sm font-medium text-[#E0E0E0]/80 hover:bg-[#E0E0E0]/20 transition-colors cursor-pointer text-center"
            onClick={() => console.log("Licenses")}
          >
            <File size={16} color="#E0E0E0" />
            Лицензии
          </div>
        </div>

        <div className="text-center text-xs text-[#E0E0E0]/50 pt-6 border-t border-[#E0E0E0]/10 font-light leading-relaxed">
          <p className="mb-1">© 2024 Приложение для изучения таджвида</p>
          <p>Разработано с заботой о мусульманах</p>
        </div>
      </div>
    </div>
  );
}
