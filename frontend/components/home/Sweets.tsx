import React from 'react';

const Sweets: React.FC = () => {
    return (
        <section className="py-16 bg-gradient-to-b from-transparent to-pink-50 dark:to-slate-800/50" id="sweets">
            <div className="container mx-auto px-4">
                <div className="bg-white dark:bg-surface-dark rounded-3xl p-8 md:p-12 shadow-xl border border-pink-100 dark:border-slate-700 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-300 rounded-full blur-3xl opacity-20 translate-x-[-50%] translate-y-[-50%]"></div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-pink-400 rounded-full blur-3xl opacity-20 translate-x-[50%] translate-y-[50%]"></div>
                    <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                        <div className="md:w-1/2 space-y-6">
                            <div className="flex items-center gap-2">
                                <span className="material-icons-outlined text-pink-500 text-3xl">cake</span>
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">El Rincón Dulce</h2>
                            </div>
                            <p className="text-lg text-slate-600 dark:text-slate-300">
                                Porque un día de trabajo o estudio merece una recompensa. Encuentra chocolates, gomas, galletas y bebidas refrescantes.
                            </p>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="text-center p-3 rounded-lg bg-pink-50 dark:bg-slate-700">
                                    <span className="text-2xl">🍫</span>
                                    <p className="text-xs font-semibold mt-1">Chocolates</p>
                                </div>
                                <div className="text-center p-3 rounded-lg bg-yellow-50 dark:bg-slate-700">
                                    <span className="text-2xl">🍭</span>
                                    <p className="text-xs font-semibold mt-1">Dulces</p>
                                </div>
                                <div className="text-center p-3 rounded-lg bg-blue-50 dark:bg-slate-700">
                                    <span className="text-2xl">🥤</span>
                                    <p className="text-xs font-semibold mt-1">Bebidas</p>
                                </div>
                            </div>
                            <button className="bg-slate-900 dark:bg-primary text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition w-full md:w-auto">
                                Ver Antojos
                            </button>
                        </div>
                        <div className="md:w-1/2 w-full">
                            <div className="grid grid-cols-2 gap-4">
                                <img alt="Dulces variados" className="rounded-2xl shadow-md rotate-3 hover:rotate-0 transition duration-300 border-4 border-white dark:border-slate-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCd37VP18YKBJOhKx5kxrtV8OkUQ4xbkI88hXF1ZQnfrC2nU17aDWbb8qe_CVa8ufKjD8SJomqm2LTGBgEM2BsQwxMJ3A1093Hm-aZyJR67W90QbCVTG7DXUi7Ewlfin3cC-TsD2m2TYn2Ed4jobATBAbNmUiy_WuMsOzSFe2F0AELXixTTI3qFaGveDh_R21wjKtFJ18N4OYQWDHSRWP_d06khQLClZkfGSTBKR3BckfYUFBWGdx5rWE8MUTJqGOJMLATKA-KQ5vc" />
                                <img alt="Chocolates" className="rounded-2xl shadow-md -rotate-3 hover:rotate-0 transition duration-300 mt-8 border-4 border-white dark:border-slate-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuABRfF3n_iTiA-UUdmln93w8KkSwgZ7V2RdDEdlAlILDw-4b4FCy-gtuDxPUzWGU4pewYl4AzuD4BQ3nhl_OePCBU-nCJaidVmVkYNtnXtDRzvvyhG4ypXS29K6jzkTgi-RGnzWebff6quJtHV9zdRiWyjD69n2EldQX483SJczf2TNzHt5yHyZvwX9bIRUqE91RQriv_Ph_kHrtR_4t9YNkR7xKbJBRhDhe-crWG5xLRIv-Izcu5f_aTqgZYWl-GqeTg5Y4-RUI3o" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Sweets;
