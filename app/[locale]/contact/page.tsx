import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  AlertTriangle,
  Clock,
  Globe,
  Mail,
  MapPin,
  Phone,
  ShieldAlert,
} from "lucide-react";
import ContactCard from "@/components/contact/ContactCard";
import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/Navbar";
import ContentBadge from "@/components/shared/ContentBadge";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import { Link } from "@/i18n/navigation";
import { isLocale, type Locale } from "@/i18n/routing";
import {
  consulateInfo,
  emailHref,
  formatAddress,
  phoneHref,
} from "@/lib/constants/consulate";

type ContactPageProps = {
  params: Promise<{ locale: string }>;
};

function hasConfirmedText(value: string | null | undefined): value is string {
  if (!value) {
    return false;
  }

  const normalized = value.toLowerCase();

  return ![
    "placeholder",
    "to confirm",
    "à confirmer",
    "tbd",
    "n/a",
  ].some((marker) => normalized.includes(marker));
}

function hasConfirmedAddress(): boolean {
  const address = consulateInfo.address;

  if (!address.line1 || address.line1.toLowerCase().includes("123 market")) {
    return false;
  }

  return formatAddress(address).every(hasConfirmedText);
}

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale: paramLocale } = await params;
  const locale: Locale = isLocale(paramLocale) ? paramLocale : "fr";
  const t = await getTranslations({
    locale,
    namespace: "ContactPage.Metadata",
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

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale: paramLocale } = await params;

  if (!isLocale(paramLocale)) {
    notFound();
  }

  setRequestLocale(paramLocale);

  const t = await getTranslations("ContactPage");
  const accessibility = await getTranslations("Accessibility");
  const addressLines = hasConfirmedAddress()
    ? formatAddress(consulateInfo.address)
    : [];

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
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <SectionHeading
              eyebrow={t("intro.eyebrow")}
              title={t("intro.title")}
              description={t("intro.description")}
            />
            <aside className="rounded-lg border border-slate-200 bg-slate-50 p-6">
              <ContentBadge>{t("intro.badge")}</ContentBadge>
              <p className="mt-4 text-sm leading-7 text-slate-700">
                {t("intro.note")}
              </p>
            </aside>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {hasConfirmedText(consulateInfo.phone) ? (
              <ContactCard
                actionLabel={t("actions.call")}
                actionLink={phoneHref(consulateInfo.phone)}
                icon={<Phone className="h-6 w-6" aria-hidden="true" />}
                title={t("cards.phone")}
                value={consulateInfo.phone}
              />
            ) : null}

            {hasConfirmedText(consulateInfo.email) ? (
              <ContactCard
                actionLabel={t("actions.email")}
                actionLink={emailHref(consulateInfo.email)}
                icon={<Mail className="h-6 w-6" aria-hidden="true" />}
                title={t("cards.email")}
                value={consulateInfo.email}
              />
            ) : null}

            <ContactCard
              icon={<Clock className="h-6 w-6" aria-hidden="true" />}
              title={t("cards.officeHours")}
              value={
                <>
                  <p>{consulateInfo.officeHours.label}</p>
                  {consulateInfo.officeHours.note ? (
                    <p className="mt-1 font-normal text-slate-600">
                      {consulateInfo.officeHours.note}
                    </p>
                  ) : null}
                </>
              }
            />

            {addressLines.length > 0 ? (
              <ContactCard
                icon={<MapPin className="h-6 w-6" aria-hidden="true" />}
                title={t("cards.address")}
                value={
                  <address className="not-italic">
                    {addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                }
              />
            ) : null}

            {hasConfirmedText(consulateInfo.emergencyPhone) ? (
              <ContactCard
                actionLabel={t("actions.call")}
                actionLink={phoneHref(consulateInfo.emergencyPhone)}
                icon={<ShieldAlert className="h-6 w-6" aria-hidden="true" />}
                title={t("cards.emergencyPhone")}
                value={consulateInfo.emergencyPhone}
              />
            ) : null}

            {hasConfirmedText(consulateInfo.officialGovernmentUrl) ? (
              <ContactCard
                actionLabel={t("actions.openWebsite")}
                actionLink={consulateInfo.officialGovernmentUrl}
                icon={<Globe className="h-6 w-6" aria-hidden="true" />}
                title={t("cards.officialWebsite")}
                value={t("cards.officialWebsiteValue")}
              />
            ) : null}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 px-5 py-12 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                <MapPin className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-serif text-2xl font-black text-slate-950">
                  {t("location.title")}
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-700">
                  {addressLines.length > 0
                    ? t("location.description")
                    : t("location.placeholder")}
                </p>
                {consulateInfo.googleMapsUrl ? (
                  <a
                    href={consulateInfo.googleMapsUrl}
                    className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-emerald-900 px-5 text-sm font-extrabold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-800/20"
                    rel="noreferrer"
                    target="_blank"
                  >
                    {t("location.openMaps")}
                  </a>
                ) : (
                  <p className="mt-6 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold leading-7 text-amber-950">
                    {t("location.mapsPlaceholder")}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-amber-200 bg-amber-50 p-6 text-amber-950 md:p-8">
            <div className="flex items-start gap-4">
              <AlertTriangle
                className="mt-1 h-6 w-6 shrink-0 text-amber-600"
                aria-hidden="true"
              />
              <div>
                <h2 className="font-serif text-2xl font-black">
                  {t("emergency.title")}
                </h2>
                <div className="mt-4 space-y-3 text-sm leading-7">
                  <p>{t("emergency.officialChannels")}</p>
                  <p>{t("emergency.localServices")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-emerald-950 px-5 py-14 text-white lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 md:flex-row md:items-center md:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-extrabold uppercase tracking-wide text-amber-300">
              {t("servicesReminder.eyebrow")}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-black">
              {t("servicesReminder.title")}
            </h2>
            <p className="mt-4 text-base leading-7 text-white/85">
              {t("servicesReminder.description")}
            </p>
          </div>
          <Link
            href="/services-consulaires"
            className="inline-flex h-12 shrink-0 items-center justify-center rounded-md bg-amber-400 px-7 text-sm font-extrabold text-emerald-950 transition hover:bg-amber-300 focus:outline-none focus:ring-4 focus:ring-amber-300/30"
          >
            {t("servicesReminder.cta")}
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
