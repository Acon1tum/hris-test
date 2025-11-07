"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { DataTableRowActions } from "./data-table-row-actions"

export type JobPost = {
  id: string
  title: string
  position: string
  vacancies: number
  employmentType: "Full-time" | "Part-time" | "Contract"
  status: "Published" | "Draft"
  applicationDeadline: string
  office: string
  publishedAt: string
}

interface ColumnCallbacks {
  onView?: (post: JobPost) => void
  onEdit?: (post: JobPost) => void
  onDelete?: (post: JobPost) => void
}

export const getColumns = (callbacks?: ColumnCallbacks): ColumnDef<JobPost>[] => [
  {
    accessorKey: "title",
    header: "Job Title",
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          {row.getValue("title")}
        </div>
      )
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
    accessorKey: "vacancies",
    header: "Vacancies",
    cell: ({ row }) => {
      return <div>{row.getValue("vacancies")}</div>
    },
  },
  {
    accessorKey: "employmentType",
    header: "Employment Type",
    cell: ({ row }) => {
      return <div>{row.getValue("employmentType")}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge className={status === "Published" ? "bg-emerald-600" : "bg-slate-400"}>
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "applicationDeadline",
    header: "Application Deadline",
    cell: ({ row }) => {
      return <div>{row.getValue("applicationDeadline")}</div>
    },
  },
  {
    accessorKey: "office",
    header: "Office",
    cell: ({ row }) => {
      return <div>{row.getValue("office")}</div>
    },
  },
  {
    accessorKey: "publishedAt",
    header: "Published At",
    cell: ({ row }) => {
      return <div>{row.getValue("publishedAt")}</div>
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

