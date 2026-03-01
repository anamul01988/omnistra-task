import React from "react";
import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/sections/Hero";
import IntegrationsSection from "../../components/sections/IntegrationsSection";

const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <IntegrationsSection />
        {/* Placeholder for future sections */}
        <div className="h-[100vh] w-full bg-black"></div>
      </main>
    </div>
  );
};

export default Home;
