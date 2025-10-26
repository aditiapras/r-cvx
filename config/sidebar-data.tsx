"use client";

import {
    BarChart3,
    BookOpen,
    FileText,
    GalleryVerticalEnd,
    GraduationCap,
    Home,
    Info,
    Settings,
    Users,
} from "lucide-react";
import type { SidebarData } from "@/components/app-sidebar-reusable";

// Admin sidebar configuration
export const adminSidebarData: SidebarData = {
    teams: [
        {
            name: "Admin Portal",
            logo: GalleryVerticalEnd,
            plan: "Administrator",
        },
    ],
    navMain: [
        {
            title: "Dashboard",
            url: "/portal",
            icon: BarChart3,
            isActive: true,
            items: [
                {
                    title: "Overview",
                    url: "/portal",
                },
                {
                    title: "Analytics",
                    url: "/portal/analytics",
                },
            ],
        },
        {
            title: "Kelola Informasi",
            url: "/portal/informasi",
            icon: Users,
            isActive: true,
            items: [
                {
                    title: "Blog & Artikel",
                    url: "/portal/artikel",
                },
                {
                    title: "Kegiatan",
                    url: "/portal/kegiatan",
                },
                {
                    title: "Galeri",
                    url: "/portal/galeri",
                },
            ],
        },
        {
            title: "Kelola Pendaftaran",
            url: "/portal/pendaftaran",
            icon: FileText,
            isActive: true,
            items: [
                {
                    title: "Pendaftaran",
                    url: "/portal/pendaftaran",
                },
                {
                    title: "Data Peserta",
                    url: "/portal/peserta",
                },
            ],
        },
        {
            title: "Settings",
            url: "/portal/settings",
            icon: Settings,
            isActive: true,
            items: [
                {
                    title: "Halaman",
                    url: "/portal/settings/halaman",
                },
                {
                    title: "Pengguna",
                    url: "/portal/settings/pengguna",
                },
            ],
        },
    ],
    projects: [],
};

// Student sidebar configuration
export const studentSidebarData: SidebarData = {
    teams: [
        {
            name: "Student Portal",
            logo: GalleryVerticalEnd,
            plan: "Student",
        },
    ],
    navMain: [
        {
            title: "Dashboard",
            url: "/admission",
            icon: Home,
            isActive: true,
            items: [
                {
                    title: "Overview",
                    url: "/admissions",
                },
            ],
        },
        {
            title: "Pendaftaran",
            url: "/admission/pendaftaran",
            icon: BookOpen,
            isActive: true,
            items: [
                {
                    title: "Pendaftaran",
                    url: "/admission/pendaftaran",
                },
                {
                    title: "Status Pendaftaran",
                    url: "/admission/pendaftar/status",
                },
            ],
        },
        {
            title: "Informasi",
            url: "/admission/informasi",
            icon: Info,
            isActive: true,
            items: [
                {
                    title: "Umum",
                    url: "/admission/informasi",
                },
                {
                    title: "Kelulusan",
                    url: "/admission/informasi/kelulusan",
                },
            ],
        },
    ],
    projects: [
        {
            name: "Persyaratan",
            url: "/admission/persyaratan",
            icon: GraduationCap,
        },
    ],
};
