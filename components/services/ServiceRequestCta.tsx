import type {
  ServiceCta,
  ServiceStatus,
  SupportedLocale,
} from "@/lib/content/consular-services";
import { getLocalizedText } from "@/lib/content/consular-services";
import { Link } from "@/i18n/navigation";

type ServiceRequestCtaProps = {
  backHref: string;
  backLabel: string;
  cta: ServiceCta;
  description: string;
  locale: SupportedLocale;
  status: ServiceStatus;
  statusNotice?: string;
  title: string;
};

export default function ServiceRequestCta({
  backHref,
  backLabel,
  cta,
  description,
  locale,
  status,
  statusNotice,
  title,
}: ServiceRequestCtaProps) {
  const canRequest = status === "active";

  return (
    <section className="rounded-lg bg-emerald-950 p-7 text-white md:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl font-black">{title}</h2>
          <p className="mt-4 text-sm leading-7 text-white/85">{description}</p>
          {!canRequest && statusNotice ? (
            <p className="mt-4 rounded-md border border-amber-300/40 bg-amber-300/10 px-4 py-3 text-sm font-semibold text-amber-100">
              {statusNotice}
            </p>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-3">
          {canRequest ? (
            <Link
              href={cta.href}
              className="inline-flex h-12 items-center justify-center rounded-md bg-amber-400 px-6 text-sm font-extrabold text-emerald-950 transition hover:bg-amber-300 focus:outline-none focus:ring-4 focus:ring-amber-300/30"
            >
              {getLocalizedText(cta.label, locale)}
            </Link>
          ) : null}
          <Link
            href={backHref}
            className="inline-flex h-12 items-center justify-center rounded-md border border-white/25 px-6 text-sm font-extrabold text-white transition hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-white/20"
          >
            {backLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
