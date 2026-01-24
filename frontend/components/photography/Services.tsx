import React from 'react';

const Services: React.FC = () => {
    return (
        <section className="relative z-10 py-16 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800" id="services">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">Nuestros Servicios</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div className="group relative bg-card-light dark:bg-card-dark rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 transition hover:shadow-2xl">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                            <span className="material-icons text-9xl text-blue-500">badge</span>
                        </div>
                        <div className="p-8">
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                                <span className="material-icons text-3xl">assignment_ind</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Fotos para Documentos</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                Fotografías biométricas de alta calidad para pasaporte, cédula, visa y carnés. Fondo blanco o azul según requerimiento.
                            </p>
                            <ul className="space-y-2 mb-8 text-sm text-gray-600 dark:text-gray-300">
                                <li className="flex items-center gap-2">
                                    <span className="material-icons text-green-500 text-sm">check_circle</span>
                                    Entrega inmediata (10-15 min)
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="material-icons text-green-500 text-sm">check_circle</span>
                                    Cumple con normativas oficiales
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="material-icons text-green-500 text-sm">check_circle</span>
                                    Retoque digital básico incluido
                                </li>
                            </ul>
                            <button className="w-full py-3 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 transition">
                                Consultar Precio
                            </button>
                        </div>
                    </div>
                    <div className="group relative bg-card-light dark:bg-card-dark rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 transition hover:shadow-2xl">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                            <span className="material-icons text-9xl text-purple-500">camera_enhance</span>
                        </div>
                        <div className="p-8">
                            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400">
                                <span className="material-icons text-3xl">portrait</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Fotoestudios</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                Sesiones de estudio profesionales para perfiles profesionales, redes sociales o recuerdos familiares.
                            </p>
                            <ul className="space-y-2 mb-8 text-sm text-gray-600 dark:text-gray-300">
                                <li className="flex items-center gap-2">
                                    <span className="material-icons text-green-500 text-sm">check_circle</span>
                                    Iluminación de estudio profesional
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="material-icons text-green-500 text-sm">check_circle</span>
                                    Edición y retoque avanzado
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="material-icons text-green-500 text-sm">check_circle</span>
                                    Entrega digital e impresa
                                </li>
                            </ul>
                            <button className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition shadow-md">
                                Reservar Sesión
                            </button>
                        </div>
                    </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6 border-l-4 border-primary pl-4">Otros Servicios de Oficina</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-card-light dark:bg-card-dark p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition text-center">
                        <span className="material-icons text-4xl text-orange-500 mb-3">layers</span>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Plastificado</h4>
                        <p className="text-xs text-gray-500 mt-2">Protege tus documentos</p>
                    </div>
                    <div className="bg-card-light dark:bg-card-dark p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition text-center">
                        <span className="material-icons text-4xl text-teal-500 mb-3">menu_book</span>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Argollado</h4>
                        <p className="text-xs text-gray-500 mt-2">Presentaciones y libros</p>
                    </div>
                    <div className="bg-card-light dark:bg-card-dark p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition text-center">
                        <span className="material-icons text-4xl text-indigo-500 mb-3">print</span>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Impresión Láser</h4>
                        <p className="text-xs text-gray-500 mt-2">Alta definición</p>
                    </div>
                    <div className="bg-card-light dark:bg-card-dark p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition text-center">
                        <span className="material-icons text-4xl text-gray-500 mb-3">document_scanner</span>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Escáner</h4>
                        <p className="text-xs text-gray-500 mt-2">Digitalización rápida</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
