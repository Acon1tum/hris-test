"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  LayoutDashboardIcon,
  HelpCircleIcon,
  SearchIcon,
} from "lucide-react"
import * as Icons from "lucide-react"

import { MODULES } from "@hris/constants"
import { useAuthStore } from "@/stores/auth-store"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, hasModuleAccess } = useAuthStore();
  const pathname = usePathname();

  // Check if user has any modules assigned, or if they're a super admin
  const hasModules = user?.modules && user.modules.length > 0;
  const isSuperAdmin = user?.roles?.includes('Super Admin') ?? false;
  
  // Get accessible modules, sorted by order
  // If user is super admin or has no modules assigned (for development), show all modules
  const accessibleModules = Object.values(MODULES)
    .filter((module) => {
      if (isSuperAdmin) return true;
      if (!hasModules) return true; // Show all modules if none assigned (development mode)
      return hasModuleAccess(module.slug);
    })
    .sort((a, b) => a.order - b.order)
    .map((module) => {
      const Icon = (Icons as any)[module.icon] || Icons.Box;
      
      // Special handling for System Administration - create dropdown menu
      if (module.slug === 'system-administration') {
        return {
          title: module.name,
          url: `/${module.slug}`,
          icon: Icon,
          items: [
            { title: "Offices", url: "/system-administration/offices" },
            { title: "Departments", url: "/system-administration/departments" },
            { title: "Designations", url: "/system-administration/designations" },
            { title: "Organization Settings", url: "/system-administration/organization" },
            { title: "Holidays", url: "/system-administration/holidays" },
            { title: "Employment Types", url: "/system-administration/employment-types" },
            { title: "Employee Grades", url: "/system-administration/grades" },
            { title: "Leave Types", url: "/system-administration/leave-types" },
            { title: "Leave Policy", url: "/system-administration/leave-policies" },
            { title: "Shift Types", url: "/system-administration/shifts" },
            { title: "Grace Time Config", url: "/system-administration/grace-time" },
            { title: "Overtime Policies", url: "/system-administration/overtime" },
            { title: "Payroll Expense Accounts", url: "/system-administration/expense-accounts" },
            { title: "Employer Taxable Components", url: "/system-administration/employer-taxable-components" },
            { title: "Payroll Configuration", url: "/system-administration/payroll-config" },
          ],
        };
      }

      // Special handling for Timekeeping & Attendance - create dropdown menu
      if (module.slug === 'timekeeping-attendance') {
        return {
          title: module.name,
          url: `/${module.slug}`,
          icon: Icon,
          items: [
            { title: "Shift Assignment", url: "/timekeeping-attendance/shift-assignment" },
            { title: "Attendances", url: "/timekeeping-attendance/attendances" },
            { title: "Attendance Report", url: "/timekeeping-attendance/attendance-report" },
            { title: "Shift Management", url: "/timekeeping-attendance/shift-management" },
            { title: "Overtime Request", url: "/timekeeping-attendance/overtime-request" },
          ],
        };
      }

      // Special handling for Payroll Management - create dropdown menu
      if (module.slug === 'payroll-management') {
        return {
          title: module.name,
          url: `/${module.slug}`,
          icon: Icon,
          items: [
            { title: "Remuneration", url: "/payroll-management/remuneration" },
            { title: "Payroll Entries", url: "/payroll-management/payroll-entries" },
            { title: "Salary Slips", url: "/payroll-management/salary-slips" },
            { title: "Additional Salaries", url: "/payroll-management/additional-salaries" },
            { title: "Bonus Pay", url: "/payroll-management/bonus-pay" },
            { title: "Incentive Pay", url: "/payroll-management/incentive-pay" },
            { title: "Back Pay", url: "/payroll-management/back-pay" },
            { title: "Advance Loan", url: "/payroll-management/advance-loan" },
          ],
        };
      }

      // Special handling for Health & Wellness - create dropdown menu
      if (module.slug === 'health-wellness') {
        return {
          title: module.name,
          url: `/${module.slug}`,
          icon: Icon,
          items: [
            { title: "Incident Types", url: "/health-wellness/incident-types" },
            { title: "Incidents", url: "/health-wellness/incidents" },
            { title: "Activities", url: "/health-wellness/activities" },
          ],
        };
      }
      
      // Special handling for Job Management - create dropdown menu
      if (module.slug === 'job-management') {
        return {
          title: module.name,
          url: `/${module.slug}`,
          icon: Icon,
          items: [
            { title: "Job Posts", url: "/job-management/job-posts" },
            { title: "Job Applications", url: "/job-management/job-applications" },
            { title: "All Vacancies", url: "/job-management/all-vacancies" },
            { title: "Latest Vacancies", url: "/job-management/latest-vacancies" },
          ],
        };
      }

      return {
        title: module.name,
        url: `/${module.slug}`,
        icon: Icon,
      };
    });

  // Main navigation items - Dashboard first, then all modules
  const navMain = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    ...accessibleModules,
  ];

  // Secondary navigation - Utility items only (no modules here as they're in main nav)
  const navSecondary = [
    {
      title: "Get Help",
      url: "#",
      icon: HelpCircleIcon,
    },
    {
      title: "Search",
      url: "#",
      icon: SearchIcon,
    },
  ];

  const userData = user
    ? {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        avatar: `/avatars/${user.email.split('@')[0]}.jpg`,
      }
    : {
        name: "Guest",
        email: "guest@example.com",
        avatar: "/avatars/default.jpg",
      };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/dashboard" className="flex items-center gap-2">
                <Image
                  src="/qb-logo-2.png"
                  alt="Quanby HRIS"
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                />
                <span className="text-base font-semibold">Quanby HRIS</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  )
}
