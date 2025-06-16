import { useState, useEffect } from "react";
import writingGroupsData from "@/shared/data/writing-groups.json";
import { WritingGroup } from "@/entities/writing";

export function useWritingGroupData(groupId: string) {
    const [isDownloaded, setIsDownloaded] = useState(false);

    const writingGroups = writingGroupsData as WritingGroup[];
    const group = writingGroups.find((g) => g.id === groupId);

    // Находим предыдущую и следующую группы
    const currentIndex = writingGroups.findIndex((g) => g.id === groupId);
    const previousGroup = currentIndex > 0 ? writingGroups[currentIndex - 1] : null;
    const nextGroup = currentIndex < writingGroups.length - 1 ? writingGroups[currentIndex + 1] : null;

    // Загружаем состояние из localStorage при монтировании
    useEffect(() => {
        if (group) {
            setIsDownloaded(group.isDownloaded);
        }
    }, [group]);

    const handleDownloadPDF = () => {
        if (group) {
            window.open(group.pdfUrl, "_blank");
            setIsDownloaded(true);
        }
    };

    return {
        group,
        writingGroups,
        currentIndex,
        previousGroup,
        nextGroup,
        isDownloaded,
        handleDownloadPDF,
    };
} 