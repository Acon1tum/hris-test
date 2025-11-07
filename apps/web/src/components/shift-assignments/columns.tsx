"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { DataTableRowActions } from "./data-table-row-actions"
import { format } from "date-fns"

export type ShiftDetail = {
  id: string
  shiftType: string
  overtimePolicy: string
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  shiftDuration: string
  shiftEnd: boolean
  disabled: boolean
  createdAt: string
  updatedAt: string
}

export type ShiftAssignment = {
  id: string
  name: string
  employeeId: string
  status: string
  totalShifts: number
  avatar: string
  shifts: ShiftDetail[]
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
  onView?: (assignment: ShiftAssignment) => void
  onEdit?: (shift: ShiftDetail, assignment: ShiftAssignment) => void
  onDelete?: (shift: ShiftDetail, assignment: ShiftAssignment) => void
  onDisable?: (shift: ShiftDetail, assignment: ShiftAssignment) => void
}

export const getColumns = (
  callbacks?: ColumnCallbacks,
  expandedRows?: Set<string>,
  onToggleExpand?: (employeeId: string) => void
): ColumnDef<ShiftAssignment>[] => [
  {
    accessorKey: "name",
    header: () => (
      <div className="flex items-center gap-2">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        Employee
      </div>
    ),
    cell: ({ row }) => {
      const assignment = row.original
      const isExpanded = expandedRows?.has(assignment.employeeId)
      const hasShifts = assignment.shifts && assignment.shifts.length > 0

      return (
        <div className="flex items-center gap-3">
          {hasShifts && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={(e) => {
                e.stopPropagation()
                onToggleExpand?.(assignment.employeeId)
              }}
            >
              <ChevronRight
                className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-90" : ""}`}
              />
            </Button>
          )}
          {!hasShifts && <div className="w-6" />}
          <Avatar className="h-10 w-10">
            <AvatarImage src={assignment.avatar} alt={assignment.name} />
            <AvatarFallback>{getInitials(assignment.name)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{assignment.name}</div>
            <div className="text-sm text-muted-foreground">ID: {assignment.employeeId}</div>
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
    accessorKey: "totalShifts",
    header: "Total Shifts",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("totalShifts")}</div>
    },
  },
]

export const getExpandedColumns = (
  callbacks?: ColumnCallbacks
): ColumnDef<ShiftDetail>[] => [
  {
    accessorKey: "shiftType",
    header: "Shift Type",
  },
  {
    accessorKey: "overtimePolicy",
    header: "Overtime Policy",
    cell: ({ row }) => {
      const policy = row.getValue("overtimePolicy") as string
      return <div className="max-w-[200px] truncate">{policy || "—"}</div>
    },
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      const date = row.getValue("startDate") as string
      if (!date) return "—"
      try {
        return format(new Date(date), "MMM dd, yyyy")
      } catch {
        return date
      }
    },
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => {
      const date = row.getValue("endDate") as string
      if (!date) return "—"
      try {
        return format(new Date(date), "MMM dd, yyyy")
      } catch {
        return date
      }
    },
  },
  {
    accessorKey: "startTime",
    header: "Start Time",
    cell: ({ row }) => {
      const time = row.getValue("startTime") as string
      if (!time) return "—"
      // Format time to AM/PM format
      try {
        const [hours, minutes] = time.split(":")
        const hour = parseInt(hours)
        const ampm = hour >= 12 ? "PM" : "AM"
        const displayHour = hour % 12 || 12
        return `${displayHour}:${minutes} ${ampm}`
      } catch {
        return time
      }
    },
  },
  {
    accessorKey: "endTime",
    header: "End Time",
    cell: ({ row }) => {
      const time = row.getValue("endTime") as string
      if (!time) return "—"
      // Format time to AM/PM format
      try {
        const [hours, minutes] = time.split(":")
        const hour = parseInt(hours)
        const ampm = hour >= 12 ? "PM" : "AM"
        const displayHour = hour % 12 || 12
        return `${displayHour}:${minutes} ${ampm}`
      } catch {
        return time
      }
    },
  },
  {
    accessorKey: "shiftDuration",
    header: "Shift Duration",
  },
  {
    accessorKey: "shiftEnd",
    header: "Shift End",
    cell: ({ row }) => {
      const shiftEnd = row.getValue("shiftEnd") as boolean
      return (
        <Badge variant={shiftEnd ? "destructive" : "default"} className={shiftEnd ? "" : "bg-green-500"}>
          {shiftEnd ? "Yes" : "No"}
        </Badge>
      )
    },
  },
  {
    accessorKey: "disabled",
    header: "Disabled",
    cell: ({ row }) => {
      const disabled = row.getValue("disabled") as boolean
      return (
        <Badge variant={disabled ? "destructive" : "default"} className={disabled ? "" : "bg-green-500"}>
          {disabled ? "Yes" : "No"}
        </Badge>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as string
      if (!date) return "—"
      try {
        return format(new Date(date), "MMM dd, yyyy")
      } catch {
        return date
      }
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => {
      const date = row.getValue("updatedAt") as string
      if (!date) return "—"
      try {
        return format(new Date(date), "MMM dd, yyyy")
      } catch {
        return date
      }
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const shift = row.original
      const assignment = (table.options.meta as any)?.assignment
      return (
        <DataTableRowActions
          row={row as any}
          assignment={assignment}
          onView={callbacks?.onView}
          onEdit={callbacks?.onEdit}
          onDelete={callbacks?.onDelete}
          onDisable={callbacks?.onDisable}
        />
      )
    },
  },
]

