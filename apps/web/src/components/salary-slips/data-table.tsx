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
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DataTableToolbar } from "./data-table-toolbar"
import { SalarySlip, getColumns, getExpandedColumns } from "./columns"
import Link from "next/link"

interface DataTableProps {
  data: SalarySlip[]
  search: string
  onSearchChange: (value: string) => void
  dateRangeFilter: string
  onDateRangeFilterChange: (value: string) => void
  emailStatusFilter: string
  onEmailStatusFilterChange: (value: string) => void
  onView?: (slip: SalarySlip) => void
  onEdit?: (slip: SalarySlip) => void
  onDelete?: (slip: SalarySlip) => void
  onSendEmail?: (slip: SalarySlip) => void
  onMarkAsPaid?: (slip: SalarySlip) => void
  onViewAll?: (employeeId: string) => void
}

export function DataTable({
  data,
  search,
  onSearchChange,
  dateRangeFilter,
  onDateRangeFilterChange,
  emailStatusFilter,
  onEmailStatusFilterChange,
  onView,
  onEdit,
  onDelete,
  onSendEmail,
  onMarkAsPaid,
  onViewAll,
}: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [expandedRows, setExpandedRows] = React.useState<Set<string>>(new Set())

  // Group data by employee
  const groupedData = React.useMemo(() => {
    const grouped = new Map<string, SalarySlip[]>()
    data.forEach((slip) => {
      if (!grouped.has(slip.employeeId)) {
        grouped.set(slip.employeeId, [])
      }
      grouped.get(slip.employeeId)!.push(slip)
    })
    return grouped
  }, [data])

  // Create employee summary rows
  const employeeRows = React.useMemo(() => {
    return Array.from(groupedData.entries()).map(([employeeId, slips]) => {
      const firstSlip = slips[0]
      return {
        ...firstSlip,
        totalPayroll: slips.length,
      }
    })
  }, [groupedData])

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
    () => getColumns({ onView, onEdit, onDelete, onSendEmail, onMarkAsPaid, onViewAll }, expandedRows, toggleExpand),
    [onView, onEdit, onDelete, onSendEmail, onMarkAsPaid, onViewAll, expandedRows, toggleExpand]
  )

  const expandedColumns = React.useMemo(
    () => getExpandedColumns({ onView, onEdit, onDelete, onSendEmail, onMarkAsPaid }),
    [onView, onEdit, onDelete, onSendEmail, onMarkAsPaid]
  )

  // Filter data based on search and filters
  const filteredData = React.useMemo(() => {
    return employeeRows.filter((item) => {
      // Search filter
      const matchesSearch =
        !search ||
        item.employeeName.toLowerCase().includes(search.toLowerCase()) ||
        item.employeeId.toLowerCase().includes(search.toLowerCase())

      // Date range filter (simple string comparison for now)
      const matchesDateRange =
        !dateRangeFilter ||
        dateRangeFilter === "all" ||
        item.startDate.includes(dateRangeFilter) ||
        item.endDate.includes(dateRangeFilter)

      // Email status filter
      const matchesEmailStatus =
        !emailStatusFilter ||
        emailStatusFilter === "all" ||
        item.emailStatus.toLowerCase() === emailStatusFilter.toLowerCase()

      return matchesSearch && matchesDateRange && matchesEmailStatus
    })
  }, [employeeRows, search, dateRangeFilter, emailStatusFilter])

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
    <div className="space-y-4">
      <DataTableToolbar
        table={table}
        search={search}
        onSearchChange={onSearchChange}
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
              <>
                {table.getRowModel().rows.map((row) => {
                  const employeeId = row.original.employeeId
                  const isExpanded = expandedRows.has(employeeId)
                  const employeeSlips = groupedData.get(employeeId) || []

                  return (
                    <React.Fragment key={row.id}>
                      <TableRow
                        data-state={row.getIsSelected() && "selected"}
                        className="cursor-pointer"
                        onClick={() => toggleExpand(employeeId)}
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
                      {isExpanded && employeeSlips.length > 0 && (
                        <>
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
                                    {employeeSlips.map((slip) => {
                                      const expandedRow = { original: slip, getValue: (key: string) => slip[key as keyof SalarySlip] }
                                      return (
                                        <TableRow key={slip.id}>
                                          {expandedColumns.map((column) => {
                                            const accessorKey = 'accessorKey' in column ? (column.accessorKey as string) : column.id || '';
                                            const cellContext = {
                                              row: expandedRow,
                                              column: { id: column.id || accessorKey },
                                              getValue: () => accessorKey ? slip[accessorKey as keyof SalarySlip] : undefined,
                                            }
                                            return (
                                              <TableCell key={column.id || accessorKey}>
                                                {column.cell
                                                  ? flexRender(column.cell, cellContext as any)
                                                  : accessorKey ? String(slip[accessorKey as keyof SalarySlip] || "") : ""}
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
                          {employeeSlips.length > 1 && (
                            <TableRow>
                              <TableCell colSpan={columns.length} className="text-center">
                                <Button
                                  variant="link"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    onViewAll?.(employeeId)
                                  }}
                                >
                                  View All
                                </Button>
                              </TableCell>
                            </TableRow>
                          )}
                        </>
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
                  No salary slips found.
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

