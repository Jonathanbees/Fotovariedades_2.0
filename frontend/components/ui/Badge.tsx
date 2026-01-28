"use client";

import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "info";
  size?: "sm" | "md" | "lg";
  rounded?: "default" | "full";
  dot?: boolean;
  removable?: boolean;
  onRemove?: () => void;
  icon?: string;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  size = "md",
  rounded = "full",
  dot = false,
  removable = false,
  onRemove,
  icon,
  className = "",
}) => {
  const variantClasses = {
    default: "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300",
    primary: "bg-primary/10 text-primary",
    secondary:
      "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400",
    success:
      "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
    warning:
      "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
    danger: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
    info: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
  };

  const sizeClasses = {
    sm: {
      padding: "px-2 py-0.5",
      text: "text-xs",
      icon: "text-xs",
      dot: "w-1.5 h-1.5",
      removeBtn: "ml-1 -mr-0.5",
    },
    md: {
      padding: "px-2.5 py-1",
      text: "text-xs",
      icon: "text-sm",
      dot: "w-2 h-2",
      removeBtn: "ml-1.5 -mr-1",
    },
    lg: {
      padding: "px-3 py-1.5",
      text: "text-sm",
      icon: "text-base",
      dot: "w-2.5 h-2.5",
      removeBtn: "ml-2 -mr-1",
    },
  };

  const roundedClasses = {
    default: "rounded-md",
    full: "rounded-full",
  };

  const dotColorClasses = {
    default: "bg-gray-500",
    primary: "bg-primary",
    secondary: "bg-pink-500",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    danger: "bg-red-500",
    info: "bg-blue-500",
  };

  const currentSize = sizeClasses[size];

  return (
    <span
      className={`
        inline-flex items-center font-medium
        ${variantClasses[variant]}
        ${currentSize.padding}
        ${currentSize.text}
        ${roundedClasses[rounded]}
        ${className}
      `}
    >
      {/* Dot indicator */}
      {dot && (
        <span
          className={`
            ${currentSize.dot}
            ${dotColorClasses[variant]}
            rounded-full mr-1.5 shrink-0
          `}
        />
      )}

      {/* Left icon */}
      {icon && !dot && (
        <span
          className={`
            material-icons-outlined ${currentSize.icon} mr-1 shrink-0
          `}
        >
          {icon}
        </span>
      )}

      {/* Content */}
      <span className="truncate">{children}</span>

      {/* Remove button */}
      {removable && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          className={`
            ${currentSize.removeBtn}
            inline-flex items-center justify-center
            hover:bg-black/10 dark:hover:bg-white/10
            rounded-full p-0.5 transition-colors
            focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-current
          `}
        >
          <span className={`material-icons-outlined ${currentSize.icon}`}>
            close
          </span>
        </button>
      )}
    </span>
  );
};

// Numeric Badge variant - for counts/notifications
interface NumericBadgeProps {
  count: number;
  max?: number;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  showZero?: boolean;
  className?: string;
}

export const NumericBadge: React.FC<NumericBadgeProps> = ({
  count,
  max = 99,
  variant = "primary",
  size = "md",
  showZero = false,
  className = "",
}) => {
  if (count === 0 && !showZero) {
    return null;
  }

  const displayCount = count > max ? `${max}+` : count.toString();

  const variantClasses = {
    primary: "bg-primary text-white",
    secondary: "bg-pink-500 text-white",
    danger: "bg-red-500 text-white",
  };

  const sizeClasses = {
    sm: "min-w-[1rem] h-4 text-[10px] px-1",
    md: "min-w-[1.25rem] h-5 text-xs px-1.5",
    lg: "min-w-[1.5rem] h-6 text-sm px-2",
  };

  return (
    <span
      className={`
        inline-flex items-center justify-center
        font-bold rounded-full
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {displayCount}
    </span>
  );
};

export default Badge;
