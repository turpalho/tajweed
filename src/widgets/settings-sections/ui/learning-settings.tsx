"use client";

import { BookOpen } from "lucide-react";
import { useI18n } from "@/shared/lib/i18n/context";

export function LearningSettings() {
  const { t } = useI18n();

  return (
    <div className="bg-secondary rounded-3xl p-8">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen size={24} color="#E0E0E0" />
        <h3 className="text-xl font-semibold text-[#E0E0E0]">
          {t("settings.learningSettings")}
        </h3>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-3">
            {t("settings.dailyGoal")}
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
              {t("settings.lessonNotifications")}
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
              {t("settings.dailyReminders")}
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-3">
            {t("settings.reminderTime")}
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
            {t("settings.resetProgress")}
          </div>
          <p className="text-xs text-white/50 text-center font-light">
            {t("settings.cannotUndo")}
          </p>
        </div>
      </div>
    </div>
  );
}
