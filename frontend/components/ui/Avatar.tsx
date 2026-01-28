"use client";

import React from "react";

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "circle" | "rounded" | "square";
  status?: "online" | "offline" | "away" | "busy";
  showStatus?: boolean;
  bordered?: boolean;
  className?: string;
  onClick?: () => void;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "Avatar",
  name,
  size = "md",
  variant = "circle",
  status,
  showStatus = false,
  bordered = false,
  className = "",
  onClick,
}) => {
  // Generate initials from name
  const getInitials = (name: string): string => {
    const words = name.trim().split(" ");
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }
    return (
      words[0].charAt(0) + words[words.length - 1].charAt(0)
    ).toUpperCase();
  };

  // Generate consistent background color from name
  const getColorFromName = (name: string): string => {
    const colors = [
      "bg-red-500",
      "bg-orange-500",
      "bg-amber-500",
      "bg-yellow-500",
      "bg-lime-500",
      "bg-green-500",
      "bg-emerald-500",
      "bg-teal-500",
      "bg-cyan-500",
      "bg-sky-500",
      "bg-blue-500",
      "bg-indigo-500",
      "bg-violet-500",
      "bg-purple-500",
      "bg-fuchsia-500",
      "bg-pink-500",
      "bg-rose-500",
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  const sizeClasses = {
    xs: {
      container: "w-6 h-6",
      text: "text-[10px]",
      status: "w-1.5 h-1.5 border",
      icon: "text-sm",
    },
    sm: {
      container: "w-8 h-8",
      text: "text-xs",
      status: "w-2 h-2 border",
      icon: "text-base",
    },
    md: {
      container: "w-10 h-10",
      text: "text-sm",
      status: "w-2.5 h-2.5 border-2",
      icon: "text-lg",
    },
    lg: {
      container: "w-12 h-12",
      text: "text-base",
      status: "w-3 h-3 border-2",
      icon: "text-xl",
    },
    xl: {
      container: "w-16 h-16",
      text: "text-lg",
      status: "w-4 h-4 border-2",
      icon: "text-2xl",
    },
  };

  const variantClasses = {
    circle: "rounded-full",
    rounded: "rounded-lg",
    square: "rounded-none",
  };

  const statusClasses = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    away: "bg-yellow-500",
    busy: "bg-red-500",
  };

  const currentSize = sizeClasses[size];
  const borderClass = bordered ? "ring-2 ring-white dark:ring-gray-800" : "";
  const clickableClass = onClick
    ? "cursor-pointer hover:opacity-80 transition-opacity"
    : "";

  return (
    <div
      className={`
        relative inline-flex items-center justify-center shrink-0
        ${currentSize.container}
        ${variantClasses[variant]}
        ${borderClass}
        ${clickableClass}
        ${className}
      `}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {src ? (
        // Image avatar
        <img
          src={src}
          alt={alt}
          className={`
            w-full h-full object-cover
            ${variantClasses[variant]}
          `}
        />
      ) : name ? (
        // Initials avatar
        <div
          className={`
            w-full h-full flex items-center justify-center
            ${getColorFromName(name)} text-white font-semibold
            ${currentSize.text}
            ${variantClasses[variant]}
          `}
        >
          {getInitials(name)}
        </div>
      ) : (
        // Default avatar icon
        <div
          className={`
            w-full h-full flex items-center justify-center
            bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400
            ${variantClasses[variant]}
          `}
        >
          <span className={`material-icons-outlined ${currentSize.icon}`}>
            person
          </span>
        </div>
      )}

      {/* Status indicator */}
      {showStatus && status && (
        <span
          className={`
            absolute bottom-0 right-0 block rounded-full
            ${currentSize.status}
            ${statusClasses[status]}
            border-white dark:border-gray-800
          `}
        />
      )}
    </div>
  );
};

export default Avatar;
