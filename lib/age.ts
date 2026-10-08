export type AgeResult = {
  years: number;
  months: number;
  days: number;
  totalMonths: number;
  totalWeeks: number;
  totalDays: number;
  totalHours: number;
  nextBirthday: Date;
  daysToBirthday: number;
  bornWeekday: string;
};

export function parseISODate(value: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return d.getFullYear() === Number(m[1]) && d.getMonth() === Number(m[2]) - 1 ? d : null;
}

const daysInMonth = (y: number, m0: number) => new Date(y, m0 + 1, 0).getDate();
const utcDay = (d: Date) => Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());

export function calculateAge(birth: Date, on: Date): AgeResult | null {
  if (utcDay(birth) > utcDay(on)) return null;

  // Anniversary after n months; the day is clamped to the end of shorter months
  // (31 Jan + 1 month = 28/29 Feb, and a 29 Feb birthday falls on 28 Feb in common years).
  const anniversary = (n: number) => {
    const total = birth.getMonth() + n;
    const y = birth.getFullYear() + Math.floor(total / 12);
    const m = ((total % 12) + 12) % 12;
    return new Date(y, m, Math.min(birth.getDate(), daysInMonth(y, m)));
  };

  let wholeMonths = (on.getFullYear() - birth.getFullYear()) * 12 + (on.getMonth() - birth.getMonth());
  if (utcDay(anniversary(wholeMonths)) > utcDay(on)) wholeMonths -= 1;

  const years = Math.floor(wholeMonths / 12);
  const months = wholeMonths % 12;
  const days = Math.round((utcDay(on) - utcDay(anniversary(wholeMonths))) / 86400000);
  const totalDays = Math.round((utcDay(on) - utcDay(birth)) / 86400000);

  // Next birthday: the first whole-year anniversary that is today or later
  let next = anniversary(years * 12);
  if (utcDay(next) < utcDay(on)) next = anniversary((years + 1) * 12);
  const daysToBirthday = Math.round((utcDay(next) - utcDay(on)) / 86400000);

  return {
    years,
    months,
    days,
    totalMonths: wholeMonths,
    totalWeeks: Math.floor(totalDays / 7),
    totalDays,
    totalHours: totalDays * 24,
    nextBirthday: next,
    daysToBirthday,
    bornWeekday: birth.toLocaleDateString("en-US", { weekday: "long" }),
  };
}
