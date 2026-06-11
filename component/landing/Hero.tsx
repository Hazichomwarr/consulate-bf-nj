"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, FileText } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white text-slate-950">
      <div className="relative min-h-[80vh]">
        <Image
          src="/images/consul-hero.png"
          alt="National monument and flag of Burkina Faso"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-white via-white/20 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-white/35 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-140 max-w-7xl items-center px-5 pb-20 pt-16 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/90 px-4 py-2 text-sm font-semibold text-emerald-900 shadow-sm backdrop-blur">
              <span>🇧🇫</span>
              <span>Official Consulate of Burkina Faso</span>
            </div>
            <h1 className="font-serif text-[clamp(3rem,6vw,5.9rem)] font-black leading-[0.96] text-emerald-950">
              Consulate of
              <span className="block text-emerald-900">Burkina Faso</span>
              <span className="block text-[0.52em] leading-tight text-red-800">
                in New Jersey
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-xl leading-8 text-slate-800">
              The official Consulate of Burkina Faso in New Jersey providing
              passport services, consular assistance, travel documentation, and
              support for Burkinabè citizens.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/services"
                className="inline-flex h-14 items-center gap-3 rounded-md bg-emerald-800 px-8 text-base font-extrabold text-white shadow-lg shadow-emerald-950/15 transition hover:bg-emerald-900 focus:outline-none focus:ring-4 focus:ring-emerald-800/25"
              >
                <FileText className="h-5 w-5" />
                Our Services
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-14 items-center gap-3 rounded-md border border-emerald-900 bg-white px-8 text-base font-extrabold text-emerald-950 shadow-sm transition hover:bg-emerald-50 focus:outline-none focus:ring-4 focus:ring-emerald-800/20"
              >
                <Mail className="h-5 w-5 text-emerald-800" />
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28">
          <svg
            viewBox="0 0 1440 150"
            preserveAspectRatio="none"
            className="absolute bottom-0 h-full w-full"
            aria-hidden="true"
          >
            <path
              d="M0 68C237 128 478 125 720 91C966 56 1210 28 1440 10V150H0V68Z"
              fill="#00843D"
            />
            <path
              d="M0 38C237 98 478 95 720 61C966 26 1210 6 1440-12V27C1197 49 961 73 720 105C476 137 237 138 0 79V38Z"
              fill="#DC2626"
            />
            <path
              d="M0 82C237 140 478 137 720 104C966 70 1210 42 1440 24V47C1197 69 961 91 720 124C476 157 237 157 0 101V82Z"
              fill="#009E49"
            />
          </svg>

          <div className="absolute left-1/2 top-7 -translate-x-1/2">
            <div className="relative h-16 w-16">
              <div className="absolute inset-0 rotate-45 bg-amber-400 [clip-path:polygon(50%_0,61%_35%,98%_35%,68%_57%,79%_91%,50%_70%,21%_91%,32%_57%,2%_35%,39%_35%)]" />
              <div className="absolute inset-0 bg-amber-400 [clip-path:polygon(50%_0,61%_35%,98%_35%,68%_57%,79%_91%,50%_70%,21%_91%,32%_57%,2%_35%,39%_35%)]" />
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
