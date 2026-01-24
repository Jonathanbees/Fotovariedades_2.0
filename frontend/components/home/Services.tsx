import React from 'react';

const Services: React.FC = () => {
    return (
        <section className="py-16 bg-white dark:bg-surface-dark" id="services">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Servicios Profesionales</h2>
                    <p className="text-slate-600 dark:text-slate-400">Calidad y rapidez en todos tus trámites y documentos.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-primary/50 transition group text-center">
                        <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition">
                            <span className="material-icons-outlined text-3xl text-blue-600 dark:text-blue-400">face</span>
                        </div>
                        <h3 className="font-bold text-lg mb-2">Fotos Documento</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Pasaporte, cédula y visas. Fondo blanco o azul.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-primary/50 transition group text-center">
                        <div className="w-16 h-16 mx-auto bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition">
                            <span className="material-icons-outlined text-3xl text-purple-600 dark:text-purple-400">print</span>
                        </div>
                        <h3 className="font-bold text-lg mb-2">Impresión Láser</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">A color y blanco y negro. Alta resolución.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-primary/50 transition group text-center">
                        <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition">
                            <span className="material-icons-outlined text-3xl text-green-600 dark:text-green-400">layers</span>
                        </div>
                        <h3 className="font-bold text-lg mb-2">Acabados</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Plastificado, Argollado y Fotocopias al instante.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-primary/50 transition group text-center">
                        <div className="w-16 h-16 mx-auto bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition">
                            <span className="material-icons-outlined text-3xl text-orange-600 dark:text-orange-400">scanner</span>
                        </div>
                        <h3 className="font-bold text-lg mb-2">Digitalización</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Escaner de documentos a PDF o imagen.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
