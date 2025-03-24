import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";
import { ProjectSettingsClient } from "./client";

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

  return <ProjectSettingsClient />;
}
