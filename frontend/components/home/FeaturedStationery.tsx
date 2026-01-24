import React from 'react';
import ProductCard from '../ui/ProductCard';
import { getProducts } from '@/lib/api';
import { formatPrice } from '@/lib/utils';

const FeaturedStationery: React.FC = async () => {
    const { products } = await getProducts(1, 4);

    return (
        <section className="py-16" id="stationery">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-bold">Papelería Destacada</h2>
                        <p className="text-slate-600 dark:text-slate-400 mt-2">Útiles escolares y de oficina.</p>
                    </div>
                    <a className="text-primary font-semibold hover:underline hidden md:block" href="#">Ver todo el catálogo</a>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
        </section>
    );
};

export default FeaturedStationery;
