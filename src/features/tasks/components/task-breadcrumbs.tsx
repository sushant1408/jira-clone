import { ChevronRightIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { Project } from "@/features/projects/types";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteTask } from "../api/use-delete-task";
import { Task } from "../types";

interface TaskBreadcrmbsProps {
  task: Task;
  project: Project;
}

const TaskBreadcrmbs = ({ project, task }: TaskBreadcrmbsProps) => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();

  const [ConfirmationDialog, confirm] = useConfirm({
    message: "This action cannot be undone.",
    title: "Delete task?",
    variant: "destructive",
  });

  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask();

  const handleDelete = async () => {
    const ok = await confirm();

    if (!ok) {
      return;
    }

    deleteTask(
      { param: { taskId: task.$id } },
      {
        onSuccess: () => {
          router.replace(`/workspaces/${workspaceId}/tasks`);
        },
      }
    );
  };

  return (
    <div className="flex items-center gap-x-2">
      <ConfirmationDialog />

      <ProjectAvatar
        name={project?.name}
        image={project?.imageUrl}
        className="size-6 lg:size-8"
      />
      <Link href={`/workspaces/${workspaceId}/projects/${project.$id}`}>
        <p className="text-sm lg:text-lg font-semibold text-muted-foreground hover:opacity-75 transition">
          {project?.name}
        </p>
      </Link>
      <ChevronRightIcon className="size-4 lg:size-5 text-muted-foreground" />
      <p className="text-sm lg:text-lg font-semibold">{task.name}</p>
      <Button
        className="ml-auto"
        variant="destructive"
        size="sm"
        onClick={handleDelete}
        disabled={isDeleting}
      >
        <TrashIcon className="size-4" />
        <span className="hidden lg:block">Delete task</span>
      </Button>
    </div>
  );
};

export { TaskBreadcrmbs };
