import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Building2, CheckCircle2, Users } from "lucide-react";
import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/Navbar";
import ContentBadge from "@/components/shared/ContentBadge";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import { Link } from "@/i18n/navigation";
import { isLocale, type Locale } from "@/i18n/routing";
import { aboutPageContent } from "@/lib/content/about";
import { getLocalizedText } from "@/lib/content/consular-services";

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale: paramLocale } = await params;
  const locale: Locale = isLocale(paramLocale) ? paramLocale : "fr";
  const t = await getTranslations({
    locale,
    namespace: "AboutPages.About.Metadata",
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

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale: paramLocale } = await params;

  if (!isLocale(paramLocale)) {
    notFound();
  }

  setRequestLocale(paramLocale);

  const t = await getTranslations("AboutPages");
  const accessibility = await getTranslations("Accessibility");

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <NavBar />

      <PageHero
        eyebrow={t("About.heroEyebrow")}
        title={getLocalizedText(aboutPageContent.heroTitle, paramLocale)}
        description={getLocalizedText(
          aboutPageContent.heroDescription,
          paramLocale
        )}
        imageSrc="/images/consul-hero.png"
        imageAlt={accessibility("heroImageAlt")}
      />

      <section className="px-5 py-14 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-8">
              <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <ContentBadge>{t("About.overviewBadge")}</ContentBadge>
                <p className="mt-5 max-w-3xl text-lg leading-9 text-slate-700">
                  {getLocalizedText(aboutPageContent.overview, paramLocale)}
                </p>
              </section>

              <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                    <Building2 className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl font-black text-slate-950">
                      {getLocalizedText(
                        aboutPageContent.role.title,
                        paramLocale
                      )}
                    </h2>
                    <p className="mt-4 text-base leading-8 text-slate-700">
                      {getLocalizedText(
                        aboutPageContent.role.body,
                        paramLocale
                      )}
                    </p>
                  </div>
                </div>
              </section>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
                <div className="flex items-center gap-3 text-emerald-800">
                  <Users className="h-5 w-5" aria-hidden="true" />
                  <h2 className="font-serif text-2xl font-black text-slate-950">
                    {t("About.whoItServes")}
                  </h2>
                </div>
                <ul className="mt-5 space-y-3">
                  {aboutPageContent.whoItServes.map((item) => (
                    <li key={getLocalizedText(item, paramLocale)} className="flex gap-3">
                      <CheckCircle2
                        className="mt-1 h-4 w-4 shrink-0 text-emerald-700"
                        aria-hidden="true"
                      />
                      <span className="text-sm leading-7 text-slate-700">
                        {getLocalizedText(item, paramLocale)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>

          <section className="mt-12">
            <SectionHeading
              eyebrow={t("About.prioritiesEyebrow")}
              title={t("About.prioritiesTitle")}
              description={t("About.prioritiesDescription")}
            />
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {aboutPageContent.priorities.map((priority) => (
                <article
                  key={getLocalizedText(priority, paramLocale)}
                  className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <CheckCircle2
                    className="h-5 w-5 text-emerald-700"
                    aria-hidden="true"
                  />
                  <p className="mt-4 text-sm leading-7 text-slate-700">
                    {getLocalizedText(priority, paramLocale)}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="bg-emerald-950 px-5 py-14 text-white lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 md:flex-row md:items-center md:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-extrabold uppercase tracking-wide text-amber-300">
              {t("cta.eyebrow")}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-black">
              {t("About.ctaTitle")}
            </h2>
            <p className="mt-4 text-base leading-7 text-white/85">
              {t("About.ctaDescription")}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/a-propos/mission"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-amber-400 px-6 text-sm font-extrabold text-emerald-950 transition hover:bg-amber-300 focus:outline-none focus:ring-4 focus:ring-amber-300/30"
            >
              {t("About.missionCta")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/services-consulaires"
              className="inline-flex h-12 items-center justify-center rounded-md border border-white/25 px-6 text-sm font-extrabold text-white transition hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-white/20"
            >
              {t("About.servicesCta")}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
