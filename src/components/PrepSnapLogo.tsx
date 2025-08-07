import { useEffect, useState } from "react";
import lightLogo from "@/assets/prepsnap-logo-light.png";
import darkLogo from "@/assets/prepsnap-logo-dark.png";

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
      <img 
        src={isDark ? darkLogo : lightLogo} 
        alt="PrepSnap" 
        className={`${sizeClasses[size]} object-contain`}
      />
    </div>
  );
};

export default PrepSnapLogo;