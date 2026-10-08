"use client";

import { useMemo, useState } from "react";
import { calculateAge, parseISODate } from "@/lib/age";
import { Stat } from "./shared";

function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function AgeCalculator() {
  const [dob, setDob] = useState("");
  const [on, setOn] = useState("");
  const today = todayISO();

  const result = useMemo(() => {
    const b = parseISODate(dob);
    const t = parseISODate(on || todayISO());
    if (!b || !t) return null;
    return { age: calculateAge(b, t), invalid: false };
  }, [dob, on]);

  const fmt = (d: Date) => d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const age = result?.age;

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="dob" className="label">Date of birth</label>
          <input id="dob" type="date" className="input" value={dob} max={today} onChange={(e) => setDob(e.target.value)} />
        </div>
        <div>
          <label htmlFor="on" className="label">Age at date (default: today)</label>
          <input id="on" type="date" className="input" value={on} placeholder={today} onChange={(e) => setOn(e.target.value)} />
        </div>
      </div>

      <div className="mt-6" aria-live="polite">
        {!dob && <p className="text-muted">Choose a date of birth to see the exact age.</p>}
        {dob && result && !age && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">The date of birth must be before the second date.</p>}
        {age && (
          <>
            <div className="rounded-2xl bg-brand-600 p-6 text-white">
              <p className="text-sm text-white/80">Exact age</p>
              <p className="mt-1 text-3xl font-bold leading-tight sm:text-4xl">
                {age.years} years, {age.months} months, {age.days} days
              </p>
              <p className="mt-3 text-sm text-white/80">Born on a {age.bornWeekday}.</p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
              <Stat label="Total months" value={age.totalMonths.toLocaleString()} />
              <Stat label="Total weeks" value={age.totalWeeks.toLocaleString()} />
              <Stat label="Total days" value={age.totalDays.toLocaleString()} />
              <Stat label="Total hours" value={age.totalHours.toLocaleString()} />
            </div>
            <p className="mt-4 rounded-xl bg-surface px-4 py-3">
              {age.daysToBirthday === 0
                ? "Today is the birthday. Happy birthday!"
                : `Next birthday: ${fmt(age.nextBirthday)}, in ${age.daysToBirthday.toLocaleString()} ${age.daysToBirthday === 1 ? "day" : "days"}.`}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
