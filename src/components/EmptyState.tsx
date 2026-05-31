type EmptyStateProps = {
  title?: string;
  description?: string;
};

export function EmptyState({
  title = "Расходов пока нет",
  description = "Добавьте первую трату в форме выше — она сразу появится в списке и учтётся в итоге месяца.",
}: EmptyStateProps) {
  return (
    <div className="empty-state animate-fade-in">
      <div className="empty-state-icon" aria-hidden>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          className="h-12 w-12 text-zinc-300 dark:text-zinc-600"
        >
          <rect
            x="8"
            y="6"
            width="32"
            height="36"
            rx="6"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M16 18h16M16 24h10M16 30h14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle
            cx="34"
            cy="34"
            r="8"
            className="text-zinc-900 dark:text-zinc-100"
            fill="var(--background)"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M31 34h6M34 31v6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="text-zinc-500 dark:text-zinc-400"
          />
        </svg>
      </div>
      <h3 className="text-title-sm mt-6 text-zinc-900 dark:text-zinc-50">
        {title}
      </h3>
      <p className="text-body-muted mx-auto mt-2 max-w-[28ch]">{description}</p>
    </div>
  );
}
