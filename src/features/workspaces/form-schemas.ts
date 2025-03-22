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

const updateWorkspaceSchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty("Name must contain at least 1 character(s)")
    .optional(),
  image: z
    .string()
    .transform((value) => (value === "" ? undefined : value))
    .or(z.instanceof(File))
    .optional(),
});

export { createWorkspaceSchema, updateWorkspaceSchema };
