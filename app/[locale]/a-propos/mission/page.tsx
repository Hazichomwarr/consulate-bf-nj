import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/Navbar";
import ContentBadge from "@/components/shared/ContentBadge";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import { Link } from "@/i18n/navigation";
import { isLocale, type Locale } from "@/i18n/routing";
import { missionPageContent } from "@/lib/content/about";
import { getLocalizedText } from "@/lib/content/consular-services";

type MissionPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: MissionPageProps): Promise<Metadata> {
  const { locale: paramLocale } = await params;
  const locale: Locale = isLocale(paramLocale) ? paramLocale : "fr";
  const t = await getTranslations({
    locale,
    namespace: "AboutPages.Mission.Metadata",
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

export default async function MissionPage({ params }: MissionPageProps) {
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
        eyebrow={t("Mission.heroEyebrow")}
        title={getLocalizedText(missionPageContent.heroTitle, paramLocale)}
        description={getLocalizedText(
          missionPageContent.heroDescription,
          paramLocale
        )}
        imageSrc="/images/consul-hero.png"
        imageAlt={accessibility("heroImageAlt")}
      />

      <section className="px-5 py-14 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <ContentBadge>{t("Mission.statementBadge")}</ContentBadge>
            <p className="mt-5 max-w-4xl text-lg leading-9 text-slate-700">
              {getLocalizedText(missionPageContent.statement, paramLocale)}
            </p>
          </section>

          <section className="mt-12">
            <SectionHeading
              eyebrow={t("Mission.principlesEyebrow")}
              title={t("Mission.principlesTitle")}
              description={t("Mission.principlesDescription")}
            />
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {missionPageContent.principles.map((principle) => (
                <article
                  key={getLocalizedText(principle.title, paramLocale)}
                  className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <h2 className="font-serif text-2xl font-black text-slate-950">
                    {getLocalizedText(principle.title, paramLocale)}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-slate-700">
                    {getLocalizedText(principle.body, paramLocale)}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-12 rounded-lg border border-slate-200 bg-slate-50 p-6 md:p-8">
            <SectionHeading
              eyebrow={t("Mission.commitmentsEyebrow")}
              title={t("Mission.commitmentsTitle")}
              description={t("Mission.commitmentsDescription")}
            />
            <ul className="mt-6 grid gap-4 md:grid-cols-3">
              {missionPageContent.commitments.map((commitment) => (
                <li
                  key={getLocalizedText(commitment, paramLocale)}
                  className="flex gap-3 rounded-lg bg-white p-5 shadow-sm"
                >
                  <CheckCircle2
                    className="mt-1 h-4 w-4 shrink-0 text-emerald-700"
                    aria-hidden="true"
                  />
                  <span className="text-sm leading-7 text-slate-700">
                    {getLocalizedText(commitment, paramLocale)}
                  </span>
                </li>
              ))}
            </ul>
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
              {t("Mission.ctaTitle")}
            </h2>
            <p className="mt-4 text-base leading-7 text-white/85">
              {t("Mission.ctaDescription")}
            </p>
          </div>
          <Link
            href="/services-consulaires"
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-md bg-amber-400 px-7 text-sm font-extrabold text-emerald-950 transition hover:bg-amber-300 focus:outline-none focus:ring-4 focus:ring-amber-300/30"
          >
            {t("Mission.servicesCta")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
