"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { DataTableRowActions } from "./data-table-row-actions"

export type IncidentType = {
  id: string
  name: string
  description: string
  enabled: boolean
  createdAt: string
  updatedAt: string
}

export const columns: ColumnDef<IncidentType>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="font-medium text-primary hover:underline cursor-pointer w-[260px]">
          {row.getValue("name")}
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
    accessorKey: "enabled",
    header: "Status",
    cell: ({ row }) => {
      const enabled = row.getValue("enabled") as boolean
      return (
        <div className="text-center w-[110px]">
          <Badge className={enabled ? "bg-emerald-600" : "bg-slate-400"}>
            {enabled ? "Enabled" : "Disabled"}
          </Badge>
        </div>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      return <div className="w-[180px]">{row.getValue("createdAt")}</div>
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => {
      return (
        <div className="text-muted-foreground text-xs w-[160px]">
          {row.getValue("updatedAt")}
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]

