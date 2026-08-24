"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Operator = "+" | "-" | "×" | "÷" | null;

export default function Calculadora() {
  const [loading, setLoading] = useState(true);

  const [display, setDisplay] = useState("0");
  const [stored, setStored] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator>(null);
  const [waitingForNext, setWaitingForNext] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  function inputDigit(digit: string) {
    if (waitingForNext) {
      setDisplay(digit);
      setWaitingForNext(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  }

  function inputDot() {
    if (waitingForNext) {
      setDisplay("0.");
      setWaitingForNext(false);
      return;
    }
    if (!display.includes(".")) setDisplay(display + ".");
  }

  function clearAll() {
    setDisplay("0");
    setStored(null);
    setOperator(null);
    setWaitingForNext(false);
  }

  function compute(a: number, b: number, op: Operator) {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "×":
        return a * b;
      case "÷":
        return b === 0 ? NaN : a / b;
      default:
        return b;
    }
  }

  function handleOperator(nextOp: Operator) {
    const current = parseFloat(display);
    if (stored === null) {
      setStored(current);
    } else if (operator && !waitingForNext) {
      const result = compute(stored, current, operator);
      setStored(result);
      setDisplay(String(result));
    }
    setOperator(nextOp);
    setWaitingForNext(true);
  }

  function handleEquals() {
    if (operator === null || stored === null) return;
    const current = parseFloat(display);
    const result = compute(stored, current, operator);
    setDisplay(String(result));
    setStored(null);
    setOperator(null);
    setWaitingForNext(false);
  }

  if (loading) {
    return (
      <main className="tool-loading">
        <div className="tool-spinner" aria-hidden="true" />
        <p>carregando calculadora...</p>
      </main>
    );
  }

  return (
    <main className="tool-page">
      <Link href="/" className="back-button">
        ← Voltar
      </Link>

      <h1 className="tool-title">Calculadora</h1>

      <div className="calculator">
        <div className="calculator-display">{display}</div>
        <div className="calculator-grid">
          <button className="calc-btn calc-btn--muted" onClick={clearAll}>
            C
          </button>
          <button
            className="calc-btn calc-btn--muted"
            onClick={() => setDisplay(String(parseFloat(display) * -1))}
          >
            +/-
          </button>
          <button
            className="calc-btn calc-btn--muted"
            onClick={() => setDisplay(String(parseFloat(display) / 100))}
          >
            %
          </button>
          <button
            className="calc-btn calc-btn--op"
            onClick={() => handleOperator("÷")}
          >
            ÷
          </button>

          <button className="calc-btn" onClick={() => inputDigit("7")}>
            7
          </button>
          <button className="calc-btn" onClick={() => inputDigit("8")}>
            8
          </button>
          <button className="calc-btn" onClick={() => inputDigit("9")}>
            9
          </button>
          <button
            className="calc-btn calc-btn--op"
            onClick={() => handleOperator("×")}
          >
            ×
          </button>

          <button className="calc-btn" onClick={() => inputDigit("4")}>
            4
          </button>
          <button className="calc-btn" onClick={() => inputDigit("5")}>
            5
          </button>
          <button className="calc-btn" onClick={() => inputDigit("6")}>
            6
          </button>
          <button
            className="calc-btn calc-btn--op"
            onClick={() => handleOperator("-")}
          >
            −
          </button>

          <button className="calc-btn" onClick={() => inputDigit("1")}>
            1
          </button>
          <button className="calc-btn" onClick={() => inputDigit("2")}>
            2
          </button>
          <button className="calc-btn" onClick={() => inputDigit("3")}>
            3
          </button>
          <button
            className="calc-btn calc-btn--op"
            onClick={() => handleOperator("+")}
          >
            +
          </button>

          <button
            className="calc-btn calc-btn--wide"
            onClick={() => inputDigit("0")}
          >
            0
          </button>
          <button className="calc-btn" onClick={inputDot}>
            .
          </button>
          <button className="calc-btn calc-btn--equals" onClick={handleEquals}>
            =
          </button>
        </div>
      </div>
    </main>
  );
}
