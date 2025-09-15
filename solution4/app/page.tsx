"use client";

import { useMemo, useState } from "react";
import { sum_to_n_a, sum_to_n_b, sum_to_n_c } from "./lib/sum";

export default function Page() {
  const [n, setN] = useState<number>(5);
  const [err, setErr] = useState<string>("");

  const results = useMemo(() => {
    try {
      setErr("");
      return {
        a: sum_to_n_a(n),
        b: sum_to_n_b(n),
        c: sum_to_n_c(n),
      };
    } catch (e: any) {
      setErr(e?.message ?? String(e));
      return { a: 0, b: 0, c: 0 };
    }
  }, [n]);

  return (
    <main style={{ maxWidth: 720, margin: "3rem auto", padding: "0 1rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 800 }}>Problem 4: Three ways to sum to n</h1>
      <p style={{ color: "#555", marginTop: 8 }}>
        Enter <code>n</code> (non-negative integer, result below <code>Number.MAX_SAFE_INTEGER</code>).
      </p>

      <label style={{ display: "block", marginTop: 16 }}>
        n:&nbsp;
        <input
          type="number"
          min={0}
          value={n}
          onChange={(e) => setN(Number(e.target.value))}
          style={{ border: "1px solid #ddd", borderRadius: 6, padding: "8px 12px", width: 160 }}
        />
      </label>

      {err ? (
        <p style={{ color: "crimson", marginTop: 12 }}>Error: {err}</p>
      ) : (
        <div
          style={{
            display: "grid",
            gap: 12,
            gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
            marginTop: 16,
          }}
        >
          <Card title="Iterative loop (O(n))" value={results.a} />
          <Card title="Gauss formula (O(1))" value={results.b} />
          <Card title="Divide & Conquer (O(n), depth O(log n))" value={results.c} />
        </div>
      )}

      <section style={{ marginTop: 24, color: "#444" }}>
        <h2 style={{ fontWeight: 700, fontSize: "1.1rem" }}>Complexity Notes</h2>
        <ul style={{ marginLeft: 18, lineHeight: 1.6 }}>
          <li><b>a.</b> loop — time <code>O(n)</code>, memory <code>O(1)</code>.</li>
          <li><b>b.</b> Gaussian — time <code>O(1)</code>, memory <code>O(1)</code>.</li>
          <li><b>c.</b> divide & conquer — sum <code>O(n)</code>, recursion depth <code>O(log n)</code>.</li>
        </ul>
      </section>
    </main>
  );
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16, boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
      <div style={{ fontSize: ".95rem", marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: "1.5rem", fontWeight: 800 }}>{value}</div>
    </div>
  );
}