import Image from "next/image";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type {
  Announcement,
  AnnouncementCategory,
} from "@/lib/content/announcements";
import type { SupportedLocale } from "@/lib/content/consular-services";
import { getLocalizedText } from "@/lib/content/consular-services";

type AnnouncementCardProps = {
  announcement: Announcement;
  categoryLabel: string;
  dateLabel: string;
  featuredLabel?: string;
  locale: SupportedLocale;
  readMoreLabel: string;
  variant?: "default" | "featured";
};

export type AnnouncementCategoryLabels = Record<AnnouncementCategory, string>;

export function formatAnnouncementDate(
  date: string,
  locale: SupportedLocale
): string {
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-US", {
    dateStyle: "long",
  }).format(new Date(`${date}T12:00:00`));
}

export default function AnnouncementCard({
  announcement,
  categoryLabel,
  dateLabel,
  featuredLabel,
  locale,
  readMoreLabel,
  variant = "default",
}: AnnouncementCardProps) {
  const title = getLocalizedText(announcement.title, locale);
  const isFeatured = variant === "featured";

  return (
    <article className="h-full">
      <Link
        href={`/actualites/${announcement.slug}`}
        className={[
          "group grid h-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-emerald-700/40 hover:shadow-xl hover:shadow-slate-950/10 focus:outline-none focus:ring-4 focus:ring-emerald-800/20",
          isFeatured ? "lg:grid-cols-[0.95fr_1.05fr]" : "",
        ].join(" ")}
      >
        {announcement.image ? (
          <div
            className={
              isFeatured
                ? "relative min-h-72 bg-slate-100"
                : "relative aspect-[4/3] bg-slate-100"
            }
          >
            <Image
              src={announcement.image.src}
              alt={getLocalizedText(announcement.image.alt, locale)}
              fill
              sizes={
                isFeatured
                  ? "(min-width: 1024px) 45vw, 100vw"
                  : "(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
              }
              className="object-cover"
            />
          </div>
        ) : null}

        <div
          className={
            isFeatured
              ? "flex min-h-72 flex-col p-7 md:p-9"
              : "flex flex-1 flex-col p-6"
          }
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-emerald-800">
              {categoryLabel}
            </span>
            {featuredLabel && announcement.featured ? (
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-amber-900">
                {featuredLabel}
              </span>
            ) : null}
          </div>

          <h2
            className={
              isFeatured
                ? "mt-5 font-serif text-3xl font-black leading-tight text-slate-950 group-hover:text-emerald-900 md:text-4xl"
                : "mt-5 font-serif text-2xl font-black leading-tight text-slate-950 group-hover:text-emerald-900"
            }
          >
            {title}
          </h2>

          <p className="mt-4 flex-1 text-sm leading-7 text-slate-700">
            {getLocalizedText(announcement.excerpt, locale)}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-5">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">{dateLabel}</span>
              {formatAnnouncementDate(announcement.publishedAt, locale)}
            </p>
            <span className="inline-flex items-center gap-2 text-sm font-extrabold text-emerald-800">
              {readMoreLabel}
              <ArrowRight
                className="h-4 w-4 transition group-hover:translate-x-1"
                aria-hidden="true"
              />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
