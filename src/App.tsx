import { useCallback, useMemo, useState } from 'react';
import { LoaderScreen } from './components/LoaderScreen';
import { LeadGate } from './components/LeadGate';
import { PaywallScreen } from './components/PaywallScreen';
import { QuestionScreen } from './components/QuestionScreen';
import { QuizLayout } from './components/QuizLayout';
import { ResultScreen } from './components/ResultScreen';
import { TransitionScreen } from './components/TransitionScreen';
import { quizScreens } from './data/quizScreens';
import { buildResult, getArrayAnswer, getNumberAnswer, getStringAnswer, type Answers } from './logic/resultLogic';
import { readUtm } from './logic/utm';

const STORAGE_KEY = 'usmanova_quiz_leads';

type Lead = {
  name: string;
  email: string;
  consentAccepted: boolean;
};

type StoredLead = {
  name: string;
  email: string;
  answers: Answers;
  height: number;
  currentWeight: number;
  targetWeight: number;
  goal: string;
  problemZones: string[];
  resultType: string;
  calories: number;
  macros: ReturnType<typeof buildResult>['macros'];
  bmi: number;
  utm: Record<string, string>;
  consentAccepted: boolean;
  createdAt: string;
};

function App() {
  const [screenIndex, setScreenIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [lead, setLead] = useState<Lead | null>(null);
  const [utm] = useState(() => readUtm());

  const currentScreen = quizScreens[screenIndex];
  const progress = Math.round(((screenIndex + 1) / quizScreens.length) * 100);
  const result = useMemo(() => buildResult(answers), [answers]);

  const goNext = useCallback(() => {
    setScreenIndex((current) => Math.min(current + 1, quizScreens.length - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goBack = useCallback(() => {
    setScreenIndex((current) => Math.max(current - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const updateAnswer = useCallback(
    (key: string, value: string | string[] | number | undefined) => {
      setAnswers((current) => ({ ...current, [key]: value }));
    },
    [],
  );

  function saveLead(nextLead: Lead) {
    const nextResult = buildResult(answers);
    const record: StoredLead = {
      name: nextLead.name,
      email: nextLead.email,
      answers,
      height: getNumberAnswer(answers, 'height'),
      currentWeight: getNumberAnswer(answers, 'currentWeight'),
      targetWeight: getNumberAnswer(answers, 'targetWeight'),
      goal: getStringAnswer(answers, 'goal') ?? '',
      problemZones: getArrayAnswer(answers, 'problemZones'),
      resultType: nextResult.resultType,
      calories: nextResult.calories,
      macros: nextResult.macros,
      bmi: nextResult.bmi,
      utm,
      consentAccepted: nextLead.consentAccepted,
      createdAt: new Date().toISOString(),
    };

    const currentStorage = window.localStorage.getItem(STORAGE_KEY);
    const currentLeads = currentStorage ? (JSON.parse(currentStorage) as StoredLead[]) : [];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...currentLeads, record]));
    setLead(nextLead);
    goNext();
  }

  function renderScreen() {
    if (currentScreen.type === 'question') {
      return (
        <QuestionScreen
          screen={currentScreen}
          value={answers[currentScreen.answerKey]}
          onChange={(value) => updateAnswer(currentScreen.answerKey, value)}
          onNext={goNext}
        />
      );
    }

    if (currentScreen.type === 'transition') {
      return <TransitionScreen screen={currentScreen} onNext={goNext} />;
    }

    if (currentScreen.type === 'loader') {
      return <LoaderScreen screen={currentScreen} onDone={goNext} goalLabel={result.goalLabel} />;
    }

    if (currentScreen.type === 'lead') {
      return <LeadGate onSubmit={saveLead} />;
    }

    if (currentScreen.type === 'result') {
      return (
        <ResultScreen
          name={lead?.name ?? 'Ваш результат'}
          answers={answers}
          result={result}
          onNext={goNext}
        />
      );
    }

    return <PaywallScreen result={result} />;
  }

  return (
    <QuizLayout
      progress={progress}
      canGoBack={screenIndex > 0 && currentScreen.type !== 'paywall'}
      onBack={goBack}
      isHeroScreen={currentScreen.id === 1}
    >
      {renderScreen()}
    </QuizLayout>
  );
}

export default App;
