export interface LearningProgress {
    // Прогресс сур
    readSurahs: number[]; // ID прочитанных сур

    // Прогресс букв
    learnedLetters: string[]; // ID изученных букв

    // Прогресс уроков
    completedLessons: string[]; // ID завершенных уроков

    // Ежедневная статистика
    dailyStats: {
        [date: string]: {
            studyTime: number; // в минутах
            activities: string[]; // виды активности в этот день
        };
    };

    // Настройки целей
    dailyGoal: number; // цель в минутах

    // Общая статистика
    lastUpdated: string;
}

const STORAGE_KEY = 'tajweed-learning-progress';

const DEFAULT_PROGRESS: LearningProgress = {
    readSurahs: [],
    learnedLetters: [],
    completedLessons: [],
    dailyStats: {},
    dailyGoal: 30, // 30 минут по умолчанию
    lastUpdated: new Date().toISOString(),
};

export function getLearningProgress(): LearningProgress {
    if (typeof window === 'undefined') {
        return DEFAULT_PROGRESS;
    }

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            return { ...DEFAULT_PROGRESS, ...parsed };
        }
    } catch (error) {
        console.error('Error loading learning progress:', error);
    }

    return DEFAULT_PROGRESS;
}

export function saveLearningProgress(progress: Partial<LearningProgress>): void {
    if (typeof window === 'undefined') {
        return;
    }

    try {
        const current = getLearningProgress();
        const updated = {
            ...current,
            ...progress,
            lastUpdated: new Date().toISOString()
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
        console.error('Error saving learning progress:', error);
    }
}

// Функции для работы с сурами
export function markSurahAsRead(surahId: number): void {
    const progress = getLearningProgress();
    if (!progress.readSurahs.includes(surahId)) {
        saveLearningProgress({
            readSurahs: [...progress.readSurahs, surahId],
        });
    }
}

export function unmarkSurahAsRead(surahId: number): void {
    const progress = getLearningProgress();
    saveLearningProgress({
        readSurahs: progress.readSurahs.filter(id => id !== surahId),
    });
}

export function isSurahRead(surahId: number): boolean {
    const progress = getLearningProgress();
    return progress.readSurahs.includes(surahId);
}

// Функции для работы с буквами
export function markLetterAsLearned(letterId: string): void {
    const progress = getLearningProgress();
    if (!progress.learnedLetters.includes(letterId)) {
        saveLearningProgress({
            learnedLetters: [...progress.learnedLetters, letterId],
        });
    }
}

export function unmarkLetterAsLearned(letterId: string): void {
    const progress = getLearningProgress();
    saveLearningProgress({
        learnedLetters: progress.learnedLetters.filter(id => id !== letterId),
    });
}

export function isLetterLearned(letterId: string): boolean {
    const progress = getLearningProgress();
    return progress.learnedLetters.includes(letterId);
}

// Функции для работы с уроками
export function markLessonAsCompleted(lessonId: string): void {
    const progress = getLearningProgress();
    if (!progress.completedLessons.includes(lessonId)) {
        saveLearningProgress({
            completedLessons: [...progress.completedLessons, lessonId],
        });
    }
}

export function unmarkLessonAsCompleted(lessonId: string): void {
    const progress = getLearningProgress();
    saveLearningProgress({
        completedLessons: progress.completedLessons.filter(id => id !== lessonId),
    });
}

export function isLessonCompleted(lessonId: string): boolean {
    const progress = getLearningProgress();
    return progress.completedLessons.includes(lessonId);
}

// Функция для получения общей статистики
export function getProgressStats() {
    const progress = getLearningProgress();
    return {
        readSurahsCount: progress.readSurahs.length,
        learnedLettersCount: progress.learnedLetters.length,
        completedLessonsCount: progress.completedLessons.length,
        totalProgress: 0, // Вычислим позже на основе общего количества
    };
}

// Функция для сброса прогресса
export function resetProgress(): void {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
    }
}

// Функции для работы с ежедневной статистикой
export function getTodayDateKey(): string {
    return new Date().toISOString().split('T')[0];
}

export function addStudyTime(minutes: number, activity: string): void {
    const progress = getLearningProgress();
    const today = getTodayDateKey();

    const currentDayStats = progress.dailyStats[today] || { studyTime: 0, activities: [] };

    saveLearningProgress({
        dailyStats: {
            ...progress.dailyStats,
            [today]: {
                studyTime: currentDayStats.studyTime + minutes,
                activities: currentDayStats.activities.includes(activity)
                    ? currentDayStats.activities
                    : [...currentDayStats.activities, activity]
            }
        }
    });
}

export function getTodayStudyTime(): number {
    const progress = getLearningProgress();
    const today = getTodayDateKey();
    return progress.dailyStats[today]?.studyTime || 0;
}

export function getDailyGoal(): number {
    const progress = getLearningProgress();
    return progress.dailyGoal;
}

export function setDailyGoal(minutes: number): void {
    saveLearningProgress({ dailyGoal: minutes });
}

export function getStudyStreak(): number {
    const progress = getLearningProgress();
    const dates = Object.keys(progress.dailyStats).sort().reverse();

    let streak = 0;
    let currentDate = new Date();

    for (let i = 0; i < dates.length; i++) {
        const dateKey = currentDate.toISOString().split('T')[0];

        if (dates.includes(dateKey) && progress.dailyStats[dateKey].studyTime > 0) {
            streak++;
            currentDate = new Date(currentDate);
            currentDate.setDate(currentDate.getDate() - 1);
        } else if (i === 0 && dateKey !== getTodayDateKey()) {
            // Если сегодня еще не занимались, начинаем с вчера
            currentDate = new Date(currentDate);
            currentDate.setDate(currentDate.getDate() - 1);
            continue;
        } else {
            break;
        }
    }

    return streak;
}

export function getDailyStats() {
    return {
        current: getTodayStudyTime(),
        target: getDailyGoal(),
        streak: getStudyStreak(),
    };
} 