import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowRight, CalendarDays, Clock, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";

const newsItems = [
  {
    key: "outreach",
    category: "announcement",
    image: "/images/news/consul-event.png",
  },
  {
    key: "passport",
    category: "announcement",
    image: "/images/news/consul-event-passport.png",
  },
  {
    key: "nationalDay",
    category: "news",
    image: "/images/news/consul-event-people.png",
  },
];

const events = [
  { key: "nationalDay" },
  { key: "outreach" },
  { key: "communityMeeting" },
];

export default async function NewsEvents() {
  const t = await getTranslations("Home.NewsEvents");
  const common = await getTranslations("Common");

  return (
    <section className="bg-white px-5 pb-6 text-slate-950 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[1.35fr_1fr]">
        <article className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 className="font-serif text-2xl font-black text-slate-950">
              {t("newsHeading")}
            </h2>
            <Link
              href="/actualites"
              className="inline-flex items-center gap-2 text-sm font-extrabold text-emerald-800 hover:text-emerald-950"
            >
              {common("viewAll")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-5">
            {newsItems.map((item) => (
              <Link
                key={item.key}
                href="/actualites"
                className="group grid gap-5 rounded-md transition hover:bg-slate-50 sm:grid-cols-[150px_1fr]"
              >
                <div className="relative aspect-[1.45] overflow-hidden rounded-md bg-slate-100 sm:aspect-auto sm:h-24">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 150px, 100vw"
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="py-1">
                  <span
                    className={[
                      "inline-flex rounded px-2 py-0.5 text-[11px] font-black uppercase tracking-wide",
                      item.category === "news"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-700",
                    ].join(" ")}
                  >
                    {t(`categories.${item.category}`)}
                  </span>
                  <h3 className="mt-2 text-base font-extrabold leading-5 text-slate-950 group-hover:text-emerald-800">
                    {t(`newsItems.${item.key}.title`)}
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-700">
                    {t(`newsItems.${item.key}.description`)}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {t(`newsItems.${item.key}.date`)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </article>

        <article className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 className="font-serif text-2xl font-black text-slate-950">
              {t("eventsHeading")}
            </h2>
            <Link
              href="/evenements"
              className="inline-flex items-center gap-2 text-sm font-extrabold text-emerald-800 hover:text-emerald-950"
            >
              {common("viewAll")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="divide-y divide-slate-200">
            {events.map((event) => (
              <Link
                key={event.key}
                href="/evenements"
                className="group grid grid-cols-[72px_1fr] gap-5 py-5 first:pt-0 last:pb-0"
              >
                <div className="flex h-20 w-20 flex-col items-center justify-center rounded-md border border-slate-200 bg-white shadow-sm">
                  <span className="text-sm font-black uppercase text-red-600">
                    {t(`events.${event.key}.month`)}
                  </span>
                  <span className="mt-1 text-3xl font-black leading-none text-slate-950">
                    {t(`events.${event.key}.day`)}
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-slate-950 group-hover:text-emerald-800">
                    {t(`events.${event.key}.title`)}
                  </h3>
                  <p className="mt-3 flex items-start gap-2 text-sm leading-5 text-slate-700">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-emerald-800" />
                    {t(`events.${event.key}.time`)}
                  </p>
                  <p className="mt-2 flex items-start gap-2 text-sm leading-5 text-slate-700">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-800" />
                    {t(`events.${event.key}.location`)}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <Link
            href="/evenements"
            className="mt-7 inline-flex h-11 items-center gap-3 rounded-md bg-emerald-800 px-7 text-sm font-extrabold text-white transition hover:bg-emerald-900 focus:outline-none focus:ring-4 focus:ring-emerald-800/25"
          >
            <CalendarDays className="h-4 w-4" />
            {t("viewAllEvents")}
          </Link>
        </article>
      </div>
    </section>
  );
}
