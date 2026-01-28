import React from "react";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-full md:w-64 shrink-0 space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Categorías
        </h3>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <li>
            <a className="flex items-center justify-between group" href="#">
              <span className="group-hover:text-primary">
                Cuadernos y Libretas
              </span>
              <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                120
              </span>
            </a>
          </li>
          <li>
            <a className="flex items-center justify-between group" href="#">
              <span className="group-hover:text-primary font-medium text-primary">
                Escritura (Bolígrafos)
              </span>
              <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">
                85
              </span>
            </a>
          </li>
          <li>
            <a className="flex items-center justify-between group" href="#">
              <span className="group-hover:text-primary">Papel y Sobres</span>
              <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                40
              </span>
            </a>
          </li>
          <li>
            <a className="flex items-center justify-between group" href="#">
              <span className="group-hover:text-primary">
                Arte y Manualidades
              </span>
              <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                60
              </span>
            </a>
          </li>
          <li>
            <a className="flex items-center justify-between group" href="#">
              <span className="group-hover:text-primary">Oficina</span>
              <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                35
              </span>
            </a>
          </li>
        </ul>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Precio
        </h3>
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-full">
            <label className="sr-only" htmlFor="min-price">
              Min
            </label>
            <input
              className="w-full rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm focus:ring-primary focus:border-primary"
              id="min-price"
              placeholder="$ Min"
              type="number"
            />
          </div>
          <span className="text-gray-400">-</span>
          <div className="w-full">
            <label className="sr-only" htmlFor="max-price">
              Max
            </label>
            <input
              className="w-full rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm focus:ring-primary focus:border-primary"
              id="max-price"
              placeholder="$ Max"
              type="number"
            />
          </div>
        </div>
        <button className="w-full py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-sm font-medium rounded transition-colors text-gray-800 dark:text-gray-200">
          Aplicar
        </button>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Marcas
        </h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              className="rounded text-primary focus:ring-primary border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
              type="checkbox"
            />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Norma
            </span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              checked
              className="rounded text-primary focus:ring-primary border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
              type="checkbox"
            />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Prismacolor
            </span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              className="rounded text-primary focus:ring-primary border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
              type="checkbox"
            />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Sharpie
            </span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              className="rounded text-primary focus:ring-primary border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
              type="checkbox"
            />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Faber-Castell
            </span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              className="rounded text-primary focus:ring-primary border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
              type="checkbox"
            />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Papermate
            </span>
          </label>
        </div>
      </div>
      <div className="bg-gray-900 rounded-lg p-4 text-white space-y-2 mt-6">
        <h4 className="font-bold text-primary">Servicios Extra</h4>
        <ul className="text-xs space-y-1 opacity-80 list-disc list-inside">
          <li>Fotocopias &amp; Impresión</li>
          <li>Fotos Documento</li>
          <li>Plastificado</li>
          <li>Argollado</li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
