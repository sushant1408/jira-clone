import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";
import { EditProjectForm } from "@/features/projects/components/edit-project-form";
import { getProjectById } from "@/features/projects/queries";

interface ProjectSettingsPageProps {
  params: Promise<{ workspaceId: string; projectId: string }>;
}

export default async function ProjectSettingsPage({
  params,
}: ProjectSettingsPageProps) {
  const user = await getCurrent();

  if (!user) {
    redirect("/sign-in");
  }

  const { projectId } = await params;

  const project = await getProjectById({ projectId });

  return (
    <div className="w-full lg:max-w-xl">
      <EditProjectForm initialValues={project} />
    </div>
  );
}
