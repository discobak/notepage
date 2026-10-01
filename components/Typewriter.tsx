"use client";

import { useEffect, useState } from "react";

const PHRASES = [
  "Descubra o que podemos fazer.",
  "Desperte a curiosidade.",
  "Acima de todo o conhecimento.",
];

const TYPE_MS = 65;
const DELETE_MS = 32;
const HOLD_MS = 1800;
const PAUSE_MS = 350;

export default function Typewriter() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = PHRASES[index];
    let delay = deleting ? DELETE_MS : TYPE_MS;

    if (!deleting && text === full) delay = HOLD_MS;
    if (deleting && text === "") delay = PAUSE_MS;

    const t = setTimeout(() => {
      if (!deleting && text === full) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % PHRASES.length);
      } else {
        setText(
          deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1)
        );
      }
    }, delay);

    return () => clearTimeout(t);
  }, [text, deleting, index]);

  return (
    <p className="typewriter">
      <span className="sr-only">{PHRASES.join(" ")}</span>
      <span aria-hidden="true">
        {text}
        <span className="caret" />
      </span>
    </p>
  );
}
