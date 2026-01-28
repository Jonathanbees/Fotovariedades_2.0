'use client';

import React from 'react';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  variant?: 'default' | 'compact' | 'detailed';
  color?: 'blue' | 'purple' | 'green' | 'orange' | 'pink' | 'teal' | 'indigo' | 'gray';
  features?: string[];
  action?: {
    label: string;
    onClick?: () => void;
    href?: string;
    variant?: 'primary' | 'secondary' | 'outline';
  };
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  variant = 'default',
  color = 'blue',
  features,
  action,
  className = '',
}) => {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      text: 'text-blue-600 dark:text-blue-400',
      accent: 'bg-blue-500',
    },
    purple: {
      bg: 'bg-purple-100 dark:bg-purple-900/30',
      text: 'text-purple-600 dark:text-purple-400',
      accent: 'bg-purple-500',
    },
    green: {
      bg: 'bg-green-100 dark:bg-green-900/30',
      text: 'text-green-600 dark:text-green-400',
      accent: 'bg-green-500',
    },
    orange: {
      bg: 'bg-orange-100 dark:bg-orange-900/30',
      text: 'text-orange-600 dark:text-orange-400',
      accent: 'bg-orange-500',
    },
    pink: {
      bg: 'bg-pink-100 dark:bg-pink-900/30',
      text: 'text-pink-600 dark:text-pink-400',
      accent: 'bg-pink-500',
    },
    teal: {
      bg: 'bg-teal-100 dark:bg-teal-900/30',
      text: 'text-teal-600 dark:text-teal-400',
      accent: 'bg-teal-500',
    },
    indigo: {
      bg: 'bg-indigo-100 dark:bg-indigo-900/30',
      text: 'text-indigo-600 dark:text-indigo-400',
      accent: 'bg-indigo-500',
    },
    gray: {
      bg: 'bg-gray-100 dark:bg-gray-900/30',
      text: 'text-gray-600 dark:text-gray-400',
      accent: 'bg-gray-500',
    },
  };

  const currentColor = colorClasses[color];

  const actionButtonClasses = {
    primary: 'bg-primary text-white hover:bg-primary/90',
    secondary: 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700',
    outline: 'border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-primary hover:text-primary',
  };

  // Compact variant - smaller, icon + text horizontal
  if (variant === 'compact') {
    return (
      <div
        className={`
          bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm
          border border-gray-100 dark:border-gray-700
          hover:shadow-md hover:border-primary/30 dark:hover:border-primary/30
          transition-all duration-300 text-center group
          ${className}
        `}
      >
        <span className={`material-icons text-3xl ${currentColor.text} mb-2 block`}>
          {icon}
        </span>
        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
          {title}
        </h4>
        {description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {description}
          </p>
        )}
      </div>
    );
  }

  // Detailed variant - larger with features and action button
  if (variant === 'detailed') {
    return (
      <div
        className={`
          group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg
          border border-gray-100 dark:border-gray-700
          hover:shadow-xl transition-all duration-300 overflow-hidden
          ${className}
        `}
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <span className={`material-icons text-8xl ${currentColor.text}`}>
            {icon}
          </span>
        </div>

        <div className="p-6 relative z-10">
          {/* Icon */}
          <div
            className={`
              w-14 h-14 ${currentColor.bg} rounded-2xl
              flex items-center justify-center mb-5
              group-hover:scale-110 transition-transform duration-300
            `}
          >
            <span className={`material-icons text-2xl ${currentColor.text}`}>
              {icon}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
            {description}
          </p>

          {/* Features */}
          {features && features.length > 0 && (
            <ul className="space-y-2 mb-6">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"
                >
                  <span className="material-icons text-green-500 text-sm">
                    check_circle
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          )}

          {/* Action Button */}
          {action && (
            action.href ? (
              <a
                href={action.href}
                className={`
                  block w-full py-2.5 text-center font-semibold rounded-lg
                  transition-all duration-200
                  ${actionButtonClasses[action.variant || 'secondary']}
                `}
              >
                {action.label}
              </a>
            ) : (
              <button
                onClick={action.onClick}
                className={`
                  w-full py-2.5 font-semibold rounded-lg
                  transition-all duration-200
                  ${actionButtonClasses[action.variant || 'secondary']}
                `}
              >
                {action.label}
              </button>
            )
          )}
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div
      className={`
        p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/50
        border border-gray-100 dark:border-gray-700
        hover:border-primary/50 dark:hover:border-primary/50
        hover:shadow-md transition-all duration-300 group text-center
        ${className}
      `}
    >
      {/* Icon */}
      <div
        className={`
          w-14 h-14 mx-auto ${currentColor.bg} rounded-full
          flex items-center justify-center mb-4
          group-hover:scale-110 transition-transform duration-300
        `}
      >
        <span className={`material-icons-outlined text-2xl ${currentColor.text}`}>
          {icon}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
        {description}
      </p>

      {/* Action (if provided) */}
      {action && (
        action.href ? (
          <a
            href={action.href}
            className={`
              inline-block mt-4 px-4 py-2 text-sm font-medium rounded-lg
              transition-all duration-200
              ${actionButtonClasses[action.variant || 'outline']}
            `}
          >
            {action.label}
          </a>
        ) : (
          <button
            onClick={action.onClick}
            className={`
              mt-4 px-4 py-2 text-sm font-medium rounded-lg
              transition-all duration-200
              ${actionButtonClasses[action.variant || 'outline']}
            `}
          >
            {action.label}
          </button>
        )
      )}
    </div>
  );
};

export default ServiceCard;
