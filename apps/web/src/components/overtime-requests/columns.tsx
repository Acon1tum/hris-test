"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { DataTableRowActions } from "./data-table-row-actions"
import { format } from "date-fns"
import Link from "next/link"

export type OvertimeRequest = {
  id: string
  employeeName: string
  employeeId: string
  department: string
  overtimePolicy: string
  overtimeType: string
  status: string
  reason: string
  workDescription: string
  startTime: Date
  endTime: Date
  overtimeDate: Date
  requestDate: Date
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Approved":
      return <Badge variant="default" className="bg-green-500">Approved</Badge>
    case "Pending":
      return <Badge variant="secondary" className="bg-orange-500">Pending</Badge>
    case "Rejected":
      return <Badge variant="destructive">Rejected</Badge>
    case "Draft":
      return <Badge variant="outline" className="bg-gray-500">Draft</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

interface ColumnCallbacks {
  onView?: (request: OvertimeRequest) => void
  onEdit?: (request: OvertimeRequest) => void
  onDelete?: (request: OvertimeRequest) => void
}

export const getColumns = (callbacks?: ColumnCallbacks): ColumnDef<OvertimeRequest>[] => [
  {
    accessorKey: "employeeName",
    header: "Employee Name",
    cell: ({ row }) => {
      const request = row.original
      return (
        <Link href={`/personnel-information-management/${request.employeeId}`} className="text-primary hover:underline">
          {request.employeeName}
        </Link>
      )
    },
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "overtimePolicy",
    header: "Overtime Policy",
  },
  {
    accessorKey: "overtimeType",
    header: "Overtime Type",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return getStatusBadge(status)
    },
  },
  {
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) => {
      const reason = row.getValue("reason") as string
      return <div className="max-w-[200px] truncate">{reason}</div>
    },
  },
  {
    accessorKey: "workDescription",
    header: "Work Description",
    cell: ({ row }) => {
      const description = row.getValue("workDescription") as string
      return <div className="max-w-[200px] truncate">{description}</div>
    },
  },
  {
    accessorKey: "startTime",
    header: "Start Time",
    cell: ({ row }) => {
      const date = row.getValue("startTime") as Date
      return format(date, "MMMM dd, yyyy")
    },
  },
  {
    accessorKey: "endTime",
    header: "End Time",
    cell: ({ row }) => {
      const date = row.getValue("endTime") as Date
      return format(date, "MMMM dd, yyyy")
    },
  },
  {
    accessorKey: "overtimeDate",
    header: "Overtime Date",
    cell: ({ row }) => {
      const date = row.getValue("overtimeDate") as Date
      return format(date, "MMMM dd, yyyy")
    },
  },
  {
    accessorKey: "requestDate",
    header: "Request Date",
    cell: ({ row }) => {
      const date = row.getValue("requestDate") as Date
      return format(date, "MMMM dd, yyyy")
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        onView={callbacks?.onView}
        onEdit={callbacks?.onEdit}
        onDelete={callbacks?.onDelete}
      />
    ),
  },
]

