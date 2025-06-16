export interface LearningSettings {
    dailyGoal: number; // в минутах
    lessonNotifications: boolean;
    dailyReminders: boolean;
    reminderTime: string; // формат "HH:MM"
}

export interface LearningSettingsState {
    settings: LearningSettings;
    isLoaded: boolean;
}

export interface LearningSettingsActions {
    updateDailyGoal: (minutes: number) => void;
    toggleNotifications: () => void;
    toggleReminders: () => void;
    updateReminderTime: (time: string) => void;
    resetProgress: () => void;
} 