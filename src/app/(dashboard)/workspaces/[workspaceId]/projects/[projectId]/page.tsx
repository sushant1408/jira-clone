import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";
import { ProjectIdClient } from "./client";

interface ProjectIdPageProps {
  params: Promise<{ workspaceId: string; projectId: string }>;
}

export default async function ProjectIdPage({ params }: ProjectIdPageProps) {
  const user = await getCurrent();

  if (!user) {
    redirect("/sign-in");
  }

  return <ProjectIdClient />;
}
