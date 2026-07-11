import type { ReactNode } from "react";
import Image from "next/image";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  imageAlt?: string;
  imageSrc?: string;
  children?: ReactNode;
};

export default function PageHero({
  eyebrow,
  title,
  description,
  imageAlt,
  imageSrc,
  children,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-emerald-950 px-5 py-16 text-white lg:px-8">
      {imageSrc ? (
        <>
          <Image
            src={imageSrc}
            alt={imageAlt ?? ""}
            fill
            sizes="100vw"
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-emerald-950/75" />
        </>
      ) : null}
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="max-w-4xl">
          {eyebrow ? (
            <p className="text-sm font-extrabold uppercase tracking-wide text-amber-300">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-3 font-serif text-4xl font-black tracking-tight md:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/85">
              {description}
            </p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
