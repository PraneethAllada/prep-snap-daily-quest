import { Home, BarChart3, User, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BottomNavigationProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

const BottomNavigation = ({ currentScreen, onNavigate }: BottomNavigationProps) => {
  const navItems = [
    { id: "dashboard", icon: Home, label: "Home" },
    { id: "daily-quiz", icon: BookOpen, label: "Quiz" },
    { id: "results", icon: BarChart3, label: "Results" },
    { id: "settings", icon: User, label: "Profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border px-4 py-2 safe-bottom">
      <div className="flex justify-around items-center w-full">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => onNavigate(item.id)}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;