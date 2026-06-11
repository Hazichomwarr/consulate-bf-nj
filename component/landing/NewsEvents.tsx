import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock, MapPin } from "lucide-react";

const newsItems = [
  {
    title: "Consular Outreach in New Jersey",
    date: "May 10, 2024",
    category: "Announcement",
    image: "/images/news/consul-event.png",
    description:
      "The Consulate will be conducting an outreach mission to serve our community. More details coming soon.",
  },
  {
    title: "Passport Renewal Campaign",
    date: "May 3, 2024",
    category: "Announcement",
    image: "/images/news/consul-event-passport.png",
    description:
      "Take advantage of our special passport renewal campaign this summer.",
  },
  {
    title: "Burkina Faso National Day Celebration",
    date: "April 25, 2024",
    category: "News",
    image: "/images/news/consul-event-people.png",
    description:
      "Join us as we celebrate the 64th anniversary of Burkina Faso's independence.",
  },
];

const events = [
  {
    title: "National Day Celebration",
    month: "Jun",
    day: "05",
    time: "Saturday, June 5, 2024 - 12:00 PM",
    location: "Newark Symphony Hall, Newark, NJ",
  },
  {
    title: "Consular Outreach",
    month: "Jun",
    day: "15",
    time: "Saturday, June 15, 2024 - 9:00 AM",
    location: "Paterson Community Center, Paterson, NJ",
  },
  {
    title: "Community Meeting",
    month: "Jun",
    day: "22",
    time: "Saturday, June 22, 2024 - 2:00 PM",
    location: "Consulate Office, Newark, NJ",
  },
];

export default function NewsEvents() {
  return (
    <section className="bg-white px-5 pb-6 text-slate-950 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[1.35fr_1fr]">
        <article className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 className="font-serif text-2xl font-black text-slate-950">
              News & Announcements
            </h2>
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm font-extrabold text-emerald-800 hover:text-emerald-950"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-5">
            {newsItems.map((item) => (
              <Link
                key={item.title}
                href="/news"
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
                      item.category === "News"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-700",
                    ].join(" ")}
                  >
                    {item.category}
                  </span>
                  <h3 className="mt-2 text-base font-extrabold leading-5 text-slate-950 group-hover:text-emerald-800">
                    {item.title}
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-700">
                    {item.description}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">{item.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </article>

        <article className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 className="font-serif text-2xl font-black text-slate-950">
              Upcoming Events
            </h2>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-sm font-extrabold text-emerald-800 hover:text-emerald-950"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="divide-y divide-slate-200">
            {events.map((event) => (
              <Link
                key={event.title}
                href="/events"
                className="group grid grid-cols-[72px_1fr] gap-5 py-5 first:pt-0 last:pb-0"
              >
                <div className="flex h-20 w-20 flex-col items-center justify-center rounded-md border border-slate-200 bg-white shadow-sm">
                  <span className="text-sm font-black uppercase text-red-600">
                    {event.month}
                  </span>
                  <span className="mt-1 text-3xl font-black leading-none text-slate-950">
                    {event.day}
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-slate-950 group-hover:text-emerald-800">
                    {event.title}
                  </h3>
                  <p className="mt-3 flex items-start gap-2 text-sm leading-5 text-slate-700">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-emerald-800" />
                    {event.time}
                  </p>
                  <p className="mt-2 flex items-start gap-2 text-sm leading-5 text-slate-700">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-800" />
                    {event.location}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <Link
            href="/events"
            className="mt-7 inline-flex h-11 items-center gap-3 rounded-md bg-emerald-800 px-7 text-sm font-extrabold text-white transition hover:bg-emerald-900 focus:outline-none focus:ring-4 focus:ring-emerald-800/25"
          >
            <CalendarDays className="h-4 w-4" />
            View All Events
          </Link>
        </article>
      </div>
    </section>
  );
}
