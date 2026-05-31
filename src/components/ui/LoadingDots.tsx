type LoadingDotsProps = {
  className?: string;
};

export function LoadingDots({ className = "mt-12" }: LoadingDotsProps) {
  return (
    <div
      className={`flex justify-center gap-2 ${className}`}
      aria-label="Загрузка"
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-600"
          style={{
            animation: "pulse 1.2s ease-in-out infinite",
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
}
