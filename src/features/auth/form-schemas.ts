import { z } from "zod";

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z
    .string()
    .min(8, "Password must contain at least 8 character(s)")
    .max(256, "Password must contain at most 256 character(s)"),
});

const signupSchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty("Name must contain at least 1 character(s)")
    .max(256, "Name must contain at most 256 character(s)"),
  email: z.string().trim().email(),
  password: z
    .string()
    .min(8, "Password must contain at least 8 character(s)")
    .max(256, "Password must contain at most 256 character(s)"),
});

export { loginSchema, signupSchema };
