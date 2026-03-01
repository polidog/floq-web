import type { Comment } from "@/lib/db/schema";
import { DeleteCommentButton } from "./comment-form";

export function CommentList({
  comments,
  taskId,
}: {
  comments: Comment[];
  taskId: string;
}) {
  if (comments.length === 0) {
    return (
      <p className="text-sm text-zinc-400 dark:text-zinc-500">
        コメントはまだありません
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="group flex items-start justify-between rounded-lg border border-zinc-100 p-3 dark:border-zinc-800"
        >
          <div>
            <p className="text-sm text-zinc-900 whitespace-pre-wrap dark:text-zinc-100">
              {comment.content}
            </p>
            <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
              {comment.createdAt.toLocaleString("ja-JP")}
            </p>
          </div>
          <DeleteCommentButton commentId={comment.id} taskId={taskId} />
        </div>
      ))}
    </div>
  );
}
