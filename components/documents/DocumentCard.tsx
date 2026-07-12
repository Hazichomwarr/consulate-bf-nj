import { Download, FileText } from "lucide-react";
import ContentBadge from "@/components/shared/ContentBadge";
import type { ConsularDocument } from "@/lib/content/documents";
import type { SupportedLocale } from "@/lib/content/consular-services";
import { getLocalizedText } from "@/lib/content/consular-services";

type DocumentCardProps = {
  categoryLabel: string;
  document: ConsularDocument;
  downloadLabel: string;
  languageLabel: string;
  lastUpdatedLabel: string;
  locale: SupportedLocale;
  notConfirmedLabel: string;
  statusLabel: string;
};

export default function DocumentCard({
  categoryLabel,
  document,
  downloadLabel,
  languageLabel,
  lastUpdatedLabel,
  locale,
  notConfirmedLabel,
  statusLabel,
}: DocumentCardProps) {
  const canDownload = document.status === "available";

  return (
    <article className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
          <FileText className="h-6 w-6" aria-hidden="true" />
        </div>
        <ContentBadge tone={canDownload ? "emerald" : "amber"}>
          {statusLabel}
        </ContentBadge>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <ContentBadge>{categoryLabel}</ContentBadge>
        <ContentBadge tone="slate">{languageLabel}</ContentBadge>
      </div>

      <h2 className="mt-5 font-serif text-2xl font-black leading-tight text-slate-950">
        {getLocalizedText(document.title, locale)}
      </h2>
      <p className="mt-4 flex-1 text-sm leading-7 text-slate-700">
        {getLocalizedText(document.description, locale)}
      </p>

      <dl className="mt-6 border-t border-slate-200 pt-5">
        <div>
          <dt className="text-xs font-extrabold uppercase tracking-wide text-emerald-800">
            {lastUpdatedLabel}
          </dt>
          <dd className="mt-2 text-sm font-semibold text-slate-700">
            {document.lastUpdated ?? notConfirmedLabel}
          </dd>
        </div>
      </dl>

      {canDownload ? (
        <a
          href={document.fileUrl}
          className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-emerald-900 px-5 text-sm font-extrabold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-800/20"
        >
          {downloadLabel}
          <Download className="h-4 w-4" aria-hidden="true" />
        </a>
      ) : (
        <button
          className="mt-6 inline-flex h-11 cursor-not-allowed items-center justify-center gap-2 rounded-md bg-slate-200 px-5 text-sm font-extrabold text-slate-500"
          disabled
          type="button"
        >
          {downloadLabel}
          <Download className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </article>
  );
}
