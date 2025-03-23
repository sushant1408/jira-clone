import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";

const useCreateTaskModal = () => {
  const [
    { isOpen, initialStatus, initialAssignee, initialProject },
    setStates,
  ] = useQueryStates(
    {
      isOpen: parseAsBoolean.withDefault(false),
      initialStatus: parseAsString,
      initialProject: parseAsString,
      initialAssignee: parseAsString,
    },
    {
      clearOnDefault: true,
      urlKeys: {
        isOpen: "create-task",
        initialStatus: "initial-status",
        initialProject: "initial-project",
        initialAssignee: "initial-assignee",
      },
    }
  );

  const open = () => setStates({ isOpen: true });

  const close = () => setStates(null);

  return {
    isOpen,
    initialStatus,
    initialAssignee,
    initialProject,
    open,
    close,
    setStates,
  };
};

export { useCreateTaskModal };
