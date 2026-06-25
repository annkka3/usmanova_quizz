import { programs, type Program } from '../data/programs';
import { ageRangeToNumber, calculateCalories, type CaloriePlan } from './calories';

export type Answers = Record<string, string | string[] | number | undefined>;

export type Result = {
  goalLabel: string;
  zoneLabels: string[];
  resultType: string;
  forecast: string;
  isLowBmi: boolean;
  calories: number;
  macros: CaloriePlan['macros'];
  bmi: number;
  bmiLabel: string;
  bmr: number;
  programs: Program[];
};

export const goalLabels: Record<string, string> = {
  'lose-weight': 'похудеть',
  belly: 'убрать живот',
  tone: 'подтянуть тело',
  energy: 'вернуть энергию и лёгкость',
  reflection: 'полюбить своё отражение',
};

export const zoneLabels: Record<string, string> = {
  'excess-weight': 'лишний вес',
  'belly-sides': 'живот и бока',
  'loose-body': 'ушла упругость, тело дряблое',
  cellulite: 'целлюлит',
  'low-energy': 'мало сил и энергии',
  'back-posture': 'спина и осанка',
};

export const answerLabels: Record<string, string> = {
  ...goalLabels,
  ...zoneLabels,
  '18-29': '18-29',
  '30-39': '30-39',
  '40-49': '40-49',
  '50-59': '50-59',
  '60-plus': '60 и старше',
  'now-better': 'Прямо сейчас, хочу лучше',
  'under-year': 'Меньше года назад',
  'one-two-years': '1-2 года назад',
  'over-three-years': 'Больше 3 лет назад',
  'long-ago': 'Давно, хочу это вернуть',
  'hard-to-lose': 'Набираю быстро, скидываю тяжело',
  'easy-up-down': 'Набираю и скидываю легко',
  stuck: 'Вес стоит, что бы я ни делала',
  'creeping-up': 'Постепенно ползёт вверх',
  'hard-breath': 'Задыхаюсь, тяжело',
  'slightly-tired': 'Немного устаю, но в норме',
  easy: 'Поднимаюсь легко',
  'under-3000': 'Меньше 3 тысяч',
  '3000-6000': '3-6 тысяч',
  '6000-10000': '6-10 тысяч',
  'over-10000': 'Больше 10 тысяч',
  'not-counting': 'Не считаю',
  daily: 'Почти каждый день',
  weekly: 'Пару раз в неделю',
  rarely: 'Редко',
  never: 'Почти никогда',
  exhausted: 'Падаю без сил',
  'home-sofa': 'Хватает только на дом и диван',
  'want-more': 'Нормально, но хочется больше',
  enough: 'Энергии достаточно',
  'under-15': 'До 15 минут',
  '15-30': '15-30 минут',
  '30-45': '30-45 минут',
  '45-plus': '45 минут и больше',
  '1-2': '1-2 раза',
  '3': '3 раза',
  '4-5': '4-5 раз',
  'daily-training': 'Каждый день',
  vacation: 'Отпуск или море',
  wedding: 'Свадьба или праздник',
  photoshoot: 'Встреча, фотосессия',
  faster: 'Просто хочу быстрее',
  'no-date': 'Конкретной даты нет',
};

export function getStringAnswer(answers: Answers, key: string): string | undefined {
  const value = answers[key];
  return typeof value === 'string' ? value : undefined;
}

export function getArrayAnswer(answers: Answers, key: string): string[] {
  const value = answers[key];
  return Array.isArray(value) ? value : [];
}

export function getNumberAnswer(answers: Answers, key: string): number {
  const value = answers[key];
  if (typeof value === 'number') return value;
  if (typeof value === 'string') return Number(value);
  return 0;
}

export function buildResult(answers: Answers): Result {
  const goal = getStringAnswer(answers, 'goal') ?? 'tone';
  const zones = getArrayAnswer(answers, 'problemZones');
  const height = getNumberAnswer(answers, 'height') || 168;
  const currentWeight = getNumberAnswer(answers, 'currentWeight') || 64;
  const age = ageRangeToNumber(getStringAnswer(answers, 'age'));

  const plan = calculateCalories({
    age,
    heightCm: height,
    weightKg: currentWeight,
    goal,
    steps: getStringAnswer(answers, 'steps'),
    frequency: getStringAnswer(answers, 'frequency'),
  });

  const selectedPrograms = selectPrograms(goal, zones);
  const isLowBmi = plan.bmi < 18.5;

  return {
    goalLabel: goalLabels[goal] ?? 'подтянуть тело',
    zoneLabels: zones.map((zone) => zoneLabels[zone] ?? zone),
    resultType: isLowBmi ? 'тонус, энергия и комфортная форма' : resultType(goal, zones),
    forecast: forecastText(goal, isLowBmi),
    isLowBmi,
    calories: plan.calories,
    macros: plan.macros,
    bmi: plan.bmi,
    bmiLabel: plan.bmiLabel,
    bmr: plan.bmr,
    programs: selectedPrograms,
  };
}

export function selectPrograms(goal: string, zones: string[]): Program[] {
  const scored = programs
    .map((program) => {
      const goalScore = program.goals.includes(goal) ? 3 : 0;
      const zoneScore = zones.filter((zone) => program.zones.includes(zone)).length;
      return { program, score: goalScore + zoneScore };
    })
    .sort((a, b) => b.score - a.score);

  const best = scored.filter((item) => item.score > 0).map((item) => item.program);
  return (best.length ? best : programs).slice(0, 3);
}

function resultType(goal: string, zones: string[]): string {
  if (zones.includes('cellulite') || zones.includes('loose-body')) return 'тонус тела и упругость';
  if (goal === 'belly' || zones.includes('belly-sides')) return 'живот, бока и глубокий пресс';
  if (goal === 'lose-weight') return 'стройность и снижение веса';
  if (goal === 'energy' || zones.includes('low-energy')) return 'энергия, лёгкость и регулярность';
  if (goal === 'reflection') return 'уверенность в отражении и тонус';
  return 'общий тонус и регулярность';
}

function forecastText(goal: string, isLowBmi = false): string {
  if (isLowBmi) {
    return 'По вашим данным лучше сделать фокус не на цифре на весах, а на тонусе, энергии и комфортной форме. План можно начать мягко: короткие тренировки, питание без жёстких запретов и постепенная регулярность.';
  }

  if (goal === 'lose-weight') {
    return 'Мягкий дефицит, регулярные тренировки и питание без жёстких запретов помогут постепенно снижать вес и сохранять энергию.';
  }
  if (goal === 'belly') {
    return 'Фокус на глубокие мышцы пресса, осанку и питание поможет сделать линию живота более подтянутой.';
  }
  if (goal === 'energy') {
    return 'Короткие посильные тренировки и понятное питание помогут возвращать лёгкость без перегруза.';
  }
  return 'Главная задача на старте, выстроить понятный режим, который реально повторять каждую неделю.';
}
