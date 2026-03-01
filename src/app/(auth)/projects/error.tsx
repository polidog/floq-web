"use client";

export default function ProjectsError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <p className="mb-4 text-sm text-red-600">
        プロジェクトの読み込みに失敗しました
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        再試行
      </button>
    </div>
  );
}
