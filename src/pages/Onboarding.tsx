import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Target, TrendingUp, Calendar } from "lucide-react";

const onboardingSlides = [
  {
    icon: Target,
    title: "Get 10 Questions Daily",
    description: "Curated UPSC questions delivered every day to build your knowledge systematically.",
    illustration: "🎯"
  },
  {
    icon: Calendar,
    title: "Build Your Streak",
    description: "Develop a consistent study habit with our streak tracking system. Never miss a day.",
    illustration: "🔥"
  },
  {
    icon: TrendingUp,
    title: "Track Your Performance",
    description: "Monitor your progress with detailed analytics and improve your weak areas.",
    illustration: "📈"
  }
];

interface OnboardingProps {
  onGetStarted: () => void;
}

const Onboarding = ({ onGetStarted }: OnboardingProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onGetStarted();
    }
  };

  const isLastSlide = currentSlide === onboardingSlides.length - 1;
  const slide = onboardingSlides[currentSlide];
  const IconComponent = slide.icon;

  return (
    <div className="mobile-container flex flex-col justify-center items-center p-6">
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        {/* Logo/Brand */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">PrepSnap</h1>
          <p className="text-muted-foreground text-sm">UPSC Daily Quiz</p>
        </div>

        {/* Main Content */}
        <Card className="w-full max-w-xs p-8 border-0 shadow-none bg-transparent">
          <div className="space-y-6">
            {/* Illustration */}
            <div className="flex justify-center">
              <div className="w-24 h-24 bg-accent rounded-2xl flex items-center justify-center">
                <span className="text-4xl">{slide.illustration}</span>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <IconComponent className="w-8 h-8 text-primary mx-auto" />
              <h2 className="text-2xl font-semibold text-foreground leading-tight">
                {slide.title}
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                {slide.description}
              </p>
            </div>
          </div>
        </Card>

        {/* Progress Dots */}
        <div className="flex space-x-2 mt-8">
          {onboardingSlides.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full calm-transition ${
                index === currentSlide 
                  ? "bg-primary" 
                  : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="w-full mt-8">
        <Button
          onClick={nextSlide}
          className="w-full h-12 text-base font-medium calm-transition"
          size="lg"
        >
          {isLastSlide ? "Get Started" : "Continue"}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
        
        {!isLastSlide && (
          <Button
            variant="ghost"
            className="w-full mt-3 text-muted-foreground"
            onClick={() => setCurrentSlide(onboardingSlides.length - 1)}
          >
            Skip
          </Button>
        )}
      </div>
    </div>
  );
};

export default Onboarding;