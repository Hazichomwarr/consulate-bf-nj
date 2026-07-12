import { CalendarDays } from "lucide-react";
import PublicContentCard from "@/components/shared/PublicContentCard";
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

  return (
    <PublicContentCard
      badges={[
        { label: categoryLabel },
        ...(featuredLabel && announcement.featured
          ? [{ label: featuredLabel, tone: "amber" as const }]
          : []),
      ]}
      excerpt={getLocalizedText(announcement.excerpt, locale)}
      href={`/actualites/${announcement.slug}`}
      image={
        announcement.image
          ? {
              src: announcement.image.src,
              alt: getLocalizedText(announcement.image.alt, locale),
            }
          : undefined
      }
      meta={
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-5">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">{dateLabel}</span>
            {formatAnnouncementDate(announcement.publishedAt, locale)}
          </p>
        </div>
      }
      readMoreLabel={readMoreLabel}
      title={title}
      variant={variant}
    />
  );
}
