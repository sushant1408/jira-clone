import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

const useCurrent = () => {
  const query = useQuery({
    queryKey: ["current"],
    queryFn: async () => {
      const response = await client.api.auth.current.$get();

      if (!response.ok) {
        throw new Error("Failed to get current user");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};

export { useCurrent };
