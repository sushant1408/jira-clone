import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";
import { WorkspaceClient } from "./client";

interface WorkspaceIdPageProps {
  params: Promise<{ workspaceId: string }>;
}

export default async function WorkspaceIdPage({
  params,
}: WorkspaceIdPageProps) {
  const user = await getCurrent();

  if (!user) {
    redirect("/sign-in");
  }

  return <WorkspaceClient />;
}
