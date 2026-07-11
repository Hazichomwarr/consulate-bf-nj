import NavBar from "@/components/layout/Navbar";
import Hero from "@/components/landing/Hero";
import ServicesSection from "@/components/landing/ServiceSection";
import NewsEvents from "@/components/landing/NewsEvents";
import AboutContactSection from "@/components/landing/AboutContactSection";
import Footer from "@/components/layout/Footer";
import { setRequestLocale } from "next-intl/server";
import { isLocale } from "@/i18n/routing";

type HomeProps = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;

  if (isLocale(locale)) {
    setRequestLocale(locale);
  }

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
