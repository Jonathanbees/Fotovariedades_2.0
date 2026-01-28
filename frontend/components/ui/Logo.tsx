"use client";

import React from "react";

interface LogoProps {
  variant?: "default" | "minimal" | "white";
  size?: "sm" | "md" | "lg";
  showSubtitle?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  variant = "default",
  size = "md",
  showSubtitle = true,
  className = "",
}) => {
  const sizeClasses = {
    sm: {
      icon: "w-8 h-8",
      iconText: "text-2xl",
      title: "text-lg",
      subtitle: "text-[10px]",
    },
    md: {
      icon: "w-10 h-10",
      iconText: "text-3xl",
      title: "text-xl",
      subtitle: "text-xs",
    },
    lg: {
      icon: "w-12 h-12",
      iconText: "text-4xl",
      title: "text-2xl",
      subtitle: "text-sm",
    },
  };

  const currentSize = sizeClasses[size];

  const textColorClasses = {
    default: "text-gray-900 dark:text-white",
    minimal: "text-gray-900 dark:text-white",
    white: "text-white",
  };

  const subtitleColorClasses = {
    default: "text-gray-500 dark:text-gray-400",
    minimal: "text-gray-500 dark:text-gray-400",
    white: "text-white/80",
  };

  return (
    <a href="/" className={`flex items-center gap-2 group ${className}`}>
      {/* Logo Icon */}
      <div
        className={`${currentSize.icon} relative flex items-center justify-center shrink-0`}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 rounded-full bg-linear-to-tr from-pink-500 via-red-500 to-yellow-500 opacity-80 blur-sm group-hover:opacity-100 transition-opacity" />

        {/* Colorful quadrants */}
        <div className="absolute inset-0">
          <span className="absolute top-0 left-0 w-1/2 h-1/2 bg-pink-500 rounded-tl-full opacity-80" />
          <span className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary rounded-tr-full opacity-80" />
          <span className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-500 rounded-bl-full opacity-80" />
          <span className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-green-500 rounded-br-full opacity-80" />
        </div>

        {/* Center camera icon */}
        <span
          className={`material-icons-outlined ${currentSize.iconText} text-white relative z-10 drop-shadow-md`}
        >
          photo_camera
        </span>
      </div>

      {/* Logo Text */}
      <div className="flex flex-col">
        <span
          className={`font-bold ${currentSize.title} tracking-tight leading-tight ${textColorClasses[variant]}`}
        >
          Foto<span className="text-primary">Variedades</span>
        </span>
        {showSubtitle && (
          <span
            className={`${currentSize.subtitle} font-medium tracking-wider uppercase ${subtitleColorClasses[variant]} -mt-0.5`}
          >
            la 68
          </span>
        )}
      </div>
    </a>
  );
};

export default Logo;
