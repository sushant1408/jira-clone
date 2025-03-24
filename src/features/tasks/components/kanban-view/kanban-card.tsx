import { MoreHorizontalIcon } from "lucide-react";

import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Task } from "../../types";
import { TaskActions } from "../task-actions";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import { TaskDate } from "../task-date";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";

interface KanbanCardProps {
  task: Task;
}

const KanbanCard = ({ task }: KanbanCardProps) => {
  return (
    <div className="bg-white p-2.5 mb-1.5 rounded shadow-sm space-y-3">
      <div className="flex items-start justify-between gap-x-2">
        <p className="line-clamp-2 text-sm">{task.name}</p>
        <TaskActions id={task.$id} projectId={task.projectId}>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontalIcon />
          </Button>
        </TaskActions>
      </div>
      <DottedSeparator />
      <div className="flex items-center gap-x-1.5">
        <MemberAvatar
          name={task.assignee.name}
          fallbackClassName="text-[10px]"
        />
        <div className="size-1 rounded-full bg-neutral-300" />
        <TaskDate value={task.dueDate} className="text-xs" />
      </div>
      <div className="flex items-center gap-x-1.5">
        <ProjectAvatar
          name={task.project.name}
          image={task.project.imageUrl}
          fallbackClassName="rounded-sm text-[10px]"
          className="rounded-sm"
        />
        <span className="text-xs font-medium">{task.project.name}</span>
      </div>
    </div>
  );
};

export { KanbanCard };
