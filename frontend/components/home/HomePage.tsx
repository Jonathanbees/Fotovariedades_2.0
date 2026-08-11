import React from "react";
import Hero from "./Hero";
import Services from "./Services";
import FeaturedStationery from "./FeaturedStationery";
import Sweets from "./Sweets";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const HomePage: React.FC = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 font-body transition-colors duration-300">
      <Header variant="default" showSearch showCart cartItemCount={1} />
      <main>
        <Hero />
        <Services />
        <FeaturedStationery />
        <Sweets />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
