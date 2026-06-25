export type MacroPlan = {
  protein: number;
  fat: number;
  carbs: number;
};

export type CaloriePlan = {
  bmr: number;
  calories: number;
  macros: MacroPlan;
  bmi: number;
  bmiLabel: string;
};

export function ageRangeToNumber(value?: string): number {
  if (value === '18-29') return 25;
  if (value === '30-39') return 35;
  if (value === '40-49') return 45;
  if (value === '50-59') return 55;
  if (value === '60-plus') return 62;
  return 35;
}

export function activityFactor(steps?: string, frequency?: string): number {
  if (steps === 'over-10000' || frequency === '4-5' || frequency === 'daily-training') return 1.5;
  if (steps === '6000-10000' || frequency === '3') return 1.4;
  if (steps === '3000-6000' || frequency === '1-2') return 1.32;
  return 1.22;
}

export function goalAdjustment(goal?: string): number {
  if (goal === 'lose-weight' || goal === 'belly') return 0.86;
  return 0.94;
}

export function calculateBmi(weightKg: number, heightCm: number): number {
  const heightM = heightCm / 100;
  return round(weightKg / (heightM * heightM), 1);
}

export function bmiLabel(bmi: number): string {
  if (bmi < 18.5) return 'ниже референсного диапазона';
  if (bmi < 25) return 'в референсном диапазоне';
  if (bmi < 30) return 'выше референсного диапазона';
  return 'существенно выше референсного диапазона';
}

export function calculateCalories(params: {
  age: number;
  heightCm: number;
  weightKg: number;
  goal?: string;
  steps?: string;
  frequency?: string;
}): CaloriePlan {
  const bmr = 10 * params.weightKg + 6.25 * params.heightCm - 5 * params.age - 161;
  const maintenance = bmr * activityFactor(params.steps, params.frequency);
  const bmi = calculateBmi(params.weightKg, params.heightCm);
  const adjustment = bmi < 18.5 ? 1 : goalAdjustment(params.goal);
  const calories = Math.max(1200, Math.round(maintenance * adjustment));
  const protein = Math.round(params.weightKg * 1.6);
  const fat = Math.round(params.weightKg * 0.85);
  const proteinCalories = protein * 4;
  const fatCalories = fat * 9;
  const carbs = Math.max(80, Math.round((calories - proteinCalories - fatCalories) / 4));

  return {
    bmr: Math.round(bmr),
    calories,
    macros: { protein, fat, carbs },
    bmi,
    bmiLabel: bmiLabel(bmi),
  };
}

function round(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}
