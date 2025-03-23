import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { DottedSeparator } from "./dotted-separator";
import { Logo } from "./logo";
import { Navigation } from "./navigation";
import { Projects } from "./projects";
import { WorkspaceSwitcher } from "./workspace-switcher";

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link href="/">
          <Logo />
        </Link>
      </SidebarHeader>
      <DottedSeparator className="mb-4 px-4" />
      <WorkspaceSwitcher />
      <DottedSeparator className="mt-4 mb-2 px-4" />
      <SidebarContent>
        <Navigation />
        <DottedSeparator className="mb-2 px-4" />
        <Projects />
      </SidebarContent>
    </Sidebar>
  );
};

export { AppSidebar };
