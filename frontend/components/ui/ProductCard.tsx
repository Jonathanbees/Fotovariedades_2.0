import React from 'react';

interface ProductCardProps {
    imageUrl: string;
    imageAlt: string;
    title: string;
    description: string;
    price: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ imageUrl, imageAlt, title, description, price }) => {
    return (
        <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm hover:shadow-lg transition group">
            <div className="relative h-48 bg-gray-100 dark:bg-gray-700 rounded-t-xl overflow-hidden">
                <img alt={imageAlt} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" src={imageUrl} />
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-lg mb-1 truncate">{title}</h3>
                <p className="text-slate-500 text-sm mb-3">{description}</p>
                <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">{price}</span>
                    <button className="bg-primary text-white p-2 rounded-full hover:bg-pink-700 transition">
                        <span className="material-icons-outlined text-sm block">add</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
