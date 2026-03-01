"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/auth/session";
import { comments } from "@/lib/db/schema";

export async function addComment(taskId: string, formData: FormData) {
  const db = await getDb();
  const content = formData.get("content") as string;
  if (!content?.trim()) return;

  const id = crypto.randomUUID();
  const now = new Date();

  await db.insert(comments).values({
    id,
    taskId,
    content: content.trim(),
    createdAt: now,
  });

  revalidatePath(`/tasks/${taskId}`);
}

export async function deleteComment(commentId: string, taskId: string) {
  const db = await getDb();
  await db.delete(comments).where(eq(comments.id, commentId));
  revalidatePath(`/tasks/${taskId}`);
}
