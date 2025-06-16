export interface AudioPlayerState {
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    volume: number;
    isMuted: boolean;
    isLoading: boolean;
    error: string | null;
}

export interface AudioPlayerControls {
    play: () => void;
    pause: () => void;
    stop: () => void;
    seek: (time: number) => void;
    setVolume: (volume: number) => void;
    toggleMute: () => void;
}

export interface AudioPlayerProps {
    src: string;
    autoPlay?: boolean;
    onEnded?: () => void;
    onError?: (error: string) => void;
}
