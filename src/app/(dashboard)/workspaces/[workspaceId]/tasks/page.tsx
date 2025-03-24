import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";
import { TaskViewSwitcher } from "@/features/tasks/components/task-view-switcher";

interface TaskIdPageProps {
  params: Promise<{ workspaceId: string; taskId: string }>;
}

export default async function TasksPage({ params }: TaskIdPageProps) {
  const user = await getCurrent();

  if (!user) {
    redirect("/sign-in");
  }

  const { taskId, workspaceId } = await params;

  return (
    <div className="h-full flex flex-col">
      <TaskViewSwitcher />
    </div>
  );
}
