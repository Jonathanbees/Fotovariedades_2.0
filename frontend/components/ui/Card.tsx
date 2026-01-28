"use client";

import React from "react";

interface CardProps {
  children: React.ReactNode;
  variant?: "default" | "elevated" | "outlined" | "filled";
  padding?: "none" | "sm" | "md" | "lg";
  rounded?: "sm" | "md" | "lg" | "xl" | "2xl";
  hover?: boolean;
  clickable?: boolean;
  className?: string;
  onClick?: () => void;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center" | "right" | "between";
}

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: "1:1" | "4:3" | "16:9" | "auto";
  overlay?: boolean;
  overlayContent?: React.ReactNode;
}

// Main Card Component
const Card: React.FC<CardProps> & {
  Header: React.FC<CardHeaderProps>;
  Body: React.FC<CardBodyProps>;
  Footer: React.FC<CardFooterProps>;
  Image: React.FC<CardImageProps>;
} = ({
  children,
  variant = "default",
  padding = "none",
  rounded = "xl",
  hover = false,
  clickable = false,
  className = "",
  onClick,
}) => {
  const variantClasses = {
    default:
      "bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700",
    elevated: "bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl",
    outlined: "bg-transparent border-2 border-gray-200 dark:border-gray-700",
    filled: "bg-gray-50 dark:bg-gray-800/50",
  };

  const paddingClasses = {
    none: "",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  const roundedClasses = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
  };

  const hoverClass = hover
    ? "hover:shadow-lg hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-300"
    : "";

  const clickableClass = clickable
    ? "cursor-pointer active:scale-[0.98] transition-transform"
    : "";

  return (
    <div
      className={`
        ${variantClasses[variant]}
        ${paddingClasses[padding]}
        ${roundedClasses[rounded]}
        ${hoverClass}
        ${clickableClass}
        overflow-hidden
        ${className}
      `}
      onClick={clickable ? onClick : undefined}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
    >
      {children}
    </div>
  );
};

// Card Header Component
const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = "",
  action,
}) => {
  return (
    <div
      className={`
        flex items-center justify-between gap-4
        px-4 py-3 border-b border-gray-100 dark:border-gray-700
        ${className}
      `}
    >
      <div className="flex-1 font-semibold text-gray-900 dark:text-white">
        {children}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};

// Card Body Component
const CardBody: React.FC<CardBodyProps> = ({ children, className = "" }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};

// Card Footer Component
const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = "",
  align = "right",
}) => {
  const alignClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
    between: "justify-between",
  };

  return (
    <div
      className={`
        flex items-center gap-3
        px-4 py-3 border-t border-gray-100 dark:border-gray-700
        ${alignClasses[align]}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

// Card Image Component
const CardImage: React.FC<CardImageProps> = ({
  src,
  alt,
  className = "",
  aspectRatio = "auto",
  overlay = false,
  overlayContent,
}) => {
  const aspectRatioClasses = {
    "1:1": "aspect-square",
    "4:3": "aspect-[4/3]",
    "16:9": "aspect-video",
    auto: "",
  };

  return (
    <div
      className={`relative overflow-hidden ${aspectRatioClasses[aspectRatio]} ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
          {overlayContent && (
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              {overlayContent}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Assign sub-components
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Image = CardImage;

export default Card;
