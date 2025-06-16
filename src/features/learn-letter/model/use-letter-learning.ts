"use client";

import { useState, useEffect, useRef } from "react";
import { isLetterLearned, markLetterAsLearned, unmarkLetterAsLearned } from "@/shared/lib/learning-progress";
import type { LetterLearningState, LetterLearningActions } from "./types";

export function useLetterLearning(letterId: string, audioUrl?: string): LetterLearningState & LetterLearningActions {
    const [isLearned, setIsLearned] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio();
        }
    }, []);

    useEffect(() => {
        setIsLearned(isLetterLearned(letterId));
    }, [letterId]);

    const toggleLearned = () => {
        const newIsLearned = !isLearned;
        setIsLearned(newIsLearned);

        if (newIsLearned) {
            markLetterAsLearned(letterId);
        } else {
            unmarkLetterAsLearned(letterId);
        }
    };

    const playAudio = () => {
        if (audioRef.current && audioUrl) {
            audioRef.current.src = audioUrl;
            audioRef.current.play()
                .then(() => setIsPlaying(true))
                .catch(console.error);
        }
    };

    const stopAudio = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleEnded = () => setIsPlaying(false);
        audio.addEventListener('ended', handleEnded);

        return () => audio.removeEventListener('ended', handleEnded);
    }, []);

    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    return {
        isLearned,
        isPlaying,
        toggleLearned,
        playAudio,
        stopAudio,
    };
}
