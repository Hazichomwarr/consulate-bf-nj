import type {
  ServiceStep,
  SupportedLocale,
} from "@/lib/content/consular-services";
import { getLocalizedText } from "@/lib/content/consular-services";

type ServiceStepsProps = {
  locale: SupportedLocale;
  steps: ServiceStep[];
  title: string;
};

export default function ServiceSteps({
  locale,
  steps,
  title,
}: ServiceStepsProps) {
  if (steps.length === 0) {
    return null;
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="font-serif text-2xl font-black text-slate-950">
        {title}
      </h2>
      <ol className="mt-6 grid gap-5 md:grid-cols-3">
        {steps.map((step, index) => (
          <li
            key={getLocalizedText(step.title, locale)}
            className="rounded-lg border border-slate-200 bg-slate-50 p-5"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-800 text-sm font-black text-white">
              {index + 1}
            </span>
            <h3 className="mt-5 text-base font-extrabold text-slate-950">
              {getLocalizedText(step.title, locale)}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              {getLocalizedText(step.description, locale)}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
