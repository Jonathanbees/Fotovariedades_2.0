import React from 'react';

const TopProductsChart: React.FC = () => {
    return (
        <div className="bg-surface-dark rounded-xl border border-surface-highlight p-6 flex flex-col">
            <h3 className="text-white font-semibold text-lg mb-1">Top Selling Products</h3>
            <p className="text-[#9db9a6] text-sm mb-6">Across all categories</p>
            <div className="flex flex-col gap-5 flex-1 justify-center">
                {/* Item 1 */}
                <div className="group">
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-white font-medium">A4 Paper Reams</span>
                        <span className="text-[#9db9a6]">1.2k sold</span>
                    </div>
                    <div className="w-full bg-surface-highlight rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                </div>
                {/* Item 2 */}
                <div className="group">
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-white font-medium">Passport Photos</span>
                        <span className="text-[#9db9a6]">850 sold</span>
                    </div>
                    <div className="w-full bg-surface-highlight rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full opacity-80" style={{ width: '65%' }}></div>
                    </div>
                </div>
                {/* Item 3 */}
                <div className="group">
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-white font-medium">Chocolate Boxes</span>
                        <span className="text-[#9db9a6]">620 sold</span>
                    </div>
                    <div className="w-full bg-surface-highlight rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full opacity-60" style={{ width: '45%' }}></div>
                    </div>
                </div>
                {/* Item 4 */}
                <div className="group">
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-white font-medium">Notebooks</span>
                        <span className="text-[#9db9a6]">400 sold</span>
                    </div>
                    <div className="w-full bg-surface-highlight rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full opacity-40" style={{ width: '30%' }}></div>
                    </div>
                </div>
            </div>
            <button className="mt-6 w-full py-2 text-sm text-primary font-medium hover:bg-primary/10 rounded-lg transition-colors">
                View Full Report
            </button>
        </div>
    );
};

export default TopProductsChart;
