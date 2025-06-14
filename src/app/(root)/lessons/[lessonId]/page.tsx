import { LessonPage } from "@/views/lessons";

interface LessonPageProps {
  params: Promise<{
    lessonId: string;
  }>;
}

export default async function Lesson({ params }: LessonPageProps) {
  const { lessonId } = await params;
  return <LessonPage lessonId={lessonId} />;
}
