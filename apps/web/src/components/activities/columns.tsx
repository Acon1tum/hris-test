"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { DataTableRowActions } from "./data-table-row-actions"

export type Activity = {
  id: string
  activityName: string
  description: string
  responsiblePerson: string
  roles: string
  frequency: string
  status: "Active" | "Inactive"
  reminders: boolean
  emailStatus: "Enabled" | "Disabled"
  startDate: string
  createdAt: string
  updatedAt: string
}

interface ColumnCallbacks {
  onView?: (activity: Activity) => void
  onEdit?: (activity: Activity) => void
  onDelete?: (activity: Activity) => void
}

export const getColumns = (callbacks?: ColumnCallbacks): ColumnDef<Activity>[] => [
  {
    accessorKey: "activityName",
    header: "Activity Name",
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          {row.getValue("activityName")}
        </div>
      )
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return <div className="text-muted-foreground">{row.getValue("description")}</div>
    },
  },
  {
    accessorKey: "responsiblePerson",
    header: "Responsible Person",
    cell: ({ row }) => {
      return <div>{row.getValue("responsiblePerson")}</div>
    },
  },
  {
    accessorKey: "roles",
    header: "Roles",
    cell: ({ row }) => {
      return <div>{row.getValue("roles")}</div>
    },
  },
  {
    accessorKey: "frequency",
    header: "Frequency",
    cell: ({ row }) => {
      return <div>{row.getValue("frequency")}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge className={status === "Active" ? "bg-emerald-600" : "bg-slate-400"}>
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "reminders",
    header: "Reminders",
    cell: ({ row }) => {
      const reminders = row.getValue("reminders") as boolean
      return <div>{reminders ? "Yes" : "No"}</div>
    },
  },
  {
    accessorKey: "emailStatus",
    header: "Email Status",
    cell: ({ row }) => {
      return <div>{row.getValue("emailStatus")}</div>
    },
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      return <div>{row.getValue("startDate")}</div>
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      return <div>{row.getValue("createdAt")}</div>
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => {
      return (
        <div className="text-muted-foreground text-xs">
          {row.getValue("updatedAt")}
        </div>
      )
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

