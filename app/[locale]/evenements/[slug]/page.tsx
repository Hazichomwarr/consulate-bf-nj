import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ArrowLeft,
  CalendarDays,
  ExternalLink,
  MapPin,
} from "lucide-react";
import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/Navbar";
import ContentBadge from "@/components/shared/ContentBadge";
import DetailBreadcrumbs from "@/components/shared/DetailBreadcrumbs";
import {
  formatEventDateRange,
  type EventCategoryLabels,
} from "@/components/events/EventCard";
import PageHero from "@/components/shared/PageHero";
import { Link } from "@/i18n/navigation";
import { isLocale, locales, type Locale } from "@/i18n/routing";
import { events, getEventBySlug } from "@/lib/content/events";
import { getLocalizedText } from "@/lib/content/consular-services";

type EventDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    events
      .filter((event) => event.status !== "draft")
      .map((event) => ({
        locale,
        slug: event.slug,
      }))
  );
}

export async function generateMetadata({
  params,
}: EventDetailPageProps): Promise<Metadata> {
  const { locale: paramLocale, slug } = await params;
  const locale: Locale = isLocale(paramLocale) ? paramLocale : "fr";
  const event = getEventBySlug(slug);
  const t = await getTranslations({
    locale,
    namespace: "EventsPage.DetailMetadata",
  });

  if (!event || event.status === "draft") {
    return {
      title: t("notFoundTitle"),
      description: t("notFoundDescription"),
    };
  }

  const title = getLocalizedText(event.title, locale);
  const description = getLocalizedText(event.excerpt, locale);

  return {
    title: t("title", { title }),
    description,
    openGraph: {
      title: t("title", { title }),
      description,
    },
  };
}

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const { locale: paramLocale, slug } = await params;

  if (!isLocale(paramLocale)) {
    notFound();
  }

  setRequestLocale(paramLocale);

  const event = getEventBySlug(slug);

  if (!event || event.status === "draft") {
    notFound();
  }

  const t = await getTranslations("EventsPage");
  const nav = await getTranslations("Navigation");
  const accessibility = await getTranslations("Accessibility");
  const title = getLocalizedText(event.title, paramLocale);
  const categoryLabels: EventCategoryLabels = {
    community: t("categories.community"),
    "consular-outreach": t("categories.consular-outreach"),
    cultural: t("categories.cultural"),
    official: t("categories.official"),
  };

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <NavBar />

      <PageHero
        eyebrow={categoryLabels[event.category]}
        title={title}
        description={getLocalizedText(event.excerpt, paramLocale)}
        imageSrc="/images/consul-hero.png"
        imageAlt={accessibility("heroImageAlt")}
      >
        <DetailBreadcrumbs
          ariaLabel={t("breadcrumbs.ariaLabel")}
          items={[
            { href: "/", label: nav("home") },
            { href: "/evenements", label: nav("events") },
            { label: title },
          ]}
        />
      </PageHero>

      <article className="px-5 py-14 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <ContentBadge>{categoryLabels[event.category]}</ContentBadge>
              {event.featured ? (
                <ContentBadge tone="amber">{t("cards.featured")}</ContentBadge>
              ) : null}
              <ContentBadge tone="slate">{t(`status.${event.status}`)}</ContentBadge>
            </div>

            {event.image ? (
              <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-lg bg-slate-100">
                <Image
                  src={event.image.src}
                  alt={getLocalizedText(event.image.alt, paramLocale)}
                  fill
                  sizes="(min-width: 1024px) 768px, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            ) : null}

            <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <h2 className="font-serif text-2xl font-black text-slate-950">
                {t("detail.descriptionTitle")}
              </h2>
              <p className="mt-4 text-lg leading-9 text-slate-700">
                {getLocalizedText(event.description, paramLocale)}
              </p>
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
              <h2 className="font-serif text-2xl font-black text-slate-950">
                {t("detail.eventDetails")}
              </h2>
              <dl className="mt-5 space-y-5">
                <div>
                  <dt className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-emerald-800">
                    <CalendarDays className="h-4 w-4" aria-hidden="true" />
                    {t("detail.date")}
                  </dt>
                  <dd className="mt-2 text-sm font-semibold leading-7 text-slate-700">
                    {formatEventDateRange(
                      event.startAt,
                      event.endAt,
                      paramLocale
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-emerald-800">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    {t("detail.location")}
                  </dt>
                  <dd className="mt-2 text-sm font-semibold leading-7 text-slate-700">
                    {getLocalizedText(event.location.name, paramLocale)}
                    {event.location.address ? (
                      <span className="mt-1 block font-normal">
                        {event.location.address}
                      </span>
                    ) : null}
                    {event.location.mapsUrl ? (
                      <a
                        href={event.location.mapsUrl}
                        className="mt-3 inline-flex items-center gap-2 font-extrabold text-emerald-800 hover:text-emerald-700"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {t("detail.viewMap")}
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      </a>
                    ) : null}
                  </dd>
                </div>
              </dl>

              <div className="mt-6 flex flex-col gap-3">
                {event.registrationUrl ? (
                  <a
                    href={event.registrationUrl}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-amber-400 px-5 text-sm font-extrabold text-emerald-950 transition hover:bg-amber-300 focus:outline-none focus:ring-4 focus:ring-amber-300/30"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t("detail.register")}
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                ) : null}
                <Link
                  href="/evenements"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-emerald-900 px-5 text-sm font-extrabold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-800/20"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  {t("detail.backToEvents")}
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </article>

      <Footer />
    </main>
  );
}
