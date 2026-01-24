import React from 'react';

const RecentOrdersTable: React.FC = () => {
    return (
        <div className="bg-surface-dark rounded-xl border border-surface-highlight overflow-hidden">
            <div className="p-6 border-b border-surface-highlight flex justify-between items-center">
                <h3 className="text-white font-semibold text-lg">Recent Orders</h3>
                <button className="text-[#9db9a6] hover:text-white text-sm font-medium transition-colors">View All</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-[#9db9a6]">
                    <thead className="bg-surface-highlight text-xs uppercase font-semibold text-white">
                        <tr>
                            <th className="px-6 py-4">Order ID</th>
                            <th className="px-6 py-4">Customer</th>
                            <th className="px-6 py-4">Product Type</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-highlight">
                        <tr className="hover:bg-surface-highlight/50 transition-colors">
                            <td className="px-6 py-4 font-medium text-white">#ORD-0092</td>
                            <td className="px-6 py-4">Maria Gonzalez</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-base">camera</span> Photography
                                </div>
                            </td>
                            <td className="px-6 py-4 text-white font-medium">$150.00</td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                                    Completed
                                </span>
                            </td>
                        </tr>
                        <tr className="hover:bg-surface-highlight/50 transition-colors">
                            <td className="px-6 py-4 font-medium text-white">#ORD-0091</td>
                            <td className="px-6 py-4">Carlos Ruiz</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-base">edit_note</span> Stationery
                                </div>
                            </td>
                            <td className="px-6 py-4 text-white font-medium">$42.50</td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                                    Processing
                                </span>
                            </td>
                        </tr>
                        <tr className="hover:bg-surface-highlight/50 transition-colors">
                            <td className="px-6 py-4 font-medium text-white">#ORD-0090</td>
                            <td className="px-6 py-4">Ana Silva</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-base">cake</span> Sweets
                                </div>
                            </td>
                            <td className="px-6 py-4 text-white font-medium">$12.00</td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                                    Completed
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentOrdersTable;
