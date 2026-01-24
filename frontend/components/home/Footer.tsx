import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 py-16">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-12">
                    <div className="space-y-4">
                        <a className="flex items-center gap-2" href="#">
                            <span className="material-icons-outlined text-4xl text-primary">local_florist</span>
                            <span className="text-2xl font-bold text-white">Fotovariedades <span className="text-primary text-sm block font-normal">la 68</span></span>
                        </a>
                        <p className="text-sm text-slate-400">
                            Tu solución integral en papelería, fotografía y dulces. Calidad y servicio amable.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-white font-bold text-lg mb-2">Contáctanos</h3>
                        <a className="flex items-center gap-3 hover:text-white transition group bg-slate-800 p-3 rounded-xl border border-slate-700" href="https://wa.me/573207277232">
                            <span className="bg-green-600 text-white p-2 rounded-full flex items-center justify-center">
                                <span className="material-icons-outlined text-sm">call</span>
                            </span>
                            <div>
                                <p className="text-xs text-slate-400">WhatsApp / Celular</p>
                                <p className="font-bold text-lg text-white group-hover:text-green-400 transition">320 727 72 32</p>
                            </div>
                        </a>
                        <a className="flex items-center gap-3 hover:text-white transition group bg-slate-800 p-3 rounded-xl border border-slate-700" href="mailto:fotovariedadesla68@gmail.com">
                            <span className="bg-red-500 text-white p-2 rounded-full flex items-center justify-center">
                                <span className="material-icons-outlined text-sm">email</span>
                            </span>
                            <div className="overflow-hidden">
                                <p className="text-xs text-slate-400">Email</p>
                                <p className="font-bold text-sm text-white truncate group-hover:text-red-400 transition">fotovariedadesla68@gmail.com</p>
                            </div>
                        </a>
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Horarios</h3>
                        <ul className="space-y-2 text-sm">
                            <li className="flex justify-between">
                                <span>Lunes - Viernes:</span>
                                <span className="text-white">8:00 AM - 7:00 PM</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Sábados:</span>
                                <span className="text-white">9:00 AM - 6:00 PM</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Domingos:</span>
                                <span className="text-primary font-semibold">Cerrado</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-slate-800 mt-12 pt-8 text-center text-xs text-slate-500">
                    <p>© 2023 Fotovariedades la 68. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
