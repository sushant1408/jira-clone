import { FaCaretDown, FaCaretUp } from "react-icons/fa";

import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";

interface AnalyticsCardProps {
  title: string;
  value: number;
  variant: "up" | "down";
  increaseValue: number;
}

const AnalyticsCard = ({
  increaseValue,
  title,
  value,
  variant,
}: AnalyticsCardProps) => {
  const iconColor = variant === "up" ? "text-emerald-400" : "text-red-400";
  const increaseValueColor =
    variant === "up" ? "text-emerald-400" : "text-red-400";

  const Icon = variant === "up" ? FaCaretUp : FaCaretDown;

  return (
    <Card className="border-none shadow-none w-full">
      <CardHeader>
        <div className="flex items-center gap-x-2.5">
          <CardDescription className="flex items-center gap-x-2 font-medium overflow-hidden">
            <span className="truncate text-base">{title}</span>
          </CardDescription>
          <div className="flex items-center gap-x-1">
            <Icon className={cn("size-4", iconColor)} />
            <span className={cn("truncate text-base font-medium", increaseValueColor)}>
              {increaseValue}
            </span>
          </div>
        </div>
        <CardTitle className="text-3xl font-semibold">{value}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export { AnalyticsCard };
