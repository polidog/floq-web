import { StatusTabs } from "@/components/status-tabs";
import { TaskForm } from "@/components/task-form";
import { TaskList } from "@/components/task-list";
import { getDb } from "@/lib/auth/session";
import { getTaskCounts, getTasksByStatus } from "@/lib/db/queries";
import type { TaskStatus } from "@/lib/db/schema";

export default async function TasksPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const params = await searchParams;
  const status = (params.status as TaskStatus) || "inbox";
  const db = await getDb();

  const [taskList, counts] = await Promise.all([
    getTasksByStatus(db, status),
    getTaskCounts(db),
  ]);

  return (
    <div>
      <StatusTabs counts={counts} current={status} />
      <TaskForm />
      <TaskList tasks={taskList} />
    </div>
  );
}
