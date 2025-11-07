"use client"

import { Row } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { IncidentType } from "./columns"

interface DataTableRowActionsProps {
  row: Row<IncidentType>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const incidentType = row.original

  return (
    <div className="text-right w-[50px]">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => console.log("View", incidentType.id)}>
            View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log("Edit", incidentType.id)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log("Archive", incidentType.id)}>
            Archive
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

