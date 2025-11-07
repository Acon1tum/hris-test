import Link from "next/link"
import * as Icons from "lucide-react"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MODULES } from "@hris/constants"
import data from "@/app/dashboard/data.json"

export default function DashboardPage() {
  // Modules the user requested to show stats for on the dashboard
  const dashboardModules = [
    MODULES.E_PAYROLL,
    MODULES.EMPLOYEE_SELF_SERVICE,
    MODULES.HEALTH_WELLNESS,
    MODULES.JOB_MANAGEMENT,
    MODULES.LEAVE_MANAGEMENT,
    MODULES.ONLINE_JOB_APPLICATION,
    MODULES.PAYROLL_MANAGEMENT,
    MODULES.PERFORMANCE_MANAGEMENT,
    MODULES.PERSONNEL_INFORMATION,
    MODULES.REPORT_GENERATION,
    MODULES.SYSTEM_ADMINISTRATION,
    MODULES.TIMEKEEPING_ATTENDANCE,
  ]

  // Placeholder stats per module (wire up to API later)
  const statsBySlug: Record<string, { value: number; label: string; trend?: string }>= {
    "e-payroll": { value: 0, label: "Payroll Runs" },
    "employee-self-service": { value: 0, label: "Self-Service Actions" },
    "health-wellness": { value: 0, label: "Active Programs" },
    "job-management": { value: 0, label: "Open Jobs" },
    "leave-management": { value: 0, label: "Pending Leaves" },
    "online-job-application-portal": { value: 0, label: "New Applicants" },
    "payroll-management": { value: 0, label: "Configs Updated" },
    "performance-management": { value: 0, label: "Reviews Due" },
    "personnel-information-management": { value: 0, label: "Employees" },
    "report-generation": { value: 0, label: "Reports Generated" },
    "system-administration": { value: 0, label: "Admin Tasks" },
    "timekeeping-attendance": { value: 0, label: "Attendance Events" },
  }

  return (
    <>
      <SiteHeader />
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        {/* Module Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 px-4 lg:px-6">
          {dashboardModules
            .sort((a, b) => a.order - b.order)
            .map((mod) => {
              const Icon = (Icons as any)[mod.icon] || Icons.Box
              const stat = statsBySlug[mod.slug] || { value: 0, label: "Items" }
              return (
                <Card
                  key={mod.slug}
                  className="@container/card group relative overflow-hidden transition-shadow hover:shadow-md"
                  style={{
                    borderColor: mod.color,
                  }}
                >
                  {/* Accent bar */}
                  <span
                    className="absolute inset-x-0 top-0 h-1"
                    style={{ background: mod.color }}
                  />

                  <CardHeader className="relative">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <CardDescription className="text-xs text-muted-foreground">
                          {mod.name}
                        </CardDescription>
                        <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                          {stat.value}
                        </CardTitle>
                        <div className="mt-1 text-xs text-muted-foreground line-clamp-1">
                          {mod.description}
                        </div>
                      </div>
                      <div
                        className="rounded-md border text-muted-foreground grid h-9 w-9 place-items-center shrink-0"
                        style={{ borderColor: `${mod.color}33`, color: mod.color }}
                        aria-hidden
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="absolute right-4 top-4">
                      <Badge
                        variant="outline"
                        className="rounded-lg text-xs"
                        style={{ borderColor: `${mod.color}55`, color: mod.color }}
                      >
                        {stat.label}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardFooter className="pt-0">
                    <Link
                      href={`/${mod.slug}`}
                      className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                      aria-label={`Open ${mod.name}`}
                    >
                      Open {mod.name}
                      <Icons.ChevronRight className="h-4 w-4" />
                    </Link>
                  </CardFooter>
                </Card>
              )
            })}
        </div>
        <div className="px-4 lg:px-6">
          <ChartAreaInteractive />
        </div>
        <DataTable data={data} />
      </div>
    </>
  )
}

