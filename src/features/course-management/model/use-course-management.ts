"use client";

import { useState, useEffect } from "react";
import { Course, Lesson } from "@/entities/lesson";
import { getLearningProgress } from "@/shared/lib/learning-progress";
import lessonsData from "@/shared/data/lessons.json";
import type { CourseManagementState, CourseManagementActions, CourseWithProgress } from "./types";

const baseCourses: Course[] = [
    {
        id: "1",
        title: "lessons.basicTajweed",
        description: "lessons.basicTajweedDescription",
        lessons: lessonsData["1"] as unknown as Lesson[],
        totalDuration: lessonsData["1"].reduce((total, lesson) => total + lesson.duration, 0),
        completedLessons: 0,
    },
    {
        id: "2",
        title: "lessons.advancedRules",
        description: "lessons.advancedRulesDescription",
        lessons: lessonsData["2"] as unknown as Lesson[],
        totalDuration: lessonsData["2"].reduce((total, lesson) => total + lesson.duration, 0),
        completedLessons: 0,
    },
];

export function useCourseManagement(): CourseManagementState & CourseManagementActions {
    const [activeTab, setActiveTab] = useState<"1" | "2">("1");
    const [courses, setCourses] = useState<CourseWithProgress[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const loadCourses = async () => {
        setIsLoading(true);

        try {
            const progress = getLearningProgress();

            const coursesWithProgress = baseCourses.map((course) => {
                // Use progress data instead of individual checks
                const lessonsWithStatus = course.lessons.map((lesson) => ({
                    ...lesson,
                    status: progress.completedLessons.includes(lesson.id) ? ("completed" as const) : ("not_started" as const),
                }));

                const completedCount = lessonsWithStatus.filter(lesson => lesson.status === "completed").length;
                const progressPercentage = course.lessons.length > 0
                    ? Math.round((completedCount / course.lessons.length) * 100)
                    : 0;

                return {
                    ...course,
                    lessons: lessonsWithStatus,
                    completedLessons: completedCount,
                    progressPercentage,
                };
            });

            setCourses(coursesWithProgress);
        } catch (error) {
            console.error('Error loading courses:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadCourses();
    }, [activeTab]);

    const activeCourse = courses.find((course) => course.id === activeTab) || null;

    return {
        activeTab,
        courses,
        activeCourse,
        isLoading,
        setActiveTab,
        loadCourses,
    };
}
