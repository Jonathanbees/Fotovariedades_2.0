import React from 'react';
import TopBar from './TopBar';
import Header from './Header';
import Breadcrumbs from './Breadcrumbs';
import Sidebar from './Sidebar';
import ProductGrid from './ProductGrid';
import Pagination from './Pagination';
import WhatsAppButton from './WhatsAppButton';
import Footer from './Footer';

const StationeryPage: React.FC = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-200 transition-colors duration-200 font-sans">
            <TopBar />
            <Header />
            <Breadcrumbs />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    <Sidebar />
                    <div className="flex-1">
                        <ProductGrid />
                        <Pagination />
                    </div>
                </div>
            </main>
            <WhatsAppButton />
            <Footer />
        </div>
    );
};

export default StationeryPage;
