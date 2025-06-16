import { useState } from "react";
import { WritingGroup } from "@/entities/writing";

export function useWritingDownloads() {
    const [isDownloading, setIsDownloading] = useState(false);

    const downloadAllPDFs = async (writingGroups: WritingGroup[]) => {
        setIsDownloading(true);
        try {
            for (const group of writingGroups) {
                const link = document.createElement("a");
                link.href = group.pdfUrl;
                link.download = `group-${group.id}-writing.pdf`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                // Небольшая задержка между скачиваниями для избежания блокировки браузером
                await new Promise((resolve) => setTimeout(resolve, 300));
            }
        } catch (error) {
            console.error("Ошибка при скачивании файлов:", error);
        } finally {
            setIsDownloading(false);
        }
    };

    return {
        isDownloading,
        downloadAllPDFs,
    };
} 