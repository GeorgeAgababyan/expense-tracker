type EmptyStateVariant = "list" | "analytics";

type EmptyStateProps = {
  variant?: EmptyStateVariant;
  title?: string;
  description?: string;
};

const PRESETS: Record<
  EmptyStateVariant,
  { title: string; description: string }
> = {
  list: {
    title: "Расходов пока нет",
    description:
      "Добавьте первую трату в форме выше — она появится здесь и в аналитике.",
  },
  analytics: {
    title: "Нет данных для аналитики",
    description:
      "Когда появятся траты за этот месяц, здесь будет диаграмма и топ категорий.",
  },
};

export function EmptyState({
  variant = "list",
  title,
  description,
}: EmptyStateProps) {
  const preset = PRESETS[variant];

  return (
    <div className="empty-state animate-fade-in">
      <div className="empty-state-icon" aria-hidden>
        {variant === "analytics" ? <AnalyticsIcon /> : <ListIcon />}
      </div>
      <h3 className="text-title-sm mt-5 text-zinc-900 dark:text-zinc-50">
        {title ?? preset.title}
      </h3>
      <p className="text-body-muted mx-auto mt-2 max-w-[30ch]">
        {description ?? preset.description}
      </p>
    </div>
  );
}

function ListIcon() {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className="h-10 w-10 text-[var(--accent)]"
      aria-hidden
    >
      <rect
        x="6"
        y="5"
        width="28"
        height="30"
        rx="7"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.35"
      />
      <path
        d="M13 14h14M13 20h9M13 26h12"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <circle cx="28" cy="28" r="7" fill="var(--accent-soft)" />
      <path
        d="M25 28h6M28 25v6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AnalyticsIcon() {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className="h-10 w-10 text-[var(--accent)]"
      aria-hidden
    >
      <path
        d="M8 30V18M16 30V12M24 30V22M32 30V8"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <path
        d="M6 32h28"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.35"
      />
    </svg>
  );
}
