import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { TaskStatus } from "../types";

interface UseGetTasksProps {
  workspaceId: string;
  projectId?: string | null;
  status?: TaskStatus | null;
  assigneeId?: string | null;
  search?: string | null;
  dueDate?: string | null;
}

const useGetTasks = ({
  workspaceId,
  assigneeId,
  dueDate,
  projectId,
  search,
  status,
}: UseGetTasksProps) => {
  const query = useQuery({
    queryKey: [
      "tasks",
      workspaceId,
      assigneeId,
      dueDate,
      projectId,
      search,
      status,
    ],
    queryFn: async () => {
      const response = await client.api.tasks.$get({
        query: {
          workspaceId,
          assigneeId: assigneeId ?? undefined,
          dueDate: dueDate ?? undefined,
          projectId: projectId ?? undefined,
          search: search ?? undefined,
          status: status ?? undefined,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to get tasks");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};

export { useGetTasks };
