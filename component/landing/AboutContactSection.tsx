import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Eye,
  Mail,
  MapPin,
  Phone,
  Target,
} from "lucide-react";

export default function AboutContactSection() {
  return (
    <section className="bg-white px-5 pb-14 pt-2 text-slate-950 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[1.05fr_0.82fr_1fr]">
        <article className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-50 p-8 shadow-sm">
          <div className="relative z-10 max-w-sm">
            <h2 className="font-serif text-2xl font-black text-slate-950">
              About the Consulate
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-800">
              The Consulate of Burkina Faso in New Jersey is committed to
              providing quality consular services to Burkinabè citizens and
              strengthening the bonds between Burkina Faso and the United
              States.
            </p>
            <Link
              href="/about"
              className="mt-7 inline-flex h-11 items-center gap-2 rounded-md bg-emerald-800 px-6 text-sm font-extrabold text-white transition hover:bg-emerald-900 focus:outline-none focus:ring-4 focus:ring-emerald-800/25"
            >
              Learn More About Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div
            className="absolute bottom-0 right-0 h-full w-1/2 opacity-25"
            aria-hidden="true"
          >
            <svg viewBox="0 0 260 260" className="h-full w-full">
              <path
                d="M136 10 203 37 236 95 212 161 164 236 89 219 31 173 23 96 73 36Z"
                fill="none"
                stroke="#94A3B8"
                strokeWidth="3"
              />
              <path
                d="M76 37 112 92 91 149 135 214M203 37 160 93 212 161M112 92l48 1-25 121M31 173l60-24 121 12"
                fill="none"
                stroke="#CBD5E1"
                strokeWidth="2"
              />
              <circle cx="103" cy="137" r="15" fill="#FACC15" />
              <path d="M108 137h32l-16 16Z" fill="#DC2626" />
              <path d="M108 137h32l-16-16Z" fill="#00843D" />
            </svg>
          </div>
        </article>

        <article className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex gap-5">
            <Target className="mt-1 h-10 w-10 shrink-0 text-emerald-800" />
            <div>
              <h3 className="text-lg font-extrabold text-emerald-800">
                Our Mission
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-800">
                To protect and assist Burkinabè citizens, promote Burkina Faso
                {"'"}s interests, and strengthen ties with the diaspora.
              </p>
            </div>
          </div>

          <div className="mt-10 flex gap-5">
            <Eye className="mt-1 h-10 w-10 shrink-0 text-emerald-800" />
            <div>
              <h3 className="text-lg font-extrabold text-emerald-800">
                Our Vision
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-800">
                A strong and united Burkinabè community, contributing to the
                development of Burkina Faso.
              </p>
            </div>
          </div>
        </article>

        <aside className="relative overflow-hidden rounded-lg bg-emerald-900 p-8 text-white shadow-sm">
          <div
            className="absolute inset-y-0 right-0 w-1/2 opacity-10"
            aria-hidden="true"
          >
            <svg viewBox="0 0 220 260" className="h-full w-full">
              <path
                d="M111 12 181 44 204 113 171 187 103 246 39 202 14 128 42 55Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                d="M42 55 94 112 70 181M181 44l-48 71 38 72M94 112l39 3-30 131M14 128l56 53 101 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
            </svg>
          </div>

          <div className="relative z-10">
            <h2 className="font-serif text-2xl font-black">Consular Office</h2>

            <div className="mt-8 space-y-5 text-sm leading-6">
              <p className="flex items-start gap-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-amber-300" />
                <span>
                  123 Market Street, Suite 200
                  <br />
                  Newark, NJ 07102, USA
                </span>
              </p>

              <Link href="tel:+19735222250" className="flex items-center gap-4">
                <Phone className="h-5 w-5 shrink-0 text-amber-300" />
                <span>(973) 522-2250</span>
              </Link>

              <Link
                href="mailto:info@consulatebf-nj.org"
                className="flex items-center gap-4"
              >
                <Mail className="h-5 w-5 shrink-0 text-amber-300" />
                <span>info@consulatebf-nj.org</span>
              </Link>

              <p className="flex items-start gap-4">
                <Clock className="mt-1 h-5 w-5 shrink-0 text-amber-300" />
                <span>
                  Mon - Fri: 9:00 AM - 5:00 PM
                  <br />
                  (Closed on US & BF Holidays)
                </span>
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
