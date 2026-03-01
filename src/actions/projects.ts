"use server";

import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/auth/session";
import { tasks } from "@/lib/db/schema";

export async function createProject(formData: FormData) {
  const db = await getDb();
  const title = formData.get("title") as string;
  if (!title?.trim()) return;

  const now = new Date();
  const id = crypto.randomUUID();

  await db.insert(tasks).values({
    id,
    title: title.trim(),
    status: "next",
    isProject: true,
    isFocused: false,
    createdAt: now,
    updatedAt: now,
  });

  revalidatePath("/projects");
}

export async function addSubtask(projectId: string, formData: FormData) {
  const db = await getDb();
  const title = formData.get("title") as string;
  if (!title?.trim()) return;

  const now = new Date();
  const id = crypto.randomUUID();

  await db.insert(tasks).values({
    id,
    title: title.trim(),
    status: "next",
    isProject: false,
    parentId: projectId,
    isFocused: false,
    createdAt: now,
    updatedAt: now,
  });

  revalidatePath(`/projects/${projectId}`);
  revalidatePath("/tasks");
}
