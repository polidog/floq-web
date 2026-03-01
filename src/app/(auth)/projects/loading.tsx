export default function ProjectsLoading() {
  return (
    <div className="animate-pulse">
      <div className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
        <div className="h-6 w-32 rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>
      <div className="p-4">
        <div className="h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800" />
      </div>
      <div className="space-y-1 px-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-14 rounded bg-zinc-50 dark:bg-zinc-900" />
        ))}
      </div>
    </div>
  );
}
