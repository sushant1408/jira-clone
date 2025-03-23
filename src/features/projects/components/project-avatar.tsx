import Image from "next/image";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ProjectAvatarProps {
  image?: string;
  name: string;
  className?: string;
  fallabackClassName?: string;
}

const ProjectAvatar = ({
  name,
  className,
  image,
  fallabackClassName,
}: ProjectAvatarProps) => {
  if (image) {
    return (
      <div
        className={cn("size-5 relative rounded-md overflow-hidden", className)}
      >
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
    );
  }

  return (
    <Avatar className={cn("size-5 rounded-md", className)}>
      <AvatarFallback
        className={cn(
          "rounded-md text-white bg-[#579DFF] font-semibold text-sm uppercase",
          fallabackClassName
        )}
      >
        {name.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
};

export { ProjectAvatar };
