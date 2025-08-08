import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, ArrowLeft } from "lucide-react";
import PrepSnapLogo from "@/components/PrepSnapLogo";

// Mock quiz data - same as DailyQuiz
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

interface ReviewAnswersProps {
  answers: (number | null)[];
  onGoBack: () => void;
}

const ReviewAnswers = ({ answers, onGoBack }: ReviewAnswersProps) => {
  const correctCount = answers.filter((answer, index) => answer === mockQuiz[index].correctAnswer).length;
  const incorrectCount = answers.filter((answer, index) => answer !== null && answer !== mockQuiz[index].correctAnswer).length;
  const skippedCount = answers.filter(answer => answer === null).length;

  return (
    <div className="mobile-container p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <PrepSnapLogo size="md" className="justify-center" />
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Review Answers</h1>
          <p className="text-muted-foreground">See detailed explanations for each question</p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="border-border">
          <CardContent className="p-3 text-center">
            <CheckCircle className="w-6 h-6 mx-auto mb-1 text-success" />
            <div className="text-lg font-bold text-success">{correctCount}</div>
            <div className="text-xs text-muted-foreground">Correct</div>
          </CardContent>
        </Card>
        
        <Card className="border-border">
          <CardContent className="p-3 text-center">
            <XCircle className="w-6 h-6 mx-auto mb-1 text-error" />
            <div className="text-lg font-bold text-error">{incorrectCount}</div>
            <div className="text-xs text-muted-foreground">Incorrect</div>
          </CardContent>
        </Card>
        
        <Card className="border-border">
          <CardContent className="p-3 text-center">
            <div className="w-6 h-6 mx-auto mb-1 rounded-full bg-muted flex items-center justify-center">
              <div className="w-2 h-2 bg-muted-foreground rounded-full" />
            </div>
            <div className="text-lg font-bold text-muted-foreground">{skippedCount}</div>
            <div className="text-xs text-muted-foreground">Skipped</div>
          </CardContent>
        </Card>
      </div>

      {/* Questions Review */}
      <div className="space-y-4">
        {mockQuiz.map((question, index) => {
          const userAnswer = answers[index];
          const isCorrect = userAnswer === question.correctAnswer;
          const wasSkipped = userAnswer === null;
          
          return (
            <Card key={question.id} className="border-border">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base leading-relaxed flex-1 pr-3">
                    <span className="text-muted-foreground mr-2">Q{index + 1}.</span>
                    {question.question}
                  </CardTitle>
                  <Badge 
                    variant={isCorrect ? "default" : wasSkipped ? "secondary" : "destructive"}
                    className="shrink-0"
                  >
                    {isCorrect ? "Correct" : wasSkipped ? "Skipped" : "Wrong"}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0 space-y-4">
                {/* Answer Options */}
                <div className="space-y-2">
                  {question.options.map((option, optionIndex) => {
                    const isUserChoice = userAnswer === optionIndex;
                    const isCorrectAnswer = optionIndex === question.correctAnswer;
                    
                    let optionClass = "p-3 rounded-lg border text-sm ";
                    
                    if (isCorrectAnswer) {
                      optionClass += "border-success bg-success/10 text-success-foreground";
                    } else if (isUserChoice && !isCorrectAnswer) {
                      optionClass += "border-error bg-error/10 text-error-foreground";
                    } else {
                      optionClass += "border-border bg-surface";
                    }
                    
                    return (
                      <div key={optionIndex} className={optionClass}>
                        <div className="flex items-center">
                          <span className="font-medium mr-3 text-muted-foreground">
                            {String.fromCharCode(65 + optionIndex)}.
                          </span>
                          <span className="flex-1">{option}</span>
                          {isCorrectAnswer && (
                            <CheckCircle className="w-4 h-4 text-success ml-2" />
                          )}
                          {isUserChoice && !isCorrectAnswer && (
                            <XCircle className="w-4 h-4 text-error ml-2" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Explanation */}
                <div className="p-3 rounded-lg bg-muted/50 border border-border">
                  <p className="text-sm text-muted-foreground">
                    <strong>Explanation:</strong> {question.explanation}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Back Button */}
      <Button 
        variant="outline" 
        className="w-full h-12 text-base font-medium"
        size="lg"
        onClick={onGoBack}
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Results
      </Button>
    </div>
  );
};

export default ReviewAnswers;