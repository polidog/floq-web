"use client";

import { useRef } from "react";
import { addSubtask } from "@/actions/projects";
import type { Task } from "@/lib/db/schema";
import { TaskItem } from "./task-item";

export function ProjectDetail({
  project,
  subtasks,
}: {
  project: Task;
  subtasks: Task[];
}) {
  const formRef = useRef<HTMLFormElement>(null);

  async function handleAddSubtask(formData: FormData) {
    await addSubtask(project.id, formData);
    formRef.current?.reset();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          {project.title}
        </h1>
        {project.description && (
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap">
            {project.description}
          </p>
        )}
        <div className="mt-3 flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
          <span
            className={`rounded-full px-2 py-0.5 ${
              project.status === "done"
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
            }`}
          >
            {project.status}
          </span>
          <span>
            {subtasks.filter((t) => t.status === "done").length}/
            {subtasks.length} 完了
          </span>
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">
          サブタスク
        </h2>
        <form
          ref={formRef}
          action={handleAddSubtask}
          className="mb-3 flex gap-2"
        >
          <input
            name="title"
            type="text"
            placeholder="サブタスクを追加..."
            required
            className="flex-1 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          />
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            追加
          </button>
        </form>
        {subtasks.length === 0 ? (
          <p className="py-4 text-center text-sm text-zinc-400 dark:text-zinc-500">
            サブタスクがありません
          </p>
        ) : (
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800">
            {subtasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
