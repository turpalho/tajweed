"use client";

import { BookOpen } from "lucide-react";
import { useI18n } from "@/shared/lib/i18n/context";
import { useLearningSettings } from "@/features/learning-settings";

export function LearningSettingsWidget() {
  const { t } = useI18n();
  const {
    settings,
    isLoaded,
    updateDailyGoal,
    toggleNotifications,
    toggleReminders,
    updateReminderTime,
    resetProgress,
  } = useLearningSettings();

  if (!isLoaded) {
    return (
      <div className="bg-secondary rounded-3xl p-8">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen size={24} color="#E0E0E0" />
          <h3 className="text-xl font-semibold text-[#E0E0E0]">
            {t("settings.learningSettings")}
          </h3>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
        </div>
      </div>
    );
  }

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
          <label className="block text-sm font-medium text-[#E0E0E0]/80 mb-3">
            {t("settings.dailyGoal")}
          </label>
          <div className="bg-primary border border-[#E0E0E0]/20 rounded-2xl px-4 py-3">
            <input
              type="number"
              min="5"
              max="120"
              value={settings.dailyGoal}
              onChange={(e) => updateDailyGoal(parseInt(e.target.value) || 5)}
              className="bg-transparent text-[#E0E0E0] w-full outline-none text-sm font-medium placeholder-[#E0E0E0]/50"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-primary rounded-2xl border border-[#E0E0E0]/10">
            <input
              type="checkbox"
              id="notifications"
              checked={settings.lessonNotifications}
              onChange={toggleNotifications}
              className="w-4 h-4 rounded accent-orange-500"
            />
            <label
              htmlFor="notifications"
              className="text-sm text-[#E0E0E0]/80 font-light"
            >
              {t("settings.lessonNotifications")}
            </label>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-primary rounded-2xl border border-[#E0E0E0]/10">
            <input
              type="checkbox"
              id="reminders"
              checked={settings.dailyReminders}
              onChange={toggleReminders}
              className="w-4 h-4 rounded accent-orange-500"
            />
            <label
              htmlFor="reminders"
              className="text-sm text-[#E0E0E0]/80 font-light"
            >
              {t("settings.dailyReminders")}
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#E0E0E0]/80 mb-3">
            {t("settings.reminderTime")}
          </label>
          <div className="bg-primary border border-[#E0E0E0]/20 rounded-2xl px-4 py-3">
            <input
              type="time"
              value={settings.reminderTime}
              onChange={(e) => updateReminderTime(e.target.value)}
              className="bg-transparent text-[#E0E0E0] w-full outline-none text-sm font-medium"
            />
          </div>
        </div>

        <div className="pt-6 border-t border-[#E0E0E0]/10">
          <div
            className="w-full px-6 py-3 bg-primary border border-[#E0E0E0]/20 rounded-2xl text-sm font-medium text-[#E0E0E0]/80 hover:bg-[#E0E0E0]/20 transition-colors cursor-pointer text-center mb-3"
            onClick={resetProgress}
          >
            {t("settings.resetProgress")}
          </div>
          <p className="text-xs text-[#E0E0E0]/50 text-center font-light">
            {t("settings.cannotUndo")}
          </p>
        </div>
      </div>
    </div>
  );
}
