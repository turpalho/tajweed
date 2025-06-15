import { LetterPage } from "@/views/alphabet";

interface LetterPageProps {
  params: Promise<{
    letterId: string;
  }>;
}

export default async function Letter({ params }: LetterPageProps) {
  const { letterId } = await params;
  return <LetterPage letterId={letterId} />;
}
