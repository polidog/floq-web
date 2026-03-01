"use client";

import Link from "next/link";
import { deleteTask, toggleFocus, updateTaskStatus } from "@/actions/tasks";
import { useSwipe } from "@/hooks/use-swipe";
import type { Task } from "@/lib/db/schema";

export function TaskItem({ task }: { task: Task }) {
  const isDone = task.status === "done";

  const { ref, offsetX, isSwiping, direction } = useSwipe({
    onSwipeRight: () => updateTaskStatus(task.id, isDone ? "inbox" : "done"),
    onSwipeLeft: () => deleteTask(task.id),
  });

  return (
    <div ref={ref} className="relative overflow-hidden">
      {/* Background indicators */}
      <div className="absolute inset-0 flex">
        <div
          className={`flex flex-1 items-center pl-6 text-white transition-opacity ${
            direction === "right" ? "opacity-100" : "opacity-0"
          } ${isDone ? "bg-yellow-500" : "bg-green-500"}`}
        >
          {isDone ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <div
          className={`flex flex-1 items-center justify-end pr-6 bg-red-500 text-white transition-opacity ${
            direction === "left" ? "opacity-100" : "opacity-0"
          }`}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
      </div>

      {/* Foreground content */}
      <div
        className={`relative bg-white dark:bg-zinc-900 ${
          !isSwiping ? "transition-transform duration-200" : ""
        }`}
        style={{ transform: `translateX(${offsetX}px)` }}
      >
        <div className="group border-b border-zinc-100 px-4 py-3 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => updateTaskStatus(task.id, isDone ? "inbox" : "done")}
              className="-m-2.5 flex shrink-0 items-center justify-center p-2.5"
              aria-label={isDone ? "未完了に戻す" : "完了にする"}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${
                  isDone
                    ? "border-green-500 bg-green-500 text-white"
                    : "border-zinc-300 hover:border-zinc-400 dark:border-zinc-600"
                }`}
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
              </span>
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

            <button
              type="button"
              onClick={() => toggleFocus(task.id, !task.isFocused)}
              className={`-m-2 shrink-0 p-2 transition-opacity md:opacity-0 md:group-hover:opacity-100 ${
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

          {(task.context || task.effort || task.dueDate) && (
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5 pl-10">
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
