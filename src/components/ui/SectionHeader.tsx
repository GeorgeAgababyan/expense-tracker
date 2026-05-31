import { type ReactNode } from "react";
import { sectionDescClass, sectionTitleClass } from "@/lib/ui";

type SectionHeaderProps = {
  overline: string;
  title: string;
  description?: string;
  action?: ReactNode;
};

export function SectionHeader({
  overline,
  title,
  description,
  action,
}: SectionHeaderProps) {
  return (
    <header className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p className="text-overline">{overline}</p>
        <h2 className={`${sectionTitleClass} mt-1`}>{title}</h2>
        {description && <p className={sectionDescClass}>{description}</p>}
      </div>
      {action}
    </header>
  );
}
