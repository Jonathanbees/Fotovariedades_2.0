import React from 'react';

const TopBar: React.FC = () => {
    return (
        <div className="bg-gray-900 text-white text-xs py-2 px-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <span className="flex items-center"><span className="material-icons text-sm mr-1">email</span> fotovariedadesla68@gmail.com</span>
                    <span className="flex items-center"><span className="material-icons text-sm mr-1">phone</span> 320 727 72 32</span>
                </div>
                <div className="hidden sm:flex space-x-4">
                    <a className="hover:text-primary transition-colors" href="#">Envíos</a>
                    <a className="hover:text-primary transition-colors" href="#">Ayuda</a>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
