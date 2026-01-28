'use client';

import React, { useState, useRef, useEffect } from 'react';

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  variant?: 'default' | 'filled' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  autoFocus?: boolean;
  showClearButton?: boolean;
  isLoading?: boolean;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Buscar...',
  value: controlledValue,
  onChange,
  onSearch,
  onClear,
  variant = 'default',
  size = 'md',
  fullWidth = false,
  autoFocus = false,
  showClearButton = true,
  isLoading = false,
  className = '',
}) => {
  const [internalValue, setInternalValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch?.(value);
    }
    if (e.key === 'Escape') {
      handleClear();
    }
  };

  const handleClear = () => {
    if (controlledValue === undefined) {
      setInternalValue('');
    }
    onClear?.();
    inputRef.current?.focus();
  };

  const handleSearchClick = () => {
    onSearch?.(value);
  };

  const variantClasses = {
    default:
      'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20',
    filled:
      'bg-gray-100 dark:bg-gray-800 border border-transparent focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20',
    minimal:
      'bg-transparent border-b-2 border-gray-300 dark:border-gray-600 rounded-none focus-within:border-primary',
  };

  const sizeClasses = {
    sm: {
      container: 'h-8',
      input: 'text-sm pl-8 pr-8',
      iconLeft: 'left-2 text-lg',
      iconRight: 'right-2 text-lg',
    },
    md: {
      container: 'h-10',
      input: 'text-sm pl-10 pr-10',
      iconLeft: 'left-3 text-xl',
      iconRight: 'right-3 text-xl',
    },
    lg: {
      container: 'h-12',
      input: 'text-base pl-12 pr-12',
      iconLeft: 'left-4 text-2xl',
      iconRight: 'right-4 text-2xl',
    },
  };

  const currentSize = sizeClasses[size];
  const roundedClass = variant === 'minimal' ? '' : 'rounded-full';
  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <div
      className={`
        relative flex items-center transition-all duration-200
        ${variantClasses[variant]}
        ${roundedClass}
        ${currentSize.container}
        ${widthClass}
        ${className}
      `}
    >
      {/* Search Icon */}
      <span
        className={`
          material-icons-outlined absolute ${currentSize.iconLeft} text-gray-400 pointer-events-none
        `}
      >
        search
      </span>

      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={`
          w-full h-full bg-transparent border-none outline-none
          text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
          ${currentSize.input}
          ${roundedClass}
        `}
      />

      {/* Right side: Clear button or Loading spinner */}
      <div className={`absolute ${currentSize.iconRight} flex items-center gap-1`}>
        {isLoading ? (
          <svg
            className="animate-spin h-4 w-4 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <>
            {showClearButton && value && (
              <button
                type="button"
                onClick={handleClear}
                className="p-0.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <span className="material-icons-outlined text-lg">close</span>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
