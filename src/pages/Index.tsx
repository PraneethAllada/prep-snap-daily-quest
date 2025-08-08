import { useState } from "react";
import { Button } from "@/components/ui/button";
import Onboarding from "./Onboarding";
import Auth from "./Auth";
import DailyQuiz from "./DailyQuiz";
import QuizResults from "./QuizResults";
import Dashboard from "./Dashboard";
import Settings from "./Settings";
import EmptyState from "./EmptyState";
import BottomNavigation from "@/components/BottomNavigation";
import ReviewAnswers from "./ReviewAnswers";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<string>("onboarding");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>([]);

  const handleNavigation = (screen: string) => {
    setCurrentScreen(screen);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentScreen("dashboard");
  };

  const handleQuizComplete = (answers?: (number | null)[]) => {
    setQuizCompleted(true);
    if (answers) setQuizAnswers(answers);
    setCurrentScreen("results");
  };

  const screens = {
    onboarding: <Onboarding onGetStarted={() => setCurrentScreen("auth")} />,
    auth: <Auth onLogin={handleLogin} />,
    "daily-quiz": <DailyQuiz onQuizComplete={handleQuizComplete} />,
    results: <QuizResults 
      answers={quizAnswers}
      onGoToDashboard={() => setCurrentScreen("dashboard")} 
      onReviewAnswers={() => setCurrentScreen("review-answers")}
    />,
    dashboard: <Dashboard onStartQuiz={() => setCurrentScreen("daily-quiz")} />,
    settings: <Settings onGoBack={() => setCurrentScreen("dashboard")} />,
    "empty-missed": <EmptyState type="missed-day" onStartQuiz={() => setCurrentScreen("daily-quiz")} />,
    "empty-no-quiz": <EmptyState type="no-quiz" onStartQuiz={() => setCurrentScreen("daily-quiz")} />,
    "empty-first-time": <EmptyState type="first-time" onStartQuiz={() => setCurrentScreen("daily-quiz")} />,
    "review-answers": <ReviewAnswers answers={quizAnswers} onGoBack={() => setCurrentScreen("results")} />
  };

  const showBottomNav = isAuthenticated && !["onboarding", "auth"].includes(currentScreen);

  return (
    <div className="min-h-screen bg-background">
      {/* Screen Navigation (for demo purposes) */}
      <div className="fixed top-4 left-4 z-50 bg-surface p-2 rounded-lg border border-border shadow-lg">
        <div className="text-xs text-muted-foreground mb-2">Demo Navigation:</div>
        <div className="grid grid-cols-3 gap-1">
          {Object.keys(screens).map((screen) => (
            <Button
              key={screen}
              variant={currentScreen === screen ? "default" : "outline"}
              size="sm"
              className="text-xs h-6 px-2"
              onClick={() => setCurrentScreen(screen)}
            >
              {screen}
            </Button>
          ))}
        </div>
      </div>

      {/* Current Screen */}
      <div className={showBottomNav ? "pb-20" : ""}>
        {screens[currentScreen as keyof typeof screens]}
      </div>

      {/* Bottom Navigation */}
      {showBottomNav && (
        <BottomNavigation 
          currentScreen={currentScreen} 
          onNavigate={handleNavigation} 
        />
      )}
    </div>
  );
};

export default Index;
