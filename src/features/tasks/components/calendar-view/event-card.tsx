import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

import { MemberAvatar } from "@/features/members/components/member-avatar";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { Project } from "@/features/projects/types";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { cn } from "@/lib/utils";
import { TaskStatus } from "../../types";

interface EventCardProps {
  id: string;
  title: string;
  assignee: any;
  status: TaskStatus;
  project: Project;
}

const statusColorMap: Record<TaskStatus, string> = {
  [TaskStatus.BACKLOG]: "border-l-pink-400",
  [TaskStatus.DONE]: "border-l-emerald-400",
  [TaskStatus.IN_PROGRESS]: "border-l-yellow-400",
  [TaskStatus.IN_REVIEW]: "border-l-blue-400",
  [TaskStatus.TODO]: "border-l-red-400",
};

const EventCard = ({
  assignee,
  id,
  project,
  status,
  title,
}: EventCardProps) => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    router.push(`/workspaces/${workspaceId}/tasks/${id}`);
  };

  return (
    <div className="px-2" onClick={onClick}>
      <div
        className={cn(
          "p-1.5 text-xa bg-white text-primary border rounded-md border-l-4 flex flex-col gap-y-1.5 cursor-pointer hover:opacity-75 transition",
          statusColorMap[status]
        )}
      >
        <p className="line-clamp-2">{title}</p>
        <div className="flex items-center gap-x-1">
          <MemberAvatar name={assignee?.name} fallbackClassName="text-[10px]" />
          <div className="size-1 rounded-full bg-neutral-300" />
          <ProjectAvatar
            name={project?.name}
            image={project?.imageUrl}
            className="rounded-sm"
            fallabackClassName="rounded-sm text-[10px]"
          />
        </div>
      </div>
    </div>
  );
};

export { EventCard };
