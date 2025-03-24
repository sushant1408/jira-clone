import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";
import { TaskIdClient } from "./client";

interface TaskIdPageProps {
  params: Promise<{ workspaceId: string; taskId: string }>;
}

export default async function TaskIdPage({ params }: TaskIdPageProps) {
  const user = await getCurrent();

  if (!user) {
    redirect("/sign-in");
  }

  return <TaskIdClient />;
}
