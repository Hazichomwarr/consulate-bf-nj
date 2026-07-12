import type {
  ConsularService,
  SupportedLocale,
} from "@/lib/content/consular-services";
import { getLocalizedText } from "@/lib/content/consular-services";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import ContentBadge from "@/components/shared/ContentBadge";

type ConsularServiceCardProps = {
  learnMoreLabel: string;
  locale: SupportedLocale;
  service: ConsularService;
  statusLabel?: string;
};

export default function ConsularServiceCard({
  learnMoreLabel,
  locale,
  service,
  statusLabel,
}: ConsularServiceCardProps) {
  return (
    <article className="h-full">
      <Link
        href={`/services-consulaires/${service.slug}`}
        className="group flex h-full min-h-70 flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-700/40 hover:shadow-xl hover:shadow-slate-950/10 focus:outline-none focus:ring-4 focus:ring-emerald-800/20"
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-serif text-2xl font-black leading-tight text-slate-950 group-hover:text-emerald-900">
            {getLocalizedText(service.name, locale)}
          </h3>
          {statusLabel ? (
            <div className="shrink-0">
              <ContentBadge>{statusLabel}</ContentBadge>
            </div>
          ) : null}
        </div>

        <p className="mt-5 flex-1 text-sm leading-7 text-slate-700">
          {getLocalizedText(service.shortDescription, locale)}
        </p>

        <span className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-emerald-800">
          {learnMoreLabel}
          <ArrowRight
            className="h-4 w-4 transition group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      </Link>
    </article>
  );
}
