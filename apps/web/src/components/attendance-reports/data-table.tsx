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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Maximize2, RefreshCw, Filter } from "lucide-react"
import { DataTableToolbar } from "./data-table-toolbar"
import { AttendanceReport, getColumns } from "./columns"

interface DataTableProps {
  data: AttendanceReport[]
  dateRange: string
  onDateRangeChange: (value: string) => void
  employeeFilter: string
  onEmployeeFilterChange: (value: string) => void
  statusFilter: string
  onStatusFilterChange: (value: string) => void
  employees: Array<{ id: string; name: string }>
  onView?: (report: AttendanceReport) => void
}

export function DataTable({
  data,
  dateRange,
  onDateRangeChange,
  employeeFilter,
  onEmployeeFilterChange,
  statusFilter,
  onStatusFilterChange,
  employees,
  onView,
}: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

  const columns = React.useMemo(
    () => getColumns({ onView }),
    [onView]
  )

  // Filter data based on filters
  const filteredData = React.useMemo(() => {
    return data.filter((item) => {
      const matchesEmployee = employeeFilter === "all" || item.id === employeeFilter
      const matchesStatus = statusFilter === "all" || item.status.toLowerCase() === statusFilter.toLowerCase()
      return matchesEmployee && matchesStatus
    })
  }, [data, employeeFilter, statusFilter])

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

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="relative overflow-hidden rounded-lg border">
          <div className="absolute left-0 top-0 h-full w-1 bg-purple-500" />
          <div className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Present Count</div>
            <div className="text-2xl font-bold">0</div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg border">
          <div className="absolute left-0 top-0 h-full w-1 bg-orange-500" />
          <div className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Absent Count</div>
            <div className="text-2xl font-bold">216</div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg border">
          <div className="absolute left-0 top-0 h-full w-1 bg-green-500" />
          <div className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Late Count</div>
            <div className="text-2xl font-bold">0</div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg border">
          <div className="absolute left-0 top-0 h-full w-1 bg-blue-500" />
          <div className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Leave Count</div>
            <div className="text-2xl font-bold">0</div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg border">
          <div className="absolute left-0 top-0 h-full w-1 bg-red-500" />
          <div className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Total Overtime</div>
            <div className="text-2xl font-bold">0m</div>
          </div>
        </div>
      </div>

      {/* Filters and Table Controls */}
      <div className="flex items-center justify-end gap-2">
        <Button variant="ghost" size="icon">
          <Maximize2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <RefreshCw className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <DataTableToolbar
        table={table}
        dateRange={dateRange}
        onDateRangeChange={onDateRangeChange}
        employeeFilter={employeeFilter}
        onEmployeeFilterChange={onEmployeeFilterChange}
        statusFilter={statusFilter}
        onStatusFilterChange={onStatusFilterChange}
        employees={employees}
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center text-muted-foreground py-8"
                >
                  No records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {table.getRowModel().rows.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Rows per page:</span>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value))
              }}
            >
              <SelectTrigger className="w-[70px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
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
            {Array.from(
              { length: Math.min(table.getPageCount(), 4) },
              (_, i) => {
                const totalPages = table.getPageCount()
                const currentPage = table.getState().pagination.pageIndex + 1
                let pageNum
                if (totalPages <= 4) {
                  pageNum = i + 1
                } else if (currentPage <= 2) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 1) {
                  pageNum = totalPages - 3 + i
                } else {
                  pageNum = currentPage - 1 + i
                }
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => table.setPageIndex(pageNum - 1)}
                  >
                    {pageNum}
                  </Button>
                )
              }
            )}
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

