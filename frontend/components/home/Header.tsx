'use client'
import React from 'react';

const Header: React.FC = () => {
    return (
        <nav className="sticky top-0 z-50 bg-surface-light/90 dark:bg-surface-dark/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                    <a className="flex items-center gap-2 group" href="#">
                        <span className="material-icons-outlined text-4xl text-primary group-hover:animate-spin">local_florist</span>
                        <div className="flex flex-col">
                            <span className="text-xl md:text-2xl font-bold brand-gradient-text leading-tight">Fotovariedades</span>
                            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 -mt-1">la 68</span>
                        </div>
                    </a>
                    <div className="hidden md:flex items-center gap-8 font-medium">
                        <a className="hover:text-primary transition-colors" href="#home">Inicio</a>
                        <a className="hover:text-primary transition-colors" href="#stationery">Papelería</a>
                        <a className="hover:text-primary transition-colors" href="#services">Servicios</a>
                        <a className="hover:text-primary transition-colors" href="#sweets">Dulcería</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex relative">
                            <input className="pl-10 pr-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary text-sm w-64" placeholder="Buscar productos..." type="text" />
                            <span className="material-icons-outlined absolute left-3 top-2 text-slate-400">search</span>
                        </div>
                        <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition relative">
                            <span className="material-icons-outlined">shopping_cart</span>
                            <span className="absolute top-0 right-0 w-4 h-4 bg-secondary text-white text-[10px] flex items-center justify-center rounded-full">3</span>
                        </button>
                        <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition" onClick={() => document.documentElement.classList.toggle('dark')}>
                            <span className="material-icons-outlined block dark:hidden">dark_mode</span>
                            <span className="material-icons-outlined hidden dark:block">light_mode</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
