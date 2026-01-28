'use client';

import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconClick?: () => void;
  variant?: 'default' | 'filled' | 'outlined';
  inputSize?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      onRightIconClick,
      variant = 'default',
      inputSize = 'md',
      fullWidth = false,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const baseInputClasses =
      'w-full transition-all duration-200 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variantClasses = {
      default:
        'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary/20 rounded-lg',
      filled:
        'bg-gray-100 dark:bg-gray-800 border-none focus:ring-primary/20 rounded-lg',
      outlined:
        'bg-transparent border-2 border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary/20 rounded-lg',
    };

    const sizeClasses = {
      sm: {
        input: 'py-1.5 text-sm',
        paddingLeft: leftIcon ? 'pl-9' : 'pl-3',
        paddingRight: rightIcon ? 'pr-9' : 'pr-3',
        icon: 'text-lg',
        iconLeft: 'left-2.5',
        iconRight: 'right-2.5',
      },
      md: {
        input: 'py-2 text-sm',
        paddingLeft: leftIcon ? 'pl-10' : 'pl-4',
        paddingRight: rightIcon ? 'pr-10' : 'pr-4',
        icon: 'text-xl',
        iconLeft: 'left-3',
        iconRight: 'right-3',
      },
      lg: {
        input: 'py-3 text-base',
        paddingLeft: leftIcon ? 'pl-12' : 'pl-4',
        paddingRight: rightIcon ? 'pr-12' : 'pr-4',
        icon: 'text-2xl',
        iconLeft: 'left-3.5',
        iconRight: 'right-3.5',
      },
    };

    const currentSize = sizeClasses[inputSize];

    const errorClasses = error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
      : '';

    const widthClass = fullWidth ? 'w-full' : '';

    return (
      <div className={`${widthClass} ${className}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <span
              className={`material-icons-outlined absolute ${currentSize.iconLeft} top-1/2 -translate-y-1/2 ${currentSize.icon} text-gray-400 pointer-events-none`}
            >
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            className={`
              ${baseInputClasses}
              ${variantClasses[variant]}
              ${currentSize.input}
              ${currentSize.paddingLeft}
              ${currentSize.paddingRight}
              ${errorClasses}
              text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
            `}
            {...props}
          />

          {rightIcon && (
            <button
              type="button"
              onClick={onRightIconClick}
              className={`absolute ${currentSize.iconRight} top-1/2 -translate-y-1/2 ${currentSize.icon} text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors ${onRightIconClick ? 'cursor-pointer' : 'pointer-events-none'}`}
            >
              <span className="material-icons-outlined">{rightIcon}</span>
            </button>
          )}
        </div>

        {(error || helperText) && (
          <p
            className={`mt-1.5 text-sm ${
              error ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
