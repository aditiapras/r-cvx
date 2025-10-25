"use client";

import type { LucideIcon } from "lucide-react";
import type * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";

export interface SidebarData {
    teams: Array<{
        name: string;
        logo: LucideIcon;
        plan: string;
    }>;
    navMain: Array<{
        title: string;
        url: string;
        icon?: LucideIcon;
        isActive?: boolean;
        items?: Array<{
            title: string;
            url: string;
        }>;
    }>;
    projects: Array<{
        name: string;
        url: string;
        icon: LucideIcon;
    }>;
}

interface AppSidebarReusableProps extends React.ComponentProps<typeof Sidebar> {
    data: SidebarData;
}

export function AppSidebarReusable({
    data,
    ...props
}: AppSidebarReusableProps) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavProjects projects={data.projects} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
