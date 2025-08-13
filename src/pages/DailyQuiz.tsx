import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, ArrowRight } from "lucide-react";
import PrepSnapLogo from "@/components/PrepSnapLogo";
import { getQuizToday, submitQuiz } from "@/lib/functions";

type Opt = "A" | "B" | "C" | "D";

interface DailyQuizProps {
  onQuizComplete: (answers: (number | null)[]) => void;
}

const DailyQuiz = ({ onQuizComplete }: DailyQuizProps) => {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  // live data
  const [attemptId, setAttemptId] = useState<number | null>(null);
  const [questions, setQuestions] = useState<
    { id: number; stem: string; options: { key: Opt; text: string }[] }[]
  >([]);

  // local quiz state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [perQTime, setPerQTime] = useState<number[]>([]);
  const lastTickRef = useRef<number>(Date.now());

  const isLastQuestion = currentQuestion === questions.length - 1;
  const progress = useMemo(
    () => (questions.length ? ((currentQuestion + 1) / questions.length) * 100 : 0),
    [currentQuestion, questions.length]
  );

  // fetch quiz on mount
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const data = await getQuizToday();
        if (!alive) return;
        setAttemptId(data.attemptId);
        setQuestions(
          data.questions.map(q => ({
            id: q.id,
            stem: q.stem,
            options: q.options,
          }))
        );
        setAnswers(new Array(data.questions.length).fill(null));
        setPerQTime(new Array(data.questions.length).fill(0));
        setErr(null);
      } catch (e: any) {
        setErr(e.message || "Failed to load quiz");
      } finally {
        setLoading(false);
        lastTickRef.current = Date.now();
      }
    })();
    return () => { alive = false; };
  }, []);

  // countdown + per-question time tracking
  useEffect(() => {
    if (loading || err || timeLeft <= 0 || !questions.length) return;
    const t = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
      setPerQTime(arr => {
        const now = Date.now();
        const delta = now - lastTickRef.current;
        lastTickRef.current = now;
        const copy = [...arr];
        copy[currentQuestion] = (copy[currentQuestion] || 0) + delta;
        return copy;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [loading, err, currentQuestion, questions.length, timeLeft]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setAnswers(prev => {
      const copy = [...prev];
      copy[currentQuestion] = answerIndex;
      return copy;
    });
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(q => q - 1);
      setSelectedAnswer(answers[currentQuestion - 1]);
      lastTickRef.current = Date.now();
    }
  };

  const handleNextQuestion = async () => {
    if (selectedAnswer !== null) {
      setAnswers(prev => {
        const copy = [...prev];
        copy[currentQuestion] = selectedAnswer;
        return copy;
      });
    }

    if (isLastQuestion) {
      try {
        if (!attemptId) throw new Error("Missing attemptId");
        const finishedAtISO = new Date().toISOString();
        const toKey = (idx: number): Opt => (["A", "B", "C", "D"][idx] as Opt);

        const items = questions.map((q, idx) => {
          const ansIdx = answers[idx];
          return {
            questionId: q.id,
            choice: ansIdx === null ? ("A" as Opt) : toKey(ansIdx),
            timeMs: perQTime[idx] || 0,
            idx,
          };
        });

        await submitQuiz({ attemptId, finishedAtISO, items });
        onQuizComplete(answers);
      } catch (e: any) {
        setErr(e.message || "Failed to submit");
      }
    } else {
      setCurrentQuestion(q => q + 1);
      setSelectedAnswer(answers[currentQuestion + 1]);
      lastTickRef.current = Date.now();
    }
  };

  if (loading) {
    return (
      <div className="mobile-container flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading today’s quiz…</p>
      </div>
    );
  }

  if (err) {
    return (
      <div className="mobile-container flex flex-col items-center justify-center min-h-screen p-6">
        <p className="text-red-500 text-center mb-4">{err}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="mobile-container flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">No quiz available today.</p>
      </div>
    );
  }

  const q = questions[currentQuestion];

  return (
    <div className="mobile-container flex flex-col min-h-screen">
      <div className="p-4 bg-surface border-b border-border">
        <div className="text-center mb-4">
          <PrepSnapLogo size="sm" className="justify-center" />
        </div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">
              {formatTime(timeLeft)}
            </span>
          </div>
          <span className="text-sm text-muted-foreground">
            {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        <Progress
          value={progress}
          className="h-2 bg-muted [&>div]:bg-gradient-to-r [&>div]:from-progress [&>div]:to-progress"
        />
        <div className="mt-3 bg-primary/10 border border-primary/20 rounded-md p-2 text-center">
          <p className="text-xs font-medium text-primary">
            💰 Perfect Score Bonus: Earn ₹3 today
          </p>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-6">
        <Card className="border-0 shadow-none">
          <CardContent className="p-0">
            <h2 className="text-lg font-medium text-foreground leading-relaxed">
              {q.stem}
            </h2>
          </CardContent>
        </Card>

        <div className="space-y-3">
          {q.options.map((opt, index) => {
            let optionClass = "quiz-option";
            if (selectedAnswer === index) optionClass += " selected";
            return (
              <button
                key={opt.key}
                onClick={() => handleAnswerSelect(index)}
                className={optionClass}
              >
                <span className="font-medium text-sm text-muted-foreground mr-3">
                  {opt.key}.
                </span>
                <span className="text-foreground">{opt.text}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-6 pt-0 space-y-3">
        <div className="flex gap-3">
          <Button
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
            variant="outline"
            className="flex-1 h-12 text-base font-medium"
            size="lg"
          >
            Previous
          </Button>
          <Button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null && !isLastQuestion}
            className="flex-1 h-12 text-base font-medium"
            size="lg"
          >
            {isLastQuestion ? "Finish Quiz" : "Next"}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DailyQuiz;
