import Navbar from "../layouts/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import DashboardPreview from "../components/landing/DashboardPreview";
import CTA from "../components/landing/CTA";
import Footer from "../layouts/Footer";

function Landing() {
  return (
    <div className="min-h-screen bg-[#060816] text-white">

      <Navbar />

      <Hero />

      <Features />

      <DashboardPreview />

      <CTA />

      <Footer />

    </div>
  );
}

export default Landing;