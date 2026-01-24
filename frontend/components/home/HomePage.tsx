import React from 'react';
import Header from './Header';
import Hero from './Hero';
import Services from './Services';
import FeaturedStationery from './FeaturedStationery';
import Sweets from './Sweets';
import Footer from './Footer';

const HomePage: React.FC = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 font-body transition-colors duration-300">
            <Header />
            <main>
                <Hero />
                <Services />
                <FeaturedStationery />
                <Sweets />
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;
