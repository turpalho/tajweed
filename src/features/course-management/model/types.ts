import type { Course } from "@/entities/lesson";

export interface CourseWithProgress extends Course {
    completedLessons: number;
    progressPercentage: number;
}

export interface CourseManagementState {
    activeTab: "1" | "2";
    courses: CourseWithProgress[];
    activeCourse: CourseWithProgress | null;
    isLoading: boolean;
}

export interface CourseManagementActions {
    setActiveTab: (tab: "1" | "2") => void;
    loadCourses: () => Promise<void>;
}
