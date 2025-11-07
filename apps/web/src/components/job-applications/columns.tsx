"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { DataTableRowActions } from "./data-table-row-actions"

export type Application = {
  id: string
  name: string
  jobTitle: string
  position: string
  email: string
  phone: string
  status: "Selected" | "Pending"
  appliedAt: string
  jobPosting?: { title: string; vacancy: number; jobType: string }
  gender?: string
  dateOfBirth?: string
  skills?: string[]
  academics?: { institute: string; degree: string; major: string; year: string; grade: string }[]
  screening?: { question: string; answer: string }
}

interface ColumnCallbacks {
  onView?: (application: Application) => void
  onEdit?: (application: Application) => void
  onDelete?: (application: Application) => void
}

export const getColumns = (callbacks?: ColumnCallbacks): ColumnDef<Application>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          {row.getValue("name")}
        </div>
      )
    },
  },
  {
    accessorKey: "jobTitle",
    header: "Job Title",
    cell: ({ row }) => {
      return <div>{row.getValue("jobTitle")}</div>
    },
  },
  {
    accessorKey: "position",
    header: "Position",
    cell: ({ row }) => {
      return <div>{row.getValue("position")}</div>
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return <div>{row.getValue("email")}</div>
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      return <div>{row.getValue("phone")}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge className={status === "Selected" ? "bg-emerald-600" : "bg-amber-600"}>
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "appliedAt",
    header: "Applied At",
    cell: ({ row }) => {
      return <div>{row.getValue("appliedAt")}</div>
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

