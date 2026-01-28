"use client";

import React, { useState } from "react";
import Logo from "../ui/Logo";
import SearchInput from "../ui/SearchInput";
import IconButton from "../ui/IconButton";
import Avatar from "../ui/Avatar";

export interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
  icon?: string;
}

export interface HeaderProps {
  variant?: "default" | "shop" | "minimal" | "admin";
  navItems?: NavItem[];
  showSearch?: boolean;
  showCart?: boolean;
  showDarkModeToggle?: boolean;
  showUserMenu?: boolean;
  cartItemCount?: number;
  userAvatar?: string;
  userName?: string;
  onSearch?: (query: string) => void;
  onCartClick?: () => void;
  onUserClick?: () => void;
  logoSize?: "sm" | "md" | "lg";
  sticky?: boolean;
  transparent?: boolean;
  className?: string;
  title?: string;
  actions?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({
  variant = "default",
  navItems = [],
  showSearch = false,
  showCart = true,
  showDarkModeToggle = true,
  showUserMenu = true,
  cartItemCount = 0,
  userAvatar,
  userName,
  onSearch,
  onCartClick,
  onUserClick,
  logoSize = "md",
  sticky = true,
  transparent = false,
  className = "",
  title,
  actions,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  };

  // Base classes
  const baseClasses = `
    ${sticky ? "sticky top-0" : ""}
    z-50 w-full
    ${transparent ? "bg-transparent" : "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md"}
    border-b border-gray-200 dark:border-gray-800
    transition-all duration-200
  `;

  // Minimal variant - for checkout or simple pages
  if (variant === "minimal") {
    return (
      <header className={`${baseClasses} ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo size="sm" showSubtitle={false} />

            <div className="flex items-center gap-3">
              {showDarkModeToggle && (
                <IconButton
                  icon="dark_mode"
                  variant="ghost"
                  size="sm"
                  onClick={toggleDarkMode}
                  tooltip="Cambiar tema"
                />
              )}

              {showCart && (
                <IconButton
                  icon="shopping_cart"
                  variant="ghost"
                  size="sm"
                  badge={cartItemCount > 0 ? cartItemCount : undefined}
                  onClick={onCartClick}
                  tooltip="Carrito"
                />
              )}

              {actions}
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Admin variant - for dashboard
  if (variant === "admin") {
    return (
      <header
        className={`
          ${sticky ? "sticky top-0" : ""}
          z-30 w-full
          bg-gray-900/95 dark:bg-gray-950/95 backdrop-blur-md
          border-b border-gray-800
          ${className}
        `}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Mobile menu + Title */}
            <div className="flex items-center gap-4">
              <button
                className="md:hidden text-white p-2 rounded-lg hover:bg-gray-800 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <span className="material-symbols-outlined">menu</span>
              </button>

              {title && (
                <h2 className="text-white text-lg font-bold hidden sm:block">
                  {title}
                </h2>
              )}
            </div>

            {/* Center: Search (desktop) */}
            {showSearch && (
              <div className="hidden md:flex flex-1 max-w-md mx-8">
                <SearchInput
                  placeholder="Buscar pedidos, productos..."
                  variant="filled"
                  size="sm"
                  fullWidth
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
            )}

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              <IconButton
                icon="notifications"
                variant="ghost"
                size="sm"
                badge={3}
                badgeColor="primary"
                className="text-white hover:bg-gray-800"
              />

              <div className="w-px h-8 bg-gray-700 mx-1 hidden sm:block" />

              <Avatar
                src={userAvatar}
                name={userName}
                size="sm"
                onClick={onUserClick}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Default and Shop variants
  return (
    <header className={`${baseClasses} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main header row */}
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          {/* Logo */}
          <Logo size={logoSize} />

          {/* Desktop Navigation */}
          {navItems.length > 0 && variant !== "shop" && (
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`
                    font-medium transition-colors flex items-center gap-1.5
                    ${
                      item.isActive
                        ? "text-primary"
                        : "text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                    }
                  `}
                >
                  {item.icon && (
                    <span className="material-icons-outlined text-lg">
                      {item.icon}
                    </span>
                  )}
                  {item.label}
                </a>
              ))}
            </nav>
          )}

          {/* Search (for shop variant, centered) */}
          {showSearch && variant === "shop" && (
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <SearchInput
                placeholder="Buscar productos..."
                variant="filled"
                fullWidth
                value={searchQuery}
                onChange={handleSearch}
                onSearch={onSearch}
              />
            </div>
          )}

          {/* Right side actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile search button */}
            {showSearch && (
              <IconButton
                icon="search"
                variant="ghost"
                className="md:hidden"
                tooltip="Buscar"
              />
            )}

            {/* Dark mode toggle */}
            {showDarkModeToggle && (
              <div className="hidden sm:block">
                <IconButton
                  icon="dark_mode"
                  variant="ghost"
                  onClick={toggleDarkMode}
                  tooltip="Cambiar tema"
                  className="dark:hidden"
                />
                <IconButton
                  icon="light_mode"
                  variant="ghost"
                  onClick={toggleDarkMode}
                  tooltip="Cambiar tema"
                  className="hidden dark:flex"
                />
              </div>
            )}

            {/* Cart */}
            {showCart && (
              <IconButton
                icon="shopping_cart"
                variant="ghost"
                badge={cartItemCount > 0 ? cartItemCount : undefined}
                badgeColor="secondary"
                onClick={onCartClick}
                tooltip="Carrito"
              />
            )}

            {/* User menu */}
            {showUserMenu && (
              <Avatar
                src={userAvatar}
                name={userName}
                size="sm"
                bordered
                onClick={onUserClick}
                className="cursor-pointer ml-1"
              />
            )}

            {/* Mobile menu button */}
            <IconButton
              icon="menu"
              variant="ghost"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              tooltip="Menú"
            />
          </div>
        </div>

        {/* Secondary navigation row (for shop variant) */}
        {variant === "shop" && navItems.length > 0 && (
          <nav className="hidden md:flex items-center gap-8 pb-4 text-sm font-medium border-t border-gray-100 dark:border-gray-800 pt-3 -mx-4 px-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`
                  transition-colors pb-1
                  ${
                    item.isActive
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }
                `}
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            {/* Mobile search */}
            {showSearch && (
              <div className="mb-4">
                <SearchInput
                  placeholder="Buscar productos..."
                  variant="filled"
                  fullWidth
                  value={searchQuery}
                  onChange={handleSearch}
                  onSearch={onSearch}
                />
              </div>
            )}

            {/* Mobile navigation */}
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-2 px-3 py-2 rounded-lg transition-colors
                    ${
                      item.isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }
                  `}
                >
                  {item.icon && (
                    <span className="material-icons-outlined text-lg">
                      {item.icon}
                    </span>
                  )}
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Mobile dark mode toggle */}
            {showDarkModeToggle && (
              <button
                onClick={toggleDarkMode}
                className="mt-4 w-full flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="material-icons-outlined dark:hidden">
                  dark_mode
                </span>
                <span className="material-icons-outlined hidden dark:block">
                  light_mode
                </span>
                <span className="dark:hidden">Modo oscuro</span>
                <span className="hidden dark:block">Modo claro</span>
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
