import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";
import { JoinWorkspaceClient } from "./client";

interface JoinWorkspacePageProps {
  params: Promise<{ workspaceId: string; inviteCode: string }>;
}

export default async function JoinWorkspacePage({
  params,
}: JoinWorkspacePageProps) {
  const user = getCurrent();

  if (!user) {
    redirect("/sign-in");
  }

  return <JoinWorkspaceClient />;
}
