"use client";

import React, { useState } from "react";
import Link from "next/link";
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

  const defaultNavItems =
    navItems.length > 0
      ? navItems
      : [
          { label: "Inicio", href: "/#home" },
          { label: "Papelería", href: "/#stationery" },
          { label: "Servicios", href: "/#services" },
          { label: "Dulcería", href: "/#sweets" },
        ];

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
    <header
      className={`${sticky ? "sticky top-0" : ""} z-50 w-full bg-surface-light/90 dark:bg-surface-dark/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 shadow-sm ${className}`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/#home" className="flex items-center gap-2 group">
            <span className="material-icons-outlined text-4xl text-primary group-hover:animate-spin">
              local_florist
            </span>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold brand-gradient-text leading-tight">
                Fotovariedades
              </span>
              <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 -mt-1">
                la 68
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 font-medium">
            {defaultNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors hover:text-primary ${item.isActive ? "text-primary" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {showSearch && (
              <div className="hidden md:flex relative">
                <input
                  className="pl-10 pr-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary text-sm w-64"
                  placeholder="Buscar productos..."
                  type="text"
                  value={searchQuery}
                  onChange={(event) => handleSearch(event.target.value)}
                />
                <span className="material-icons-outlined absolute left-3 top-2 text-slate-400">
                  search
                </span>
              </div>
            )}

            {showCart && (
              <button
                type="button"
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition relative"
                onClick={onCartClick}
                aria-label="Carrito"
              >
                <span className="material-icons-outlined">shopping_cart</span>
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-secondary text-white text-[10px] flex items-center justify-center rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </button>
            )}

            {showDarkModeToggle && (
              <button
                type="button"
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                onClick={toggleDarkMode}
                aria-label="Cambiar tema"
              >
                <span className="material-icons-outlined block dark:hidden">
                  dark_mode
                </span>
                <span className="material-icons-outlined hidden dark:block">
                  light_mode
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
