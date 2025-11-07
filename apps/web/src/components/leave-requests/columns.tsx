"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { format } from "date-fns"
import { ChevronRight } from "lucide-react"
import { DataTableRowActions } from "./data-table-row-actions"

export type LeaveRequest = {
  id: string
  employeeName: string
  employeeId: string
  leaveType: string
  status: "Approved" | "Pending" | "Rejected"
  totalDays: number
  department: string
  startDate: Date
  endDate: Date
  createdAt: Date
  updatedAt: string
}

interface ColumnCallbacks {
  onView?: (request: LeaveRequest) => void
  onEdit?: (request: LeaveRequest) => void
  onApprove?: (request: LeaveRequest) => void
  onReject?: (request: LeaveRequest) => void
  onDelete?: (request: LeaveRequest) => void
}

export const getColumns = (callbacks?: ColumnCallbacks): ColumnDef<LeaveRequest>[] => [
  {
    id: "expand",
    header: () => null,
    cell: () => {
      return <ChevronRight className="h-4 w-4 text-muted-foreground" />
    },
  },
  {
    accessorKey: "employeeName",
    header: "Employee Name",
    cell: ({ row }) => {
      const employeeId = row.original.employeeId
      const employeeName = row.getValue("employeeName") as string
      return (
        <Link
          href={`/personnel-information-management/${employeeId}`}
          className="font-medium text-blue-600 hover:underline"
        >
          {employeeName}
        </Link>
      )
    },
  },
  {
    accessorKey: "leaveType",
    header: "Leave Type",
    cell: ({ row }) => {
      return <div>{row.getValue("leaveType")}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
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
    accessorKey: "totalDays",
    header: "Total Days",
    cell: ({ row }) => {
      return <div>{row.getValue("totalDays")}</div>
    },
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => {
      return <div>{row.getValue("department")}</div>
    },
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      const date = row.getValue("startDate") as Date
      return <div>{format(date, "MMMM dd, yyyy")}</div>
    },
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => {
      const date = row.getValue("endDate") as Date
      return <div>{format(date, "MMMM dd, yyyy")}</div>
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date
      return <div>{format(date, "MMMM dd, yyyy")}</div>
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => {
      return <div>{row.getValue("updatedAt")}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        onView={callbacks?.onView}
        onEdit={callbacks?.onEdit}
        onApprove={callbacks?.onApprove}
        onReject={callbacks?.onReject}
        onDelete={callbacks?.onDelete}
      />
    ),
  },
]

