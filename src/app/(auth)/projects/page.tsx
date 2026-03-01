import { ProjectForm } from "@/components/project-form";
import { ProjectList } from "@/components/project-list";
import { getDb } from "@/lib/auth/session";
import { getProjects } from "@/lib/db/queries";

export default async function ProjectsPage() {
  const db = await getDb();
  const projects = await getProjects(db);

  return (
    <div>
      <div className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
        <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          プロジェクト
        </h1>
      </div>
      <ProjectForm />
      <ProjectList projects={projects} />
    </div>
  );
}
