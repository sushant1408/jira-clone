import { z } from "zod";
import { TaskStatus } from "./types";

const createTaskSchema = z.object({
  name: z.string().trim().nonempty("Name must contain at least 1 character(s)"),
  status: z.nativeEnum(TaskStatus, { required_error: "Status is required" }),
  workspaceId: z.string().trim().nonempty("Required"),
  projectId: z.string().trim().nonempty("Required"),
  dueDate: z.coerce.date(),
  assigneeId: z.string().trim().nonempty("Required"),
  description: z
    .string()
    .max(2048, "Description must contain at most 2048 character(s)")
    .optional(),
});

export { createTaskSchema };
