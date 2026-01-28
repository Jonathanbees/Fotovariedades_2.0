"use client";

import React from "react";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  variant?: "default" | "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  badge?: number | string;
  badgeColor?: "primary" | "secondary" | "danger" | "success";
  tooltip?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  variant = "default",
  size = "md",
  badge,
  badgeColor = "primary",
  tooltip,
  className = "",
  ...props
}) => {
  const baseClasses =
    "relative inline-flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    default:
      "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white focus:ring-gray-500",
    primary:
      "bg-primary text-white hover:bg-primary/90 focus:ring-primary shadow-md hover:shadow-lg",
    ghost:
      "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white focus:ring-gray-500",
    outline:
      "border-2 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-primary hover:text-primary focus:ring-primary",
  };

  const sizeClasses = {
    sm: "p-1.5",
    md: "p-2",
    lg: "p-3",
  };

  const iconSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  const badgeColorClasses = {
    primary: "bg-primary text-white",
    secondary: "bg-pink-500 text-white",
    danger: "bg-red-500 text-white",
    success: "bg-green-500 text-white",
  };

  const badgeSizeClasses = {
    sm: "h-3.5 min-w-[0.875rem] text-[9px] -top-0.5 -right-0.5",
    md: "h-4 min-w-[1rem] text-[10px] -top-1 -right-1",
    lg: "h-5 min-w-[1.25rem] text-xs -top-1 -right-1",
  };

  return (
    <button
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      title={tooltip}
      {...props}
    >
      <span
        className={`material-icons-outlined ${iconSizeClasses[size]} block`}
      >
        {icon}
      </span>

      {badge !== undefined && (
        <span
          className={`
            absolute flex items-center justify-center rounded-full font-bold px-1
            ${badgeColorClasses[badgeColor]}
            ${badgeSizeClasses[size]}
          `}
        >
          {badge}
        </span>
      )}
    </button>
  );
};

export default IconButton;
