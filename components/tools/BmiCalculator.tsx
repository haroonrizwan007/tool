"use client";

import { useMemo, useState } from "react";
import { CM_PER_IN, KG_PER_LB, bmiCategory, bmiValue, healthyRangeKg } from "@/lib/bmi";

type Units = "metric" | "imperial";
const tone = { low: "bg-sky-500", ok: "bg-emerald-500", high: "bg-amber-500", "very-high": "bg-red-500" } as const;

export default function BmiCalculator() {
  const [units, setUnits] = useState<Units>("metric");
  const [cm, setCm] = useState("");
  const [kg, setKg] = useState("");
  const [ft, setFt] = useState("");
  const [inch, setInch] = useState("");
  const [lb, setLb] = useState("");

  const r = useMemo(() => {
    const height = units === "metric" ? Number(cm) : (Number(ft) * 12 + Number(inch || 0)) * CM_PER_IN;
    const weight = units === "metric" ? Number(kg) : Number(lb) * KG_PER_LB;
    const touched = units === "metric" ? cm || kg : ft || lb;
    if (!touched) return { state: "empty" as const };
    if (!(height >= 50 && height <= 272) || !(weight >= 10 && weight <= 500)) return { state: "invalid" as const };
    const bmi = bmiValue(weight, height);
    const [lo, hi] = healthyRangeKg(height);
    return { state: "ok" as const, bmi, cat: bmiCategory(bmi), lo, hi };
  }, [units, cm, kg, ft, inch, lb]);

  const pos = r.state === "ok" ? Math.min(100, Math.max(0, ((r.bmi - 12) / (40 - 12)) * 100)) : 0;

  return (
    <div>
      <div role="group" aria-label="Units" className="inline-flex rounded-xl border border-line p-1">
        {(["metric", "imperial"] as const).map((u) => (
          <button key={u} type="button" aria-pressed={units === u} onClick={() => setUnits(u)} className={`min-h-10 rounded-lg px-4 text-sm font-semibold capitalize ${units === u ? "bg-brand-600 text-white" : "text-muted"}`}>
            {u === "metric" ? "Metric (cm, kg)" : "Imperial (ft, lb)"}
          </button>
        ))}
      </div>

      {units === "metric" ? (
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div><label htmlFor="cm" className="label">Height (cm)</label><input id="cm" className="input" inputMode="decimal" value={cm} onChange={(e) => setCm(e.target.value)} placeholder="e.g. 170" /></div>
          <div><label htmlFor="kg" className="label">Weight (kg)</label><input id="kg" className="input" inputMode="decimal" value={kg} onChange={(e) => setKg(e.target.value)} placeholder="e.g. 65" /></div>
        </div>
      ) : (
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <div><label htmlFor="ft" className="label">Height (ft)</label><input id="ft" className="input" inputMode="numeric" value={ft} onChange={(e) => setFt(e.target.value)} placeholder="5" /></div>
          <div><label htmlFor="in" className="label">Height (in)</label><input id="in" className="input" inputMode="decimal" value={inch} onChange={(e) => setInch(e.target.value)} placeholder="7" /></div>
          <div><label htmlFor="lb" className="label">Weight (lb)</label><input id="lb" className="input" inputMode="decimal" value={lb} onChange={(e) => setLb(e.target.value)} placeholder="150" /></div>
        </div>
      )}

      <div className="mt-6" aria-live="polite">
        {r.state === "empty" && <p className="text-muted">Enter your height and weight to see your BMI.</p>}
        {r.state === "invalid" && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">Enter a realistic height and weight (height 50 to 272 cm, weight 10 to 500 kg).</p>}
        {r.state === "ok" && (
          <>
            <div className="rounded-2xl bg-surface p-6">
              <p className="text-sm text-muted">Your BMI</p>
              <p className="mt-1 text-5xl font-bold tabular-nums">{r.bmi.toFixed(1)}</p>
              <p className="mt-2 text-lg font-semibold">{r.cat.label}</p>
              <p className="text-sm text-muted">{r.cat.note}</p>
              <div className="relative mt-6 h-3 rounded-full" style={{ background: "linear-gradient(90deg,#0ea5e9 0%,#0ea5e9 23%,#10b981 23%,#10b981 46%,#f59e0b 46%,#f59e0b 64%,#ef4444 64%)" }} role="img" aria-label={`BMI ${r.bmi.toFixed(1)} on a scale from 12 to 40`}>
                <span className={`absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white shadow ${tone[r.cat.tone]}`} style={{ left: `${pos}%` }} />
              </div>
              <div className="mt-2 flex justify-between text-xs text-muted"><span>12</span><span>18.5</span><span>25</span><span>30</span><span>40</span></div>
            </div>
            <p className="mt-4 rounded-xl bg-brand-50 px-4 py-3 text-sm leading-6">
              Healthy weight range for your height: <strong>{units === "metric" ? `${r.lo.toFixed(1)} to ${r.hi.toFixed(1)} kg` : `${(r.lo / KG_PER_LB).toFixed(1)} to ${(r.hi / KG_PER_LB).toFixed(1)} lb`}</strong> (BMI 18.5 to 24.9).
            </p>
          </>
        )}
      </div>
      <p className="mt-4 text-xs leading-5 text-muted">BMI is a screening estimate for adults, not a diagnosis or medical advice. See a healthcare professional for guidance.</p>
    </div>
  );
}
