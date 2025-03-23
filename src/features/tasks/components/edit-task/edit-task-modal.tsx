"use client";

import { ResponsiveModal } from "@/components/responsive-modal";
import { useEditTaskModal } from "../../hooks/use-edit-task-modal";
import { EditTaskFormWrapper } from "./edit-task-form-wrapper";

const EditTaskModal = () => {
  const { taskId, setTaskId, close } = useEditTaskModal();

  return (
    <ResponsiveModal open={!!taskId} onOpenChange={close}>
      {taskId && <EditTaskFormWrapper onCancel={close} taskId={taskId} />}
    </ResponsiveModal>
  );
};

export { EditTaskModal };
