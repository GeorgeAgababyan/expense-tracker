import { ExpenseTracker } from "@/components/ExpenseTracker";

export default function Home() {
  return (
    <div className="relative min-h-full">
      <div className="page-ambient" aria-hidden />

      <div className="relative z-10 flex min-h-full flex-col">
        <header className="sticky top-0 z-20 border-b border-[var(--surface-border)] bg-[var(--background)]/90 backdrop-blur-xl backdrop-saturate-150">
          <div className="mx-auto flex w-full max-w-lg items-center justify-between gap-6 px-5 py-4 sm:px-8 sm:py-5">
            <div
              className="animate-fade-up min-w-0 opacity-0"
              style={{ animationDelay: "50ms" }}
            >
              <p className="text-overline">Личные финансы</p>
              <h1 className="text-title-md mt-0.5 font-bold text-zinc-900 dark:text-zinc-50">
                Expense Tracker
              </h1>
            </div>
            <div
              className="animate-scale-in flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--surface)] opacity-0 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)] dark:bg-[var(--surface-muted)]"
              style={{ animationDelay: "0ms" }}
            >
              <span className="font-amount text-sm text-[var(--accent)]">₽</span>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-lg flex-1 px-5 py-6 pb-12 sm:px-8 sm:py-8">
          <ExpenseTracker />
        </main>
      </div>
    </div>
  );
}
