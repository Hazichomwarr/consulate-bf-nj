import { getTranslations } from "next-intl/server";
import {
  ArrowRight,
  FileText,
  IdCard,
  Plane,
  Shield,
  UsersRound,
} from "lucide-react";
import { Link } from "@/i18n/navigation";

const services = [
  {
    key: "passport",
    href: "/services-consulaires/passeport",
    icon: FileText,
  },
  {
    key: "consularCard",
    href: "/services-consulaires/carte-consulaire",
    icon: IdCard,
  },
  {
    key: "civilStatus",
    href: "/services-consulaires/etat-civil",
    icon: FileText,
  },
  {
    key: "travelVisa",
    href: "/services-consulaires/voyage-visa",
    icon: Plane,
  },
  {
    key: "community",
    href: "/services-consulaires/communaute",
    icon: UsersRound,
  },
  {
    key: "emergency",
    href: "/services-consulaires/assistance-urgence",
    icon: Shield,
  },
];

export default async function ServicesSection() {
  const t = await getTranslations("Home.Services");

  return (
    <section className="bg-white px-5 py-12 text-slate-950 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
            {t("heading")}
          </h2>
          <div className="mx-auto mt-3 flex w-16 items-center justify-center gap-2">
            <span className="h-0.5 w-5 rounded-full bg-amber-400" />
            <span className="h-2 w-2 rounded-full bg-emerald-800" />
            <span className="h-0.5 w-5 rounded-full bg-red-600" />
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Link
                key={service.key}
                href={service.href}
                className="group flex min-h-65 flex-col rounded-lg border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-emerald-700/30 hover:shadow-xl hover:shadow-slate-950/10 focus:outline-none focus:ring-4 focus:ring-emerald-800/20"
              >
                <div className="flex h-16 items-center justify-center">
                  <Icon className="h-12 w-12 stroke-[2.4] text-emerald-800 transition group-hover:scale-105 group-hover:text-emerald-900" />
                </div>

                <h3 className="mt-5 min-h-12 text-center text-lg font-extrabold leading-6 text-slate-950">
                  {t(`items.${service.key}.title`)}
                </h3>

                <p className="mt-4 flex-1 text-sm leading-6 text-slate-700">
                  {t(`items.${service.key}.description`)}
                </p>

                <span className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-emerald-800">
                  {t("startRequest")}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
