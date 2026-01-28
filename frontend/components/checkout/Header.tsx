import React from "react";

const Header: React.FC = () => {
  return (
    <nav className="bg-card-light dark:bg-card-dark shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 relative">
                <span className="absolute top-0 left-0 w-4 h-4 bg-accent-pink rounded-tl-full opacity-80"></span>
                <span className="absolute top-0 right-0 w-4 h-4 bg-primary rounded-tr-full opacity-80"></span>
                <span className="absolute bottom-0 left-0 w-4 h-4 bg-accent-blue rounded-bl-full opacity-80"></span>
                <span className="absolute bottom-0 right-0 w-4 h-4 bg-accent-green rounded-br-full opacity-80"></span>
              </div>
              <span className="font-bold text-xl tracking-tight dark:text-white">
                Foto<span className="text-primary">Variedades</span> la 68
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a
              className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition"
              href="#"
            >
              <span className="material-icons-outlined">help_outline</span>
            </a>
            <a
              className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition relative"
              href="#"
            >
              <span className="material-icons-outlined">shopping_cart</span>
              <span className="absolute -top-1 -right-1 bg-accent-pink text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </a>
            <div className="ml-4 flex items-center">
              <img
                alt="User avatar"
                className="h-8 w-8 rounded-full border border-gray-200 dark:border-gray-600"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbDvtqw_GXxnO6li9P9SFTIY5JdOPO78Q1sMJ6FQ2p7VO0FpO60KSqwljXSWoLjigLneNEBjMPNnUIZv8PwfiJCo52_YvUqhIdXa5Tvpaoa-131GCrOpw6ttxyuVBy_2pHZtUcqlO-8sVMQZUpQc8RLbMk1ean-slcrZ8RwZY5dxPDoH-wUrpOW6rqVNkk_RjJGSKNj6DQBUSI5fnmTBn23R-cAZPJYLiRFiLTBFrbOpQFReV53ghrA0ERYerKScFV2s-z0k-WuW4"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
