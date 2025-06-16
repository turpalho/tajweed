import { WritingGroupPage } from "@/views/writing";

interface WritingGroupPageProps {
  params: Promise<{
    groupId: string;
  }>;
}

export default async function WritingGroup({ params }: WritingGroupPageProps) {
  const { groupId } = await params;
  return <WritingGroupPage groupId={groupId} />;
}
