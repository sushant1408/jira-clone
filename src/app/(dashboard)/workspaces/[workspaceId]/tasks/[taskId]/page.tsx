import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";

interface TaskIdPageProps {
  params: Promise<{ workspaceId: string; taskId: string }>;
}

export default async function TaskIdPage({ params }: TaskIdPageProps) {
  const user = await getCurrent();

  if (!user) {
    redirect("/sign-in");
  }

  const { taskId, workspaceId } = await params;

  return (
    <div>
    </div>
  );
}
