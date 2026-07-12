import type { ReactNode } from "react";
import { ExternalLink } from "lucide-react";

type ContactCardProps = {
  actionLabel?: string;
  actionLink?: string;
  icon: ReactNode;
  title: string;
  value: ReactNode;
};

function isExternalUrl(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

export default function ContactCard({
  actionLabel,
  actionLink,
  icon,
  title,
  value,
}: ContactCardProps) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
          {icon}
        </div>
        <div>
          <h2 className="font-serif text-2xl font-black text-slate-950">
            {title}
          </h2>
          <div className="mt-3 text-sm font-semibold leading-7 text-slate-700">
            {value}
          </div>
        </div>
      </div>

      {actionLink && actionLabel ? (
        <a
          href={actionLink}
          className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-emerald-900 px-5 text-sm font-extrabold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-800/20"
          rel={isExternalUrl(actionLink) ? "noreferrer" : undefined}
          target={isExternalUrl(actionLink) ? "_blank" : undefined}
        >
          {actionLabel}
          {isExternalUrl(actionLink) ? (
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          ) : null}
        </a>
      ) : null}
    </article>
  );
}
