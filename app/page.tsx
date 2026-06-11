import NavBar from "@/component/layout/Navbar";
import Hero from "@/component/landing/Hero";
import ServicesSection from "@/component/landing/ServiceSection";
import NewsEvents from "@/component/landing/NewsEvents";
import AboutContactSection from "@/component/landing/AboutContactSection";
import Footer from "@/component/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <Hero />
      <ServicesSection />
      <NewsEvents />
      <AboutContactSection />
      <Footer />
    </main>
  );
}
