export interface LetterLearningState {
    isLearned: boolean;
    isPlaying: boolean;
}

export interface LetterLearningActions {
    toggleLearned: () => void;
    playAudio: () => void;
    stopAudio: () => void;
}
