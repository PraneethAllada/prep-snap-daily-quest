import { useState } from "react";
import { Button } from "@/components/ui/button";
import Onboarding from "./Onboarding";
import Auth from "./Auth";
import DailyQuiz from "./DailyQuiz";
import QuizResults from "./QuizResults";
import Dashboard from "./Dashboard";
import Settings from "./Settings";
import EmptyState from "./EmptyState";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<string>("onboarding");

  const screens = {
    onboarding: <Onboarding />,
    auth: <Auth />,
    "daily-quiz": <DailyQuiz />,
    results: <QuizResults />,
    dashboard: <Dashboard />,
    settings: <Settings />,
    "empty-missed": <EmptyState type="missed-day" />,
    "empty-no-quiz": <EmptyState type="no-quiz" />,
    "empty-first-time": <EmptyState type="first-time" />
  };

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
      <div className="pt-0">
        {screens[currentScreen as keyof typeof screens]}
      </div>
    </div>
  );
};

export default Index;
