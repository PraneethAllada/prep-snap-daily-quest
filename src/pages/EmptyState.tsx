import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Target, ArrowRight } from "lucide-react";

interface EmptyStateProps {
  type: "missed-day" | "no-quiz" | "first-time";
}

const EmptyState = ({ type = "no-quiz" }: EmptyStateProps) => {
  const getContent = () => {
    switch (type) {
      case "missed-day":
        return {
          emoji: "😔",
          title: "You missed yesterday",
          subtitle: "Your streak was broken, but don't worry!",
          description: "Every expert was once a beginner. Start fresh today and build a new streak. Consistency matters more than perfection.",
          buttonText: "Start Fresh Today",
          tips: [
            "Set a daily reminder to maintain your streak",
            "Even 10 minutes of daily practice makes a difference",
            "Focus on building the habit, not just the streak"
          ]
        };
      
      case "first-time":
        return {
          emoji: "🎯",
          title: "Welcome to PrepSnap!",
          subtitle: "Your UPSC journey starts here",
          description: "Get ready to build a strong foundation with daily practice. Each quiz is carefully curated to help you succeed.",
          buttonText: "Take Your First Quiz",
          tips: [
            "Take the quiz at the same time daily",
            "Review explanations for better understanding", 
            "Track your progress to stay motivated"
          ]
        };
      
      default: // no-quiz
        return {
          emoji: "⏰",
          title: "No quiz available yet",
          subtitle: "Today's quiz will be ready soon",
          description: "Our daily quizzes are available every morning at 6:00 AM. Come back then to continue your preparation journey.",
          buttonText: "View Dashboard",
          tips: [
            "Quizzes are released daily at 6:00 AM",
            "Each quiz contains 10 carefully selected questions",
            "Use this time to review previous quiz explanations"
          ]
        };
    }
  };

  const content = getContent();

  return (
    <div className="mobile-container flex flex-col justify-center items-center p-6 min-h-screen">
      <div className="w-full max-w-sm space-y-6 text-center">
        {/* Main Illustration */}
        <div className="space-y-4">
          <div className="w-24 h-24 mx-auto bg-accent rounded-2xl flex items-center justify-center">
            <span className="text-4xl">{content.emoji}</span>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">
              {content.title}
            </h1>
            <p className="text-muted-foreground">
              {content.subtitle}
            </p>
          </div>
        </div>

        {/* Description Card */}
        <Card className="border-border bg-surface">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {content.description}
            </p>
          </CardContent>
        </Card>

        {/* Tips Section */}
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Target className="w-4 h-4 text-primary" />
              <h3 className="font-medium text-foreground">Quick Tips</h3>
            </div>
            
            <ul className="space-y-2 text-left">
              {content.tips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Action Button */}
        <Button 
          className="w-full h-12 text-base font-medium"
          size="lg"
        >
          {content.buttonText}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>

        {/* Additional Actions */}
        <div className="space-y-3">
          {type === "missed-day" && (
            <Button variant="outline" className="w-full">
              <Calendar className="w-4 h-4 mr-2" />
              Set Daily Reminder
            </Button>
          )}
          
          {type === "no-quiz" && (
            <Button variant="outline" className="w-full">
              Review Previous Quizzes
            </Button>
          )}
        </div>

        {/* Motivational Footer */}
        <div className="pt-4">
          <p className="text-xs text-muted-foreground">
            {type === "missed-day" 
              ? "Remember: Progress, not perfection. 💪"
              : type === "first-time"
              ? "Your preparation journey begins with a single step. 🚀"
              : "Great things take time. Keep preparing! 📚"
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;