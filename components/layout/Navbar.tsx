"use client";

import Image from "next/image";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ChevronDown, Globe2, Mail, Menu, Phone, X } from "lucide-react";
import {
  consulateInfo,
  emailHref,
  phoneHref,
} from "@/lib/constants/consulate";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { mainNavigation } from "@/lib/constants/navigation";

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const nav = useTranslations("Navigation");
  const navbar = useTranslations("Navbar");
  const accessibility = useTranslations("Accessibility");
  const alternateLocale: Locale = locale === "fr" ? "en" : "fr";
  const alternateLocaleName = navbar(`language.${alternateLocale}`);
  const localeOptions: Locale[] = ["fr", "en"];

  function switchLocale() {
    const search = window.location.search;
    router.replace(search ? `${pathname}${search}` : pathname, {
      locale: alternateLocale,
    });
    setIsOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <Image
            src="/images/consul-logo.png"
            alt={accessibility("logoAlt")}
            width={64}
            height={64}
            priority
            className="h-14 w-14 shrink-0 object-contain"
          />
          <div className="leading-tight">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-950">
              {navbar("brandPrefix")}
            </p>
            <p className="font-serif text-2xl font-bold uppercase text-emerald-800 sm:text-3xl">
              {navbar("brandName")}
            </p>
            <p className="text-sm font-bold uppercase tracking-wide text-red-600">
              {navbar("brandLocation")}
            </p>
          </div>
        </Link>

        <div className="hidden flex-col items-end gap-5 lg:flex">
          <div className="flex items-center gap-6 text-sm font-semibold text-slate-900">
            <button
              type="button"
              onClick={switchLocale}
              aria-label={accessibility("switchToLocale", {
                locale: alternateLocaleName,
              })}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-2 py-1 text-xs font-extrabold uppercase tracking-wide text-slate-700 shadow-sm transition hover:border-emerald-700/40 hover:text-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-800/20"
            >
              <Globe2 className="h-4 w-4 text-emerald-700" aria-hidden="true" />
              <span className="sr-only">{alternateLocaleName}</span>
              <span className="flex items-center gap-1" aria-hidden="true">
                {localeOptions.map((option) => (
                  <span
                    key={option}
                    className={
                      option === locale
                        ? "rounded-full bg-emerald-900 px-2 py-1 text-white"
                        : "px-2 py-1"
                    }
                  >
                    {option.toUpperCase()}
                  </span>
                ))}
              </span>
            </button>
            <a
              href={phoneHref(consulateInfo.phone)}
              className="flex items-center gap-2 hover:text-emerald-700"
            >
              <Phone className="h-4 w-4 text-emerald-700" aria-hidden="true" />
              {consulateInfo.phone}
            </a>
          </div>

          <nav aria-label={accessibility("mainNavigation")}>
            <ul className="flex items-center gap-7 text-sm font-semibold text-slate-950">
              {mainNavigation.map((link) => (
                <li key={link.href} className="group relative">
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 py-2 transition hover:text-emerald-700"
                  >
                    {nav(link.key)}
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
                          {nav(child.key)}
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
          aria-label={
            isOpen ? accessibility("closeMenu") : accessibility("openMenu")
          }
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <nav
            aria-label={accessibility("mobileNavigation")}
            className="mx-auto max-w-7xl px-4 py-4"
          >
            <div className="mb-4 grid gap-2 text-sm font-semibold text-slate-900">
              <button
                type="button"
                onClick={switchLocale}
                aria-label={accessibility("switchToLocale", {
                  locale: alternateLocaleName,
                })}
                className="flex w-fit cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-2 py-1 text-xs font-extrabold uppercase tracking-wide text-slate-700 shadow-sm"
              >
                <Globe2
                  className="h-4 w-4 text-emerald-700"
                  aria-hidden="true"
                />
                <span className="sr-only">{alternateLocaleName}</span>
                <span className="flex items-center gap-1" aria-hidden="true">
                  {localeOptions.map((option) => (
                    <span
                      key={option}
                      className={
                        option === locale
                          ? "rounded-full bg-emerald-900 px-2 py-1 text-white"
                          : "px-2 py-1"
                      }
                    >
                      {option.toUpperCase()}
                    </span>
                  ))}
                </span>
              </button>
              <a
                href={phoneHref(consulateInfo.phone)}
                className="flex items-center gap-2"
              >
                <Phone
                  className="h-4 w-4 text-emerald-700"
                  aria-hidden="true"
                />
                {consulateInfo.phone}
              </a>
              <a
                href={emailHref(consulateInfo.email)}
                className="flex items-center gap-2"
              >
                <Mail className="h-4 w-4 text-emerald-700" aria-hidden="true" />
                {consulateInfo.email}
              </a>
            </div>

            <ul className="grid gap-1 text-base font-semibold text-slate-950">
              {mainNavigation.map((link) => (
                <li key={link.href} className="border-t border-slate-100 py-2">
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-1"
                  >
                    {nav(link.key)}
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
                          {nav(child.key)}
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
