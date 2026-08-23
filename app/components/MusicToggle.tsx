"use client";

import { useEffect, useRef, useState } from "react";

export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // tenta tocar assim que a página carrega
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => {
        // navegador bloqueou autoplay com som — espera o primeiro
        // clique/toque em qualquer lugar da página pra iniciar sozinho
        const startOnFirstInteraction = () => {
          audio
            .play()
            .then(() => setPlaying(true))
            .catch(() => {});
        };
        document.addEventListener("click", startOnFirstInteraction, {
          once: true,
        });
        document.addEventListener("keydown", startOnFirstInteraction, {
          once: true,
        });
        return () => {
          document.removeEventListener("click", startOnFirstInteraction);
          document.removeEventListener("keydown", startOnFirstInteraction);
        };
      });
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true));
    }
  }

  return (
    <>
      <audio ref={audioRef} src="/bg-music.mp3" loop preload="auto" />
      <button
        type="button"
        onClick={toggle}
        className="music-toggle"
        aria-pressed={playing}
        aria-label={playing ? "Desligar música" : "Ligar música"}
      >
        {playing ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M9 18V5l11-2v13"
              stroke="#2B120A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="6" cy="18" r="3" fill="#2B120A" />
            <circle cx="17" cy="16" r="3" fill="#2B120A" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M9 18V5l11-2v13"
              stroke="#2B120A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.55"
            />
            <circle cx="6" cy="18" r="3" fill="#2B120A" opacity="0.55" />
            <circle cx="17" cy="16" r="3" fill="#2B120A" opacity="0.55" />
            <line
              x1="3"
              y1="3"
              x2="21"
              y2="21"
              stroke="#2B120A"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>
    </>
  );
}
