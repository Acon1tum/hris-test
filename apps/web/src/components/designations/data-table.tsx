"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Maximize2, RefreshCw, SlidersHorizontal } from "lucide-react"
import { DataTableToolbar } from "./data-table-toolbar"
import { Designation, getColumns } from "./columns"

interface DataTableProps {
  data: Designation[]
  search: string
  onSearchChange: (value: string) => void
  onView?: (designation: Designation) => void
  onEdit?: (designation: Designation) => void
  onDelete?: (designation: Designation) => void
  deletingId?: string | null
  isRefreshing?: boolean
  onRefresh?: () => void
}

export function DataTable({
  data,
  search,
  onSearchChange,
  onView,
  onEdit,
  onDelete,
  deletingId,
  isRefreshing,
  onRefresh,
}: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

  const columns = React.useMemo(
    () => getColumns({ onView, onEdit, onDelete, deletingId }),
    [onView, onEdit, onDelete, deletingId]
  )

  // Filter data based on search
  const filteredData = React.useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        !search ||
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.code.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.designationPermissions?.some((dp) =>
          dp.permission.name.toLowerCase().includes(search.toLowerCase()) ||
          dp.permission.module?.name?.toLowerCase().includes(search.toLowerCase())
        )
      return matchesSearch
    })
  }, [data, search])

  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })

  const filteredCount = filteredData.length
  const totalCount = data.length
  const pageSize = table.getState().pagination.pageSize
  const pageIndex = table.getState().pagination.pageIndex
  const displayStart = filteredCount > 0 ? pageIndex * pageSize + 1 : 0
  const displayEnd =
    filteredCount > 0
      ? Math.min(displayStart + pageSize - 1, filteredCount)
      : 0

  return (
    <div className="rounded-xl border bg-card shadow-sm">
      <div className="flex flex-col gap-4 border-b px-6 py-4 md:flex-row md:items-center md:justify-between">
        <div className="w-full md:max-w-sm">
          <DataTableToolbar
            search={search}
            onSearchChange={onSearchChange}
            filteredCount={filteredCount}
            totalCount={totalCount}
            displayStart={displayStart}
            displayEnd={displayEnd}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Toggle compact view"
            title="Toggle compact view"
            className="h-10 w-10"
            disabled
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Refresh designations"
            title="Refresh designations"
            onClick={onRefresh}
            disabled={!onRefresh || isRefreshing}
            className="h-10 w-10"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Filter designations"
            title="Filter options coming soon"
            disabled
            className="h-10 w-10"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table className="min-w-[900px]">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="[&_th]:border-0">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="bg-muted/10 text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="border-b last:border-b-0">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="align-top py-5">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="py-12 text-center text-sm text-muted-foreground"
                >
                  No designations found. Try adjusting your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {table.getRowModel().rows.length > 0 && (
        <div className="flex items-center justify-between border-t px-6 py-4">
          <div className="text-sm text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {Math.max(table.getPageCount(), 1)}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

