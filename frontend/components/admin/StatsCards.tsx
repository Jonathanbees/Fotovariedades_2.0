import React from 'react';

const StatsCards: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Revenue */}
            <div className="bg-surface-dark p-6 rounded-xl border border-surface-highlight flex flex-col gap-4 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="material-symbols-outlined text-6xl text-primary">payments</span>
                </div>
                <div className="flex justify-between items-start z-10">
                    <div>
                        <p className="text-[#9db9a6] text-sm font-medium">Total Revenue</p>
                        <h3 className="text-white text-3xl font-bold mt-1">$12,450</h3>
                    </div>
                    <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">attach_money</span>
                </div>
                <div className="flex items-center gap-2 mt-auto z-10">
                    <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">trending_up</span> 12%
                    </span>
                    <span className="text-gray-400 text-xs">vs last week</span>
                </div>
            </div>
            {/* Orders */}
            <div className="bg-surface-dark p-6 rounded-xl border border-surface-highlight flex flex-col gap-4 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="material-symbols-outlined text-6xl text-blue-400">local_mall</span>
                </div>
                <div className="flex justify-between items-start z-10">
                    <div>
                        <p className="text-[#9db9a6] text-sm font-medium">Orders Today</p>
                        <h3 className="text-white text-3xl font-bold mt-1">45</h3>
                    </div>
                    <span className="material-symbols-outlined text-white bg-surface-highlight p-2 rounded-lg">shopping_basket</span>
                </div>
                <div className="flex items-center gap-2 mt-auto z-10">
                    <span className="text-gray-400 text-xs">Processing now</span>
                </div>
            </div>
            {/* Low Stock */}
            <div className="bg-surface-dark p-6 rounded-xl border border-orange-500/20 flex flex-col gap-4 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="material-symbols-outlined text-6xl text-orange-500">warning</span>
                </div>
                <div className="flex justify-between items-start z-10">
                    <div>
                        <p className="text-[#9db9a6] text-sm font-medium">Low Stock Alerts</p>
                        <h3 className="text-white text-3xl font-bold mt-1">8 Items</h3>
                    </div>
                    <span className="material-symbols-outlined text-orange-400 bg-orange-400/10 p-2 rounded-lg">priority_high</span>
                </div>
                <div className="flex items-center gap-2 mt-auto z-10">
                    <span className="text-orange-400 text-xs font-bold cursor-pointer hover:underline flex items-center gap-1">
                        View Inventory <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default StatsCards;
