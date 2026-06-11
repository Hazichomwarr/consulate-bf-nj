import Link from "next/link";
import {
  ArrowRight,
  FileText,
  IdCard,
  Plane,
  Shield,
  UsersRound,
} from "lucide-react";

const services = [
  {
    title: "Passport Services",
    description: "Apply for a new passport or renew your existing passport.",
    href: "/services/passport",
    icon: FileText,
  },
  {
    title: "Consular Card",
    description: "Registration and renewal of the Burkinabè Consular Card.",
    href: "/services/consular-card",
    icon: IdCard,
  },
  {
    title: "Civil Status",
    description: "Birth, marriage, death certificates and other civil records.",
    href: "/services/civil-status",
    icon: FileText,
  },
  {
    title: "Travel & Visa",
    description:
      "Information about visas, travel requirements and invitations.",
    href: "/services/travel-visa",
    icon: Plane,
  },
  {
    title: "Community Services",
    description: "Support and resources for the Burkinabè community.",
    href: "/services/community",
    icon: UsersRound,
  },
  {
    title: "Emergency Assistance",
    description:
      "Assistance and guidance for Burkinabè citizens in urgent situations.",
    href: "/services/emergency",
    icon: Shield,
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-white px-5 py-12 text-slate-950 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
            How Can We Help You?
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
                key={service.title}
                href={service.href}
                className="group flex min-h-65 flex-col rounded-lg border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-emerald-700/30 hover:shadow-xl hover:shadow-slate-950/10 focus:outline-none focus:ring-4 focus:ring-emerald-800/20"
              >
                <div className="flex h-16 items-center justify-center">
                  <Icon className="h-12 w-12 stroke-[2.4] text-emerald-800 transition group-hover:scale-105 group-hover:text-emerald-900" />
                </div>

                <h3 className="mt-5 min-h-12 text-center text-lg font-extrabold leading-6 text-slate-950">
                  {service.title}
                </h3>

                <p className="mt-4 flex-1 text-sm leading-6 text-slate-700">
                  {service.description}
                </p>

                <span className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-emerald-800">
                  Start Request
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
