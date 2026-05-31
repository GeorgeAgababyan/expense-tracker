import { CATEGORY_STYLES } from "@/lib/category-styles";
import { formatCurrency } from "@/lib/format";
import type { CategoryBreakdown } from "@/lib/analytics";

type CategoryDonutChartProps = {
  breakdown: CategoryBreakdown[];
  total: number;
};

function buildConicGradient(breakdown: CategoryBreakdown[], total: number): string {
  if (total <= 0 || breakdown.length === 0) {
    return "conic-gradient(#e4e4e7 0deg 360deg)";
  }

  let angle = 0;
  const stops: string[] = [];

  for (const item of breakdown) {
    const slice = (item.amount / total) * 360;
    const end = angle + slice;
    stops.push(
      `${CATEGORY_STYLES[item.category].chart} ${angle}deg ${end}deg`,
    );
    angle = end;
  }

  return `conic-gradient(${stops.join(", ")})`;
}

export function CategoryDonutChart({
  breakdown,
  total,
}: CategoryDonutChartProps) {
  const gradient = buildConicGradient(breakdown, total);

  return (
    <div className="chart-donut relative mx-auto h-36 w-36 shrink-0">
      <div
        className="h-full w-full rounded-full transition-[background] duration-500 ease-out"
        style={{ background: gradient }}
        role="img"
        aria-label="Диаграмма расходов по категориям"
      />
      <div className="absolute inset-[18%] flex flex-col items-center justify-center rounded-full bg-[var(--surface)] text-center">
        <span className="text-overline text-zinc-400 dark:text-zinc-500">
          Всего
        </span>
        <span className="font-amount mt-0.5 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          {formatCurrency(total)}
        </span>
      </div>
    </div>
  );
}
