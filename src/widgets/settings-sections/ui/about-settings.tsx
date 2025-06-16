"use client";

import { BookOpen, Info, MessageCircle, User, Send } from "lucide-react";
import { useI18n } from "@/shared/lib/i18n/context";

export function AboutSettings() {
  const { t } = useI18n();

  const handleFeedbackClick = () => {
    window.open("https://t.me/sahlan_admin", "_blank");
  };

  const handleTelegramClick = () => {
    window.open("https://t.me/turpal_shams", "_blank");
  };

  const handleInstagramClick = () => {
    window.open("https://instagram.com/turpal_shams", "_blank");
  };

  return (
    <div className="bg-secondary rounded-3xl p-8">
      <div className="flex items-center gap-2 mb-6">
        <Info size={24} color="#E0E0E0" />
        <h3 className="text-xl font-semibold text-[#E0E0E0]">
          {t("settings.about")}
        </h3>
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-center flex flex-col items-center justify-center mb-8 p-6 bg-primary rounded-2xl border border-[#E0E0E0]/10">
          <div className="text-6xl mb-4">
            <BookOpen size={68} color="#E0E0E0" />
          </div>
          <div className="text-2xl font-bold text-[#E0E0E0] mb-2">
            {t("settings.appName")}
          </div>
          <div className="text-sm text-[#E0E0E0]/60 font-light">
            {t("settings.version")} 1.0.0
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary border border-[#E0E0E0]/20 rounded-2xl text-sm font-medium text-[#E0E0E0]/80 hover:bg-[#E0E0E0]/20 transition-colors cursor-pointer text-center"
            onClick={handleFeedbackClick}
          >
            <MessageCircle size={16} color="#E0E0E0" />
            {t("settings.feedback")}
          </div>

          {/* Developer Section */}
          <div className="bg-primary border border-[#E0E0E0]/10 rounded-2xl p-4 mt-4">
            <div className="flex items-center gap-2 mb-3">
              <User size={20} color="#E0E0E0" />
              <h4 className="text-lg font-semibold text-[#E0E0E0]">
                {t("settings.developer")}
              </h4>
            </div>

            <div className="flex flex-col gap-2">
              <div
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-secondary border border-[#E0E0E0]/20 rounded-xl text-sm font-medium text-[#E0E0E0]/80 hover:bg-[#E0E0E0]/20 transition-colors cursor-pointer text-center"
                onClick={handleTelegramClick}
              >
                <Send size={14} color="#E0E0E0" />
                {t("settings.telegramChannel")}: @turpal_shams
              </div>
              <div
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-secondary border border-[#E0E0E0]/20 rounded-xl text-sm font-medium text-[#E0E0E0]/80 hover:bg-[#E0E0E0]/20 transition-colors cursor-pointer text-center"
                onClick={handleInstagramClick}
              >
                <MessageCircle size={14} color="#E0E0E0" />
                {t("settings.instagramProfile")}: @turpal_shams
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-[#E0E0E0]/50 pt-6 border-t border-[#E0E0E0]/10 font-light leading-relaxed">
          <p className="mb-1">{t("settings.copyright")}</p>
          <p>{t("settings.developedWith")}</p>
        </div>
      </div>
    </div>
  );
}
