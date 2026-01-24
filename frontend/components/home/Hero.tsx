import React from 'react';

const Hero: React.FC = () => {
    return (
        <header className="relative overflow-hidden" id="home">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl dark:bg-primary/10"></div>
            <div className="absolute top-48 -left-24 w-72 h-72 bg-secondary/20 rounded-full blur-3xl dark:bg-secondary/10"></div>
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-tertiary/20 rounded-full blur-3xl dark:bg-tertiary/10"></div>
            <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold tracking-wider uppercase">Todo en un solo lugar</span>
                        <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight">
                            Papelería, Fotos <br />
                            <span className="text-primary">&amp; Dulces Momentos</span>
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-lg">
                            Desde fotos para documentos urgentes hasta los mejores útiles escolares y un antojo dulce. Fotovariedades la 68 es tu tienda de confianza.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a className="bg-primary hover:bg-pink-700 text-white px-8 py-3 rounded-full font-semibold transition shadow-lg hover:shadow-primary/50 flex items-center gap-2" href="#stationery">
                                Ver Catálogo <span className="material-icons-outlined text-sm">arrow_forward</span>
                            </a>
                            <a className="bg-white dark:bg-slate-800 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 hover:border-primary px-8 py-3 rounded-full font-semibold transition flex items-center gap-2" href="#services">
                                Servicios de Foto
                            </a>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4 mt-8">
                            <img alt="Espacio de trabajo creativo" className="rounded-2xl shadow-xl w-full h-48 object-cover hover:scale-105 transition duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOfBT_VRmq7P-oqqYtoILsx9NOKC3WhnZmsWATMWDSd776R0XcZJR88LhYw7G1LlyO1Ojc3asTFP1nv36g-lbyTihZ9GerO5rh9ytMaQAKZMURDzz1hnlBjrEVd7jwO0GWb-b3ly5FDUB1lNvd4LNHy97Tu00swgtmNsxTY_oLYO0lteBheDYFY2n5s3pg8sKfKGTmndwoF9PlOr0S-YoccYGnfmaVnZYwQuXcg4zudnaHidSLp1vpUrgQD0wyDS4_wuGGBWfyOSQ" />
                            <img alt="Servicios de impresión" className="rounded-2xl shadow-xl w-full h-64 object-cover hover:scale-105 transition duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAI9r8BuaTMu4waL_2uNy38m7-PbkYJfwvTfkd-NOIcF4H9kBwJSGF8scngKGiWWaoleUTRtl_bAd9RlB8ugbA-rdo6HcE9dGzRuf2uzA_3w2w3WsFKlmShBZ_U21JbYT814as9J1xSLsp5x3RBfqW6OpXtdMNrN47jwp2nc3bHLMET815wcooULETgThb_O80FL9-Pfu4gnrE7ZpPiro_xDLGoTd6PjD0xj8fnGTP3qINi4xYbGfNCBEjvmXDByXVa149JYJB3SM" />
                        </div>
                        <div className="space-y-4">
                            <img alt="Logo de Fotografía" className="rounded-2xl shadow-xl w-full h-64 object-cover hover:scale-105 transition duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNXu9BjveYbcr8g_RexvpKb6SSDNfOL5-tpgUKl45q9XuH9SDJj68d4XFrw4ebURTtUCTLWB-SiZK_Vx1fqKCYAv7uloN37jjndk77ZIZSq_gt1L9xTf8AFoddAsXm9AzSxwbxCvN_dcKRGr1veaIWo2oNsy4-29HLWggDjKaWDau2wEaSdeSnO5IhUa7RxWEmoU_CtVBAzqcP0GOAXGlZxmSC8KbV8yZ6Lt0jdDHTpU-HlUkD6zw54UWE55EWPnWuOSjDsAqCUG4" />
                            <img alt="Tienda de dulces" className="rounded-2xl shadow-xl w-full h-48 object-cover hover:scale-105 transition duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6_FUdcYRFE9lB-3qG-bp_6eBsWXgC-va2StNviWlcDeUScjcukv9qGiP7C5MTAhcwy8_kIsudpQmjK3bH8_47Rw6Uuc1NA1fWEyUL1svvz9vxDuqnte_h-X1u4iYetiXjzdp6do7WE3Q5gV2sseeBmnApd11PA2PTpDl86IxsdLbHkVy9YlDga2K09vumQKkDCaZPPFm1wZnXni8bGHjgYXOLLW6pKtg6ExxqD3HORohP71Z9X-yjxL5zGTSk7fYAmbZQR50vy8k" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Hero;
