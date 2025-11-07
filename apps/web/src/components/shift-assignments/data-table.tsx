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
import { ShiftAssignment, ShiftDetail, getColumns, getExpandedColumns } from "./columns"

interface DataTableProps {
  data: ShiftAssignment[]
  search: string
  onSearchChange: (value: string) => void
  startDate: string
  onStartDateChange: (value: string) => void
  endDate: string
  onEndDateChange: (value: string) => void
  shiftTypeFilter: string
  onShiftTypeFilterChange: (value: string) => void
  shiftTypes: Array<{ id: string; name: string }>
  onView?: (assignment: ShiftAssignment) => void
  onEdit?: (shift: ShiftDetail, assignment: ShiftAssignment) => void
  onDelete?: (shift: ShiftDetail, assignment: ShiftAssignment) => void
  onDisable?: (shift: ShiftDetail, assignment: ShiftAssignment) => void
}

export function DataTable({
  data,
  search,
  onSearchChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
  shiftTypeFilter,
  onShiftTypeFilterChange,
  shiftTypes,
  onView,
  onEdit,
  onDelete,
  onDisable,
}: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [expandedRows, setExpandedRows] = React.useState<Set<string>>(new Set())

  const toggleExpand = React.useCallback((employeeId: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev)
      if (next.has(employeeId)) {
        next.delete(employeeId)
      } else {
        next.add(employeeId)
      }
      return next
    })
  }, [])

  const columns = React.useMemo(
    () => getColumns({ onView, onEdit, onDelete, onDisable }, expandedRows, toggleExpand),
    [onView, onEdit, onDelete, onDisable, expandedRows, toggleExpand]
  )

  const expandedColumns = React.useMemo(
    () => getExpandedColumns({ onView, onEdit, onDelete, onDisable }),
    [onView, onEdit, onDelete, onDisable]
  )

  // Filter data based on search
  const filteredData = React.useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        !search ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.employeeId.toLowerCase().includes(search.toLowerCase())
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
    meta: {
      assignment: undefined,
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })

  return (
    <div className="space-y-4">
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
        search={search}
        onSearchChange={onSearchChange}
        startDate={startDate}
        onStartDateChange={onStartDateChange}
        endDate={endDate}
        onEndDateChange={onEndDateChange}
        shiftTypeFilter={shiftTypeFilter}
        onShiftTypeFilterChange={onShiftTypeFilterChange}
        shiftTypes={shiftTypes}
      />

      {table.getRowModel().rows.length > 0 && (
        <p className="text-sm text-muted-foreground">
          Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-{Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, filteredData.length)} of {filteredData.length}
        </p>
      )}

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
              <>
                {table.getRowModel().rows.map((row) => {
                  const assignment = row.original
                  const employeeId = assignment.employeeId
                  const isExpanded = expandedRows.has(employeeId)
                  const shifts = assignment.shifts || []

                  return (
                    <React.Fragment key={row.id}>
                      <TableRow
                        data-state={row.getIsSelected() && "selected"}
                        className={shifts.length > 0 ? "cursor-pointer" : ""}
                        onClick={() => shifts.length > 0 && toggleExpand(employeeId)}
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
                      {isExpanded && shifts.length > 0 && (
                        <TableRow>
                          <TableCell colSpan={columns.length} className="p-0">
                            <div className="border-t">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    {expandedColumns.map((column, index) => {
                                      const headerKey = column.id || ('accessorKey' in column ? (column.accessorKey as string) : `col-${index}`);
                                      let headerContent: React.ReactNode;
                                      
                                      if (typeof column.header === "string") {
                                        headerContent = column.header;
                                      } else if (typeof column.header === "function") {
                                        // For function headers, we can't provide full context in expanded view
                                        // So we'll try to extract a meaningful label or use a fallback
                                        headerContent = headerKey;
                                      } else {
                                        headerContent = headerKey;
                                      }
                                      
                                      return (
                                        <TableHead key={headerKey}>
                                          {headerContent}
                                        </TableHead>
                                      );
                                    })}
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {shifts.map((shift) => {
                                    // Update table meta with current assignment
                                    table.options.meta = { assignment }
                                    const expandedRow = {
                                      original: shift,
                                      getValue: (key: string) => shift[key as keyof ShiftDetail],
                                    }
                                    return (
                                      <TableRow key={shift.id}>
                                        {expandedColumns.map((column) => {
                                          const accessorKey = 'accessorKey' in column ? (column.accessorKey as string) : column.id || '';
                                          const cellContext = {
                                            row: expandedRow,
                                            column: { id: column.id || accessorKey },
                                            getValue: () => accessorKey ? shift[accessorKey as keyof ShiftDetail] : undefined,
                                            table,
                                          }
                                          return (
                                            <TableCell key={column.id || accessorKey}>
                                              {column.cell
                                                ? flexRender(column.cell, cellContext as any)
                                                : accessorKey ? String(shift[accessorKey as keyof ShiftDetail] || "") : ""}
                                            </TableCell>
                                          )
                                        })}
                                      </TableRow>
                                    )
                                  })}
                                </TableBody>
                              </Table>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  )
                })}
              </>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center text-muted-foreground py-8"
                >
                  No employees found.
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
              size="icon"
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
            {table.getPageCount() > 4 && <span className="text-sm text-muted-foreground">...</span>}
            <Button
              variant="outline"
              size="icon"
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

