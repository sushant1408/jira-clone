import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

interface UseGetTaskProps {
  taskId: string;
}

const useGetTask = ({ taskId }: UseGetTaskProps) => {
  const query = useQuery({
    queryKey: ["tasks", taskId],
    queryFn: async () => {
      const response = await client.api.tasks[":taskId"].$get({
        param: { taskId },
      });

      if (!response.ok) {
        throw new Error("Failed to get task");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};

export { useGetTask };
