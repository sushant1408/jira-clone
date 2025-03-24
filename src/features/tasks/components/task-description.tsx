import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Task } from "../types";
import { PencilIcon, XIcon } from "lucide-react";
import { DottedSeparator } from "@/components/dotted-separator";
import { useUpdateTask } from "../api/use-update-task";
import { Textarea } from "@/components/ui/textarea";

interface TaskDescriptionProps {
  task: Task;
}

const TaskDescription = ({ task }: TaskDescriptionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(task.description || "");

  const { mutate, isPending } = useUpdateTask();

  const handleSave = () => {
    mutate(
      {
        json: { description: value },
        param: { taskId: task.$id },
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };

  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">Overview</p>
        <Button
          size="sm"
          variant="secondary"
          disabled={isPending}
          onClick={() => setIsEditing((prevState) => !prevState)}
        >
          {isEditing ? <XIcon /> : <PencilIcon />}
          {isEditing ? "Cencel" : "Edit"}
        </Button>
      </div>
      <DottedSeparator className="my-4" />
      {isEditing ? (
        <div className="flex flex-col gap-y-4">
          <Textarea
            placeholder="Enter task description"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="resize-none h-24"
          />
          <Button
            onClick={handleSave}
            disabled={isPending}
            size="sm"
            className="w-fit ml-auto"
          >
            {isPending ? "Saving..." : "Save changes"}
          </Button>
        </div>
      ) : (
        <div>
          {task.description || (
            <span className="text-muted-foreground">No description set</span>
          )}
        </div>
      )}
    </div>
  );
};

export { TaskDescription };
