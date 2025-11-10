"use client";

import { useEffect } from "react";
import Hero from "@/components/HeroSection/HeroSection";
import SpecialOffers from "@/components/SpecialOffer/SpecialOffer";
import Destination from "@/components/Destination/Destination";
import Packages from "@/components/Packages/Packages";
import VahicleBooking from "@/components/VehicleBooking/VehicleBooking";
import AboutSection from "@/components/About/About";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  const pageStyle = {
    position: "relative",
    minHeight: "100vh",
    overflow: "hidden",
  };

  const videoStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: -2,
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(135deg, rgba(62, 74, 73, 0.93) 0%, rgba(78, 78, 78, 0.45) 50%, rgba(56, 52, 52, 0.81) 100%)",
    zIndex: -1,
  };

  useEffect(() => {
    document.title = "Quick Kerala - Discover God's Own Country";
    const html = document.documentElement;
    html.style.scrollBehavior = "smooth";
    return () => {
      html.style.scrollBehavior = "";
    };
  }, []);

  return (
    <div style={pageStyle}>
      {/* Background Video */}
      <video
        style={videoStyle}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src="/assets/video_bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Gradient */}
      <div style={overlayStyle}></div>

      {/* Page Sections */}
      <Hero />
      <SpecialOffers />
      <Packages />
      <Destination />
      <VahicleBooking />
      <AboutSection />
      <Footer />
    </div>
  );
}
