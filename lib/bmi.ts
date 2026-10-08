export type BmiCategory = { label: string; tone: "low" | "ok" | "high" | "very-high"; note: string };

export const KG_PER_LB = 0.45359237;
export const CM_PER_IN = 2.54;

export function bmiValue(kg: number, cm: number): number {
  const m = cm / 100;
  return kg / (m * m);
}

export function bmiCategory(bmi: number): BmiCategory {
  if (bmi < 18.5) return { label: "Underweight", tone: "low", note: "Below the WHO healthy range for adults." };
  if (bmi < 25) return { label: "Healthy weight", tone: "ok", note: "Within the WHO healthy range for adults." };
  if (bmi < 30) return { label: "Overweight", tone: "high", note: "Above the WHO healthy range for adults." };
  return { label: "Obesity", tone: "very-high", note: "Well above the WHO healthy range for adults." };
}

export function healthyRangeKg(cm: number): [number, number] {
  const m2 = (cm / 100) ** 2;
  return [18.5 * m2, 24.9 * m2];
}
