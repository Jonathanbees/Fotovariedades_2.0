import React from 'react';

const SalesTrendsChart: React.FC = () => {
    return (
        <div className="lg:col-span-2 bg-surface-dark rounded-xl border border-surface-highlight p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-white font-semibold text-lg">Sales Trends</h3>
                    <p className="text-[#9db9a6] text-sm">Revenue over the last 30 days</p>
                </div>
                <div className="flex gap-2">
                    <select className="bg-surface-highlight border-none text-white text-xs rounded-lg py-1 px-3 focus:ring-1 focus:ring-primary">
                        <option>Last 30 Days</option>
                        <option>Last 7 Days</option>
                        <option>This Year</option>
                    </select>
                </div>
            </div>
            {/* Custom Chart Drawing using SVG */}
            <div className="w-full h-64 relative">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 40">
                    {/* Grid lines */}
                    <line stroke="#28392e" strokeWidth="0.2" x1="0" x2="100" y1="0" y2="0"></line>
                    <line stroke="#28392e" strokeWidth="0.2" x1="0" x2="100" y1="10" y2="10"></line>
                    <line stroke="#28392e" strokeWidth="0.2" x1="0" x2="100" y1="20" y2="20"></line>
                    <line stroke="#28392e" strokeWidth="0.2" x1="0" x2="100" y1="30" y2="30"></line>
                    <line stroke="#28392e" strokeWidth="0.2" x1="0" x2="100" y1="40" y2="40"></line>
                    {/* Area Fill */}
                    <path d="M0,35 Q10,32 20,25 T40,20 T60,28 T80,15 T100,10 V40 H0 Z" fill="url(#gradient)" opacity="0.2"></path>
                    {/* Line */}
                    <path d="M0,35 Q10,32 20,25 T40,20 T60,28 T80,15 T100,10" fill="none" stroke="#2bee6c" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.6"></path>
                    {/* Active Point */}
                    <circle cx="80" cy="15" fill="#111813" r="1.5" stroke="#2bee6c" strokeWidth="0.5"></circle>
                    {/* Gradient Def */}
                    <defs>
                        <linearGradient id="gradient" x1="0%" x2="0%" y1="0%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#2bee6c', stopOpacity: 0.5 }}></stop>
                            <stop offset="100%" style={{ stopColor: '#2bee6c', stopOpacity: 0 }}></stop>
                        </linearGradient>
                    </defs>
                </svg>
                {/* X Axis Labels */}
                <div className="flex justify-between text-xs text-[#9db9a6] mt-2 font-medium">
                    <span>Week 1</span>
                    <span>Week 2</span>
                    <span>Week 3</span>
                    <span>Week 4</span>
                </div>
            </div>
        </div>
    );
};

export default SalesTrendsChart;
