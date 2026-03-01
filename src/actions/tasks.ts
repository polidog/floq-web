"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/auth/session";
import { type TaskStatus, tasks } from "@/lib/db/schema";

export async function createTask(formData: FormData) {
  const db = await getDb();
  const title = formData.get("title") as string;
  if (!title?.trim()) return;

  const now = new Date();
  const id = crypto.randomUUID();

  await db.insert(tasks).values({
    id,
    title: title.trim(),
    status: "inbox",
    isProject: false,
    isFocused: false,
    createdAt: now,
    updatedAt: now,
  });

  revalidatePath("/tasks");
}

export async function updateTaskStatus(id: string, status: TaskStatus) {
  const db = await getDb();
  const now = new Date();

  await db
    .update(tasks)
    .set({
      status,
      updatedAt: now,
      completedAt: status === "done" ? now : null,
    })
    .where(eq(tasks.id, id));

  revalidatePath("/tasks");
  revalidatePath(`/tasks/${id}`);
}

export async function toggleFocus(id: string, isFocused: boolean) {
  const db = await getDb();

  await db
    .update(tasks)
    .set({ isFocused, updatedAt: new Date() })
    .where(eq(tasks.id, id));

  revalidatePath("/tasks");
}

export async function updateTask(
  id: string,
  data: {
    title?: string;
    description?: string | null;
    context?: string | null;
    waitingFor?: string | null;
    effort?: string | null;
    dueDate?: Date | null;
    parentId?: string | null;
  },
) {
  const db = await getDb();

  await db
    .update(tasks)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(tasks.id, id));

  revalidatePath("/tasks");
  revalidatePath(`/tasks/${id}`);
  revalidatePath("/projects");
}

export async function deleteTask(id: string) {
  const db = await getDb();

  await db.delete(tasks).where(eq(tasks.id, id));

  revalidatePath("/tasks");
  revalidatePath("/projects");
}
