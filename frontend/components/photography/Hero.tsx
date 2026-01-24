import React from 'react';

const Hero: React.FC = () => {
    return (
        <header className="relative z-10 pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
                <span className="inline-block py-1 px-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 text-sm font-semibold mb-6 uppercase tracking-wider">
                    Expertos en Imagen y Documentos
                </span>
                <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                    Capturamos tus <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Mejores Momentos</span> <br /> y Gestionamos tus Documentos
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
                    Desde fotos para documentos oficiales hasta estudios profesionales. Tu centro integral de servicios en la 68.
                </p>
                <div className="mt-10 flex justify-center gap-4 flex-wrap">
                    <a className="px-8 py-4 bg-primary text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-red-700 hover:shadow-xl transition transform hover:-translate-y-1 flex items-center gap-2" href="#services">
                        <span className="material-icons">photo_camera</span>
                        Ver Servicios
                    </a>
                    <a className="px-8 py-4 bg-green-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-green-600 hover:shadow-xl transition transform hover:-translate-y-1 flex items-center gap-2" href="https://wa.me/573207277232">
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg>
                        WhatsApp 320 727 72 32
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Hero;
