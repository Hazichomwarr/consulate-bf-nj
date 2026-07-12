import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AlertTriangle, FolderOpen } from "lucide-react";
import DocumentCard from "@/components/documents/DocumentCard";
import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/Navbar";
import ContentBadge from "@/components/shared/ContentBadge";
import EmptyState from "@/components/shared/EmptyState";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import { isLocale, type Locale } from "@/i18n/routing";
import {
  documents,
  getDocumentsByCategory,
  type DocumentCategory,
} from "@/lib/content/documents";

type DocumentsPageProps = {
  params: Promise<{ locale: string }>;
};

const documentCategories: DocumentCategory[] = [
  "passport",
  "consular-card",
  "civil-status",
  "legal-guidance",
  "general",
];

export async function generateMetadata({
  params,
}: DocumentsPageProps): Promise<Metadata> {
  const { locale: paramLocale } = await params;
  const locale: Locale = isLocale(paramLocale) ? paramLocale : "fr";
  const t = await getTranslations({
    locale,
    namespace: "DocumentsPage.Metadata",
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

export default async function DocumentsPage({ params }: DocumentsPageProps) {
  const { locale: paramLocale } = await params;

  if (!isLocale(paramLocale)) {
    notFound();
  }

  setRequestLocale(paramLocale);

  const t = await getTranslations("DocumentsPage");
  const accessibility = await getTranslations("Accessibility");
  const categoriesWithDocuments = documentCategories.filter(
    (category) => getDocumentsByCategory(category).length > 0
  );

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <NavBar />

      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        imageSrc="/images/consul-hero.png"
        imageAlt={accessibility("heroImageAlt")}
      />

      <section className="px-5 py-14 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <SectionHeading
              eyebrow={t("intro.eyebrow")}
              title={t("intro.title")}
              description={t("intro.description")}
            />

            <aside className="rounded-lg border border-slate-200 bg-slate-50 p-6">
              <div className="flex items-center gap-3">
                <FolderOpen
                  className="h-5 w-5 text-emerald-800"
                  aria-hidden="true"
                />
                <h2 className="font-serif text-2xl font-black text-slate-950">
                  {t("categories.title")}
                </h2>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {categoriesWithDocuments.map((category) => (
                  <ContentBadge key={category}>
                    {t(`categoryLabels.${category}`)}
                  </ContentBadge>
                ))}
              </div>
            </aside>
          </div>

          <div className="mt-10">
            {documents.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {documents.map((document) => (
                  <DocumentCard
                    key={document.slug}
                    categoryLabel={t(`categoryLabels.${document.category}`)}
                    document={document}
                    downloadLabel={t("cards.download")}
                    languageLabel={t(`languageLabels.${document.language}`)}
                    lastUpdatedLabel={t("cards.lastUpdated")}
                    locale={paramLocale}
                    notConfirmedLabel={t("cards.notConfirmed")}
                    statusLabel={t(`status.${document.status}`)}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title={t("empty.title")}
                description={t("empty.description")}
              />
            )}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 px-5 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[auto_1fr] lg:items-start">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-700">
              <AlertTriangle className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-black text-slate-950">
                {t("notice.title")}
              </h2>
              <div className="mt-4 grid gap-3 text-sm leading-7 text-slate-700 md:grid-cols-3">
                <p>{t("notice.confirmation")}</p>
                <p>{t("notice.updates")}</p>
                <p>{t("notice.downloads")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
