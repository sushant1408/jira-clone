import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ID, Query } from "node-appwrite";
import { z } from "zod";

import {
  DATABASE_ID,
  MEMBERS_ID,
  PROJECTS_ID,
  TASKS_ID,
} from "@/config/db-constants";
import { getMember } from "@/features/members/utils";
import { Project } from "@/features/projects/types";
import { createAdminClient } from "@/lib/appwrite";
import { sessionMiddlware } from "@/lib/session-middleware";
import { createTaskSchema, updateTaskSchema } from "../form-schemas";
import { Task, TaskStatus } from "../types";

const app = new Hono()
  .get(
    "/",
    zValidator(
      "query",
      z.object({
        workspaceId: z.string(),
        projectId: z.string().nullish(),
        assigneeId: z.string().nullish(),
        search: z.string().nullish(),
        dueDate: z.string().nullish(),
        status: z.nativeEnum(TaskStatus).nullish(),
      })
    ),
    sessionMiddlware,
    async (c) => {
      const { users } = await createAdminClient();
      const databases = c.get("databases");
      const user = c.get("user");

      const { assigneeId, dueDate, projectId, status, workspaceId, search } =
        c.req.valid("query");

      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });

      if (!member) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const query = [
        Query.equal("workspaceId", workspaceId),
        Query.orderDesc("$createdAt"),
      ];

      if (projectId) {
        query.push(Query.equal("projectId", projectId));
      }

      if (status) {
        query.push(Query.equal("status", status));
      }

      if (assigneeId) {
        query.push(Query.equal("assigneeId", assigneeId));
      }

      if (dueDate) {
        query.push(Query.equal("dueDate", dueDate));
      }

      if (search) {
        query.push(Query.search("name", search));
      }

      const tasks = await databases.listDocuments<Task>(
        DATABASE_ID,
        TASKS_ID,
        query
      );

      const projectIds = tasks.documents.map((task) => task.projectId);
      const assigneeIds = tasks.documents.map((task) => task.assigneeId);

      const projects = await databases.listDocuments<Project>(
        DATABASE_ID,
        PROJECTS_ID,
        projectIds.length > 0 ? [Query.contains("$id", projectIds)] : []
      );

      const members = await databases.listDocuments(
        DATABASE_ID,
        MEMBERS_ID,
        assigneeIds.length > 0 ? [Query.contains("$id", assigneeIds)] : []
      );

      const assignees = await Promise.all(
        members.documents.map(async (member) => {
          const user = await users.get(member.userId);

          return {
            ...member,
            name: user.name,
            email: user.email,
          };
        })
      );

      const populatedTasks = tasks.documents.map((task) => {
        const project = projects.documents.find(
          (project) => project.$id === task.projectId
        );
        const assignee = assignees.find(
          (assignee) => assignee.$id === task.assigneeId
        );

        return {
          ...task,
          project,
          assignee,
        };
      });

      return c.json({ data: { ...tasks, documents: populatedTasks } });
    }
  )
  .get("/:taskId", sessionMiddlware, async (c) => {
    const databases = c.get("databases");
    const currentUser = c.get("user");
    const { users } = await createAdminClient();

    const { taskId } = c.req.param();

    const task = await databases.getDocument<Task>(
      DATABASE_ID,
      TASKS_ID,
      taskId
    );

    const currentMember = await getMember({
      databases,
      workspaceId: task.workspaceId,
      userId: currentUser.$id,
    });

    if (!currentMember) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const project = await databases.getDocument<Project>(
      DATABASE_ID,
      PROJECTS_ID,
      task.projectId
    );

    const member = await databases.getDocument(
      DATABASE_ID,
      MEMBERS_ID,
      task.assigneeId
    );

    const user = await users.get(member.userId);

    const assignee = {
      ...member,
      name: user.name,
      email: user.email,
    };

    return c.json({ data: { ...task, project, assignee } });
  })
  .post(
    "/",
    zValidator("json", createTaskSchema),
    sessionMiddlware,
    async (c) => {
      const databases = c.get("databases");
      const user = c.get("user");

      const {
        assigneeId,
        dueDate,
        name,
        projectId,
        status,
        workspaceId,
        description,
      } = c.req.valid("json");

      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });

      if (!member) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const highestPositionTask = await databases.listDocuments(
        DATABASE_ID,
        TASKS_ID,
        [
          Query.equal("status", status),
          Query.equal("workspaceId", workspaceId),
          Query.orderAsc("position"),
          Query.limit(1),
        ]
      );

      const newPosition =
        highestPositionTask.documents.length > 0
          ? highestPositionTask.documents[0].position + 1000
          : 1000;

      const task = await databases.createDocument(
        DATABASE_ID,
        TASKS_ID,
        ID.unique(),
        {
          name,
          status,
          workspaceId,
          projectId,
          dueDate,
          assigneeId,
          description,
          position: newPosition,
        }
      );

      return c.json({ data: task });
    }
  )
  .delete("/:taskId", sessionMiddlware, async (c) => {
    const databases = c.get("databases");
    const user = c.get("user");

    const { taskId } = c.req.param();

    const task = await databases.getDocument<Task>(
      DATABASE_ID,
      TASKS_ID,
      taskId
    );

    const member = await getMember({
      databases,
      workspaceId: task.workspaceId,
      userId: user.$id,
    });

    if (!member) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    await databases.deleteDocument(DATABASE_ID, TASKS_ID, taskId);

    return c.json({ data: { $id: taskId } });
  })
  .patch(
    "/:taskId",
    zValidator("json", updateTaskSchema),
    sessionMiddlware,
    async (c) => {
      const databases = c.get("databases");
      const user = c.get("user");

      const { taskId } = c.req.param();
      const { assigneeId, dueDate, name, projectId, status, description } =
        c.req.valid("json");

      const existingtask = await databases.getDocument<Task>(
        DATABASE_ID,
        TASKS_ID,
        taskId
      );

      const member = await getMember({
        databases,
        workspaceId: existingtask.workspaceId,
        userId: user.$id,
      });

      if (!member) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const task = await databases.updateDocument(
        DATABASE_ID,
        TASKS_ID,
        taskId,
        {
          name,
          status,
          projectId,
          dueDate,
          assigneeId,
          description,
        }
      );

      return c.json({ data: task });
    }
  );

export default app;
