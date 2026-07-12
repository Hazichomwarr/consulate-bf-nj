type ContentBadgeTone = "emerald" | "amber" | "slate";

type ContentBadgeProps = {
  children: string;
  tone?: ContentBadgeTone;
};

const toneClasses: Record<ContentBadgeTone, string> = {
  emerald: "bg-emerald-50 text-emerald-800",
  amber: "bg-amber-100 text-amber-900",
  slate: "bg-slate-100 text-slate-700",
};

export default function ContentBadge({
  children,
  tone = "emerald",
}: ContentBadgeProps) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wide ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}
