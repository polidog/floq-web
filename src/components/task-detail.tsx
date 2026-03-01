"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteTask, updateTask, updateTaskStatus } from "@/actions/tasks";
import type { Task, TaskStatus } from "@/lib/db/schema";

const STATUS_OPTIONS: { value: TaskStatus; label: string }[] = [
  { value: "inbox", label: "Inbox" },
  { value: "next", label: "Next" },
  { value: "waiting", label: "Waiting" },
  { value: "someday", label: "Someday" },
  { value: "done", label: "Done" },
];

export function TaskDetail({ task }: { task: Task }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description ?? "");

  async function handleSave() {
    await updateTask(task.id, {
      title,
      description: description || null,
    });
    setEditing(false);
  }

  async function handleDelete() {
    await deleteTask(task.id);
    router.push("/tasks");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        {editing ? (
          <div className="flex-1 space-y-3">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-lg font-semibold outline-none focus:border-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="説明を追加..."
              rows={3}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleSave}
                className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
              >
                保存
              </button>
              <button
                type="button"
                onClick={() => {
                  setTitle(task.title);
                  setDescription(task.description ?? "");
                  setEditing(false);
                }}
                className="rounded-md px-3 py-1.5 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              >
                キャンセル
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              {task.title}
            </h1>
            {task.description && (
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap">
                {task.description}
              </p>
            )}
          </div>
        )}

        {!editing && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="rounded-md px-4 py-2.5 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
            >
              編集
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="rounded-md px-4 py-2.5 text-sm text-red-500 transition-colors hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20"
            >
              削除
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 rounded-lg border border-zinc-200 p-4 text-sm sm:grid-cols-2 dark:border-zinc-800">
        <div>
          <span className="text-zinc-500 dark:text-zinc-400">ステータス</span>
          <select
            value={task.status}
            onChange={(e) =>
              updateTaskStatus(task.id, e.target.value as TaskStatus)
            }
            className="mt-1 block w-full rounded-md border border-zinc-200 bg-white px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        {task.context && (
          <div>
            <span className="text-zinc-500 dark:text-zinc-400">
              コンテキスト
            </span>
            <p className="mt-1 text-zinc-900 dark:text-zinc-100">
              @{task.context}
            </p>
          </div>
        )}
        {task.effort && (
          <div>
            <span className="text-zinc-500 dark:text-zinc-400">工数</span>
            <p className="mt-1 text-zinc-900 dark:text-zinc-100">
              {task.effort}
            </p>
          </div>
        )}
        {task.waitingFor && (
          <div>
            <span className="text-zinc-500 dark:text-zinc-400">待機中</span>
            <p className="mt-1 text-zinc-900 dark:text-zinc-100">
              {task.waitingFor}
            </p>
          </div>
        )}
        {task.dueDate && (
          <div>
            <span className="text-zinc-500 dark:text-zinc-400">期限</span>
            <p className="mt-1 text-zinc-900 dark:text-zinc-100">
              {task.dueDate.toLocaleDateString("ja-JP")}
            </p>
          </div>
        )}
        <div>
          <span className="text-zinc-500 dark:text-zinc-400">作成日</span>
          <p className="mt-1 text-zinc-900 dark:text-zinc-100">
            {task.createdAt.toLocaleDateString("ja-JP")}
          </p>
        </div>
      </div>
    </div>
  );
}
