import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/project-detail";
import { getDb } from "@/lib/auth/session";
import { getProjectWithSubtasks } from "@/lib/db/queries";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const db = await getDb();
  const result = await getProjectWithSubtasks(db, id);

  if (!result) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl p-4 md:p-6">
      <Link
        href="/projects"
        className="-ml-2 mb-4 inline-flex items-center gap-1 rounded-md px-2 py-2 text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
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
        プロジェクト一覧に戻る
      </Link>

      <ProjectDetail project={result.project} subtasks={result.subtasks} />
    </div>
  );
}
