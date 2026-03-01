"use client";

import { useRef } from "react";
import { addComment, deleteComment } from "@/actions/comments";

export function CommentForm({ taskId }: { taskId: string }) {
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    await addComment(taskId, formData);
    formRef.current?.reset();
  }

  return (
    <form ref={formRef} action={handleSubmit} className="flex gap-2">
      <input
        name="content"
        type="text"
        placeholder="コメントを追加..."
        required
        className="flex-1 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
      />
      <button
        type="submit"
        className="rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        送信
      </button>
    </form>
  );
}

export function DeleteCommentButton({
  commentId,
  taskId,
}: {
  commentId: string;
  taskId: string;
}) {
  return (
    <button
      type="button"
      onClick={() => deleteComment(commentId, taskId)}
      className="shrink-0 rounded p-2 text-zinc-400 transition-opacity hover:text-red-500 md:opacity-0 md:group-hover:opacity-100"
      aria-label="コメントを削除"
    >
      <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}
