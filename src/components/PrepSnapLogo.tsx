import { useEffect, useState } from "react";

interface PrepSnapLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const PrepSnapLogo = ({ className = "", size = "md" }: PrepSnapLogoProps) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if dark mode is active
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkDarkMode();
    
    // Watch for dark mode changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  const sizeClasses = {
    sm: "h-8",
    md: "h-12", 
    lg: "h-16"
  };

  return (
    <div className={`flex items-center ${className}`}>
      <div className={`${sizeClasses[size]} flex items-center`}>
        <span className="text-2xl font-bold text-foreground">PrepSnap</span>
      </div>
    </div>
  );
};

export default PrepSnapLogo;