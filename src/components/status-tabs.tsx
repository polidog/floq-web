"use client";

import Link from "next/link";
import type { TaskStatus } from "@/lib/db/schema";

const STATUSES: { value: TaskStatus; label: string }[] = [
  { value: "inbox", label: "Inbox" },
  { value: "next", label: "Next" },
  { value: "waiting", label: "Waiting" },
  { value: "someday", label: "Someday" },
  { value: "done", label: "Done" },
];

export function StatusTabs({
  counts,
  current,
}: {
  counts: Record<TaskStatus, number>;
  current: TaskStatus;
}) {
  return (
    <div className="flex gap-1 overflow-x-auto border-b border-zinc-200 dark:border-zinc-800">
      {STATUSES.map(({ value, label }) => (
        <Link
          key={value}
          href={`/tasks?status=${value}`}
          className={`flex items-center gap-1.5 whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
            current === value
              ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
          }`}
        >
          {label}
          {counts[value] > 0 && (
            <span
              className={`rounded-full px-1.5 py-0.5 text-xs ${
                current === value
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                  : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
              }`}
            >
              {counts[value]}
            </span>
          )}
        </Link>
      ))}
    </div>
  );
}
