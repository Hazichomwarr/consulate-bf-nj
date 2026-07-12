import { CalendarDays, MapPin } from "lucide-react";
import PublicContentCard from "@/components/shared/PublicContentCard";
import type { ConsulateEvent, EventCategory } from "@/lib/content/events";
import type { SupportedLocale } from "@/lib/content/consular-services";
import { getLocalizedText } from "@/lib/content/consular-services";

type EventCardProps = {
  categoryLabel: string;
  dateLabel: string;
  event: ConsulateEvent;
  featuredLabel?: string;
  locale: SupportedLocale;
  locationLabel: string;
  readMoreLabel: string;
  variant?: "default" | "featured";
};

export type EventCategoryLabels = Record<EventCategory, string>;

function getDateLocale(locale: SupportedLocale): string {
  return locale === "fr" ? "fr-FR" : "en-US";
}

export function formatEventDateTime(
  date: string,
  locale: SupportedLocale
): string {
  return new Intl.DateTimeFormat(getDateLocale(locale), {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(date));
}

export function formatEventDateRange(
  startAt: string,
  endAt: string | undefined,
  locale: SupportedLocale
): string {
  const start = new Date(startAt);

  if (!endAt) {
    return formatEventDateTime(startAt, locale);
  }

  const end = new Date(endAt);

  return new Intl.DateTimeFormat(getDateLocale(locale), {
    dateStyle: "long",
    timeStyle: "short",
  }).formatRange(start, end);
}

export default function EventCard({
  categoryLabel,
  dateLabel,
  event,
  featuredLabel,
  locale,
  locationLabel,
  readMoreLabel,
  variant = "default",
}: EventCardProps) {
  const title = getLocalizedText(event.title, locale);

  return (
    <PublicContentCard
      badges={[
        { label: categoryLabel },
        ...(featuredLabel && event.featured
          ? [{ label: featuredLabel, tone: "amber" as const }]
          : []),
      ]}
      excerpt={getLocalizedText(event.excerpt, locale)}
      href={`/evenements/${event.slug}`}
      image={
        event.image
          ? {
              src: event.image.src,
              alt: getLocalizedText(event.image.alt, locale),
            }
          : undefined
      }
      meta={
        <div className="mt-6 space-y-3 border-t border-slate-200 pt-5">
          <p className="inline-flex items-start gap-2 text-sm font-semibold leading-6 text-slate-600">
            <CalendarDays
              className="mt-0.5 h-4 w-4 shrink-0"
              aria-hidden="true"
            />
            <span>
              <span className="sr-only">{dateLabel}</span>
              {formatEventDateRange(event.startAt, event.endAt, locale)}
            </span>
          </p>
          <p className="inline-flex items-start gap-2 text-sm font-semibold leading-6 text-slate-600">
            <MapPin
              className="mt-0.5 h-4 w-4 shrink-0"
              aria-hidden="true"
            />
            <span>
              <span className="sr-only">{locationLabel}</span>
              {getLocalizedText(event.location.name, locale)}
            </span>
          </p>
        </div>
      }
      readMoreLabel={readMoreLabel}
      title={title}
      variant={variant}
    />
  );
}
