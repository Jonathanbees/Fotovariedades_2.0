import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-white pt-12 pb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-1">
                        <span className="text-2xl font-bold font-display logo-gradient mb-4 block">Variedades la 68</span>
                        <p className="text-gray-400 text-sm">
                            Tu tienda de confianza para útiles escolares, fotografía, documentos y los mejores dulces.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-primary">Tienda</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a className="hover:text-white" href="#">Papelería</a></li>
                            <li><a className="hover:text-white" href="#">Fotografía</a></li>
                            <li><a className="hover:text-white" href="#">Dulces</a></li>
                            <li><a className="hover:text-white" href="#">Servicios de Impresión</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-primary">Atención</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a className="hover:text-white" href="#">Contáctanos</a></li>
                            <li><a className="hover:text-white" href="#">Envíos y Devoluciones</a></li>
                            <li><a className="hover:text-white" href="#">Preguntas Frecuentes</a></li>
                            <li><a className="hover:text-white" href="#">Términos y Condiciones</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-primary">Contacto</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li className="flex items-center"><span className="material-icons text-sm mr-2">phone</span> 320 727 72 32</li>
                            <li className="flex items-center"><span className="material-icons text-sm mr-2">email</span> fotovariedadesla68@gmail.com</li>
                            <li className="flex items-center"><span className="material-icons text-sm mr-2">location_on</span> Calle 68, Bogotá</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
                    © 2023 Fotovariedades la 68. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
