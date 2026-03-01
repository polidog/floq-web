export default function TasksLoading() {
  return (
    <div className="animate-pulse">
      <div className="flex gap-1 border-b border-zinc-200 px-4 py-2.5 dark:border-zinc-800">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-6 w-16 rounded bg-zinc-200 dark:bg-zinc-800"
          />
        ))}
      </div>
      <div className="p-4">
        <div className="h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800" />
      </div>
      <div className="space-y-1 px-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-12 rounded bg-zinc-50 dark:bg-zinc-900" />
        ))}
      </div>
    </div>
  );
}
