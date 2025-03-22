import { z } from "zod";

const createWorkspaceSchema = z.object({
  name: z.string().trim().nonempty("Name must contain at least 1 character(s)"),
  image: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === "" ? undefined : value)),
    ])
    .optional(),
});

export { createWorkspaceSchema };
