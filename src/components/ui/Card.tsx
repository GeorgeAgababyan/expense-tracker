import { type ReactNode } from "react";
import { cardPadding } from "@/lib/ui";

type CardProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms for entrance animation */
  delay?: number;
  hover?: boolean;
  padding?: boolean;
};

export function Card({
  children,
  className = "",
  delay = 0,
  hover = true,
  padding = true,
}: CardProps) {
  return (
    <section
      className={[
        "surface-card animate-fade-up opacity-0",
        hover && "surface-card-hover",
        padding && cardPadding,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </section>
  );
}
