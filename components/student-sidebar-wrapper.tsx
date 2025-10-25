"use client";

import { AppSidebarReusable } from "@/components/app-sidebar-reusable";
import { studentSidebarData } from "@/config/sidebar-data";
import type { ComponentProps } from "react";
import type { Sidebar } from "@/components/ui/sidebar";

export function StudentSidebarWrapper(props: ComponentProps<typeof Sidebar>) {
    return <AppSidebarReusable data={studentSidebarData} {...props} />;
}
