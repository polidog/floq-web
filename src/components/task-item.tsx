"use client";

import Link from "next/link";
import { toggleFocus, updateTaskStatus } from "@/actions/tasks";
import type { Task } from "@/lib/db/schema";

export function TaskItem({ task }: { task: Task }) {
  const isDone = task.status === "done";

  return (
    <div className="group flex items-center gap-3 border-b border-zinc-100 px-4 py-3 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50">
      <button
        type="button"
        onClick={() => updateTaskStatus(task.id, isDone ? "inbox" : "done")}
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
          isDone
            ? "border-green-500 bg-green-500 text-white"
            : "border-zinc-300 hover:border-zinc-400 dark:border-zinc-600"
        }`}
        aria-label={isDone ? "未完了に戻す" : "完了にする"}
      >
        {isDone && (
          <svg
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </button>

      <Link
        href={`/tasks/${task.id}`}
        className={`min-w-0 flex-1 text-sm ${
          isDone
            ? "text-zinc-400 line-through dark:text-zinc-500"
            : "text-zinc-900 dark:text-zinc-100"
        }`}
      >
        {task.title}
      </Link>

      <div className="flex shrink-0 items-center gap-2">
        {task.context && (
          <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
            @{task.context}
          </span>
        )}
        {task.effort && (
          <span className="rounded bg-purple-50 px-1.5 py-0.5 text-xs text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
            {task.effort}
          </span>
        )}
        {task.dueDate && (
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {task.dueDate.toLocaleDateString("ja-JP")}
          </span>
        )}
        <button
          type="button"
          onClick={() => toggleFocus(task.id, !task.isFocused)}
          className={`opacity-0 transition-opacity group-hover:opacity-100 ${
            task.isFocused ? "!opacity-100" : ""
          }`}
          aria-label={task.isFocused ? "フォーカス解除" : "フォーカス"}
        >
          {task.isFocused ? (
            <svg
              className="h-4 w-4 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ) : (
            <svg
              className="h-4 w-4 text-zinc-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
