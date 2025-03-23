import { LoaderIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useGetTask } from "../../api/use-get-task";
import { EditTaskForm } from "./edit-task-form";

interface EditTaskFormWrapperProps {
  onCancel?: () => void;
  taskId: string;
}

const EditTaskFormWrapper = ({
  onCancel,
  taskId,
}: EditTaskFormWrapperProps) => {
  const workspaceId = useWorkspaceId();

  const { data: task, isLoading: isTaskLoading } = useGetTask({ taskId });
  const { data: projects, isLoading: isProjectsLoading } = useGetProjects({
    workspaceId,
  });
  const { data: members, isLoading: isMembersLoading } = useGetMembers({
    workspaceId,
  });

  const projectOptions = projects?.documents.map((project) => ({
    $id: project.$id,
    name: project.name,
    imageUrl: project.imageUrl,
  }));
  const memberOptions = members?.documents.map((member) => ({
    $id: member.$id,
    name: member.name,
  }));

  const isLoading = isProjectsLoading || isMembersLoading || isTaskLoading;

  if (isLoading) {
    return (
      <Card className="w-full h-[714px] border-none shadow-none">
        <CardContent className="flex items-center justify-center h-full">
          <LoaderIcon className="size-5 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (!task) {
    return null;
  }

  return (
    <div>
      <EditTaskForm
        onCancel={onCancel}
        memberOptions={memberOptions ?? []}
        projectOptions={projectOptions ?? []}
        initialValues={task}
      />
    </div>
  );
};

export { EditTaskFormWrapper };
