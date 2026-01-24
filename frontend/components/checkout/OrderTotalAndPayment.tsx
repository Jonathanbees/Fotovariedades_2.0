import React from 'react';

const OrderTotalAndPayment: React.FC = () => {
    return (
        <div className="bg-card-light dark:bg-card-dark rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6 sticky top-24">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Total del Pedido</h2>
            <div className="flow-root">
                <dl className="-my-4 text-sm divide-y divide-gray-200 dark:divide-gray-700">
                    <div className="py-4 flex items-center justify-between">
                        <dt className="text-gray-600 dark:text-gray-400">Subtotal</dt>
                        <dd className="font-medium text-gray-900 dark:text-white">$30.500 COP</dd>
                    </div>
                    <div className="py-4 flex items-center justify-between">
                        <dt className="text-gray-600 dark:text-gray-400">Envío</dt>
                        <dd className="font-medium text-gray-900 dark:text-white">$5.000 COP</dd>
                    </div>
                    <div className="py-4 flex items-center justify-between">
                        <dt className="text-gray-600 dark:text-gray-400">Impuestos</dt>
                        <dd className="font-medium text-gray-900 dark:text-white">$0 COP</dd>
                    </div>
                    <div className="py-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
                        <dt className="text-base font-bold text-gray-900 dark:text-white">Total a Pagar</dt>
                        <dd className="text-xl font-bold text-primary">$35.500 COP</dd>
                    </div>
                </dl>
            </div>
            <div className="mt-6 space-y-4">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Método de Pago</h3>
                <div className="grid grid-cols-2 gap-3">
                    <label className="cursor-pointer">
                        <input checked className="peer sr-only" name="payment-method" type="radio" />
                        <div className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-3 hover:border-primary peer-checked:border-primary peer-checked:ring-1 peer-checked:ring-primary transition-all text-center">
                            <span className="material-icons-outlined text-gray-500 dark:text-gray-400 mb-1 block">credit_card</span>
                            <span className="text-xs font-medium text-gray-900 dark:text-white">Tarjeta</span>
                        </div>
                    </label>
                    <label className="cursor-pointer">
                        <input className="peer sr-only" name="payment-method" type="radio" />
                        <div className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-3 hover:border-primary peer-checked:border-primary peer-checked:ring-1 peer-checked:ring-primary transition-all text-center">
                            <span className="material-icons-outlined text-accent-green mb-1 block">whatsapp</span>
                            <span className="text-xs font-medium text-gray-900 dark:text-white">Nequi / Daviplata</span>
                        </div>
                    </label>
                </div>
            </div>
            <div className="mt-6">
                <button className="w-full bg-primary border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-bold text-gray-900 hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors flex items-center justify-center gap-2" type="submit">
                    <span className="material-icons-outlined">lock</span>
                    Pagar Ahora
                </button>
            </div>
            <div className="mt-4 flex justify-center items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                <span className="material-icons-outlined text-sm">security</span>
                <span>Pagos seguros y encriptados</span>
            </div>
            <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                <p className="text-xs text-center text-gray-500 dark:text-gray-400 mb-2">¿Necesitas ayuda con tu pedido?</p>
                <div className="flex justify-center items-center gap-2 mb-1">
                    <span className="material-icons-outlined text-accent-green text-sm">phone</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">320 727 72 32</span>
                </div>
                <div className="flex justify-center items-center gap-2">
                    <span className="material-icons-outlined text-primary text-sm">email</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate max-w-[200px]">fotovariedadesla68@gmail.com</span>
                </div>
            </div>
        </div>
    );
};

export default OrderTotalAndPayment;
