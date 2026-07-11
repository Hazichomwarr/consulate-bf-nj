import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AlertTriangle, ClipboardList } from "lucide-react";
import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/Navbar";
import ConsularServiceCard from "@/components/services/ConsularServiceCard";
import EmptyState from "@/components/shared/EmptyState";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import { Link } from "@/i18n/navigation";
import { isLocale, type Locale } from "@/i18n/routing";
import { getActiveConsularServices } from "@/lib/content/consular-services";

type ServicesPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: ServicesPageProps): Promise<Metadata> {
  const { locale: paramLocale } = await params;
  const locale: Locale = isLocale(paramLocale) ? paramLocale : "fr";
  const t = await getTranslations({
    locale,
    namespace: "ConsularServicesPage.Metadata",
  });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function ConsularServicesPage({
  params,
}: ServicesPageProps) {
  const { locale: paramLocale } = await params;

  if (!isLocale(paramLocale)) {
    notFound();
  }

  setRequestLocale(paramLocale);

  const t = await getTranslations("ConsularServicesPage");
  const accessibility = await getTranslations("Accessibility");
  const services = getActiveConsularServices();

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <NavBar />

      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        imageSrc="/images/consul-hero.png"
        imageAlt={accessibility("heroImageAlt")}
      />

      <section className="px-5 py-14 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <SectionHeading
              eyebrow={t("intro.eyebrow")}
              title={t("intro.title")}
              description={t("intro.description")}
            />
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-950">
              <div className="flex gap-4">
                <AlertTriangle
                  className="mt-1 h-5 w-5 shrink-0 text-amber-600"
                  aria-hidden="true"
                />
                <p>{t("intro.confirmationNote")}</p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            {services.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {services.map((service) => (
                  <ConsularServiceCard
                    key={service.slug}
                    service={service}
                    locale={paramLocale}
                    learnMoreLabel={t("cards.learnMore")}
                    statusLabel={t(`status.${service.status}`)}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title={t("empty.title")}
                description={t("empty.description")}
              />
            )}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 px-5 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[auto_1fr] lg:items-start">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
              <AlertTriangle className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-black text-slate-950">
                {t("notice.title")}
              </h2>
              <div className="mt-4 grid gap-3 text-sm leading-7 text-slate-700 md:grid-cols-3">
                <p>{t("notice.requirements")}</p>
                <p>{t("notice.updates")}</p>
                <p>{t("notice.emergencies")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-emerald-950 px-5 py-14 text-white lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 md:flex-row md:items-center md:justify-between">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-amber-300">
              <ClipboardList className="h-5 w-5" aria-hidden="true" />
              <p className="text-sm font-extrabold uppercase tracking-wide">
                {t("cta.eyebrow")}
              </p>
            </div>
            <h2 className="mt-3 font-serif text-3xl font-black">
              {t("cta.title")}
            </h2>
            <p className="mt-4 text-base leading-7 text-white/85">
              {t("cta.description")}
            </p>
          </div>
          <Link
            href="/demande"
            className="inline-flex h-12 shrink-0 items-center justify-center rounded-md bg-amber-400 px-7 text-sm font-extrabold text-emerald-950 transition hover:bg-amber-300 focus:outline-none focus:ring-4 focus:ring-amber-300/30"
          >
            {t("cta.primary")}
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
