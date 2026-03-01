import Link from "next/link";
import type { Task } from "@/lib/db/schema";

export function ProjectList({ projects }: { projects: Task[] }) {
  if (projects.length === 0) {
    return (
      <div className="py-12 text-center text-sm text-zinc-400 dark:text-zinc-500">
        プロジェクトがありません
      </div>
    );
  }

  return (
    <div>
      {projects.map((project) => (
        <Link
          key={project.id}
          href={`/projects/${project.id}`}
          className="flex items-center justify-between border-b border-zinc-100 px-4 py-3 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50"
        >
          <div>
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              {project.title}
            </p>
            {project.description && (
              <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                {project.description}
              </p>
            )}
          </div>
          <span
            className={`rounded-full px-2 py-0.5 text-xs ${
              project.status === "done"
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
            }`}
          >
            {project.status}
          </span>
        </Link>
      ))}
    </div>
  );
}
