import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Trophy, Target, Flame, RotateCcw, Eye } from "lucide-react";
import PrepSnapLogo from "@/components/PrepSnapLogo";

// Mock results data
const mockResults = {
  score: 7,
  total: 10,
  streak: 15,
  timeSpent: "8:45",
  accuracy: 70,
  previousBest: 8
};

interface QuizResultsProps {
  answers: (number | null)[];
  onGoToDashboard: () => void;
  onReviewAnswers: () => void;
}

const QuizResults = ({ answers, onGoToDashboard, onReviewAnswers }: QuizResultsProps) => {
  const { score, total, streak, timeSpent, accuracy, previousBest } = mockResults;
  const percentage = Math.round((score / total) * 100);
  const earnedCredits = score === total ? 3 : 0; // 3 credits for perfect score
  const isNewRecord = score > previousBest;

  const getScoreColor = () => {
    if (percentage >= 80) return "success";
    if (percentage >= 60) return "streak";
    return "error";
  };

  const getPerformanceMessage = () => {
    if (percentage >= 80) return "Excellent work! 🎉";
    if (percentage >= 60) return "Good job! Keep it up! 👍";
    return "Keep practicing! You've got this! 💪";
  };

  return (
    <div className="mobile-container p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <PrepSnapLogo size="md" className="justify-center" />
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Quiz Complete!</h1>
          <p className="text-muted-foreground">{getPerformanceMessage()}</p>
          {earnedCredits > 0 && (
            <div className="bg-success/10 border border-success/20 rounded-lg p-3 mt-4">
              <p className="text-success font-medium text-sm">
                🎉 Perfect Score! You earned {earnedCredits} credits!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Main Score Card */}
      <Card className="border-border">
        <CardHeader className="text-center pb-4">
          <div className="w-20 h-20 mx-auto mb-4 bg-accent rounded-full flex items-center justify-center">
            <Trophy className="w-10 h-10 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold text-foreground">
            {score}/{total}
          </CardTitle>
          <div className="flex justify-center space-x-2">
            <Badge 
              variant="secondary" 
              className={`bg-${getScoreColor()} text-${getScoreColor()}-foreground`}
            >
              {percentage}% Accuracy
            </Badge>
            {isNewRecord && (
              <Badge variant="outline" className="border-streak text-streak">
                New Record! 🎯
              </Badge>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-border">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 mx-auto mb-2 text-success">
              <Target className="w-full h-full" />
            </div>
            <div className="text-2xl font-semibold text-foreground">{score}</div>
            <div className="text-sm text-muted-foreground">Correct</div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 mx-auto mb-2 text-error">
              <RotateCcw className="w-full h-full" />
            </div>
            <div className="text-2xl font-semibold text-foreground">{total - score}</div>
            <div className="text-sm text-muted-foreground">Incorrect</div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 mx-auto mb-2 text-streak">
              <Flame className="w-full h-full" />
            </div>
            <div className="text-2xl font-semibold text-foreground">{streak}</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 mx-auto mb-2 text-progress">
              <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12,6 12,12 16,14"/>
              </svg>
            </div>
            <div className="text-2xl font-semibold text-foreground">{timeSpent}</div>
            <div className="text-sm text-muted-foreground">Time Spent</div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Insight */}
      <Card className="border-border">
        <CardContent className="p-4">
          <h3 className="font-medium text-foreground mb-2">Today's Insight</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            You're maintaining a great {streak}-day streak! Your accuracy has improved by 5% 
            compared to last week. Focus on time management to boost your performance even further.
          </p>
        </CardContent>
      </Card>

      <Separator />

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button 
          variant="outline" 
          className="w-full h-12 text-base font-medium"
          size="lg"
          onClick={onReviewAnswers}
        >
          <Eye className="w-5 h-5 mr-2" />
          Review Answers
        </Button>
        
        <Button 
          className="w-full h-12 text-base font-medium"
          size="lg"
          onClick={onGoToDashboard}
        >
          Continue to Dashboard
        </Button>
      </div>

      {/* Motivational Footer */}
      <div className="text-center pt-4">
        <p className="text-sm text-muted-foreground">
          Keep up the great work! Tomorrow's quiz awaits you. 📚
        </p>
      </div>
    </div>
  );
};

export default QuizResults;