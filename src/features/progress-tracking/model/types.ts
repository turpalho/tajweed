export interface ProgressData {
    totalProgress: number;
    learnedLetters: number;
    completedLessons: number;
    readSurahs: number;
}

export interface DailyGoal {
    current: number;
    target: number;
    streak: number;
}
