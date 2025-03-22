import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/actions";

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

  const { workspaceId } = await params;
  return <>{workspaceId}</>;
}
