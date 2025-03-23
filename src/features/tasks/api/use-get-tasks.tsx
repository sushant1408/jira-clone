import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

interface UseGetTasksProps {
  workspaceId: string;
}

const useGetTasks = ({ workspaceId }: UseGetTasksProps) => {
  const query = useQuery({
    queryKey: ["tasks", workspaceId],
    queryFn: async () => {
      const response = await client.api.tasks.$get({ query: { workspaceId } });

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
