import type { ReactNode } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import ContentBadge from "./ContentBadge";

type PublicContentCardBadge = {
  label: string;
  tone?: "emerald" | "amber" | "slate";
};

type PublicContentCardImage = {
  alt: string;
  src: string;
};

type PublicContentCardProps = {
  badges: PublicContentCardBadge[];
  excerpt: string;
  href: string;
  image?: PublicContentCardImage;
  meta: ReactNode;
  readMoreLabel: string;
  title: string;
  variant?: "default" | "featured";
};

export default function PublicContentCard({
  badges,
  excerpt,
  href,
  image,
  meta,
  readMoreLabel,
  title,
  variant = "default",
}: PublicContentCardProps) {
  const isFeatured = variant === "featured";

  return (
    <article className="h-full">
      <Link
        href={href}
        className={[
          "group grid h-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-emerald-700/40 hover:shadow-xl hover:shadow-slate-950/10 focus:outline-none focus:ring-4 focus:ring-emerald-800/20",
          isFeatured ? "lg:grid-cols-[0.95fr_1.05fr]" : "",
        ].join(" ")}
      >
        {image ? (
          <div
            className={
              isFeatured
                ? "relative min-h-72 bg-slate-100"
                : "relative aspect-[4/3] bg-slate-100"
            }
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={
                isFeatured
                  ? "(min-width: 1024px) 45vw, 100vw"
                  : "(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
              }
              className="object-cover"
            />
          </div>
        ) : null}

        <div
          className={
            isFeatured
              ? "flex min-h-72 flex-col p-7 md:p-9"
              : "flex flex-1 flex-col p-6"
          }
        >
          <div className="flex flex-wrap items-center gap-3">
            {badges.map((badge) => (
              <ContentBadge key={badge.label} tone={badge.tone}>
                {badge.label}
              </ContentBadge>
            ))}
          </div>

          <h2
            className={
              isFeatured
                ? "mt-5 font-serif text-3xl font-black leading-tight text-slate-950 group-hover:text-emerald-900 md:text-4xl"
                : "mt-5 font-serif text-2xl font-black leading-tight text-slate-950 group-hover:text-emerald-900"
            }
          >
            {title}
          </h2>

          <p className="mt-4 flex-1 text-sm leading-7 text-slate-700">
            {excerpt}
          </p>

          {meta}

          <span className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-emerald-800">
            {readMoreLabel}
            <ArrowRight
              className="h-4 w-4 transition group-hover:translate-x-1"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
