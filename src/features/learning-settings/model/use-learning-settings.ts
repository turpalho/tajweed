"use client";

import { useState, useEffect } from "react";
import type { LearningSettings, LearningSettingsState, LearningSettingsActions } from "./types";

const STORAGE_KEY = 'tajweed-learning-settings';

const DEFAULT_SETTINGS: LearningSettings = {
    dailyGoal: 30,
    lessonNotifications: true,
    dailyReminders: true,
    reminderTime: "20:00",
};

function getLearningSettings(): LearningSettings {
    if (typeof window === 'undefined') {
        return DEFAULT_SETTINGS;
    }

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            return { ...DEFAULT_SETTINGS, ...parsed };
        }
    } catch (error) {
        console.error('Error loading learning settings:', error);
    }

    return DEFAULT_SETTINGS;
}

function saveLearningSettings(settings: Partial<LearningSettings>): void {
    if (typeof window === 'undefined') {
        return;
    }

    try {
        const current = getLearningSettings();
        const updated = { ...current, ...settings };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
        console.error('Error saving learning settings:', error);
    }
}

export function useLearningSettings(): LearningSettingsState & LearningSettingsActions {
    const [settings, setSettings] = useState<LearningSettings>(DEFAULT_SETTINGS);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const loadedSettings = getLearningSettings();
        setSettings(loadedSettings);
        setIsLoaded(true);
    }, []);

    const updateDailyGoal = (minutes: number) => {
        const validMinutes = Math.max(5, Math.min(120, minutes));
        const newSettings = { ...settings, dailyGoal: validMinutes };
        setSettings(newSettings);
        saveLearningSettings({ dailyGoal: validMinutes });
    };

    const toggleNotifications = () => {
        const newSettings = { ...settings, lessonNotifications: !settings.lessonNotifications };
        setSettings(newSettings);
        saveLearningSettings({ lessonNotifications: newSettings.lessonNotifications });
    };

    const toggleReminders = () => {
        const newSettings = { ...settings, dailyReminders: !settings.dailyReminders };
        setSettings(newSettings);
        saveLearningSettings({ dailyReminders: newSettings.dailyReminders });
    };

    const updateReminderTime = (time: string) => {
        const newSettings = { ...settings, reminderTime: time };
        setSettings(newSettings);
        saveLearningSettings({ reminderTime: time });
    };

    const resetProgress = () => {
        // Здесь можно добавить логику сброса прогресса обучения
        console.log("Resetting learning progress...");
        // Можно вызвать API или очистить localStorage с прогрессом
    };

    return {
        settings,
        isLoaded,
        updateDailyGoal,
        toggleNotifications,
        toggleReminders,
        updateReminderTime,
        resetProgress,
    };
} 