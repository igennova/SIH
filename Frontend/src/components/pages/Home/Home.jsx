import React from "react";
import Navbar from "../../Navbar";
import HeroSection from "../../HeroSection";
import Marquee from "../../Marquee";
import About from "../../About";
import Eyes from "../../Eyes";
import Featured from "../../Featured";
import Footer from "../../Footer";
import LocomotiveScroll from "locomotive-scroll";
import "../../../../src/index.css"

function Home() {
  // Locomotive Scroll
  const locomotiveScroll = new LocomotiveScroll({
    lenisOptions: {
      smoothTouch: true,
      touchMultiplier: 1,
    },
  });

  return (
    <div className="w-full min-h-screen bg-zinc-900 text-white">
      <Navbar />
      <HeroSection />
      <Marquee />
      <About />
      <Eyes />
      <Featured />
      <Footer />
    </div>
  );
}

export default Home;
