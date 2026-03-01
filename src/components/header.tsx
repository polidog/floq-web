"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="flex h-14 items-center justify-between border-b border-zinc-200 px-4 dark:border-zinc-800">
      <div className="flex items-center gap-4 md:hidden">
        <Link
          href="/tasks"
          className="text-lg font-bold text-zinc-900 dark:text-zinc-50"
        >
          floq
        </Link>
        <nav className="flex gap-2">
          <Link
            href="/tasks"
            className={`rounded-md px-3 py-1.5 text-sm font-medium ${
              pathname.startsWith("/tasks")
                ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                : "text-zinc-500 dark:text-zinc-400"
            }`}
          >
            タスク
          </Link>
          <Link
            href="/projects"
            className={`rounded-md px-3 py-1.5 text-sm font-medium ${
              pathname.startsWith("/projects")
                ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                : "text-zinc-500 dark:text-zinc-400"
            }`}
          >
            プロジェクト
          </Link>
        </nav>
      </div>
      <div className="hidden md:block" />
      <form action="/api/auth/logout" method="POST">
        <button
          type="submit"
          className="rounded-md px-3 py-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          ログアウト
        </button>
      </form>
    </header>
  );
}
