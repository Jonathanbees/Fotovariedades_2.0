'use client'
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-surface-light dark:bg-surface-dark shadow-md sticky top-0 z-50 transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <div className="w-10 h-10 relative flex-shrink-0">
                            <div className="absolute inset-0 bg-pink-500 rounded-full opacity-20 animate-pulse"></div>
                            <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L14.5 9H22L16 13.5L18.5 21L12 16.5L5.5 21L8 13.5L2 9H9.5L12 2Z" fill="url(#flower-gradient)" stroke="none"></path>
                                <defs>
                                    <linearGradient gradientUnits="userSpaceOnUse" id="flower-gradient" x1="2" x2="22" y1="2" y2="21">
                                        <stop stopColor="#ec4899"></stop>
                                        <stop offset="0.5" stopColor="#eab308"></stop>
                                        <stop offset="1" stopColor="#3b82f6"></stop>
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-display text-2xl font-bold logo-gradient leading-tight">Variedades la 68</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wider">FOTOVARIEDADES</span>
                        </div>
                    </div>
                    <div className="hidden md:flex flex-1 max-w-lg mx-8">
                        <div className="relative w-full">
                            <input className="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-full py-2 pl-4 pr-10 focus:ring-2 focus:ring-primary text-sm dark:text-white" placeholder="Buscar cuadernos, lapiceros, fotos..." type="text" />
                            <button className="absolute right-0 top-0 mt-2 mr-3 text-gray-400 hover:text-primary">
                                <span className="material-icons">search</span>
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300">
                        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" onClick={() => document.documentElement.classList.toggle('dark')}>
                            <span className="material-icons dark:hidden">dark_mode</span>
                            <span className="material-icons hidden dark:block text-yellow-400">light_mode</span>
                        </button>
                        <button className="p-2 relative rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            <span className="material-icons">shopping_cart</span>
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-primary rounded-full">3</span>
                        </button>
                        <button className="hidden sm:block p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            <span className="material-icons">person</span>
                        </button>
                        <button className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                            <span className="material-icons">menu</span>
                        </button>
                    </div>
                </div>
                <nav className="hidden md:flex space-x-8 pb-4 text-sm font-medium border-b border-gray-200 dark:border-gray-700">
                    <a className="text-primary border-b-2 border-primary pb-1" href="#">Papelería</a>
                    <a className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors" href="#">Fotografía &amp; Documentos</a>
                    <a className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors" href="#">Dulces &amp; Snacks</a>
                    <a className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors" href="#">Tecnología</a>
                    <a className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors" href="#">Ofertas</a>
                </nav>
            </div>
        </header>
    );
};

export default Header;
