import React from "react";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 shrink-0 flex flex-col border-r border-surface-highlight bg-background-dark hidden md:flex">
      <div className="p-6">
        <div className="flex flex-col">
          <h1 className="text-white text-xl font-bold tracking-tight">
            Fotovariedades
          </h1>
          <p className="text-[#9db9a6] text-xs font-medium tracking-wide mt-1 uppercase">
            Admin Panel
          </p>
        </div>
      </div>
      <nav className="flex-1 flex flex-col gap-2 px-4 overflow-y-auto">
        {/* Dashboard */}
        <a
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/20 text-primary border border-primary/10"
          href="#"
        >
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-sm font-medium">Dashboard</span>
        </a>
        {/* Inventory */}
        <a
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-surface-highlight hover:text-white transition-colors group"
          href="#"
        >
          <span className="material-symbols-outlined group-hover:text-primary transition-colors">
            inventory_2
          </span>
          <span className="text-sm font-medium">Inventory</span>
        </a>
        {/* Orders */}
        <a
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-surface-highlight hover:text-white transition-colors group"
          href="#"
        >
          <span className="material-symbols-outlined group-hover:text-primary transition-colors">
            shopping_bag
          </span>
          <span className="text-sm font-medium">Orders</span>
        </a>
        {/* Photo Bookings */}
        <a
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-surface-highlight hover:text-white transition-colors group"
          href="#"
        >
          <span className="material-symbols-outlined group-hover:text-primary transition-colors">
            camera_alt
          </span>
          <span className="text-sm font-medium">Photography</span>
        </a>
        {/* Analytics */}
        <a
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-surface-highlight hover:text-white transition-colors group"
          href="#"
        >
          <span className="material-symbols-outlined group-hover:text-primary transition-colors">
            bar_chart
          </span>
          <span className="text-sm font-medium">Analytics</span>
        </a>
        <div className="my-2 border-t border-surface-highlight"></div>
        {/* Settings */}
        <a
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-surface-highlight hover:text-white transition-colors group"
          href="#"
        >
          <span className="material-symbols-outlined group-hover:text-primary transition-colors">
            settings
          </span>
          <span className="text-sm font-medium">Settings</span>
        </a>
      </nav>
      <div className="p-4 border-t border-surface-highlight">
        <a
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-red-500/10 hover:text-red-400 transition-colors"
          href="#"
        >
          <span className="material-symbols-outlined text-xl">logout</span>
          <span className="text-sm font-medium">Log Out</span>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
