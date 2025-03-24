"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiAddCircleFill } from "react-icons/ri";

import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

const Projects = () => {
  const pathname = usePathname();

  const workspaceId = useWorkspaceId();
  const { data: projects } = useGetProjects({ workspaceId });

  const { open: openCreateProjectModal } = useCreateProjectModal();

  return (
    <div className="flex flex-col gap-y-1">
      <div className="flex items-center justify-between  px-4">
        <p className="text-xs uppercase text-neutral-500">Projects</p>
        <RiAddCircleFill
          onClick={openCreateProjectModal}
          className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"
        />
      </div>

      <SidebarGroup>
        <SidebarMenu>
          {projects?.documents.map((item) => {
            const fullHref = `/workspaces/${workspaceId}/projects/${item.$id}`;
            const isActive = pathname === fullHref;

            return (
              <Link href={fullHref} key={item.$id}>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={isActive}
                    className="gap-2.5 p-2.5 font-medium hover:text-primary transition text-neutral-500"
                  >
                    <ProjectAvatar
                      name={item.name}
                      image={item.imageUrl}
                      className="rounded-sm"
                      fallbackClassName="rounded-sm"
                    />
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </Link>
            );
          })}
        </SidebarMenu>
      </SidebarGroup>
    </div>
  );
};

export { Projects };
