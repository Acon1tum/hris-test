"use client"

import { Row } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { GraceTimeOrganization } from "./columns"

interface DataTableRowActionsProps {
  row: Row<GraceTimeOrganization>
  onSelect?: (org: GraceTimeOrganization) => void
}

export function DataTableRowActions({
  row,
  onSelect,
}: DataTableRowActionsProps) {
  const org = row.original

  return (
    <Button
      onClick={() => onSelect?.(org)}
      size="sm"
    >
      Select
    </Button>
  )
}

