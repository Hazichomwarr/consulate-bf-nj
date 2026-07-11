import type {
  ServiceFaq as ServiceFaqItem,
  SupportedLocale,
} from "@/lib/content/consular-services";
import { getLocalizedText } from "@/lib/content/consular-services";

type ServiceFaqProps = {
  faq: ServiceFaqItem[];
  locale: SupportedLocale;
  title: string;
};

export default function ServiceFaq({ faq, locale, title }: ServiceFaqProps) {
  if (faq.length === 0) {
    return null;
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="font-serif text-2xl font-black text-slate-950">
        {title}
      </h2>
      <div className="mt-5 divide-y divide-slate-200">
        {faq.map((item) => (
          <details key={getLocalizedText(item.question, locale)} className="py-4">
            <summary className="cursor-pointer text-base font-extrabold text-slate-950 marker:text-emerald-800">
              {getLocalizedText(item.question, locale)}
            </summary>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              {getLocalizedText(item.answer, locale)}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
