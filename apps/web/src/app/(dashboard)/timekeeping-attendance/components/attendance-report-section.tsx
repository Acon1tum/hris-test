"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"
import { useState } from "react"
import { DataTable } from "@/components/attendance-reports/data-table"
import { type AttendanceReport } from "@/components/attendance-reports/columns"

const employees: AttendanceReport[] = [
  {
    id: "1",
    name: "Amor",
    employeeId: "EMP-00022",
    status: "Active",
    totalAttendances: 6,
    avatar: "/avatars/amor.jpg",
  },
  {
    id: "2",
    name: "Anthony Mary Ray",
    employeeId: "EMP-00005",
    status: "Active",
    totalAttendances: 6,
    avatar: "/avatars/anthony.jpg",
  },
  {
    id: "3",
    name: "Ashton Starc",
    employeeId: "EMP-00034",
    status: "Active",
    totalAttendances: 6,
    avatar: "/avatars/ashton.jpg",
  },
  {
    id: "4",
    name: "Brandon Lewis",
    employeeId: "EMP-00030",
    status: "Active",
    totalAttendances: 6,
    avatar: "/avatars/brandon.jpg",
  },
  {
    id: "5",
    name: "Dan Morris",
    employeeId: "EMP-00037",
    status: "Active",
    totalAttendances: 6,
    avatar: "/avatars/dan.jpg",
  },
  {
    id: "6",
    name: "David Potter",
    employeeId: "EMP-00026",
    status: "Active",
    totalAttendances: 6,
    avatar: "/avatars/davidp.jpg",
  },
  {
    id: "7",
    name: "David Anthony Martinez",
    employeeId: "EMP-00032",
    status: "Active",
    totalAttendances: 6,
    avatar: "/avatars/david.jpg",
  },
  {
    id: "8",
    name: "Francis Foden",
    employeeId: "EMP-00025",
    status: "Active",
    totalAttendances: 6,
    avatar: "/avatars/francis.jpg",
  },
  {
    id: "9",
    name: "Francisco Phillip Church",
    employeeId: "EMP-00015",
    status: "Active",
    totalAttendances: 6,
    avatar: "/avatars/francisco.jpg",
  },
  {
    id: "10",
    name: "Jaehee Kim",
    employeeId: "EMP-00002",
    status: "Active",
    totalAttendances: 6,
    avatar: "/avatars/jaehee.jpg",
  },
]

export function AttendanceReportSection() {
  const [dateRange, setDateRange] = useState("October 28, 2025 - November")
  const [employeeFilter, setEmployeeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <span>Dashboard</span>
              <ChevronRight className="h-4 w-4" />
              <span>Attendance Reports</span>
            </div>
            <CardTitle>Attendance Reports</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          data={employees}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          employeeFilter={employeeFilter}
          onEmployeeFilterChange={setEmployeeFilter}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          employees={employees.map((emp) => ({ id: emp.id, name: emp.name }))}
          onView={(report) => {
            // TODO: Implement view
            console.log("View", report)
          }}
        />
      </CardContent>
    </Card>
  )
}
