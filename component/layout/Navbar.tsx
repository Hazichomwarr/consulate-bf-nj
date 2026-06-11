"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Globe2, Mail, Menu, Phone, X } from "lucide-react";

type NavLink = {
  label: string;
  href: string;
  children?: Array<{ label: string; href: string }>;
};

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "Consular Services",
    href: "/services",
    children: [
      { label: "Passport Services", href: "/services/passports" },
      { label: "Consular Card", href: "/services/consular-card" },
      { label: "Civil Status", href: "/services/civil-status" },
      { label: "Emergency Assistance", href: "/services/emergency-assistance" },
    ],
  },
  {
    label: "Documents",
    href: "/documents",
    children: [
      { label: "Forms", href: "/documents/forms" },
      { label: "Requirements", href: "/documents/requirements" },
      { label: "Fees", href: "/documents/fees" },
    ],
  },
  { label: "News & Announcements", href: "/news" },
  { label: "Events", href: "/events" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <Image
            src="/images/consul-logo.png"
            alt="Consulate of Burkina Faso seal"
            width={64}
            height={64}
            priority
            className="h-14 w-14 shrink-0 object-contain"
          />
          <div className="leading-tight">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-950">
              Consulate of
            </p>
            <p className="font-serif text-2xl font-bold uppercase text-emerald-800 sm:text-3xl">
              Burkina Faso
            </p>
            <p className="text-sm font-bold uppercase tracking-wide text-red-600">
              in New Jersey
            </p>
          </div>
        </Link>

        <div className="hidden flex-col items-end gap-5 lg:flex">
          <div className="flex items-center gap-6 text-sm font-semibold text-slate-900">
            <Link
              href="/fr"
              className="flex items-center gap-2 hover:text-emerald-700"
            >
              Français
              <span aria-hidden="true">🇫🇷</span>
            </Link>
            <Link
              href="/en"
              className="flex items-center gap-2 hover:text-emerald-700"
            >
              English
              <span aria-hidden="true">🇺🇸</span>
            </Link>
            <a
              href="tel:+19735222250"
              className="flex items-center gap-2 hover:text-emerald-700"
            >
              <Phone className="h-4 w-4 text-emerald-700" aria-hidden="true" />
              (973) 522-2250
            </a>
          </div>

          <nav aria-label="Main navigation">
            <ul className="flex items-center gap-7 text-sm font-semibold text-slate-950">
              {navLinks.map((link) => (
                <li key={link.href} className="group relative">
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 py-2 transition hover:text-emerald-700"
                  >
                    {link.label}
                    {link.children ? (
                      <ChevronDown
                        className="h-3.5 w-3.5 transition group-hover:rotate-180"
                        aria-hidden="true"
                      />
                    ) : null}
                  </Link>

                  {link.children ? (
                    <div className="invisible absolute left-0 top-full w-64 translate-y-2 rounded-md border border-slate-200 bg-white p-2 opacity-0 shadow-lg transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded px-3 py-2 text-sm text-slate-800 hover:bg-emerald-50 hover:text-emerald-800"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 text-emerald-950 lg:hidden"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <nav
            aria-label="Mobile navigation"
            className="mx-auto max-w-7xl px-4 py-4"
          >
            <div className="mb-4 grid gap-2 text-sm font-semibold text-slate-900">
              <Link href="/fr" className="flex items-center gap-2">
                <Globe2
                  className="h-4 w-4 text-emerald-700"
                  aria-hidden="true"
                />
                Français 🇫🇷
              </Link>
              <Link href="/en" className="flex items-center gap-2">
                <Globe2
                  className="h-4 w-4 text-emerald-700"
                  aria-hidden="true"
                />
                English 🇺🇸
              </Link>
              <a href="tel:+19735222250" className="flex items-center gap-2">
                <Phone
                  className="h-4 w-4 text-emerald-700"
                  aria-hidden="true"
                />
                (973) 522-2250
              </a>
              <a
                href="mailto:info@consulatebf-nj.org"
                className="flex items-center gap-2"
              >
                <Mail className="h-4 w-4 text-emerald-700" aria-hidden="true" />
                info@consulatebf-nj.org
              </a>
            </div>

            <ul className="grid gap-1 text-base font-semibold text-slate-950">
              {navLinks.map((link) => (
                <li key={link.href} className="border-t border-slate-100 py-2">
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-1"
                  >
                    {link.label}
                  </Link>
                  {link.children ? (
                    <div className="mt-1 grid gap-1 pl-4 text-sm font-medium text-slate-600">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setIsOpen(false)}
                          className="py-1 hover:text-emerald-800"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

export default NavBar;
