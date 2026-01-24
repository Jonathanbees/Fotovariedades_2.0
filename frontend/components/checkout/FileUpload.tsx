import React from 'react';

const FileUpload: React.FC = () => {
    return (
        <section className="bg-card-light dark:bg-card-dark rounded-lg shadow-sm p-6 mb-6 border border-gray-100 dark:border-gray-700 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <span className="material-icons-outlined text-6xl text-primary">cloud_upload</span>
            </div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <span className="material-icons-outlined text-primary">attach_file</span>
                Archivos para Impresión
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Si tu pedido incluye impresiones o fotos, sube tus archivos aquí (PDF, JPG, PNG).</p>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md hover:border-primary transition-colors cursor-pointer group">
                <div className="space-y-1 text-center">
                    <svg aria-hidden="true" className="mx-auto h-12 w-12 text-gray-400 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    </svg>
                    <div className="flex text-sm text-gray-600 dark:text-gray-400">
                        <label className="relative cursor-pointer bg-card-light dark:bg-card-dark rounded-md font-medium text-primary hover:text-primary-hover focus-within:outline-none" htmlFor="file-upload">
                            <span>Sube un archivo</span>
                            <input className="sr-only" id="file-upload" name="file-upload" type="file" />
                        </label>
                        <p className="pl-1">o arrastra y suelta</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, PDF hasta 10MB</p>
                </div>
            </div>
        </section>
    );
};

export default FileUpload;
