"use client";

import { LoaderIcon, PlusIcon } from "lucide-react";
import { useQueryState } from "nuqs";

import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useGetTasks } from "../api/use-get-tasks";
import { useCreateTaskModal } from "../hooks/use-create-task-modal";
import { useTaskFilters } from "../hooks/use-task-filters";
import { DataFilters } from "./data-filters";

const TaskViewSwitcher = () => {
  const [{ assigneeId, dueDate, projectId, search, status }] = useTaskFilters();
  const [view, setView] = useQueryState("task-view", { defaultValue: "table" });

  const { open } = useCreateTaskModal();

  const workspaceId = useWorkspaceId();
  const { data: tasks, isLoading: isTasksLoading } = useGetTasks({
    workspaceId,
    assigneeId,
    dueDate,
    projectId,
    search,
    status,
  });

  return (
    <Tabs
      defaultValue={view}
      onValueChange={setView}
      className="flex-1 w-full border rounded-lg"
    >
      <div className="h-full flex flex-col overflow-auto p-4">
        <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
          <TabsList className="w-full lg:w-auto">
            <TabsTrigger className="h-8 w-full lg:w-auto" value="table">
              Table
            </TabsTrigger>
            <TabsTrigger className="h-8 w-full lg:w-auto" value="kanban">
              Kanban
            </TabsTrigger>
            <TabsTrigger className="h-8 w-full lg:w-auto" value="calendar">
              Calendar
            </TabsTrigger>
          </TabsList>
          <Button size="sm" className="w-full lg:w-auto" onClick={open}>
            <PlusIcon />
            New
          </Button>
        </div>
        <DottedSeparator className="my-4" />

        <DataFilters />

        <DottedSeparator className="my-4" />
        {isTasksLoading ? (
          <div className="w-full border rounded-lg h-[200px] flex flex-col items-center justify-center">
            <LoaderIcon className="animate-spin size-5 text-muted-foreground" />
          </div>
        ) : (
          <>
            <TabsContent value="table" className="mt-0">
              <pre>{JSON.stringify(tasks, null, 4)}</pre>
            </TabsContent>
            <TabsContent value="kanban" className="mt-0">
              Data kanban
            </TabsContent>
            <TabsContent value="calendar" className="mt-0">
              Data calendar
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  );
};

export { TaskViewSwitcher };
