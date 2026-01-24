import React from 'react';
import Header from './Header';
import CheckoutPageTitle from './CheckoutPageTitle';
import OrderSummary from './OrderSummary';
import FileUpload from './FileUpload';
import DeliveryForm from './DeliveryForm';
import OrderTotalAndPayment from './OrderTotalAndPayment';
import Footer from './Footer';

const CheckoutPage: React.FC = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-200 font-display transition-colors duration-300">
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <CheckoutPageTitle />
                <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
                    <div className="lg:col-span-7">
                        <OrderSummary />
                        <FileUpload />
                        <DeliveryForm />
                    </div>
                    <div className="lg:col-span-5 mt-8 lg:mt-0">
                        <OrderTotalAndPayment />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CheckoutPage;
