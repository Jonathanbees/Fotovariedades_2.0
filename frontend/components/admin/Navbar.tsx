import React from 'react';

const Navbar: React.FC = () => {
    return (
        <header className="flex items-center justify-between border-b border-surface-highlight bg-background-dark/50 backdrop-blur-md px-6 py-4 sticky top-0 z-30">
            <div className="flex items-center gap-4">
                <button className="md:hidden text-white">
                    <span className="material-symbols-outlined">menu</span>
                </button>
                <h2 className="text-white text-lg font-bold">Dashboard Overview</h2>
            </div>
            <div className="flex items-center gap-6">
                {/* Search */}
                <div className="hidden md:flex items-center bg-surface-highlight rounded-lg px-3 py-2 w-64 border border-transparent focus-within:border-primary/50 transition-all">
                    <span className="material-symbols-outlined text-gray-400 text-[20px]">search</span>
                    <input className="bg-transparent border-none text-sm text-white placeholder-gray-400 focus:ring-0 w-full ml-2 p-0 h-5" placeholder="Search orders, items..." type="text" />
                </div>
                {/* Actions */}
                <div className="flex items-center gap-3">
                    <button className="relative p-2 rounded-lg bg-surface-highlight text-white hover:bg-surface-highlight/80 transition-colors">
                        <span className="material-symbols-outlined text-[20px]">notifications</span>
                        <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-surface-highlight"></span>
                    </button>
                    <div className="w-px h-8 bg-surface-highlight mx-1"></div>
                    <div className="flex items-center gap-3 cursor-pointer">
                        <div className="bg-cover bg-center h-9 w-9 rounded-full border border-surface-highlight" data-alt="Admin user profile picture" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAt2V0P5hp2FIugCTYbYxaVxxW-6SwTw2YRzW6PsR--Qvh1PprdIzfA3Zdgw7Y2IOu6RZd54ZsVQUpOLAATIArBfLS6wfCAhWqHGYjHwHP0DCU4jmJM-wb75-ljfdgE_ejWxzmrZtPfZFKiThSo7As7UKD6u737bza7luDpzGvDFeyAoS-ZKgxQsCBEFsn6iH1o3R8meUrzXIHpJAGBUwvzRSdGI0fgh6HAXGe8D0nInjrkcjabxSMDUcgPaXJCbp4KoVTFnST20zw')" }}></div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
