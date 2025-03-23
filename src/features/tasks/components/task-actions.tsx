import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ExternalLinkIcon, PencilIcon, TrashIcon } from "lucide-react";
import { ReactNode } from "react";

interface TaskActionsProps {
  id: string;
  projectId: string;
  children: ReactNode;
}

const TaskActions = ({ children, id, projectId }: TaskActionsProps) => {
  return (
    <div className="flex justify-end">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem>
            <ExternalLinkIcon />
            Task details
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ExternalLinkIcon />
            Open project
          </DropdownMenuItem>
          <DropdownMenuItem>
            <PencilIcon />
            Edit task
          </DropdownMenuItem>
          <DropdownMenuItem className="text-amber-700 focus:text-amber-700">
            <TrashIcon className="text-amber-700" />
            Delete task
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export { TaskActions };
