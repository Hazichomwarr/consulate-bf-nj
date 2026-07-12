import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, CalendarDays } from "lucide-react";
import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/Navbar";
import ContentBadge from "@/components/shared/ContentBadge";
import DetailBreadcrumbs from "@/components/shared/DetailBreadcrumbs";
import {
  formatAnnouncementDate,
  type AnnouncementCategoryLabels,
} from "@/components/news/AnnouncementCard";
import PageHero from "@/components/shared/PageHero";
import { Link } from "@/i18n/navigation";
import { isLocale, locales, type Locale } from "@/i18n/routing";
import {
  getAnnouncementBySlug,
  getPublishedAnnouncements,
} from "@/lib/content/announcements";
import { getLocalizedText } from "@/lib/content/consular-services";

type AnnouncementDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getPublishedAnnouncements().map((announcement) => ({
      locale,
      slug: announcement.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: AnnouncementDetailPageProps): Promise<Metadata> {
  const { locale: paramLocale, slug } = await params;
  const locale: Locale = isLocale(paramLocale) ? paramLocale : "fr";
  const announcement = getAnnouncementBySlug(slug);
  const t = await getTranslations({
    locale,
    namespace: "AnnouncementsPage.DetailMetadata",
  });

  if (!announcement || announcement.status !== "published") {
    return {
      title: t("notFoundTitle"),
      description: t("notFoundDescription"),
    };
  }

  const title = getLocalizedText(announcement.title, locale);
  const description = getLocalizedText(announcement.excerpt, locale);

  return {
    title: t("title", { title }),
    description,
    openGraph: {
      title: t("title", { title }),
      description,
    },
  };
}

export default async function AnnouncementDetailPage({
  params,
}: AnnouncementDetailPageProps) {
  const { locale: paramLocale, slug } = await params;

  if (!isLocale(paramLocale)) {
    notFound();
  }

  setRequestLocale(paramLocale);

  const announcement = getAnnouncementBySlug(slug);

  if (!announcement || announcement.status !== "published") {
    notFound();
  }

  const t = await getTranslations("AnnouncementsPage");
  const nav = await getTranslations("Navigation");
  const accessibility = await getTranslations("Accessibility");
  const title = getLocalizedText(announcement.title, paramLocale);
  const categoryLabels: AnnouncementCategoryLabels = {
    general: t("categories.general"),
    "consular-service": t("categories.consular-service"),
    community: t("categories.community"),
    emergency: t("categories.emergency"),
  };

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <NavBar />

      <PageHero
        eyebrow={categoryLabels[announcement.category]}
        title={title}
        description={getLocalizedText(announcement.excerpt, paramLocale)}
        imageSrc="/images/consul-hero.png"
        imageAlt={accessibility("heroImageAlt")}
      >
        <DetailBreadcrumbs
          ariaLabel={t("breadcrumbs.ariaLabel")}
          items={[
            { href: "/", label: nav("home") },
            { href: "/actualites", label: nav("news") },
            { label: title },
          ]}
        />
      </PageHero>

      <article className="px-5 py-14 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <ContentBadge>{categoryLabels[announcement.category]}</ContentBadge>
              {announcement.featured ? (
                <ContentBadge tone="amber">{t("cards.featured")}</ContentBadge>
              ) : null}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-5 text-sm font-semibold text-slate-600">
              <p className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                {t("detail.publishedOn", {
                  date: formatAnnouncementDate(
                    announcement.publishedAt,
                    paramLocale
                  ),
                })}
              </p>
              {announcement.updatedAt ? (
                <p>
                  {t("detail.updatedOn", {
                    date: formatAnnouncementDate(
                      announcement.updatedAt,
                      paramLocale
                    ),
                  })}
                </p>
              ) : null}
            </div>

            {announcement.image ? (
              <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-lg bg-slate-100">
                <Image
                  src={announcement.image.src}
                  alt={getLocalizedText(announcement.image.alt, paramLocale)}
                  fill
                  sizes="(min-width: 1024px) 768px, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            ) : null}

            <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <p className="text-lg leading-9 text-slate-700">
                {getLocalizedText(announcement.content, paramLocale)}
              </p>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
              <h2 className="font-serif text-2xl font-black text-slate-950">
                {t("detail.asideTitle")}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                {t("detail.asideDescription")}
              </p>
              <Link
                href="/actualites"
                className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-emerald-900 px-5 text-sm font-extrabold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-800/20"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                {t("detail.backToAnnouncements")}
              </Link>
            </div>
          </aside>
        </div>
      </article>

      <Footer />
    </main>
  );
}
