import { ExternalLinkIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteTask } from "../api/use-delete-task";
import { useEditTaskModal } from "../hooks/use-edit-task-modal";

interface TaskActionsProps {
  id: string;
  projectId: string;
  children: ReactNode;
}

const TaskActions = ({ children, id, projectId }: TaskActionsProps) => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();

  const [ConfirmationDialog, confirm] = useConfirm({
    message: "This action cannot be undone.",
    title: "Delete task?",
    variant: "destructive",
  });
  const { open } = useEditTaskModal();

  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask();

  const handleOpenTask = () => {
    router.push(`/workspaces/${workspaceId}/tasks/${id}`);
  };

  const handleOpenProject = () => {
    router.push(`/workspaces/${workspaceId}/projects/${projectId}`);
  };

  const handleDelete = async () => {
    const ok = await confirm();

    if (!ok) {
      return;
    }

    deleteTask({ param: { taskId: id } });
  };

  return (
    <div className="flex justify-end">
      <ConfirmationDialog />

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={handleOpenTask}>
            <ExternalLinkIcon />
            Task details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleOpenProject}>
            <ExternalLinkIcon />
            Open project
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => open(id)}>
            <PencilIcon />
            Edit task
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-amber-700 focus:text-amber-700"
          >
            <TrashIcon className="text-amber-700" />
            Delete task
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export { TaskActions };
