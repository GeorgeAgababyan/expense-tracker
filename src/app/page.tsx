import { ExpenseTracker } from "@/components/ExpenseTracker";

export default function Home() {
  return (
    <div className="relative min-h-full">
      <div className="page-ambient" aria-hidden />

      <div className="relative z-10 flex min-h-full flex-col">
        <header className="sticky top-0 z-20 border-b border-zinc-200/80 bg-[var(--background)]/85 backdrop-blur-md dark:border-zinc-800">
          <div className="mx-auto flex w-full max-w-lg items-center justify-between gap-6 px-5 py-5 sm:px-8 sm:py-6">
            <div
              className="animate-fade-up min-w-0 opacity-0"
              style={{ animationDelay: "40ms" }}
            >
              <p className="text-overline">Расходы</p>
              <h1 className="text-title-lg mt-1 truncate text-zinc-900 dark:text-zinc-50">
                Expense Tracker
              </h1>
            </div>
            <div
              className="animate-scale-in flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 opacity-0 transition-colors duration-300 hover:border-zinc-300 hover:bg-white dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
              style={{ animationDelay: "0ms" }}
            >
              <span className="font-amount text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                ₽
              </span>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-lg flex-1 px-5 py-8 sm:px-8 sm:py-10">
          <ExpenseTracker />
        </main>
      </div>
    </div>
  );
}
