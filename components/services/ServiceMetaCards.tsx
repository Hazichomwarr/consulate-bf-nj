import type {
  ServiceMeta,
  SupportedLocale,
} from "@/lib/content/consular-services";
import { getLocalizedText } from "@/lib/content/consular-services";

type ServiceMetaCardsProps = {
  fees: ServiceMeta;
  locale: SupportedLocale;
  processingTime: ServiceMeta;
};

export default function ServiceMetaCards({
  fees,
  locale,
  processingTime,
}: ServiceMetaCardsProps) {
  const items = [fees, processingTime];

  return (
    <section className="grid gap-5 md:grid-cols-2">
      {items.map((item) => (
        <article
          key={getLocalizedText(item.label, locale)}
          className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h2 className="text-sm font-extrabold uppercase tracking-wide text-emerald-800">
            {getLocalizedText(item.label, locale)}
          </h2>
          <p className="mt-4 font-serif text-2xl font-black text-slate-950">
            {getLocalizedText(item.value, locale)}
          </p>
        </article>
      ))}
    </section>
  );
}
