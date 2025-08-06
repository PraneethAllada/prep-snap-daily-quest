import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, ArrowRight } from "lucide-react";

// Mock quiz data
const mockQuiz = [
  {
    id: 1,
    question: "Which of the following is the primary objective of the National Education Policy 2020?",
    options: [
      "Achieving 100% literacy rate by 2030",
      "Transforming India into a knowledge-based economy",
      "Introducing skill-based learning at all levels",
      "Making education affordable for all"
    ],
    correctAnswer: 1,
    explanation: "The primary objective of NEP 2020 is to transform India into a knowledge-based economy by restructuring and reforming all aspects of education."
  },
  {
    id: 2,
    question: "The term 'Blue Economy' is associated with:",
    options: [
      "Sustainable use of ocean resources",
      "Development of blue-collar jobs",
      "Water conservation initiatives",
      "Sky-based transportation systems"
    ],
    correctAnswer: 0,
    explanation: "Blue Economy refers to the sustainable use of ocean resources for economic growth, improved livelihoods, and jobs while preserving the health of ocean ecosystems."
  }
];

const DailyQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [score, setScore] = useState(0);

  const question = mockQuiz[currentQuestion];
  const isLastQuestion = currentQuestion === mockQuiz.length - 1;
  const progress = ((currentQuestion + 1) / mockQuiz.length) * 100;

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !showFeedback) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, showFeedback]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showFeedback) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer !== null) {
      setShowFeedback(true);
      if (selectedAnswer === question.correctAnswer) {
        setScore(score + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      // Navigate to results screen
      console.log("Quiz completed!", { score, total: mockQuiz.length });
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  return (
    <div className="mobile-container flex flex-col min-h-screen">
      {/* Header with Timer and Progress */}
      <div className="p-4 bg-surface border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">
              {formatTime(timeLeft)}
            </span>
          </div>
          <span className="text-sm text-muted-foreground">
            {currentQuestion + 1} of {mockQuiz.length}
          </span>
        </div>
        
        <Progress 
          value={progress} 
          className="h-2 bg-muted [&>div]:bg-gradient-to-r [&>div]:from-progress [&>div]:to-progress"
        />
      </div>

      {/* Question Content */}
      <div className="flex-1 p-6 space-y-6">
        <Card className="border-0 shadow-none">
          <CardContent className="p-0">
            <h2 className="text-lg font-medium text-foreground leading-relaxed">
              {question.question}
            </h2>
          </CardContent>
        </Card>

        {/* Answer Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => {
            let optionClass = "quiz-option";
            
            if (showFeedback) {
              if (index === question.correctAnswer) {
                optionClass += " correct";
              } else if (index === selectedAnswer && index !== question.correctAnswer) {
                optionClass += " incorrect";
              }
            } else if (selectedAnswer === index) {
              optionClass += " selected";
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={optionClass}
                disabled={showFeedback}
              >
                <span className="font-medium text-sm text-muted-foreground mr-3">
                  {String.fromCharCode(65 + index)}.
                </span>
                <span className="text-foreground">{option}</span>
              </button>
            );
          })}
        </div>

        {/* Explanation (shown after answer) */}
        {showFeedback && (
          <Card className="bg-accent border-border">
            <CardContent className="p-4">
              <h3 className="font-medium text-foreground mb-2">
                {selectedAnswer === question.correctAnswer ? "Correct!" : "Incorrect"}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {question.explanation}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Action Button */}
      <div className="p-6 pt-0">
        {!showFeedback ? (
          <Button
            onClick={handleSubmitAnswer}
            disabled={selectedAnswer === null}
            className="w-full h-12 text-base font-medium"
            size="lg"
          >
            Submit Answer
          </Button>
        ) : (
          <Button
            onClick={handleNextQuestion}
            className="w-full h-12 text-base font-medium"
            size="lg"
          >
            {isLastQuestion ? "View Results" : "Next Question"}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default DailyQuiz;