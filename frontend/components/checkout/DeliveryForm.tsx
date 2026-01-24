import React from 'react';

const DeliveryForm: React.FC = () => {
    return (
        <section className="bg-card-light dark:bg-card-dark rounded-lg shadow-sm p-6 mb-6 border border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="material-icons-outlined text-primary">local_shipping</span>
                Entrega
            </h2>
            <div className="flex items-center justify-center mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit mx-auto">
                <button className="px-4 py-2 text-sm font-medium rounded-md shadow-sm bg-white dark:bg-gray-600 text-gray-900 dark:text-white">Domicilio</button>
                <button className="px-4 py-2 text-sm font-medium rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Recoger en Tienda</button>
            </div>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="first-name">Nombres</label>
                    <div className="mt-1">
                        <input autoComplete="given-name" className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md" id="first-name" name="first-name" type="text" />
                    </div>
                </div>
                <div className="sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="last-name">Apellidos</label>
                    <div className="mt-1">
                        <input autoComplete="family-name" className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md" id="last-name" name="last-name" type="text" />
                    </div>
                </div>
                <div className="sm:col-span-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="address">Dirección de Entrega</label>
                    <div className="mt-1">
                        <input autoComplete="street-address" className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md" id="address" name="address" type="text" />
                    </div>
                </div>
                <div className="sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="phone">Teléfono / WhatsApp</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">+57</span>
                        </div>
                        <input className="focus:ring-primary focus:border-primary block w-full pl-12 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md" id="phone" name="phone" placeholder="320 727 72 32" type="text" />
                    </div>
                </div>
                <div className="sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="city">Barrio / Ciudad</label>
                    <div className="mt-1">
                        <input className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md" id="city" name="city" type="text" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DeliveryForm;
