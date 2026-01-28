"use client";

import React from "react";

interface ProductCardProps {
  id?: string | number;
  imageUrl: string;
  imageAlt?: string;
  title: string;
  description?: string;
  price: string | number;
  originalPrice?: string | number;
  discount?: number;
  rating?: number;
  reviewCount?: number;
  badge?: string;
  badgeColor?: "primary" | "secondary" | "success" | "warning" | "danger";
  inStock?: boolean;
  stockCount?: number;
  variant?: "default" | "compact" | "horizontal";
  showAddToCart?: boolean;
  showWishlist?: boolean;
  onAddToCart?: (id?: string | number) => void;
  onWishlistToggle?: (id?: string | number) => void;
  onClick?: (id?: string | number) => void;
  href?: string;
  isWishlisted?: boolean;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  imageUrl,
  imageAlt,
  title,
  description,
  price,
  originalPrice,
  discount,
  rating,
  reviewCount,
  badge,
  badgeColor = "primary",
  inStock = true,
  stockCount,
  variant = "default",
  showAddToCart = true,
  showWishlist = false,
  onAddToCart,
  onWishlistToggle,
  onClick,
  href,
  isWishlisted = false,
  className = "",
}) => {
  const formatPrice = (value: string | number): string => {
    if (typeof value === "string") return value;
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const badgeColorClasses = {
    primary: "bg-primary text-white",
    secondary: "bg-pink-500 text-white",
    success: "bg-green-500 text-white",
    warning: "bg-yellow-500 text-gray-900",
    danger: "bg-red-500 text-white",
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onAddToCart?.(id);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onWishlistToggle?.(id);
  };

  const handleClick = () => {
    onClick?.(id);
  };

  // Render star rating
  const renderRating = () => {
    if (!rating) return null;
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <span key={i} className="material-icons text-yellow-400 text-sm">
            star
          </span>,
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <span key={i} className="material-icons text-yellow-400 text-sm">
            star_half
          </span>,
        );
      } else {
        stars.push(
          <span
            key={i}
            className="material-icons text-gray-300 dark:text-gray-600 text-sm"
          >
            star_outline
          </span>,
        );
      }
    }
    return stars;
  };

  // Horizontal variant
  if (variant === "horizontal") {
    const CardWrapper = href ? "a" : "div";
    const wrapperProps = href
      ? { href, onClick: handleClick }
      : { onClick: handleClick, role: "button", tabIndex: 0 };

    return (
      <CardWrapper
        {...wrapperProps}
        className={`
          flex bg-white dark:bg-gray-800 rounded-xl shadow-sm
          border border-gray-100 dark:border-gray-700
          hover:shadow-lg transition-all duration-300 group overflow-hidden
          ${onClick || href ? "cursor-pointer" : ""}
          ${className}
        `}
      >
        {/* Image */}
        <div className="relative w-32 sm:w-40 shrink-0 bg-gray-100 dark:bg-gray-700 overflow-hidden">
          <img
            src={imageUrl}
            alt={imageAlt || title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {badge && (
            <span
              className={`absolute top-2 left-2 px-2 py-0.5 text-xs font-bold rounded-full ${badgeColorClasses[badgeColor]}`}
            >
              {badge}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col">
          <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
              {description}
            </p>
          )}

          {/* Rating */}
          {rating !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              {renderRating()}
              {reviewCount !== undefined && (
                <span className="text-xs text-gray-400 ml-1">
                  ({reviewCount})
                </span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2 mt-auto pt-2">
            <span className="font-bold text-lg text-gray-900 dark:text-white">
              {formatPrice(price)}
            </span>
            {originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
            {discount && (
              <span className="text-xs font-bold text-green-600 bg-green-100 dark:bg-green-900/30 px-1.5 py-0.5 rounded">
                -{discount}%
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        {showAddToCart && (
          <div className="flex flex-col justify-center pr-4">
            <button
              onClick={handleAddToCart}
              disabled={!inStock}
              className={`
                p-2 rounded-full transition-all duration-200
                ${
                  inStock
                    ? "bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                }
              `}
            >
              <span className="material-icons-outlined text-lg">
                {inStock ? "add_shopping_cart" : "remove_shopping_cart"}
              </span>
            </button>
          </div>
        )}
      </CardWrapper>
    );
  }

  // Compact variant
  if (variant === "compact") {
    const CardWrapper = href ? "a" : "div";
    const wrapperProps = href
      ? { href, onClick: handleClick }
      : { onClick: handleClick, role: "button", tabIndex: 0 };

    return (
      <CardWrapper
        {...wrapperProps}
        className={`
          bg-white dark:bg-gray-800 rounded-lg shadow-sm
          border border-gray-100 dark:border-gray-700
          hover:shadow-md transition-all duration-300 group overflow-hidden
          ${onClick || href ? "cursor-pointer" : ""}
          ${className}
        `}
      >
        {/* Image */}
        <div className="relative aspect-square bg-gray-100 dark:bg-gray-700 overflow-hidden">
          <img
            src={imageUrl}
            alt={imageAlt || title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {discount && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              -{discount}%
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-3">
          <h3 className="font-medium text-sm text-gray-900 dark:text-white line-clamp-1">
            {title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-bold text-primary">{formatPrice(price)}</span>
            {originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>
        </div>
      </CardWrapper>
    );
  }

  // Default variant
  const CardWrapper = href ? "a" : "div";
  const wrapperProps = href
    ? { href, onClick: handleClick }
    : {
        onClick: handleClick,
        role: onClick ? "button" : undefined,
        tabIndex: onClick ? 0 : undefined,
      };

  return (
    <CardWrapper
      {...wrapperProps}
      className={`
        bg-white dark:bg-gray-800 rounded-xl shadow-sm
        border border-gray-100 dark:border-gray-700
        hover:shadow-xl hover:border-primary/20 dark:hover:border-primary/20
        transition-all duration-300 group overflow-hidden
        ${onClick || href ? "cursor-pointer" : ""}
        ${className}
      `}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-700 overflow-hidden">
        <img
          src={imageUrl}
          alt={imageAlt || title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Badge */}
        {badge && (
          <span
            className={`absolute top-3 left-3 px-2.5 py-1 text-xs font-bold rounded-full shadow-md ${badgeColorClasses[badgeColor]}`}
          >
            {badge}
          </span>
        )}

        {/* Discount badge */}
        {discount && !badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-bold rounded-full shadow-md bg-red-500 text-white">
            -{discount}%
          </span>
        )}

        {/* Wishlist button */}
        {showWishlist && (
          <button
            onClick={handleWishlistToggle}
            className={`
              absolute top-3 right-3 p-2 rounded-full shadow-md
              transition-all duration-200 opacity-0 group-hover:opacity-100
              ${
                isWishlisted
                  ? "bg-red-500 text-white"
                  : "bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:bg-red-500 hover:text-white"
              }
            `}
          >
            <span className="material-icons text-lg">
              {isWishlisted ? "favorite" : "favorite_border"}
            </span>
          </button>
        )}

        {/* Out of stock overlay */}
        {!inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-lg font-medium text-sm">
              Agotado
            </span>
          </div>
        )}

        {/* Quick add button on hover */}
        {showAddToCart && inStock && (
          <button
            onClick={handleAddToCart}
            className="
              absolute bottom-3 left-3 right-3
              bg-primary text-white py-2.5 rounded-lg font-medium
              flex items-center justify-center gap-2
              opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0
              transition-all duration-300 shadow-lg hover:bg-primary/90
            "
          >
            <span className="material-icons-outlined text-lg">
              add_shopping_cart
            </span>
            <span className="text-sm">Agregar al carrito</span>
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 min-h-[2.5rem] group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
            {description}
          </p>
        )}

        {/* Rating */}
        {rating !== undefined && (
          <div className="flex items-center gap-1 mt-2">
            {renderRating()}
            {reviewCount !== undefined && (
              <span className="text-xs text-gray-400 ml-1">
                ({reviewCount})
              </span>
            )}
          </div>
        )}

        {/* Price and stock */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl text-gray-900 dark:text-white">
                {formatPrice(price)}
              </span>
              {originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(originalPrice)}
                </span>
              )}
            </div>
            {stockCount !== undefined && inStock && stockCount <= 5 && (
              <span className="text-xs text-orange-500 font-medium mt-0.5">
                ¡Solo quedan {stockCount}!
              </span>
            )}
          </div>

          {/* Add to cart button (alternative position) */}
          {showAddToCart && (
            <button
              onClick={handleAddToCart}
              disabled={!inStock}
              className={`
                p-2.5 rounded-full transition-all duration-200
                ${
                  inStock
                    ? "bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                }
                md:opacity-0 md:group-hover:opacity-100
              `}
            >
              <span className="material-icons-outlined block text-lg">
                {inStock ? "add" : "block"}
              </span>
            </button>
          )}
        </div>
      </div>
    </CardWrapper>
  );
};

export default ProductCard;
