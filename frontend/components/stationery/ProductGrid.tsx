'use client';

import React, { useEffect, useState } from 'react';
import { getProducts, Product } from '@/lib/api';
import { formatPrice } from '@/lib/utils';
import ProductCard from '../ui/ProductCard';

const ProductGrid: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(12);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProducts(page, pageSize);
            setProducts(data.products);
            setTotalProducts(data.total);
        };
        fetchProducts();
    }, [page, pageSize]);

    return (
        <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-gray-500 dark:text-gray-400">Mostrando {products.length} de {totalProducts} productos</p>
                <div className="flex items-center space-x-2">
                    <label className="text-sm text-gray-700 dark:text-gray-300 hidden sm:block" htmlFor="sort">Ordenar por:</label>
                    <select className="block w-40 pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md dark:text-white" id="sort">
                        <option>Relevancia</option>
                        <option>Precio: Menor a Mayor</option>
                        <option>Precio: Mayor a Menor</option>
                        <option>Más Vendidos</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        imageUrl={product.image_url || ''}
                        imageAlt={product.name}
                        title={product.name}
                        description={product.description || ''}
                        price={formatPrice(product.price)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;
