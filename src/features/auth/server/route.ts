import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { loginSchema, signupSchema } from "../form-schemas";

const app = new Hono()
  .post("/login", zValidator("json", loginSchema), async (c) => {
    const { email, password } = c.req.valid("json");

    return c.json({});
  })
  .post("/register", zValidator("json", signupSchema), async (c) => {
    const { email, name, password } = c.req.valid("json");

    return c.json({});
  });

export default app;
