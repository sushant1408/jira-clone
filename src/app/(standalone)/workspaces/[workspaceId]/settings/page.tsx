import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";
import { WorkspaceSettingsClient } from "./client";

interface WorkspaceSettingsPageProps {
  params: Promise<{ workspaceId: string }>;
}

export default async function WorkspaceSettingsPage({
  params,
}: WorkspaceSettingsPageProps) {
  const user = await getCurrent();

  if (!user) {
    redirect("/sign-in");
  }

  return <WorkspaceSettingsClient />;
}
