"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Typewriter from "@/components/Typewriter";

const WORD = "Discobak".split("");

export default function Intro() {
  const router = useRouter();
  const [leaving, setLeaving] = useState(false);

  function abrir() {
    if (leaving) return;
    setLeaving(true);
    setTimeout(() => router.push("/home"), 750);
  }

  return (
    <main className="intro">
      <div className="intro-top">
        <Typewriter />
        <button className="btn-abrir" onClick={abrir}>
          abrir
        </button>
      </div>

      <h1 className="wordmark" aria-label="Discobak">
        {WORD.map((l, i) => (
          <span key={i} aria-hidden="true" style={{ animationDelay: `${i * 70}ms` }}>
            {l}
          </span>
        ))}
      </h1>

      <div className={`curtain ${leaving ? "curtain-on" : ""}`} />
    </main>
  );
}
