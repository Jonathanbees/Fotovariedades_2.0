import React from 'react';

const Breadcrumbs: React.FC = () => {
    return (
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <span>Inicio</span> <span className="mx-2">/</span> <span className="font-medium text-gray-900 dark:text-white">Papelería</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-display">Galería de Productos</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Encuentra todo lo que necesitas para tu oficina y colegio.</p>
            </div>
        </div>
    );
};

export default Breadcrumbs;
