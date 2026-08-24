"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { decodeWithKey, encodeWithKey } from "../lib/vigenere";

export default function Cifra() {
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [key, setKey] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  function handleEncode() {
    setResult(encodeWithKey(text, key || "A"));
  }

  function handleDecode() {
    setResult(decodeWithKey(text, key || "A"));
  }

  if (loading) {
    return (
      <main className="tool-loading">
        <div className="tool-spinner" aria-hidden="true" />
        <p>carregando cifra...</p>
      </main>
    );
  }

  return (
    <main className="tool-page">
      <Link href="/" className="back-button">
        ← Voltar
      </Link>

      <h1 className="tool-title">Cifra de Texto</h1>

      <div className="translator-card">
        <label className="translator-label" htmlFor="cifra-text">
          Texto
        </label>
        <textarea
          id="cifra-text"
          className="translator-area"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escreva algo aqui..."
          rows={3}
        />

        <label className="translator-label" htmlFor="cifra-key">
          Chave
        </label>
        <input
          id="cifra-key"
          className="translator-input"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="ex: NOTE"
        />

        <div className="translator-actions">
          <button className="calc-btn calc-btn--op" onClick={handleEncode}>
            Codificar
          </button>
          <button className="calc-btn calc-btn--op" onClick={handleDecode}>
            Decodificar
          </button>
        </div>

        <label className="translator-label" htmlFor="cifra-result">
          Resultado
        </label>
        <textarea
          id="cifra-result"
          className="translator-area translator-area--mono"
          value={result}
          readOnly
          rows={3}
        />
      </div>
    </main>
  );
}
