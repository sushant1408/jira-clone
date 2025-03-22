import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";
import { getWorkspaceInfo } from "@/features/workspaces/queries";
import { JoinWorkspaceForm } from "@/features/workspaces/components/join-workspace-form";

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

  const { inviteCode, workspaceId } = await params;

  const workspace = await getWorkspaceInfo({ workspaceId });

  if (!workspace) {
    redirect("/");
  }

  return (
    <div className="w-full lg:max-w-xl">
      <JoinWorkspaceForm initialValues={{ ...workspace }} />
    </div>
  );
}
