"use client"

import { Row } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { AttendanceReport } from "./columns"

interface DataTableRowActionsProps {
  row: Row<AttendanceReport>
  onView?: (report: AttendanceReport) => void
}

export function DataTableRowActions({
  row,
  onView,
}: DataTableRowActionsProps) {
  const report = row.original

  return (
    <Link href={`/personnel-information-management/${report.id}`}>
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <ChevronRight className="h-4 w-4" />
      </Button>
    </Link>
  )
}

