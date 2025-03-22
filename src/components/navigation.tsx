import { SettingsIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import {
  GoCheckCircle,
  GoCheckCircleFill,
  GoHome,
  GoHomeFill,
} from "react-icons/go";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

const routes = [
  {
    label: "Home",
    href: "/",
    icon: GoHome,
    activeIcon: GoHomeFill,
  },
  {
    label: "My Tasks",
    href: "/tasks",
    icon: GoCheckCircle,
    activeIcon: GoCheckCircleFill,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: SettingsIcon,
    activeIcon: SettingsIcon,
  },
  {
    label: "Members",
    href: "/members",
    icon: UsersIcon,
    activeIcon: UsersIcon,
  },
];

const Navigation = () => {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {routes.map((item) => {
          const isActive = false;
          const Icon = isActive ? item.activeIcon : item.icon;

          return (
            <Link href={item.href} key={item.href}>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={isActive}
                  className="gap-2.5 p-2.5 font-medium hover:text-primary transition text-neutral-500"
                >
                  <Icon className="!size-5 text-neutral-500" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export { Navigation };
