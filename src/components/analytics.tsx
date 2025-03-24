import { ProjectAnalyticsResponseType } from "@/features/projects/api/use-get-project-analytics";
import { AnalyticsCard } from "./analytics-card";
import { DottedSeparator } from "./dotted-separator";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

const Analytics = ({ data }: ProjectAnalyticsResponseType) => {
  return (
    <ScrollArea className="border rounded-lg w-full whitespace-nowrap shrink-0">
      <div className="w-full flex flex-row">
        <div className="flex items-center flex-1 shrink-0">
          <AnalyticsCard
            title="Total tasks"
            value={data.taskCount}
            variant={data.taskDiff > 0 ? "up" : "down"}
            increaseValue={data.taskDiff}
          />
          <DottedSeparator orientation="vertical" />
        </div>
        <div className="flex items-center flex-1">
          <AnalyticsCard
            title="Assigned tasks"
            value={data.assignedTaskCount}
            variant={data.assignedTaskDiff > 0 ? "up" : "down"}
            increaseValue={data.assignedTaskDiff}
          />
          <DottedSeparator orientation="vertical" />
        </div>
        <div className="flex items-center flex-1">
          <AnalyticsCard
            title="Completed tasks"
            value={data.completedTaskCount}
            variant={data.completedTaskDiff > 0 ? "up" : "down"}
            increaseValue={data.completedTaskDiff}
          />
          <DottedSeparator orientation="vertical" />
        </div>
        <div className="flex items-center flex-1">
          <AnalyticsCard
            title="Overdue tasks"
            value={data.overdueTaskCount}
            variant={data.overdueTaskDiff > 0 ? "up" : "down"}
            increaseValue={data.overdueTaskDiff}
          />
          <DottedSeparator orientation="vertical" />
        </div>
        <div className="flex items-center flex-1">
          <AnalyticsCard
            title="Incompleted tasks"
            value={data.incompleteTaskCount}
            variant={data.incompleteTaskDiff > 0 ? "up" : "down"}
            increaseValue={data.incompleteTaskDiff}
          />
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export { Analytics };
