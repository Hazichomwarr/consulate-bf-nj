import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/Navbar";
import AnnouncementCard from "@/components/news/AnnouncementCard";
import EmptyState from "@/components/shared/EmptyState";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import { isLocale, type Locale } from "@/i18n/routing";
import { getPublishedAnnouncements } from "@/lib/content/announcements";

type AnnouncementsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: AnnouncementsPageProps): Promise<Metadata> {
  const { locale: paramLocale } = await params;
  const locale: Locale = isLocale(paramLocale) ? paramLocale : "fr";
  const t = await getTranslations({
    locale,
    namespace: "AnnouncementsPage.Metadata",
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

export default async function AnnouncementsPage({
  params,
}: AnnouncementsPageProps) {
  const { locale: paramLocale } = await params;

  if (!isLocale(paramLocale)) {
    notFound();
  }

  setRequestLocale(paramLocale);

  const t = await getTranslations("AnnouncementsPage");
  const accessibility = await getTranslations("Accessibility");
  const announcements = getPublishedAnnouncements();
  const featuredAnnouncement =
    announcements.find((announcement) => announcement.featured) ?? null;
  const standardAnnouncements = featuredAnnouncement
    ? announcements.filter(
        (announcement) => announcement.slug !== featuredAnnouncement.slug
      )
    : announcements;

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

          {announcements.length > 0 ? (
            <div className="mt-10 space-y-10">
              {featuredAnnouncement ? (
                <div>
                  <h2 className="mb-5 text-sm font-extrabold uppercase tracking-wide text-emerald-800">
                    {t("featured.title")}
                  </h2>
                  <AnnouncementCard
                    announcement={featuredAnnouncement}
                    categoryLabel={t(
                      `categories.${featuredAnnouncement.category}`
                    )}
                    dateLabel={t("cards.publicationDate")}
                    featuredLabel={t("cards.featured")}
                    locale={paramLocale}
                    readMoreLabel={t("cards.readMore")}
                    variant="featured"
                  />
                </div>
              ) : null}

              {standardAnnouncements.length > 0 ? (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {standardAnnouncements.map((announcement) => (
                    <AnnouncementCard
                      key={announcement.slug}
                      announcement={announcement}
                      categoryLabel={t(`categories.${announcement.category}`)}
                      dateLabel={t("cards.publicationDate")}
                      featuredLabel={t("cards.featured")}
                      locale={paramLocale}
                      readMoreLabel={t("cards.readMore")}
                    />
                  ))}
                </div>
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
