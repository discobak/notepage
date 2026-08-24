"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { morseToText, textToMorse } from "../lib/morse";

export default function Morse() {
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [morse, setMorse] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  function handleEncode() {
    setMorse(textToMorse(text));
  }

  function handleDecode() {
    setText(morseToText(morse));
  }

  if (loading) {
    return (
      <main className="tool-loading">
        <div className="tool-spinner" aria-hidden="true" />
        <p>carregando tradutor morse...</p>
      </main>
    );
  }

  return (
    <main className="tool-page">
      <Link href="/" className="back-button">
        ← Voltar
      </Link>

      <h1 className="tool-title">Tradutor Morse</h1>

      <div className="translator-card">
        <label className="translator-label" htmlFor="text-field">
          Texto
        </label>
        <textarea
          id="text-field"
          className="translator-area"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escreva algo aqui..."
          rows={3}
        />

        <div className="translator-actions">
          <button className="calc-btn calc-btn--op" onClick={handleEncode}>
            Texto → Morse
          </button>
          <button className="calc-btn calc-btn--op" onClick={handleDecode}>
            Morse → Texto
          </button>
        </div>

        <label className="translator-label" htmlFor="morse-field">
          Morse
        </label>
        <textarea
          id="morse-field"
          className="translator-area translator-area--mono"
          value={morse}
          onChange={(e) => setMorse(e.target.value)}
          placeholder=".... . .-.. .-.. ---"
          rows={3}
        />
      </div>
    </main>
  );
}
