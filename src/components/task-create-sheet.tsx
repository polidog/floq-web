"use client";

import { useRef, useState } from "react";
import { createTask } from "@/actions/tasks";
import { BottomSheet } from "@/components/bottom-sheet";
import type { TaskStatus } from "@/lib/db/schema";

type TaskCreateSheetProps = {
  isOpen: boolean;
  onClose: () => void;
};

const statuses: { value: TaskStatus; label: string }[] = [
  { value: "inbox", label: "Inbox" },
  { value: "next", label: "Next" },
  { value: "waiting", label: "Waiting" },
  { value: "someday", label: "Someday" },
];

export function TaskCreateSheet({ isOpen, onClose }: TaskCreateSheetProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<TaskStatus>("inbox");

  async function handleSubmit(formData: FormData) {
    formData.set("status", status);
    await createTask(formData);
    formRef.current?.reset();
    setStatus("inbox");
    onClose();
  }

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="タスクを追加">
      <form ref={formRef} action={handleSubmit} className="space-y-4">
        {/* Title */}
        <input
          name="title"
          type="text"
          placeholder="タスク名を入力..."
          required
          autoFocus={isOpen}
          className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-3 text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
        />

        {/* Status pills */}
        <div>
          <label className="mb-2 block text-xs font-medium text-zinc-500 dark:text-zinc-400">
            ステータス
          </label>
          <div className="flex flex-wrap gap-2">
            {statuses.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => setStatus(s.value)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  status === s.value
                    ? "bg-blue-600 text-white"
                    : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Due date */}
        <div>
          <label className="mb-2 block text-xs font-medium text-zinc-500 dark:text-zinc-400">
            期限（任意）
          </label>
          <input
            name="dueDate"
            type="date"
            className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 rounded-lg bg-blue-600 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800"
          >
            追加
          </button>
          <button
            type="button"
            onClick={() => {
              formRef.current?.reset();
              setStatus("inbox");
              onClose();
            }}
            className="rounded-lg px-4 py-3 text-sm text-zinc-500 transition-colors hover:text-zinc-700 dark:text-zinc-400"
          >
            キャンセル
          </button>
        </div>
      </form>
    </BottomSheet>
  );
}
