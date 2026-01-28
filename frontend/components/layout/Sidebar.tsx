"use client";

import React, { useState } from "react";
import Logo from "../ui/Logo";

export interface SidebarNavItem {
  label: string;
  href: string;
  icon: string;
  isActive?: boolean;
  badge?: string | number;
  badgeColor?: "primary" | "danger" | "warning" | "success";
}

export interface SidebarNavGroup {
  title?: string;
  items: SidebarNavItem[];
}

export interface SidebarFilterSection {
  title: string;
  type: "checkbox" | "radio" | "range" | "custom";
  options?: {
    label: string;
    value: string;
    count?: number;
    checked?: boolean;
  }[];
  rangeConfig?: {
    min: number;
    max: number;
    step?: number;
    unit?: string;
  };
  customContent?: React.ReactNode;
}

export interface SidebarProps {
  variant?: "admin" | "filter" | "navigation";
  navGroups?: SidebarNavGroup[];
  filterSections?: SidebarFilterSection[];
  showLogo?: boolean;
  title?: string;
  subtitle?: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  width?: "sm" | "md" | "lg";
  position?: "left" | "right";
  footer?: React.ReactNode;
  onFilterChange?: (sectionTitle: string, values: string[]) => void;
  onRangeChange?: (sectionTitle: string, min: number, max: number) => void;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  variant = "navigation",
  navGroups = [],
  filterSections = [],
  showLogo = true,
  title,
  subtitle,
  collapsible = false,
  defaultCollapsed = false,
  width = "md",
  position = "left",
  footer,
  onFilterChange,
  onRangeChange,
  className = "",
}) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [filterValues, setFilterValues] = useState<Record<string, string[]>>(
    {},
  );
  const [rangeValues, setRangeValues] = useState<
    Record<string, { min: number; max: number }>
  >({});

  const widthClasses = {
    sm: isCollapsed ? "w-16" : "w-48",
    md: isCollapsed ? "w-16" : "w-64",
    lg: isCollapsed ? "w-20" : "w-80",
  };

  const handleCheckboxChange = (
    sectionTitle: string,
    value: string,
    checked: boolean,
  ) => {
    setFilterValues((prev) => {
      const currentValues = prev[sectionTitle] || [];
      const newValues = checked
        ? [...currentValues, value]
        : currentValues.filter((v) => v !== value);
      onFilterChange?.(sectionTitle, newValues);
      return { ...prev, [sectionTitle]: newValues };
    });
  };

  const handleRangeChange = (
    sectionTitle: string,
    type: "min" | "max",
    value: number,
  ) => {
    setRangeValues((prev) => {
      const current = prev[sectionTitle] || { min: 0, max: 0 };
      const newRange = { ...current, [type]: value };
      return { ...prev, [sectionTitle]: newRange };
    });
  };

  const applyRangeFilter = (sectionTitle: string) => {
    const range = rangeValues[sectionTitle];
    if (range) {
      onRangeChange?.(sectionTitle, range.min, range.max);
    }
  };

  // Admin variant - dark sidebar with navigation
  if (variant === "admin") {
    return (
      <aside
        className={`
          ${widthClasses[width]}
          shrink-0 flex flex-col
          bg-gray-900 dark:bg-gray-950
          border-r border-gray-800
          transition-all duration-300 ease-in-out
          ${position === "right" ? "order-last border-l border-r-0" : ""}
          ${className}
        `}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-800">
          {showLogo && !isCollapsed ? (
            <div className="flex flex-col">
              <Logo variant="white" size="sm" showSubtitle={false} />
              {subtitle && (
                <p className="text-green-400/70 text-xs font-medium tracking-wide mt-1 uppercase">
                  {subtitle}
                </p>
              )}
            </div>
          ) : showLogo && isCollapsed ? (
            <div className="flex justify-center">
              <span className="material-icons text-primary text-2xl">
                camera
              </span>
            </div>
          ) : title && !isCollapsed ? (
            <h2 className="text-white font-bold text-lg">{title}</h2>
          ) : null}

          {/* Collapse button */}
          {collapsible && (
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="absolute top-4 -right-3 bg-gray-800 border border-gray-700 rounded-full p-1 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
            >
              <span className="material-icons text-sm">
                {isCollapsed ? "chevron_right" : "chevron_left"}
              </span>
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-1 px-3 py-4 overflow-y-auto">
          {navGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="space-y-1">
              {group.title && !isCollapsed && (
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wider px-3 pt-4 pb-2">
                  {group.title}
                </p>
              )}
              {groupIndex > 0 && (
                <div className="my-2 border-t border-gray-800" />
              )}
              {group.items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                    ${
                      item.isActive
                        ? "bg-primary/20 text-primary border border-primary/10"
                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                    }
                    ${isCollapsed ? "justify-center" : ""}
                  `}
                  title={isCollapsed ? item.label : undefined}
                >
                  <span
                    className={`material-symbols-outlined text-xl ${
                      item.isActive
                        ? "text-primary"
                        : "group-hover:text-primary"
                    }`}
                  >
                    {item.icon}
                  </span>
                  {!isCollapsed && (
                    <>
                      <span className="text-sm font-medium flex-1">
                        {item.label}
                      </span>
                      {item.badge && (
                        <span
                          className={`
                            px-2 py-0.5 text-xs font-bold rounded-full
                            ${
                              item.badgeColor === "danger"
                                ? "bg-red-500/20 text-red-400"
                                : item.badgeColor === "warning"
                                  ? "bg-orange-500/20 text-orange-400"
                                  : item.badgeColor === "success"
                                    ? "bg-green-500/20 text-green-400"
                                    : "bg-primary/20 text-primary"
                            }
                          `}
                        >
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </a>
              ))}
            </div>
          ))}
        </nav>

        {/* Footer */}
        {footer && <div className="p-3 border-t border-gray-800">{footer}</div>}
      </aside>
    );
  }

  // Filter variant - for product filtering
  if (variant === "filter") {
    return (
      <aside
        className={`
          ${widthClasses[width]}
          shrink-0 space-y-6
          ${position === "right" ? "order-last" : ""}
          ${className}
        `}
      >
        {title && (
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <button
              onClick={() => {
                setFilterValues({});
                setRangeValues({});
              }}
              className="text-sm text-primary hover:underline"
            >
              Limpiar todo
            </button>
          </div>
        )}

        {filterSections.map((section, index) => (
          <div
            key={section.title}
            className={
              index > 0
                ? "pt-6 border-t border-gray-200 dark:border-gray-700"
                : ""
            }
          >
            <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
              {section.title}
            </h4>

            {/* Checkbox options */}
            {section.type === "checkbox" && section.options && (
              <div className="space-y-2">
                {section.options.map((option) => {
                  const isChecked =
                    filterValues[section.title]?.includes(option.value) ||
                    option.checked;
                  return (
                    <label
                      key={option.value}
                      className="flex items-center justify-between cursor-pointer group"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) =>
                            handleCheckboxChange(
                              section.title,
                              option.value,
                              e.target.checked,
                            )
                          }
                          className="rounded text-primary focus:ring-primary border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                        />
                        <span
                          className={`text-sm ${
                            isChecked
                              ? "text-primary font-medium"
                              : "text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
                          }`}
                        >
                          {option.label}
                        </span>
                      </div>
                      {option.count !== undefined && (
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            isChecked
                              ? "bg-primary text-white"
                              : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          {option.count}
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>
            )}

            {/* Radio options */}
            {section.type === "radio" && section.options && (
              <div className="space-y-2">
                {section.options.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <input
                      type="radio"
                      name={section.title}
                      checked={
                        filterValues[section.title]?.[0] === option.value
                      }
                      onChange={() => {
                        setFilterValues((prev) => ({
                          ...prev,
                          [section.title]: [option.value],
                        }));
                        onFilterChange?.(section.title, [option.value]);
                      }}
                      className="text-primary focus:ring-primary border-gray-300 dark:border-gray-600"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            )}

            {/* Range filter */}
            {section.type === "range" && section.rangeConfig && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="sr-only">Mínimo</label>
                    <input
                      type="number"
                      placeholder={`${section.rangeConfig.unit || "$"} Min`}
                      min={section.rangeConfig.min}
                      max={section.rangeConfig.max}
                      step={section.rangeConfig.step || 1}
                      value={rangeValues[section.title]?.min || ""}
                      onChange={(e) =>
                        handleRangeChange(
                          section.title,
                          "min",
                          Number(e.target.value),
                        )
                      }
                      className="w-full rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm focus:ring-primary focus:border-primary dark:text-white"
                    />
                  </div>
                  <span className="text-gray-400">-</span>
                  <div className="flex-1">
                    <label className="sr-only">Máximo</label>
                    <input
                      type="number"
                      placeholder={`${section.rangeConfig.unit || "$"} Max`}
                      min={section.rangeConfig.min}
                      max={section.rangeConfig.max}
                      step={section.rangeConfig.step || 1}
                      value={rangeValues[section.title]?.max || ""}
                      onChange={(e) =>
                        handleRangeChange(
                          section.title,
                          "max",
                          Number(e.target.value),
                        )
                      }
                      className="w-full rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm focus:ring-primary focus:border-primary dark:text-white"
                    />
                  </div>
                </div>
                <button
                  onClick={() => applyRangeFilter(section.title)}
                  className="w-full py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-sm font-medium rounded-lg transition-colors text-gray-800 dark:text-gray-200"
                >
                  Aplicar
                </button>
              </div>
            )}

            {/* Custom content */}
            {section.type === "custom" && section.customContent}
          </div>
        ))}

        {/* Additional promotional content */}
        {footer && (
          <div className="bg-gray-900 dark:bg-gray-800 rounded-xl p-4 text-white space-y-2">
            {footer}
          </div>
        )}
      </aside>
    );
  }

  // Navigation variant - simple sidebar navigation (light mode)
  return (
    <aside
      className={`
        ${widthClasses[width]}
        shrink-0 flex flex-col
        bg-white dark:bg-gray-800
        border-r border-gray-200 dark:border-gray-700
        transition-all duration-300 ease-in-out
        ${position === "right" ? "order-last border-l border-r-0" : ""}
        ${className}
      `}
    >
      {/* Header */}
      {(showLogo || title) && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          {showLogo && !isCollapsed && <Logo size="sm" />}
          {title && !isCollapsed && !showLogo && (
            <h2 className="text-gray-900 dark:text-white font-bold text-lg">
              {title}
            </h2>
          )}
          {subtitle && !isCollapsed && (
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1 px-3 py-4 overflow-y-auto">
        {navGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="space-y-1">
            {group.title && !isCollapsed && (
              <p className="text-gray-400 dark:text-gray-500 text-xs font-medium uppercase tracking-wider px-3 pt-4 pb-2">
                {group.title}
              </p>
            )}
            {groupIndex > 0 && (
              <div className="my-2 border-t border-gray-200 dark:border-gray-700" />
            )}
            {group.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                  ${
                    item.isActive
                      ? "bg-primary/10 text-primary"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                  }
                  ${isCollapsed ? "justify-center" : ""}
                `}
                title={isCollapsed ? item.label : undefined}
              >
                <span
                  className={`material-icons-outlined text-xl ${
                    item.isActive ? "text-primary" : ""
                  }`}
                >
                  {item.icon}
                </span>
                {!isCollapsed && (
                  <>
                    <span className="text-sm font-medium flex-1">
                      {item.label}
                    </span>
                    {item.badge && (
                      <span
                        className={`
                          px-2 py-0.5 text-xs font-bold rounded-full
                          ${
                            item.badgeColor === "danger"
                              ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                              : item.badgeColor === "warning"
                                ? "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
                                : item.badgeColor === "success"
                                  ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                                  : "bg-primary/10 text-primary"
                          }
                        `}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </a>
            ))}
          </div>
        ))}
      </nav>

      {/* Footer */}
      {footer && (
        <div className="p-3 border-t border-gray-200 dark:border-gray-700">
          {footer}
        </div>
      )}

      {/* Collapse toggle */}
      {collapsible && (
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-3 border-t border-gray-200 dark:border-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex items-center justify-center gap-2"
        >
          <span className="material-icons text-sm">
            {isCollapsed ? "chevron_right" : "chevron_left"}
          </span>
          {!isCollapsed && <span className="text-sm">Colapsar</span>}
        </button>
      )}
    </aside>
  );
};

export default Sidebar;
