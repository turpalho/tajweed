import writingGroupsData from "@/shared/data/writing-groups.json";
import { WritingGroup } from "@/entities/writing";

export function useWritingData() {
    const writingGroups: WritingGroup[] = writingGroupsData;
    const totalPDFs = writingGroups.length;
    const totalVideos = writingGroups.length;

    return {
        writingGroups,
        totalPDFs,
        totalVideos,
    };
} 