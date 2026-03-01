"use client";

import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  const pageTitle = pathname.startsWith("/projects") ? "プロジェクト" : "タスク";

  return (
    <header className="flex h-12 items-center justify-between border-b border-zinc-200 px-4 md:h-14 dark:border-zinc-800">
      <div className="md:hidden">
        <h1 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
          {pageTitle}
        </h1>
      </div>
      <div className="hidden md:block" />
      <form action="/api/auth/logout" method="POST">
        <button
          type="submit"
          className="rounded-md px-3 py-2 text-sm text-zinc-500 transition-colors hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          ログアウト
        </button>
      </form>
    </header>
  );
}
