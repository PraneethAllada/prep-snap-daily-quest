import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Moon, 
  Sun, 
  Bell, 
  Shield, 
  LogOut, 
  Edit3,
  Mail,
  Phone,
  ArrowLeft,
  Flame,
  Target,
  Coins
} from "lucide-react";
import PrepSnapLogo from "@/components/PrepSnapLogo";

interface SettingsProps {
  onGoBack: () => void;
}

const Settings = ({ onGoBack }: SettingsProps) => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [dailyReminder, setDailyReminder] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // Apply dark mode to document
  const handleDarkModeToggle = (checked: boolean) => {
    setDarkMode(checked);
    if (checked) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Mock user data
  const [userData, setUserData] = useState({
    name: "Priya Sharma",
    email: "priya.sharma@email.com", 
    phone: "+91 98765 43210",
    streak: 15,
    totalQuizzes: 45,
    credits: 24 // Total accumulated credits
  });

  const handleSave = () => {
    setIsEditing(false);
    // Save user data logic here
  };

  const handleLogout = () => {
    // Logout logic here
    console.log("Logging out...");
  };

  return (
    <div className="mobile-container p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <PrepSnapLogo size="md" className="justify-center" />
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>
      </div>

      {/* Credits Section */}
      <Card className="border-border bg-gradient-to-r from-primary/5 to-accent/5">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center">
            <Coins className="w-5 h-5 mr-2 text-primary" />
            Your Credits
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-primary">{userData.credits}</span>
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">Available Credits</p>
              <p className="text-xs text-muted-foreground">Earn 3 per perfect score</p>
            </div>
          </div>
          <div className="bg-primary/10 rounded-lg p-3">
            <p className="text-sm text-primary font-medium">💰 How to earn credits:</p>
            <p className="text-xs text-muted-foreground mt-1">
              Score 10/10 in daily quiz to earn 3 credits. Use credits for premium features!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Profile Section */}
      <Card className="border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center">
            <User className="w-5 h-5 mr-2 text-primary" />
            Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Avatar and Basic Info */}
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src="" alt={userData.name} />
              <AvatarFallback className="text-lg font-semibold bg-primary text-primary-foreground">
                {userData.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{userData.name}</h3>
              <p className="text-sm text-muted-foreground">{userData.email}</p>
              <div className="flex space-x-4 mt-2">
                <div className="flex items-center space-x-1">
                  <Flame className="w-4 h-4 text-streak" />
                  <span className="text-sm font-medium text-streak">{userData.streak}</span>
                  <span className="text-xs text-muted-foreground">day streak</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Target className="w-4 h-4 text-success" />
                  <span className="text-sm font-medium text-success">{userData.totalQuizzes}</span>
                  <span className="text-xs text-muted-foreground">quizzes</span>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit3 className="w-4 h-4" />
            </Button>
          </div>

          {/* Editable Fields */}
          {isEditing && (
            <div className="space-y-4 pt-4 border-t border-border">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={userData.name}
                  onChange={(e) => setUserData({...userData, name: e.target.value})}
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData({...userData, email: e.target.value})}
                    className="pl-10 h-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    value={userData.phone}
                    onChange={(e) => setUserData({...userData, phone: e.target.value})}
                    className="pl-10 h-10"
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <Button onClick={handleSave} size="sm">
                  Save Changes
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(false)}
                  size="sm"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card className="border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Dark Mode */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {darkMode ? (
                <Moon className="w-5 h-5 text-primary" />
              ) : (
                <Sun className="w-5 h-5 text-primary" />
              )}
              <div>
                <p className="font-medium text-foreground">Dark Mode</p>
                <p className="text-sm text-muted-foreground">
                  Switch between light and dark themes
                </p>
              </div>
            </div>
            <Switch
              checked={darkMode}
              onCheckedChange={handleDarkModeToggle}
            />
          </div>

          <Separator />

          {/* Notifications */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Get quiz reminders and updates
                </p>
              </div>
            </div>
            <Switch
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </div>

          {/* Daily Reminder */}
          {notifications && (
            <div className="flex items-center justify-between pl-8">
              <div>
                <p className="font-medium text-foreground">Daily Quiz Reminder</p>
                <p className="text-sm text-muted-foreground">
                  Remind me at 6:00 AM every day
                </p>
              </div>
              <Switch
                checked={dailyReminder}
                onCheckedChange={setDailyReminder}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card className="border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center">
            <Shield className="w-5 h-5 mr-2 text-primary" />
            Privacy & Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full justify-start h-11">
            Change Password
          </Button>
          <Button variant="outline" className="w-full justify-start h-11">
            Download My Data
          </Button>
          <Button variant="outline" className="w-full justify-start h-11">
            Delete Account
          </Button>
        </CardContent>
      </Card>

      {/* Navigation & Logout */}
      <div className="space-y-3">
        <Button 
          variant="outline" 
          className="w-full h-12 text-base font-medium"
          size="lg"
          onClick={onGoBack}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Button>
        
        <Card className="border-error">
          <CardContent className="p-4">
            <Button
              variant="destructive"
              className="w-full h-11"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* App Info */}
      <div className="text-center text-sm text-muted-foreground space-y-1">
        <p>PrepSnap v1.0.0</p>
        <p>Made with ❤️ for UPSC aspirants</p>
      </div>
    </div>
  );
};

export default Settings;