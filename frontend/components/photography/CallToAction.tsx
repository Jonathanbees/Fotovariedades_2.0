import React from 'react';

const CallToAction: React.FC = () => {
    return (
        <section className="relative py-12 bg-gray-900 text-white overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                    <h2 className="text-2xl font-bold mb-2">¿Necesitas imprimir o tomarte una foto?</h2>
                    <p className="text-gray-300">Visítanos hoy mismo. Servicio rápido y amable.</p>
                    <div className="mt-4 flex flex-col sm:flex-row gap-4 text-sm">
                        <div className="flex items-center gap-2 justify-center md:justify-start">
                            <span className="material-icons text-primary">email</span>
                            <span>fotovariedadesla68@gmail.com</span>
                        </div>
                    </div>
                </div>
                <div className="flex-shrink-0">
                    <a className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-100 transition shadow-lg" href="https://wa.me/573207277232">
                        <span className="material-icons mr-2 text-green-600">whatsapp</span>
                        Escribir al WhatsApp
                    </a>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;
