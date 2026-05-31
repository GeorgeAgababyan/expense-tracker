import { CATEGORY_STYLES } from "@/lib/category-styles";
import { formatCurrency } from "@/lib/format";
import type { CategoryBreakdown } from "@/lib/analytics";

type CategoryDonutChartProps = {
  breakdown: CategoryBreakdown[];
  total: number;
};

function buildConicGradient(
  breakdown: CategoryBreakdown[],
  total: number,
): string {
  if (total <= 0 || breakdown.length === 0) {
    return "conic-gradient(#e2e8f0 0deg 360deg)";
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
    <div className="chart-donut relative mx-auto h-[9.5rem] w-[9.5rem] shrink-0">
      <div
        className="h-full w-full rounded-full transition-[background] duration-700 ease-out"
        style={{ background: gradient }}
        role="img"
        aria-label="Диаграмма расходов по категориям"
      />
      <div className="absolute inset-[20%] flex flex-col items-center justify-center rounded-full bg-[var(--surface)] shadow-[var(--shadow-sm)]">
        <span className="text-overline !text-[10px]">Всего</span>
        <span className="font-amount mt-0.5 text-sm text-zinc-900 dark:text-zinc-50">
          {formatCurrency(total)}
        </span>
      </div>
    </div>
  );
}
