"use client";

import { AppSidebarReusable } from "@/components/app-sidebar-reusable";
import { adminSidebarData } from "@/config/sidebar-data";
import type { ComponentProps } from "react";
import type { Sidebar } from "@/components/ui/sidebar";

export function AdminSidebarWrapper(props: ComponentProps<typeof Sidebar>) {
    return <AppSidebarReusable data={adminSidebarData} {...props} />;
}
