import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, ArrowRight } from "lucide-react";
import PrepSnapLogo from "@/components/PrepSnapLogo";

// Mock quiz data - 10 questions for daily quiz
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
  },
  {
    id: 3,
    question: "Which Article of the Indian Constitution deals with the Right to Constitutional Remedies?",
    options: [
      "Article 30",
      "Article 32",
      "Article 34",
      "Article 36"
    ],
    correctAnswer: 1,
    explanation: "Article 32 is known as the 'Heart and Soul' of the Constitution as it guarantees the right to constitutional remedies."
  },
  {
    id: 4,
    question: "The Goods and Services Tax (GST) was implemented in India in which year?",
    options: [
      "2016",
      "2017",
      "2018",
      "2019"
    ],
    correctAnswer: 1,
    explanation: "GST was implemented on July 1, 2017, replacing multiple indirect taxes with a unified tax system."
  },
  {
    id: 5,
    question: "Which of the following is NOT a Fundamental Right under the Indian Constitution?",
    options: [
      "Right to Equality",
      "Right to Freedom",
      "Right to Property",
      "Right to Constitutional Remedies"
    ],
    correctAnswer: 2,
    explanation: "Right to Property was removed as a Fundamental Right by the 44th Constitutional Amendment in 1978."
  },
  {
    id: 6,
    question: "The term 'Digital India' was launched in which year?",
    options: [
      "2014",
      "2015",
      "2016",
      "2017"
    ],
    correctAnswer: 1,
    explanation: "Digital India was launched on July 1, 2015, with the vision of transforming India into a digitally empowered society."
  },
  {
    id: 7,
    question: "Which committee recommended the establishment of the National Judicial Appointments Commission?",
    options: [
      "Sarkaria Commission",
      "Justice J.S. Verma Committee",
      "Administrative Reforms Commission",
      "Law Commission"
    ],
    correctAnswer: 1,
    explanation: "Justice J.S. Verma Committee recommended reforms in the higher judiciary including the NJAC."
  },
  {
    id: 8,
    question: "The 'Atmanirbhar Bharat' initiative focuses primarily on:",
    options: [
      "Self-reliance and reducing imports",
      "Increasing agricultural productivity",
      "Digital transformation",
      "Infrastructure development"
    ],
    correctAnswer: 0,
    explanation: "Atmanirbhar Bharat aims to make India self-reliant by reducing dependency on imports and boosting domestic manufacturing."
  },
  {
    id: 9,
    question: "Which of the following is the correct expansion of NITI Aayog?",
    options: [
      "National Institution for Transforming India",
      "National Institute for Technology and Innovation",
      "National Integration and Technology Initiative",
      "National Innovation and Technology Institute"
    ],
    correctAnswer: 0,
    explanation: "NITI Aayog stands for National Institution for Transforming India, which replaced the Planning Commission."
  },
  {
    id: 10,
    question: "The concept of 'One Nation, One Election' refers to:",
    options: [
      "Simultaneous elections to Lok Sabha and Vidhan Sabhas",
      "Single ballot for all elections",
      "Unified election commission",
      "Common electoral roll"
    ],
    correctAnswer: 0,
    explanation: "One Nation, One Election refers to conducting simultaneous elections to Lok Sabha and all State Legislative Assemblies."
  }
];

interface DailyQuizProps {
  onQuizComplete: (answers: (number | null)[]) => void;
}

const DailyQuiz = ({ onQuizComplete }: DailyQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(mockQuiz.length).fill(null));
  const [score, setScore] = useState(0);

  const question = mockQuiz[currentQuestion];
  const isLastQuestion = currentQuestion === mockQuiz.length - 1;
  const progress = ((currentQuestion + 1) / mockQuiz.length) * 100;

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    // Auto-save the answer
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1]);
    }
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      // Store the answer
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedAnswer;
      setAnswers(newAnswers);
    }

    if (isLastQuestion) {
      // Calculate final score
      let finalScore = 0;
      const finalAnswers = [...answers];
      if (selectedAnswer !== null) {
        finalAnswers[currentQuestion] = selectedAnswer;
      }
      
      finalAnswers.forEach((answer, index) => {
        if (answer === mockQuiz[index].correctAnswer) {
          finalScore++;
        }
      });
      
      setScore(finalScore);
      // Navigate to results screen
      onQuizComplete(finalAnswers);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[currentQuestion + 1]);
    }
  };

  return (
    <div className="mobile-container flex flex-col min-h-screen">
      {/* Header with Timer and Progress */}
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
            
            if (selectedAnswer === index) {
              optionClass += " selected";
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={optionClass}
              >
                <span className="font-medium text-sm text-muted-foreground mr-3">
                  {String.fromCharCode(65 + index)}.
                </span>
                <span className="text-foreground">{option}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
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
            disabled={selectedAnswer === null}
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