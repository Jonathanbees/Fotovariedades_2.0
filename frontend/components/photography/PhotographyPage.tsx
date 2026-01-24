import React from 'react';
import Header from './Header';
import Hero from './Hero';
import Services from './Services';
import CallToAction from './CallToAction';
import Footer from './Footer';

const PhotographyPage: React.FC = () => {
    return (
        <div className="font-body bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-100 transition-colors duration-300">
            <div className="fixed inset-0 pointer-events-none flower-motif z-0"></div>
            <Header />
            <main>
                <Hero />
                <Services />
                <CallToAction />
            </main>
            <Footer />
        </div>
    );
};

export default PhotographyPage;
