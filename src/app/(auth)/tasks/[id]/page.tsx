import Link from "next/link";
import { notFound } from "next/navigation";
import { CommentForm } from "@/components/comment-form";
import { CommentList } from "@/components/comment-list";
import { TaskDetail } from "@/components/task-detail";
import { getDb } from "@/lib/auth/session";
import { getCommentsByTaskId, getTaskById } from "@/lib/db/queries";

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const db = await getDb();

  const [task, taskComments] = await Promise.all([
    getTaskById(db, id),
    getCommentsByTaskId(db, id),
  ]);

  if (!task) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <Link
        href="/tasks"
        className="mb-4 inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
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
            d="M15 19l-7-7 7-7"
          />
        </svg>
        タスク一覧に戻る
      </Link>

      <TaskDetail task={task} />

      <div className="mt-8 space-y-4">
        <h2 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
          コメント ({taskComments.length})
        </h2>
        <CommentForm taskId={id} />
        <CommentList comments={taskComments} taskId={id} />
      </div>
    </div>
  );
}
