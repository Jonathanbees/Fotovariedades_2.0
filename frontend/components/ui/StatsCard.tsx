'use client';

import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: {
    value: number | string;
    direction: 'up' | 'down' | 'neutral';
    label?: string;
  };
  variant?: 'default' | 'primary' | 'warning' | 'success' | 'danger';
  action?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  trend,
  variant = 'default',
  action,
  className = '',
}) => {
  const variantClasses = {
    default: {
      border: 'border-gray-200 dark:border-gray-700',
      iconBg: 'bg-gray-100 dark:bg-gray-700',
      iconText: 'text-gray-600 dark:text-gray-300',
      bgIcon: 'text-gray-400',
    },
    primary: {
      border: 'border-primary/20',
      iconBg: 'bg-primary/10',
      iconText: 'text-primary',
      bgIcon: 'text-primary',
    },
    warning: {
      border: 'border-orange-500/20',
      iconBg: 'bg-orange-500/10',
      iconText: 'text-orange-500',
      bgIcon: 'text-orange-500',
    },
    success: {
      border: 'border-green-500/20',
      iconBg: 'bg-green-500/10',
      iconText: 'text-green-500',
      bgIcon: 'text-green-500',
    },
    danger: {
      border: 'border-red-500/20',
      iconBg: 'bg-red-500/10',
      iconText: 'text-red-500',
      bgIcon: 'text-red-500',
    },
  };

  const currentVariant = variantClasses[variant];

  const trendClasses = {
    up: {
      bg: 'bg-green-500/20',
      text: 'text-green-500',
      icon: 'trending_up',
    },
    down: {
      bg: 'bg-red-500/20',
      text: 'text-red-500',
      icon: 'trending_down',
    },
    neutral: {
      bg: 'bg-gray-500/20',
      text: 'text-gray-500',
      icon: 'trending_flat',
    },
  };

  return (
    <div
      className={`
        bg-white dark:bg-gray-800 p-5 rounded-xl
        border ${currentVariant.border}
        flex flex-col gap-4 relative overflow-hidden group
        transition-shadow duration-300 hover:shadow-lg
        ${className}
      `}
    >
      {/* Background decoration icon */}
      <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
        <span className={`material-symbols-outlined text-7xl ${currentVariant.bgIcon}`}>
          {icon}
        </span>
      </div>

      {/* Header */}
      <div className="flex justify-between items-start z-10">
        <div className="flex-1">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">
            {title}
          </p>
          <h3 className="text-gray-900 dark:text-white text-2xl font-bold">
            {value}
          </h3>
        </div>

        {/* Icon */}
        <span
          className={`
            material-symbols-outlined ${currentVariant.iconText} ${currentVariant.iconBg}
            p-2 rounded-lg text-xl
          `}
        >
          {icon}
        </span>
      </div>

      {/* Footer - Trend or Action */}
      <div className="flex items-center gap-2 mt-auto z-10">
        {trend && (
          <>
            <span
              className={`
                ${trendClasses[trend.direction].bg} ${trendClasses[trend.direction].text}
                text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1
              `}
            >
              <span className="material-symbols-outlined text-sm">
                {trendClasses[trend.direction].icon}
              </span>
              {trend.value}
            </span>
            {trend.label && (
              <span className="text-gray-400 dark:text-gray-500 text-xs">
                {trend.label}
              </span>
            )}
          </>
        )}

        {action && !trend && (
          action.href ? (
            <a
              href={action.href}
              className={`
                ${currentVariant.iconText} text-xs font-bold
                hover:underline flex items-center gap-1 transition-colors
              `}
            >
              {action.label}
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          ) : (
            <button
              onClick={action.onClick}
              className={`
                ${currentVariant.iconText} text-xs font-bold
                hover:underline flex items-center gap-1 transition-colors
              `}
            >
              {action.label}
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default StatsCard;
