import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, TrendingUp, Target, Flame, Award, Clock, ArrowRight } from "lucide-react";

// Mock data
const mockData = {
  todayQuiz: {
    completed: false,
    availableAt: "6:00 AM",
    questionsCount: 10
  },
  streak: {
    current: 15,
    best: 23,
    percentage: 65
  },
  weeklyStats: {
    quizzesTaken: 6,
    totalQuizzes: 7,
    averageScore: 7.2,
    averageTime: "9:15"
  },
  recentScores: [6, 8, 7, 9, 7, 8, 9],
  monthlyProgress: 78
};

interface DashboardProps {
  onStartQuiz: () => void;
}

const Dashboard = ({ onStartQuiz }: DashboardProps) => {
  const { todayQuiz, streak, weeklyStats, recentScores, monthlyProgress } = mockData;

  const getStreakColor = () => {
    if (streak.current >= 20) return "text-streak";
    if (streak.current >= 10) return "text-progress";
    return "text-muted-foreground";
  };

  return (
    <div className="mobile-container p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Track your UPSC preparation progress</p>
      </div>

      {/* Today's Quiz Card */}
      <Card className="border-border">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Today's Quiz</CardTitle>
            <Badge variant={todayQuiz.completed ? "default" : "secondary"}>
              {todayQuiz.completed ? "Completed" : "Available"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                {todayQuiz.completed 
                  ? "Great job! Come back tomorrow for the next quiz." 
                  : `${todayQuiz.questionsCount} questions waiting for you`
                }
              </p>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>Available daily at {todayQuiz.availableAt}</span>
              </div>
            </div>
          </div>
          
          {!todayQuiz.completed && (
            <Button className="w-full" size="lg" onClick={onStartQuiz}>
              Start Today's Quiz
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Streak & Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-border">
          <CardContent className="p-4 text-center">
            <div className={`w-8 h-8 mx-auto mb-2 ${getStreakColor()}`}>
              <Flame className="w-full h-full" />
            </div>
            <div className="text-2xl font-semibold text-foreground">{streak.current}</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
            <div className="text-xs text-muted-foreground mt-1">
              Best: {streak.best} days
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 mx-auto mb-2 text-success">
              <Target className="w-full h-full" />
            </div>
            <div className="text-2xl font-semibold text-foreground">{weeklyStats.averageScore}/10</div>
            <div className="text-sm text-muted-foreground">Avg Score</div>
            <div className="text-xs text-muted-foreground mt-1">
              This week
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Progress */}
      <Card className="border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-progress" />
            This Week's Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Quizzes completed</span>
            <span className="text-foreground font-medium">
              {weeklyStats.quizzesTaken}/{weeklyStats.totalQuizzes}
            </span>
          </div>
          <Progress 
            value={(weeklyStats.quizzesTaken / weeklyStats.totalQuizzes) * 100} 
            className="h-2 bg-muted [&>div]:bg-gradient-to-r [&>div]:from-progress [&>div]:to-progress"
          />
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Avg Time</span>
              <div className="font-medium text-foreground">{weeklyStats.averageTime}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Consistency</span>
              <div className="font-medium text-foreground">{Math.round((weeklyStats.quizzesTaken / weeklyStats.totalQuizzes) * 100)}%</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Performance */}
      <Card className="border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-success" />
            Recent Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* Mini Chart */}
            <div className="flex items-end justify-between h-16 space-x-1">
              {recentScores.map((score, index) => (
                <div
                  key={index}
                  className="flex-1 bg-muted rounded-t"
                  style={{ height: `${(score / 10) * 100}%` }}
                >
                  <div 
                    className="bg-gradient-to-t from-progress to-progress/80 rounded-t w-full"
                    style={{ height: '100%' }}
                  />
                </div>
              ))}
            </div>
            
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>7 days ago</span>
              <span>Today</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Goal */}
      <Card className="border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center">
            <Award className="w-5 h-5 mr-2 text-streak" />
            Monthly Goal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress towards 90% average</span>
            <span className="text-foreground font-medium">{monthlyProgress}%</span>
          </div>
          <Progress 
            value={monthlyProgress} 
            className="h-2 bg-muted [&>div]:bg-gradient-to-r [&>div]:from-streak [&>div]:to-streak"
          />
          <p className="text-xs text-muted-foreground">
            Keep maintaining your streak to reach your monthly goal!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;