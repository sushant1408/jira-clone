import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader
} from "@/components/ui/sidebar";
import { DottedSeparator } from "./dotted-separator";
import { Logo } from "./logo";
import { Navigation } from "./navigation";

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link href="/">
          <Logo />
        </Link>
      </SidebarHeader>
      <DottedSeparator className="my-4" />
      <SidebarContent>
        <Navigation />
      </SidebarContent>
    </Sidebar>
  );
};

export { AppSidebar };
