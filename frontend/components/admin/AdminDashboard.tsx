import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import StatsCards from './StatsCards';
import SalesTrendsChart from './SalesTrendsChart';
import TopProductsChart from './TopProductsChart';
import RecentOrdersTable from './RecentOrdersTable';

const AdminDashboard: React.FC = () => {
    return (
        <div className="flex h-screen w-full">
            <Sidebar />
            <main className="flex-1 flex flex-col min-w-0 bg-background-light dark:bg-background-dark">
                <Navbar />
                <div className="flex-1 overflow-y-auto p-6 md:p-8">
                    <div className="max-w-7xl mx-auto space-y-8">
                        <StatsCards />
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <SalesTrendsChart />
                            <TopProductsChart />
                        </div>
                        <RecentOrdersTable />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
