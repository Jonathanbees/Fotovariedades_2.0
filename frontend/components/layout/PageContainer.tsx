"use client";

import React from "react";

interface PageContainerProps {
  children: React.ReactNode;
  variant?: "default" | "full" | "narrow" | "wide";
  padding?: "none" | "sm" | "md" | "lg";
  background?: "default" | "gray" | "white" | "transparent";
  className?: string;
}

interface PageSectionProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  titleAlign?: "left" | "center" | "right";
  padding?: "none" | "sm" | "md" | "lg";
  background?: "default" | "gray" | "white" | "dark";
  divider?: boolean;
  id?: string;
  className?: string;
  action?: React.ReactNode;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb?: React.ReactNode;
  actions?: React.ReactNode;
  background?: "default" | "gradient" | "image";
  backgroundImage?: string;
  className?: string;
}

const PageContainer: React.FC<PageContainerProps> & {
  Section: React.FC<PageSectionProps>;
  Header: React.FC<PageHeaderProps>;
} = ({
  children,
  variant = "default",
  padding = "md",
  background = "default",
  className = "",
}) => {
  const variantClasses = {
    default: "max-w-7xl mx-auto",
    full: "w-full",
    narrow: "max-w-3xl mx-auto",
    wide: "max-w-screen-2xl mx-auto",
  };

  const paddingClasses = {
    none: "",
    sm: "px-4 py-4 sm:px-6",
    md: "px-4 py-6 sm:px-6 lg:px-8",
    lg: "px-4 py-8 sm:px-6 lg:px-8",
  };

  const backgroundClasses = {
    default: "bg-gray-50 dark:bg-gray-900",
    gray: "bg-gray-100 dark:bg-gray-800",
    white: "bg-white dark:bg-gray-900",
    transparent: "bg-transparent",
  };

  return (
    <main
      className={`
        min-h-screen
        ${backgroundClasses[background]}
        ${className}
      `}
    >
      <div
        className={`
          ${variantClasses[variant]}
          ${paddingClasses[padding]}
        `}
      >
        {children}
      </div>
    </main>
  );
};

// Page Section Component
const PageSection: React.FC<PageSectionProps> = ({
  children,
  title,
  subtitle,
  titleAlign = "left",
  padding = "md",
  background = "default",
  divider = false,
  id,
  className = "",
  action,
}) => {
  const paddingClasses = {
    none: "",
    sm: "py-6",
    md: "py-10",
    lg: "py-16",
  };

  const backgroundClasses = {
    default: "",
    gray: "bg-gray-50 dark:bg-gray-800/50",
    white: "bg-white dark:bg-gray-900",
    dark: "bg-gray-900 dark:bg-gray-950 text-white",
  };

  const titleAlignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <section
      id={id}
      className={`
        ${paddingClasses[padding]}
        ${backgroundClasses[background]}
        ${divider ? "border-t border-gray-200 dark:border-gray-700" : ""}
        ${className}
      `}
    >
      {(title || subtitle || action) && (
        <div
          className={`
            mb-8
            ${titleAlignClasses[titleAlign]}
            ${action ? "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" : ""}
          `}
        >
          <div>
            {title && (
              <h2
                className={`
                  text-2xl sm:text-3xl font-bold
                  ${background === "dark" ? "text-white" : "text-gray-900 dark:text-white"}
                `}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className={`
                  mt-2 text-base sm:text-lg
                  ${background === "dark" ? "text-gray-300" : "text-gray-600 dark:text-gray-400"}
                `}
              >
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </section>
  );
};

// Page Header Component
const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  breadcrumb,
  actions,
  background = "default",
  backgroundImage,
  className = "",
}) => {
  const backgroundClasses = {
    default: "bg-white dark:bg-gray-900",
    gradient:
      "bg-gradient-to-r from-primary via-pink-500 to-purple-600 text-white",
    image: "bg-cover bg-center bg-no-repeat",
  };

  return (
    <header
      className={`
        relative overflow-hidden
        ${backgroundClasses[background]}
        ${background === "default" ? "border-b border-gray-200 dark:border-gray-800" : ""}
        ${className}
      `}
      style={
        background === "image" && backgroundImage
          ? { backgroundImage: `url(${backgroundImage})` }
          : undefined
      }
    >
      {/* Overlay for image background */}
      {background === "image" && (
        <div className="absolute inset-0 bg-black/50" />
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        {breadcrumb && <div className="mb-4">{breadcrumb}</div>}

        {/* Title and actions row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1
              className={`
                text-3xl sm:text-4xl font-bold
                ${
                  background === "default"
                    ? "text-gray-900 dark:text-white"
                    : "text-white"
                }
              `}
            >
              {title}
            </h1>
            {subtitle && (
              <p
                className={`
                  mt-2 text-base sm:text-lg max-w-2xl
                  ${
                    background === "default"
                      ? "text-gray-600 dark:text-gray-400"
                      : "text-white/80"
                  }
                `}
              >
                {subtitle}
              </p>
            )}
          </div>

          {actions && (
            <div className="flex items-center gap-3 shrink-0">{actions}</div>
          )}
        </div>
      </div>

      {/* Decorative elements for gradient background */}
      {background === "gradient" && (
        <>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
        </>
      )}
    </header>
  );
};

// Two-column layout helper
interface TwoColumnLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  sidebarPosition?: "left" | "right";
  sidebarWidth?: "sm" | "md" | "lg";
  gap?: "sm" | "md" | "lg";
  stickyTop?: boolean;
  className?: string;
}

export const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({
  children,
  sidebar,
  sidebarPosition = "left",
  sidebarWidth = "md",
  gap = "md",
  stickyTop = false,
  className = "",
}) => {
  const gapClasses = {
    sm: "gap-4",
    md: "gap-6 lg:gap-8",
    lg: "gap-8 lg:gap-12",
  };

  const sidebarWidthClasses = {
    sm: "w-full md:w-48 lg:w-56",
    md: "w-full md:w-56 lg:w-64",
    lg: "w-full md:w-64 lg:w-80",
  };

  return (
    <div
      className={`
        flex flex-col md:flex-row
        ${gapClasses[gap]}
        ${className}
      `}
    >
      {/* Sidebar */}
      <aside
        className={`
          ${sidebarWidthClasses[sidebarWidth]}
          shrink-0
          ${sidebarPosition === "right" ? "md:order-last" : ""}
        `}
      >
        <div className={stickyTop ? "md:sticky md:top-24" : ""}>{sidebar}</div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
};

// Grid layout helper
interface GridLayoutProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: "sm" | "md" | "lg";
  className?: string;
}

export const GridLayout: React.FC<GridLayoutProps> = ({
  children,
  columns = 3,
  gap = "md",
  className = "",
}) => {
  const columnClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
    6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6",
  };

  const gapClasses = {
    sm: "gap-3",
    md: "gap-4 lg:gap-6",
    lg: "gap-6 lg:gap-8",
  };

  return (
    <div
      className={`
        grid
        ${columnClasses[columns]}
        ${gapClasses[gap]}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

// Assign sub-components
PageContainer.Section = PageSection;
PageContainer.Header = PageHeader;

export default PageContainer;
