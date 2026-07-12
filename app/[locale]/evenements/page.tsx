import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/Navbar";
import EventCard from "@/components/events/EventCard";
import EmptyState from "@/components/shared/EmptyState";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import { isLocale, type Locale } from "@/i18n/routing";
import {
  getFeaturedEvents,
  getPastEvents,
  getUpcomingEvents,
} from "@/lib/content/events";

type EventsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: EventsPageProps): Promise<Metadata> {
  const { locale: paramLocale } = await params;
  const locale: Locale = isLocale(paramLocale) ? paramLocale : "fr";
  const t = await getTranslations({
    locale,
    namespace: "EventsPage.Metadata",
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

export default async function EventsPage({ params }: EventsPageProps) {
  const { locale: paramLocale } = await params;

  if (!isLocale(paramLocale)) {
    notFound();
  }

  setRequestLocale(paramLocale);

  const t = await getTranslations("EventsPage");
  const accessibility = await getTranslations("Accessibility");
  const featuredEvent = getFeaturedEvents()[0] ?? null;
  const upcomingEvents = getUpcomingEvents();
  const pastEvents = getPastEvents();
  const hasEvents =
    featuredEvent !== null || upcomingEvents.length > 0 || pastEvents.length > 0;

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
          <SectionHeading
            eyebrow={t("intro.eyebrow")}
            title={t("intro.title")}
            description={t("intro.description")}
          />

          {hasEvents ? (
            <div className="mt-10 space-y-12">
              {featuredEvent ? (
                <section>
                  <h2 className="mb-5 text-sm font-extrabold uppercase tracking-wide text-emerald-800">
                    {t("featured.title")}
                  </h2>
                  <EventCard
                    categoryLabel={t(`categories.${featuredEvent.category}`)}
                    dateLabel={t("cards.eventDate")}
                    event={featuredEvent}
                    featuredLabel={t("cards.featured")}
                    locale={paramLocale}
                    locationLabel={t("cards.location")}
                    readMoreLabel={t("cards.readMore")}
                    variant="featured"
                  />
                </section>
              ) : null}

              <section>
                <SectionHeading
                  eyebrow={t("upcoming.eyebrow")}
                  title={t("upcoming.title")}
                  description={t("upcoming.description")}
                />
                {upcomingEvents.length > 0 ? (
                  <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {upcomingEvents.map((event) => (
                      <EventCard
                        key={event.slug}
                        categoryLabel={t(`categories.${event.category}`)}
                        dateLabel={t("cards.eventDate")}
                        event={event}
                        featuredLabel={t("cards.featured")}
                        locale={paramLocale}
                        locationLabel={t("cards.location")}
                        readMoreLabel={t("cards.readMore")}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="mt-6">
                    <EmptyState
                      title={t("upcoming.emptyTitle")}
                      description={t("upcoming.emptyDescription")}
                    />
                  </div>
                )}
              </section>

              {pastEvents.length > 0 ? (
                <section>
                  <SectionHeading
                    eyebrow={t("past.eyebrow")}
                    title={t("past.title")}
                    description={t("past.description")}
                  />
                  <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {pastEvents.map((event) => (
                      <EventCard
                        key={event.slug}
                        categoryLabel={t(`categories.${event.category}`)}
                        dateLabel={t("cards.eventDate")}
                        event={event}
                        featuredLabel={t("cards.featured")}
                        locale={paramLocale}
                        locationLabel={t("cards.location")}
                        readMoreLabel={t("cards.readMore")}
                      />
                    ))}
                  </div>
                </section>
              ) : null}
            </div>
          ) : (
            <div className="mt-10">
              <EmptyState
                title={t("empty.title")}
                description={t("empty.description")}
              />
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
