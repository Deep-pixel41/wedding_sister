import { useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";
import { MUSIC_LABEL, MUSIC_URL } from "@/lib/music";

export default function MusicToggle() {
    const audioRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    if (!MUSIC_URL) return null;

    const toggle = () => {
        const a = audioRef.current;
        if (!a) return;
        if (playing) {
            a.pause();
            setPlaying(false);
        } else {
            a.play()
                .then(() => setPlaying(true))
                .catch(() => setPlaying(false));
        }
    };

    return (
        <>
            <audio ref={audioRef} src={MUSIC_URL} loop preload="none" />
            <button
                data-testid="ambient-music-toggle-button"
                onClick={toggle}
                aria-pressed={playing}
                aria-label={playing ? "Pause ambient music" : "Play ambient music"}
                title={MUSIC_LABEL}
                className="fixed bottom-5 right-5 z-50 flex h-12 items-center gap-2.5 rounded-full border border-goldline bg-ivory/90 px-4 shadow-gold backdrop-blur transition-transform duration-300 hover:scale-105 active:scale-95"
            >
                {playing ? (
                    <Music className="h-4 w-4 animate-pulse text-gold-deep" />
                ) : (
                    <VolumeX className="h-4 w-4 text-cocoa" />
                )}
                <span className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/75">
                    {playing ? "Playing" : "Music"}
                </span>
            </button>
        </>
    );
}
