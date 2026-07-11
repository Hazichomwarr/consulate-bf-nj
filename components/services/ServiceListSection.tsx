import type {
  LocalizedText,
  SupportedLocale,
} from "@/lib/content/consular-services";
import { getLocalizedText } from "@/lib/content/consular-services";

type ServiceListSectionProps = {
  items: LocalizedText[];
  locale: SupportedLocale;
  title: string;
  description?: string;
};

export default function ServiceListSection({
  items,
  locale,
  title,
  description,
}: ServiceListSectionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="font-serif text-2xl font-black text-slate-950">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
      ) : null}
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={getLocalizedText(item, locale)} className="flex gap-3">
            <span
              className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-700"
              aria-hidden="true"
            />
            <span className="text-sm leading-7 text-slate-700">
              {getLocalizedText(item, locale)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
