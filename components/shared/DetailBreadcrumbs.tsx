import { Link } from "@/i18n/navigation";

type BreadcrumbItem = {
  href?: string;
  label: string;
};

type DetailBreadcrumbsProps = {
  ariaLabel: string;
  items: BreadcrumbItem[];
};

export default function DetailBreadcrumbs({
  ariaLabel,
  items,
}: DetailBreadcrumbsProps) {
  return (
    <nav aria-label={ariaLabel}>
      <ol className="flex flex-wrap items-center gap-2 text-sm font-semibold text-white/85">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="contents">
              {index > 0 ? (
                <span aria-hidden="true" className="text-white/50">
                  /
                </span>
              ) : null}
              {item.href && !isCurrent ? (
                <Link href={item.href} className="hover:text-amber-300">
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isCurrent ? "page" : undefined}
                  className={isCurrent ? "text-amber-300" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
