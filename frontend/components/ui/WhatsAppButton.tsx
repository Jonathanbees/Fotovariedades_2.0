'use client';

import React from 'react';

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
  variant?: 'floating' | 'inline' | 'compact';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  showLabel?: boolean;
  position?: 'bottom-right' | 'bottom-left';
  className?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber,
  message = '',
  variant = 'floating',
  size = 'md',
  label = 'Escríbenos por WhatsApp',
  showLabel = false,
  position = 'bottom-right',
  className = '',
}) => {
  // Format phone number (remove any non-numeric characters)
  const formattedPhone = phoneNumber.replace(/\D/g, '');

  // Build WhatsApp URL
  const whatsappUrl = message
    ? `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${formattedPhone}`;

  const sizeClasses = {
    sm: {
      button: 'p-2.5',
      icon: 'w-5 h-5',
      text: 'text-sm',
    },
    md: {
      button: 'p-3.5',
      icon: 'w-7 h-7',
      text: 'text-base',
    },
    lg: {
      button: 'p-4',
      icon: 'w-8 h-8',
      text: 'text-lg',
    },
  };

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
  };

  const currentSize = sizeClasses[size];

  // WhatsApp Icon SVG
  const WhatsAppIcon = () => (
    <svg
      className={currentSize.icon}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );

  // Floating variant - fixed position on screen
  if (variant === 'floating') {
    return (
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={`
          fixed z-50 ${positionClasses[position]}
          bg-green-500 hover:bg-green-600
          text-white shadow-lg
          rounded-full ${currentSize.button}
          flex items-center justify-center gap-2
          transition-all duration-300
          hover:scale-110 hover:shadow-xl
          active:scale-95
          group
          ${className}
        `}
      >
        <WhatsAppIcon />

        {/* Tooltip on hover */}
        {!showLabel && (
          <span
            className={`
              absolute ${position === 'bottom-right' ? 'right-full mr-3' : 'left-full ml-3'}
              bg-gray-900 dark:bg-gray-700 text-white
              px-3 py-2 rounded-lg ${currentSize.text}
              whitespace-nowrap opacity-0 invisible
              group-hover:opacity-100 group-hover:visible
              transition-all duration-200
              shadow-lg
            `}
          >
            {label}
            <span
              className={`
                absolute top-1/2 -translate-y-1/2
                ${position === 'bottom-right' ? '-right-1' : '-left-1'}
                border-4 border-transparent
                ${position === 'bottom-right' ? 'border-l-gray-900 dark:border-l-gray-700' : 'border-r-gray-900 dark:border-r-gray-700'}
              `}
            />
          </span>
        )}

        {/* Inline label */}
        {showLabel && (
          <span className={`${currentSize.text} font-medium pr-1`}>
            {label}
          </span>
        )}

        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
      </a>
    );
  }

  // Compact variant - small inline button
  if (variant === 'compact') {
    return (
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={`
          inline-flex items-center justify-center
          bg-green-500 hover:bg-green-600
          text-white rounded-full
          ${sizeClasses.sm.button}
          transition-all duration-200
          hover:scale-105 active:scale-95
          ${className}
        `}
      >
        <WhatsAppIcon />
      </a>
    );
  }

  // Inline variant - button with optional label
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`
        inline-flex items-center justify-center gap-2
        bg-green-500 hover:bg-green-600
        text-white font-medium
        rounded-lg px-4 py-2.5 ${currentSize.text}
        transition-all duration-200
        hover:shadow-lg active:scale-95
        ${className}
      `}
    >
      <WhatsAppIcon />
      {showLabel && <span>{label}</span>}
    </a>
  );
};

export default WhatsAppButton;
