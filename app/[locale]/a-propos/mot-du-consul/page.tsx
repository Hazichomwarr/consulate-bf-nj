import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, UserRound } from "lucide-react";
import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/Navbar";
import ContentBadge from "@/components/shared/ContentBadge";
import PageHero from "@/components/shared/PageHero";
import { Link } from "@/i18n/navigation";
import { isLocale, type Locale } from "@/i18n/routing";
import { consulMessageContent } from "@/lib/content/about";
import { getLocalizedText } from "@/lib/content/consular-services";

type ConsulMessagePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: ConsulMessagePageProps): Promise<Metadata> {
  const { locale: paramLocale } = await params;
  const locale: Locale = isLocale(paramLocale) ? paramLocale : "fr";
  const t = await getTranslations({
    locale,
    namespace: "AboutPages.ConsulMessage.Metadata",
  });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function ConsulMessagePage({
  params,
}: ConsulMessagePageProps) {
  const { locale: paramLocale } = await params;

  if (!isLocale(paramLocale)) {
    notFound();
  }

  setRequestLocale(paramLocale);

  const t = await getTranslations("AboutPages");
  const accessibility = await getTranslations("Accessibility");

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <NavBar />

      <PageHero
        eyebrow={t("ConsulMessage.heroEyebrow")}
        title={getLocalizedText(consulMessageContent.heroTitle, paramLocale)}
        description={getLocalizedText(
          consulMessageContent.heroDescription,
          paramLocale
        )}
        imageSrc="/images/consul-hero.png"
        imageAlt={accessibility("heroImageAlt")}
      />

      <section className="px-5 py-14 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[340px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 text-center">
              {consulMessageContent.portrait ? (
                <div className="relative mx-auto aspect-square w-48 overflow-hidden rounded-full bg-slate-100">
                  <Image
                    src={consulMessageContent.portrait.src}
                    alt={getLocalizedText(
                      consulMessageContent.portrait.alt,
                      paramLocale
                    )}
                    fill
                    sizes="192px"
                    className="object-cover"
                    priority
                  />
                </div>
              ) : (
                <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                  <UserRound className="h-20 w-20" aria-hidden="true" />
                  <span className="sr-only">
                    {t("ConsulMessage.portraitPlaceholder")}
                  </span>
                </div>
              )}

              <h2 className="mt-6 font-serif text-2xl font-black text-slate-950">
                {getLocalizedText(consulMessageContent.consulName, paramLocale)}
              </h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                {getLocalizedText(
                  consulMessageContent.consulTitle,
                  paramLocale
                )}
              </p>
              {consulMessageContent.isPlaceholder ? (
                <div className="mt-5">
                  <ContentBadge tone="amber">
                    {t("ConsulMessage.placeholderBadge")}
                  </ContentBadge>
                </div>
              ) : null}
            </div>
          </aside>

          <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <ContentBadge>{t("ConsulMessage.messageBadge")}</ContentBadge>
            <p className="mt-6 text-lg leading-9 text-slate-700">
              {getLocalizedText(consulMessageContent.message, paramLocale)}
            </p>
            <footer className="mt-8 border-t border-slate-200 pt-6">
              <p className="font-serif text-2xl font-black text-slate-950">
                {getLocalizedText(consulMessageContent.signature, paramLocale)}
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-600">
                {getLocalizedText(
                  consulMessageContent.consulTitle,
                  paramLocale
                )}
              </p>
            </footer>
          </article>
        </div>
      </section>

      <section className="bg-emerald-950 px-5 py-14 text-white lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 md:flex-row md:items-center md:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-extrabold uppercase tracking-wide text-amber-300">
              {t("cta.eyebrow")}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-black">
              {t("ConsulMessage.ctaTitle")}
            </h2>
            <p className="mt-4 text-base leading-7 text-white/85">
              {t("ConsulMessage.ctaDescription")}
            </p>
          </div>
          <Link
            href="/a-propos"
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-md bg-amber-400 px-7 text-sm font-extrabold text-emerald-950 transition hover:bg-amber-300 focus:outline-none focus:ring-4 focus:ring-amber-300/30"
          >
            {t("ConsulMessage.aboutCta")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
