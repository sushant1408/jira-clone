import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ID } from "node-appwrite";

import {
  DATABASE_ID,
  IMAGES_BUCKET_ID,
  WORKSPACES_ID,
} from "@/config/db-constants";
import { sessionMiddlware } from "@/lib/session-middleware";
import { createWorkspaceSchema } from "../form-schemas";

const app = new Hono().post(
  "/",
  zValidator("form", createWorkspaceSchema),
  sessionMiddlware,
  async (c) => {
    const databases = c.get("databases");
    const storage = c.get("storage");
    const user = c.get("user");

    const { name, image } = c.req.valid("form");

    let uploadedImageUrl: string | undefined;

    if (image instanceof File) {
      const file = await storage.createFile(
        IMAGES_BUCKET_ID,
        ID.unique(),
        image
      );

      const arrayBuffer = await storage.getFilePreview(
        IMAGES_BUCKET_ID,
        file.$id
      );

      uploadedImageUrl = `data:image/png;base64,${Buffer.from(
        arrayBuffer
      ).toString("base64")}`;
    }

    const workspace = await databases.createDocument(
      DATABASE_ID,
      WORKSPACES_ID,
      ID.unique(),
      { name, userId: user.$id, imageUrl: uploadedImageUrl }
    );

    return c.json({ data: workspace });
  }
);
// .post("/register", zValidator("json", signupSchema), async (c) => {
//   const { email, name, password } = c.req.valid("json");

//   const { account } = await createAdminClient();

//   await account.create(ID.unique(), email, password, name);

//   const session = await account.createEmailPasswordSession(email, password);

//   setCookie(c, AUTH_COOKIE, session.secret, {
//     path: "/",
//     httpOnly: true,
//     sameSite: "strict",
//     secure: true,
//     maxAge: 60 * 60 * 24 * 30,
//   });

//   return c.json({ success: true });
// })
// .get("/current", sessionMiddlware, async (c) => {
//   const user = c.get("user");

//   return c.json({ data: user });
// })
// .post("/logout", sessionMiddlware, async (c) => {
//   const account = c.get("account");

//   deleteCookie(c, AUTH_COOKIE);
//   await account.deleteSession("current");

//   return c.json({ success: true });
// });

export default app;
