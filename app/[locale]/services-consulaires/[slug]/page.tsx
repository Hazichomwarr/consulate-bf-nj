import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AlertTriangle } from "lucide-react";
import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/Navbar";
import PageHero from "@/components/shared/PageHero";
import ServiceFaq from "@/components/services/ServiceFaq";
import ServiceListSection from "@/components/services/ServiceListSection";
import ServiceMetaCards from "@/components/services/ServiceMetaCards";
import ServiceRequestCta from "@/components/services/ServiceRequestCta";
import ServiceSteps from "@/components/services/ServiceSteps";
import { Link } from "@/i18n/navigation";
import { isLocale, locales, type Locale } from "@/i18n/routing";
import {
  consularServices,
  getConsularServiceBySlug,
  getLocalizedText,
} from "@/lib/content/consular-services";

type ServiceDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    consularServices.map((service) => ({
      locale,
      slug: service.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { locale: paramLocale, slug } = await params;
  const locale: Locale = isLocale(paramLocale) ? paramLocale : "fr";
  const service = getConsularServiceBySlug(slug);
  const t = await getTranslations({
    locale,
    namespace: "ConsularServiceDetailPage",
  });

  if (!service) {
    return {
      title: t("metadata.notFoundTitle"),
      description: t("metadata.notFoundDescription"),
    };
  }

  const serviceName = getLocalizedText(service.name, locale);
  const description = getLocalizedText(service.shortDescription, locale);

  return {
    title: t("metadata.title", { service: serviceName }),
    description,
    openGraph: {
      title: t("metadata.title", { service: serviceName }),
      description,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { locale: paramLocale, slug } = await params;

  if (!isLocale(paramLocale)) {
    notFound();
  }

  setRequestLocale(paramLocale);

  const service = getConsularServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const t = await getTranslations("ConsularServiceDetailPage");
  const nav = await getTranslations("Navigation");
  const accessibility = await getTranslations("Accessibility");
  const serviceName = getLocalizedText(service.name, paramLocale);
  const statusNotice =
    service.status === "active" ? undefined : t(`statusNotice.${service.status}`);

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <NavBar />

      <PageHero
        eyebrow={serviceName}
        title={getLocalizedText(service.heroTitle, paramLocale)}
        description={getLocalizedText(service.heroDescription, paramLocale)}
        imageSrc="/images/consul-hero.png"
        imageAlt={accessibility("heroImageAlt")}
      >
        <nav aria-label={t("breadcrumbs.ariaLabel")}>
          <ol className="flex flex-wrap items-center gap-2 text-sm font-semibold text-white/85">
            <li>
              <Link href="/" className="hover:text-amber-300">
                {nav("home")}
              </Link>
            </li>
            <li aria-hidden="true" className="text-white/50">
              /
            </li>
            <li>
              <Link
                href="/services-consulaires"
                className="hover:text-amber-300"
              >
                {nav("services")}
              </Link>
            </li>
            <li aria-hidden="true" className="text-white/50">
              /
            </li>
            <li aria-current="page" className="text-amber-300">
              {serviceName}
            </li>
          </ol>
        </nav>
      </PageHero>

      <section className="px-5 py-14 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-8">
            {getLocalizedText(service.overview, paramLocale) ? (
              <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="font-serif text-2xl font-black text-slate-950">
                  {t("sections.overview")}
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700">
                  {getLocalizedText(service.overview, paramLocale)}
                </p>
              </section>
            ) : null}

            <div className="grid gap-8 xl:grid-cols-2">
              <ServiceListSection
                title={t("sections.whoThisIsFor")}
                items={service.whoItIsFor}
                locale={paramLocale}
              />
              <ServiceListSection
                title={t("sections.includedSupport")}
                items={service.servicesIncluded}
                locale={paramLocale}
              />
            </div>

            <ServiceListSection
              title={t("sections.requiredDocuments")}
              description={t("requirementsDisclaimer")}
              items={service.requiredDocuments}
              locale={paramLocale}
            />

            <ServiceSteps
              title={t("sections.process")}
              steps={service.steps}
              locale={paramLocale}
            />

            {service.importantNotes.length > 0 ? (
              <section className="rounded-lg border border-amber-200 bg-amber-50 p-6 text-amber-950">
                <div className="flex gap-4">
                  <AlertTriangle
                    className="mt-1 h-5 w-5 shrink-0 text-amber-600"
                    aria-hidden="true"
                  />
                  <div>
                    <h2 className="font-serif text-2xl font-black">
                      {t("sections.importantNotes")}
                    </h2>
                    <ul className="mt-4 space-y-3">
                      {service.importantNotes.map((note) => (
                        <li
                          key={getLocalizedText(note, paramLocale)}
                          className="text-sm leading-7"
                        >
                          {getLocalizedText(note, paramLocale)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            ) : null}

            <ServiceFaq
              title={t("sections.faq")}
              faq={service.faq}
              locale={paramLocale}
            />
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            {statusNotice ? (
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm font-semibold leading-7 text-amber-950">
                {statusNotice}
              </div>
            ) : null}
            <ServiceMetaCards
              fees={service.fees}
              processingTime={service.processingTime}
              locale={paramLocale}
            />
          </aside>
        </div>
      </section>

      <section className="px-5 pb-14 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ServiceRequestCta
            title={t("cta.title")}
            description={t("cta.description")}
            cta={service.cta}
            locale={paramLocale}
            status={service.status}
            statusNotice={statusNotice}
            backHref="/services-consulaires"
            backLabel={t("cta.backToServices")}
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}
