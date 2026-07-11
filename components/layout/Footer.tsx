import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { FaFacebook } from "react-icons/fa6";
import { consulateInfo } from "@/lib/constants/consulate";
import { Link } from "@/i18n/navigation";
import { footerNavigation } from "@/lib/constants/navigation";

const usefulLinks = [
  consulateInfo.officialGovernmentUrl
    ? {
        label: "Government of Burkina Faso",
        href: consulateInfo.officialGovernmentUrl,
      }
    : null,
].filter((link): link is { label: string; href: string } => Boolean(link));

const socials = [
  consulateInfo.facebookUrl
    ? {
        label: "Facebook",
        href: consulateInfo.facebookUrl,
        icon: FaFacebook,
        className: "bg-[#1877F2] hover:bg-[#0f5fc6]",
      }
    : null,
].filter(
  (
    social
  ): social is {
    label: string;
    href: string;
    icon: typeof FaFacebook;
    className: string;
  } => Boolean(social)
);

export default async function Footer() {
  const footer = await getTranslations("Footer");
  const nav = await getTranslations("Navigation");
  const common = await getTranslations("Common");
  const accessibility = await getTranslations("Accessibility");

  return (
    <footer className="bg-emerald-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-2 lg:grid-cols-[1.35fr_0.75fr_1fr_0.7fr_1.15fr] lg:px-8">
        <div>
          <Link href="/" className="flex items-center gap-4">
            <Image
              src="/images/consul-logo.png"
              alt={accessibility("logoAlt")}
              width={72}
              height={72}
              className="h-16 w-16 object-contain rounded-2xl"
            />
            <div className="leading-none">
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-white/90">
                {footer("brandPrefix")}
              </p>
              <p className="mt-1 font-serif text-2xl font-black uppercase text-white">
                {footer("brandName")}
              </p>
              <p className="mt-1 text-sm font-extrabold uppercase tracking-[0.08em] text-white">
                {footer("brandLocation")}
              </p>
            </div>
          </Link>

          <p className="mt-7 text-sm font-semibold text-amber-300">
            {footer("motto")}
          </p>
        </div>

        <nav aria-label={accessibility("footerQuickLinks")}>
          <h2 className="text-lg font-extrabold">{footer("quickLinks")}</h2>
          <ul className="mt-4 space-y-2">
            {footerNavigation.map((link) => (
              <li key={link.key}>
                <Link
                  href={link.href}
                  className="text-sm text-white/85 transition hover:text-amber-300"
                >
                  {nav(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {usefulLinks.length > 0 ? (
          <nav aria-label={accessibility("usefulLinks")}>
            <h2 className="text-lg font-extrabold">{footer("usefulLinks")}</h2>
            <ul className="mt-4 space-y-2">
              {usefulLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/85 transition hover:text-amber-300"
                  >
                    {common("governmentOfBurkinaFaso")}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        {socials.length > 0 ? (
          <div>
            <h2 className="text-lg font-extrabold">{footer("followUs")}</h2>
            <div className="mt-5 flex items-center gap-3">
              {socials.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className={[
                      "inline-flex h-10 w-10 items-center justify-center rounded-full text-white shadow-sm transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-white/20",
                      social.className,
                    ].join(" ")}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        ) : null}

        <div>
          <h2 className="text-lg font-extrabold">{footer("stayInformed")}</h2>
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/85">
            {footer("newsletterDescription")}
          </p>

          <form className="mt-5 flex gap-2">
            <label htmlFor="footer-email" className="sr-only">
              {common("emailAddress")}
            </label>
            <input
              id="footer-email"
              type="email"
              placeholder={footer("emailPlaceholder")}
              className="min-w-0 flex-1 rounded-md border border-white/10 bg-white px-4 py-3 text-sm text-slate-950 outline-none placeholder:text-slate-500 focus:ring-4 focus:ring-amber-300/30"
            />
            <button
              type="submit"
              className="rounded-md bg-amber-400 px-5 py-3 text-sm font-extrabold text-emerald-950 transition hover:bg-amber-300 focus:outline-none focus:ring-4 focus:ring-amber-300/30 cursor-pointer"
            >
              {footer("subscribe")}
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-5 text-center text-sm text-white/80">
        {footer("copyright")}
      </div>
    </footer>
  );
}
