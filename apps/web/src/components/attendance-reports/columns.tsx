"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronRight as ChevronRightIcon } from "lucide-react"
import Link from "next/link"
import { DataTableRowActions } from "./data-table-row-actions"

export type AttendanceReport = {
  id: string
  name: string
  employeeId: string
  status: string
  totalAttendances: number
  avatar: string
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

interface ColumnCallbacks {
  onView?: (report: AttendanceReport) => void
}

export const getColumns = (callbacks?: ColumnCallbacks): ColumnDef<AttendanceReport>[] => [
  {
    accessorKey: "name",
    header: "Employee",
    cell: ({ row }) => {
      const report = row.original
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={report.avatar} alt={report.name} />
            <AvatarFallback>{getInitials(report.name)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{report.name}</div>
            <div className="text-sm text-muted-foreground">ID: {report.employeeId}</div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Employee Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant="default" className="bg-green-500">
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "totalAttendances",
    header: "Total Attendances",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("totalAttendances")}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        onView={callbacks?.onView}
      />
    ),
  },
]

