"use client";

import React from "react";

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: "slash" | "chevron" | "arrow" | "dot";
  size?: "sm" | "md" | "lg";
  showHomeIcon?: boolean;
  maxItems?: number;
  className?: string;
}

interface BreadcrumbPageHeaderProps {
  items: BreadcrumbItem[];
  title: string;
  description?: string;
  separator?: "slash" | "chevron" | "arrow" | "dot";
  actions?: React.ReactNode;
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> & {
  PageHeader: React.FC<BreadcrumbPageHeaderProps>;
} = ({
  items,
  separator = "slash",
  size = "md",
  showHomeIcon = true,
  maxItems,
  className = "",
}) => {
  const separatorIcons = {
    slash: "/",
    chevron: "chevron_right",
    arrow: "arrow_forward_ios",
    dot: "•",
  };

  const sizeClasses = {
    sm: {
      text: "text-xs",
      icon: "text-sm",
      gap: "gap-1",
    },
    md: {
      text: "text-sm",
      icon: "text-base",
      gap: "gap-2",
    },
    lg: {
      text: "text-base",
      icon: "text-lg",
      gap: "gap-2",
    },
  };

  const currentSize = sizeClasses[size];

  // Handle max items with ellipsis
  let displayItems = items;
  if (maxItems && items.length > maxItems) {
    const firstItem = items[0];
    const lastItems = items.slice(-(maxItems - 1));
    displayItems = [firstItem, { label: "...", href: undefined }, ...lastItems];
  }

  const renderSeparator = () => {
    if (separator === "slash" || separator === "dot") {
      return (
        <span
          className={`text-gray-400 dark:text-gray-500 ${currentSize.text} mx-1`}
        >
          {separatorIcons[separator]}
        </span>
      );
    }
    return (
      <span
        className={`material-icons-outlined text-gray-400 dark:text-gray-500 ${currentSize.icon} mx-1`}
      >
        {separatorIcons[separator]}
      </span>
    );
  };

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol
        className={`flex items-center flex-wrap ${currentSize.gap} ${currentSize.text}`}
      >
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          const isFirst = index === 0;
          const isEllipsis = item.label === "...";

          return (
            <li key={index} className="flex items-center">
              {/* Separator (not for first item) */}
              {index > 0 && renderSeparator()}

              {/* Breadcrumb item */}
              {isEllipsis ? (
                <span className="text-gray-400 dark:text-gray-500 px-1">
                  ...
                </span>
              ) : isLast ? (
                <span
                  className="font-medium text-gray-900 dark:text-white flex items-center gap-1"
                  aria-current="page"
                >
                  {item.icon && (
                    <span
                      className={`material-icons-outlined ${currentSize.icon}`}
                    >
                      {item.icon}
                    </span>
                  )}
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href || "#"}
                  className={`
                    text-gray-500 dark:text-gray-400
                    hover:text-primary dark:hover:text-primary
                    transition-colors flex items-center gap-1
                  `}
                >
                  {isFirst && showHomeIcon && !item.icon ? (
                    <>
                      <span
                        className={`material-icons-outlined ${currentSize.icon}`}
                      >
                        home
                      </span>
                      <span className="sr-only sm:not-sr-only">
                        {item.label}
                      </span>
                    </>
                  ) : (
                    <>
                      {item.icon && (
                        <span
                          className={`material-icons-outlined ${currentSize.icon}`}
                        >
                          {item.icon}
                        </span>
                      )}
                      {item.label}
                    </>
                  )}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

// PageHeader variant with title and description
const BreadcrumbPageHeader: React.FC<BreadcrumbPageHeaderProps> = ({
  items,
  title,
  description,
  separator = "slash",
  actions,
  className = "",
}) => {
  return (
    <div
      className={`
        bg-white dark:bg-gray-800
        border-b border-gray-200 dark:border-gray-700
        ${className}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Breadcrumb */}
        <Breadcrumb
          items={items}
          separator={separator}
          size="sm"
          className="mb-2"
        />

        {/* Title and Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {title}
            </h1>
            {description && (
              <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm sm:text-base">
                {description}
              </p>
            )}
          </div>

          {actions && (
            <div className="flex items-center gap-2 shrink-0">{actions}</div>
          )}
        </div>
      </div>
    </div>
  );
};

// Assign sub-component
Breadcrumb.PageHeader = BreadcrumbPageHeader;

export default Breadcrumb;
