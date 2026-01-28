import React from "react";

const OrderSummary: React.FC = () => {
  return (
    <section className="bg-card-light dark:bg-card-dark rounded-lg shadow-sm p-6 mb-6 border border-gray-100 dark:border-gray-700">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <span className="material-icons-outlined text-primary">
          shopping_bag
        </span>
        Resumen del Pedido
      </h2>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        <li className="flex py-6">
          <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-3xl">
            📸
          </div>
          <div className="ml-4 flex flex-1 flex-col">
            <div>
              <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                <h3>Fotos para Documentos (Pack x6)</h3>
                <p className="ml-4">$12.000 COP</p>
              </div>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Fondo Azul, 3x4 cm
              </p>
            </div>
            <div className="flex flex-1 items-end justify-between text-sm">
              <p className="text-gray-500 dark:text-gray-400">Cant: 1</p>
              <button
                className="font-medium text-accent-pink hover:text-pink-600 dark:hover:text-pink-400 transition"
                type="button"
              >
                Eliminar
              </button>
            </div>
          </div>
        </li>
        <li className="flex py-6">
          <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-3xl">
            📚
          </div>
          <div className="ml-4 flex flex-1 flex-col">
            <div>
              <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                <h3>Argollado Espiral Metálico</h3>
                <p className="ml-4">$8.500 COP</p>
              </div>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Incluye pastas transparentes
              </p>
            </div>
            <div className="flex flex-1 items-end justify-between text-sm">
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded">
                <button className="px-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  -
                </button>
                <span className="px-2 text-gray-900 dark:text-white">1</span>
                <button className="px-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  +
                </button>
              </div>
              <button
                className="font-medium text-accent-pink hover:text-pink-600 dark:hover:text-pink-400 transition"
                type="button"
              >
                Eliminar
              </button>
            </div>
          </div>
        </li>
        <li className="flex py-6">
          <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-3xl">
            🍬
          </div>
          <div className="ml-4 flex flex-1 flex-col">
            <div>
              <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                <h3>Variedad de Dulces</h3>
                <p className="ml-4">$5.000 COP</p>
              </div>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Surtido chocolates y gomas
              </p>
            </div>
            <div className="flex flex-1 items-end justify-between text-sm">
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded">
                <button className="px-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  -
                </button>
                <span className="px-2 text-gray-900 dark:text-white">2</span>
                <button className="px-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  +
                </button>
              </div>
              <button
                className="font-medium text-accent-pink hover:text-pink-600 dark:hover:text-pink-400 transition"
                type="button"
              >
                Eliminar
              </button>
            </div>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default OrderSummary;
