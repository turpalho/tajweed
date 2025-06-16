import { useState, useEffect } from "react";
import { isSurahRead, markSurahAsRead, unmarkSurahAsRead } from "@/shared/lib/learning-progress";

export function useSurahReadingStatus(surahId: number | undefined) {
    const [isRead, setIsRead] = useState(false);

    // Загружаем состояние из localStorage при монтировании
    useEffect(() => {
        if (surahId !== undefined) {
            setIsRead(isSurahRead(surahId));
        }
    }, [surahId]);

    const toggleReadStatus = () => {
        if (surahId === undefined) return;

        const newIsRead = !isRead;
        setIsRead(newIsRead);

        if (newIsRead) {
            markSurahAsRead(surahId);
        } else {
            unmarkSurahAsRead(surahId);
        }
    };

    return {
        isRead,
        toggleReadStatus,
    };
} 