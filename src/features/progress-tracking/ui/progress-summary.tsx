"use client";

import { LearningProgress } from "@/widgets/learning-progress";
import { useProgressStats } from "../model/use-progress-stats";

export function ProgressSummary() {
  const progressData = useProgressStats();

  return <LearningProgress {...progressData} />;
}
