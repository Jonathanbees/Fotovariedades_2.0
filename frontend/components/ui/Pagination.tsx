'use client';

import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingsCount?: number;
  showFirstLast?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'minimal' | 'rounded';
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingsCount = 1,
  showFirstLast = true,
  size = 'md',
  variant = 'default',
  className = '',
}) => {
  // Generate page numbers array
  const generatePages = (): (number | 'ellipsis')[] => {
    const pages: (number | 'ellipsis')[] = [];

    // Always show first page
    pages.push(1);

    // Calculate range around current page
    const leftSibling = Math.max(2, currentPage - siblingsCount);
    const rightSibling = Math.min(totalPages - 1, currentPage + siblingsCount);

    // Add ellipsis after first page if needed
    if (leftSibling > 2) {
      pages.push('ellipsis');
    }

    // Add pages around current page
    for (let i = leftSibling; i <= rightSibling; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i);
      }
    }

    // Add ellipsis before last page if needed
    if (rightSibling < totalPages - 1) {
      pages.push('ellipsis');
    }

    // Always show last page (if more than 1 page)
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const sizeClasses = {
    sm: {
      button: 'px-2.5 py-1 text-xs min-w-[28px]',
      icon: 'text-sm',
      gap: 'gap-1',
    },
    md: {
      button: 'px-3 py-2 text-sm min-w-[36px]',
      icon: 'text-base',
      gap: 'gap-1',
    },
    lg: {
      button: 'px-4 py-2.5 text-base min-w-[44px]',
      icon: 'text-lg',
      gap: 'gap-2',
    },
  };

  const variantClasses = {
    default: {
      base: 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800',
      active: 'bg-primary border-primary text-white',
      hover: 'hover:bg-gray-50 dark:hover:bg-gray-700',
      disabled: 'opacity-50 cursor-not-allowed',
      rounded: 'first:rounded-l-md last:rounded-r-md',
      container: 'inline-flex -space-x-px shadow-sm rounded-md',
    },
    minimal: {
      base: 'bg-transparent',
      active: 'bg-primary/10 text-primary font-semibold',
      hover: 'hover:bg-gray-100 dark:hover:bg-gray-800',
      disabled: 'opacity-50 cursor-not-allowed',
      rounded: 'rounded-md',
      container: 'inline-flex gap-1',
    },
    rounded: {
      base: 'border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800',
      active: 'bg-primary border-primary text-white',
      hover: 'hover:border-primary hover:text-primary dark:hover:border-primary',
      disabled: 'opacity-50 cursor-not-allowed',
      rounded: 'rounded-full',
      container: 'inline-flex gap-2',
    },
  };

  const currentSize = sizeClasses[size];
  const currentVariant = variantClasses[variant];

  const pages = generatePages();

  // Don't render if only 1 page
  if (totalPages <= 1) {
    return null;
  }

  const renderButton = (
    content: React.ReactNode,
    page: number | null,
    isActive = false,
    isDisabled = false,
    ariaLabel?: string
  ) => {
    const handleClick = () => {
      if (!isDisabled && page !== null && page !== currentPage) {
        onPageChange(page);
      }
    };

    return (
      <button
        key={typeof content === 'number' ? `page-${content}` : ariaLabel}
        onClick={handleClick}
        disabled={isDisabled}
        aria-label={ariaLabel}
        aria-current={isActive ? 'page' : undefined}
        className={`
          inline-flex items-center justify-center font-medium transition-all duration-200
          ${currentSize.button}
          ${currentVariant.base}
          ${currentVariant.rounded}
          ${isActive ? currentVariant.active : 'text-gray-700 dark:text-gray-300'}
          ${isDisabled ? currentVariant.disabled : currentVariant.hover}
          focus:outline-none focus:ring-2 focus:ring-primary/50 focus:z-10
        `}
      >
        {content}
      </button>
    );
  };

  return (
    <nav
      aria-label="Pagination"
      className={`flex justify-center ${className}`}
    >
      <div className={currentVariant.container}>
        {/* First page button */}
        {showFirstLast && (
          renderButton(
            <span className={`material-icons ${currentSize.icon}`}>first_page</span>,
            1,
            false,
            currentPage === 1,
            'Primera página'
          )
        )}

        {/* Previous button */}
        {renderButton(
          <span className={`material-icons ${currentSize.icon}`}>chevron_left</span>,
          currentPage - 1,
          false,
          currentPage === 1,
          'Página anterior'
        )}

        {/* Page numbers */}
        {pages.map((page, index) => {
          if (page === 'ellipsis') {
            return (
              <span
                key={`ellipsis-${index}`}
                className={`
                  inline-flex items-center justify-center
                  text-gray-400 dark:text-gray-500
                  ${currentSize.button}
                  ${currentVariant.base}
                  ${currentVariant.rounded}
                  cursor-default
                `}
              >
                ...
              </span>
            );
          }

          return renderButton(
            page,
            page,
            page === currentPage,
            false,
            `Página ${page}`
          );
        })}

        {/* Next button */}
        {renderButton(
          <span className={`material-icons ${currentSize.icon}`}>chevron_right</span>,
          currentPage + 1,
          false,
          currentPage === totalPages,
          'Página siguiente'
        )}

        {/* Last page button */}
        {showFirstLast && (
          renderButton(
            <span className={`material-icons ${currentSize.icon}`}>last_page</span>,
            totalPages,
            false,
            currentPage === totalPages,
            'Última página'
          )
        )}
      </div>
    </nav>
  );
};

// Simplified pagination with just prev/next and page info
interface SimplePaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  itemsPerPage?: number;
  onPageChange: (page: number) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const SimplePagination: React.FC<SimplePaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const startItem = totalItems && itemsPerPage
    ? (currentPage - 1) * itemsPerPage + 1
    : null;
  const endItem = totalItems && itemsPerPage
    ? Math.min(currentPage * itemsPerPage, totalItems)
    : null;

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div
      className={`
        flex flex-col sm:flex-row items-center justify-between gap-4
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {/* Items info */}
      {totalItems && startItem && endItem && (
        <p className="text-gray-500 dark:text-gray-400">
          Mostrando <span className="font-medium text-gray-700 dark:text-gray-200">{startItem}</span>
          {' - '}
          <span className="font-medium text-gray-700 dark:text-gray-200">{endItem}</span>
          {' de '}
          <span className="font-medium text-gray-700 dark:text-gray-200">{totalItems}</span>
          {' resultados'}
        </p>
      )}

      {/* Navigation */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`
            inline-flex items-center gap-1 px-3 py-1.5 rounded-lg
            border border-gray-300 dark:border-gray-600
            bg-white dark:bg-gray-800
            text-gray-700 dark:text-gray-300
            hover:bg-gray-50 dark:hover:bg-gray-700
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors duration-200
          `}
        >
          <span className="material-icons text-base">chevron_left</span>
          Anterior
        </button>

        <span className="text-gray-500 dark:text-gray-400 px-2">
          {currentPage} / {totalPages}
        </span>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`
            inline-flex items-center gap-1 px-3 py-1.5 rounded-lg
            border border-gray-300 dark:border-gray-600
            bg-white dark:bg-gray-800
            text-gray-700 dark:text-gray-300
            hover:bg-gray-50 dark:hover:bg-gray-700
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors duration-200
          `}
        >
          Siguiente
          <span className="material-icons text-base">chevron_right</span>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
