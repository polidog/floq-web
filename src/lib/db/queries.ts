import { and, asc, desc, eq } from "drizzle-orm";
import type { LibSQLDatabase } from "drizzle-orm/libsql";
import type * as schema from "./schema";
import { comments, type TaskStatus, tasks } from "./schema";

type Db = LibSQLDatabase<typeof schema>;

export async function getTasksByStatus(db: Db, status: TaskStatus) {
  return db
    .select()
    .from(tasks)
    .where(and(eq(tasks.status, status), eq(tasks.isProject, false)))
    .orderBy(desc(tasks.isFocused), desc(tasks.updatedAt));
}

export async function getTaskById(db: Db, id: string) {
  const result = await db.select().from(tasks).where(eq(tasks.id, id)).limit(1);
  return result[0] ?? null;
}

export async function getProjects(db: Db) {
  return db
    .select()
    .from(tasks)
    .where(eq(tasks.isProject, true))
    .orderBy(desc(tasks.updatedAt));
}

export async function getProjectWithSubtasks(db: Db, projectId: string) {
  const project = await getTaskById(db, projectId);
  if (!project) return null;

  const subtasks = await db
    .select()
    .from(tasks)
    .where(eq(tasks.parentId, projectId))
    .orderBy(asc(tasks.createdAt));

  return { project, subtasks };
}

export async function getCommentsByTaskId(db: Db, taskId: string) {
  return db
    .select()
    .from(comments)
    .where(eq(comments.taskId, taskId))
    .orderBy(asc(comments.createdAt));
}

export async function getTaskCounts(db: Db) {
  const allTasks = await db
    .select({ status: tasks.status, isProject: tasks.isProject })
    .from(tasks);

  const counts = { inbox: 0, next: 0, waiting: 0, someday: 0, done: 0 };
  for (const task of allTasks) {
    if (!task.isProject && task.status in counts) {
      counts[task.status as TaskStatus]++;
    }
  }
  return counts;
}
