import React from "react";

const Header: React.FC = () => {
  return (
    <nav className="relative z-10 w-full bg-card-light/90 dark:bg-card-dark/90 backdrop-blur-md shadow-sm sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="shrink-0 flex items-center gap-3">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500 via-red-500 to-yellow-500 animate-spin-slow opacity-80 blur-sm"></div>
              <span className="material-icons text-white relative z-10">
                camera
              </span>
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-gray-900 dark:text-white">
              Fotovariedades la 68
            </span>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            <a
              className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium transition"
              href="#"
            >
              Inicio
            </a>
            <a
              className="text-primary dark:text-primary font-bold transition"
              href="#"
            >
              Servicios
            </a>
            <a
              className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium transition"
              href="#"
            >
              Papelería
            </a>
            <a
              className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium transition"
              href="#"
            >
              Dulcería
            </a>
            <a
              className="bg-primary text-white px-5 py-2 rounded-full font-medium hover:bg-red-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              href="mailto:fotovariedadesla68@gmail.com"
            >
              Contáctanos
            </a>
          </div>
          <div className="md:hidden flex items-center">
            <button className="text-gray-600 dark:text-gray-300 hover:text-gray-900 focus:outline-none">
              <span className="material-icons">menu</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
