"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { DataTableRowActions } from "./data-table-row-actions"

export type Incident = {
  id: string
  title: string
  description: string
  personInvolved: string
  reportsTo: string
  type: string
  status: "New" | "In Progress" | "Resolved"
  date: string
  createdAt: string
  updatedAt: string
}

interface ColumnCallbacks {
  onView?: (incident: Incident) => void
  onEdit?: (incident: Incident) => void
  onInvestigation?: (incident: Incident) => void
  onDelete?: (incident: Incident) => void
}

export const getColumns = (callbacks?: ColumnCallbacks): ColumnDef<Incident>[] => [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row, table }) => {
      const onView = (table.options.meta as any)?.onView
      return (
        <div
          className="font-medium text-primary hover:underline cursor-pointer"
          onClick={() => onView?.(row.original)}
        >
          {row.getValue("title")}
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
    accessorKey: "personInvolved",
    header: "Person Involved",
    cell: ({ row }) => {
      return <div>{row.getValue("personInvolved")}</div>
    },
  },
  {
    accessorKey: "reportsTo",
    header: "Reports To",
    cell: ({ row }) => {
      return <div>{row.getValue("reportsTo")}</div>
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      return <div>{row.getValue("type")}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge className="bg-slate-600">{status}</Badge>
      )
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      return <div>{row.getValue("date")}</div>
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
        onInvestigation={callbacks?.onInvestigation}
        onDelete={callbacks?.onDelete}
      />
    ),
  },
]

