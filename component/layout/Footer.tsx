import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa6";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Consular Services", href: "/services" },
  { label: "Documents", href: "/documents" },
  { label: "News & Announcements", href: "/news" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
];

const usefulLinks = [
  {
    label: "Government of Burkina Faso",
    href: "https://www.gouvernement.gov.bf",
  },
  { label: "Ministry of Foreign Affairs", href: "https://www.mae.gov.bf" },
  { label: "Burkina Faso Embassy in USA", href: "https://www.burkina-usa.org" },
  { label: "Diaspora Portal", href: "/diaspora" },
  { label: "Travel Advisory", href: "/travel-advisory" },
];

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com",
    icon: FaFacebook,
    className: "bg-[#1877F2] hover:bg-[#0f5fc6]",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com",
    icon: FaInstagram,
    className: "bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com",
    icon: FaYoutube,
    className: "bg-[#FF0000] hover:bg-[#cc0000]",
  },
];

export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-2 lg:grid-cols-[1.35fr_0.75fr_1fr_0.7fr_1.15fr] lg:px-8">
        <div>
          <Link href="/" className="flex items-center gap-4">
            <Image
              src="/images/consul-logo.png"
              alt="Consulate of Burkina Faso seal"
              width={72}
              height={72}
              className="h-16 w-16 object-contain rounded-2xl"
            />
            <div className="leading-none">
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-white/90">
                Consulate of
              </p>
              <p className="mt-1 font-serif text-2xl font-black uppercase text-white">
                Burkina Faso
              </p>
              <p className="mt-1 text-sm font-extrabold uppercase tracking-[0.08em] text-white">
                In New Jersey
              </p>
            </div>
          </Link>

          <p className="mt-7 text-sm font-semibold text-amber-300">
            Unity - Progress - Justice
          </p>
        </div>

        <nav aria-label="Footer quick links">
          <h2 className="text-lg font-extrabold">Quick Links</h2>
          <ul className="mt-4 space-y-2">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-white/85 transition hover:text-amber-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Useful links">
          <h2 className="text-lg font-extrabold">Useful Links</h2>
          <ul className="mt-4 space-y-2">
            {usefulLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-white/85 transition hover:text-amber-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-lg font-extrabold">Follow Us</h2>
          <div className="mt-5 flex items-center gap-3">
            {socials.map((social) => {
              const Icon = social.icon;

              return (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className={[
                    "inline-flex h-10 w-10 items-center justify-center rounded-full text-white shadow-sm transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-white/20",
                    social.className,
                  ].join(" ")}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-extrabold">Stay Informed</h2>
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/85">
            Subscribe to receive important updates and announcements.
          </p>

          <form className="mt-5 flex gap-2">
            <label htmlFor="footer-email" className="sr-only">
              Email address
            </label>
            <input
              id="footer-email"
              type="email"
              placeholder="Your email address"
              className="min-w-0 flex-1 rounded-md border border-white/10 bg-white px-4 py-3 text-sm text-slate-950 outline-none placeholder:text-slate-500 focus:ring-4 focus:ring-amber-300/30"
            />
            <button
              type="submit"
              className="rounded-md bg-amber-400 px-5 py-3 text-sm font-extrabold text-emerald-950 transition hover:bg-amber-300 focus:outline-none focus:ring-4 focus:ring-amber-300/30 cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-5 text-center text-sm text-white/80">
        © 2024 Consulate of Burkina Faso in New Jersey. All rights reserved.
      </div>
    </footer>
  );
}
