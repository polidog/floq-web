import type { Task } from "@/lib/db/schema";
import { TaskItem } from "./task-item";

export function TaskList({ tasks }: { tasks: Task[] }) {
  if (tasks.length === 0) {
    return (
      <div className="py-12 text-center text-sm text-zinc-400 dark:text-zinc-500">
        タスクがありません
      </div>
    );
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}
