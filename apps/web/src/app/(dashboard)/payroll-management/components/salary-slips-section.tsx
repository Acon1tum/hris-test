"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronRight, RefreshCw, Columns, MoreVertical, Printer, ArrowLeft } from "lucide-react"
import { DataTable } from "@/components/salary-slips/data-table"
import { type SalarySlip } from "@/components/salary-slips/columns"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Sample salary slips data
const salarySlips: SalarySlip[] = [
  {
    id: "1",
    employeeId: "EMP-00001",
    employeeName: "Lauren Marsh",
    employeeStatus: "Active",
    totalPayroll: 0,
    startDate: "",
    endDate: "",
    paymentStatus: "Due",
    emailStatus: "Not Sent",
    grossEarnings: "₱0.00",
    deductions: "₱0.00",
    netPayable: "₱0.00",
    emailRetry: 0,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "2",
    employeeId: "EMP-00002",
    employeeName: "Jaehee Kim",
    employeeStatus: "Active",
    totalPayroll: 0,
    startDate: "",
    endDate: "",
    paymentStatus: "Due",
    emailStatus: "Not Sent",
    grossEarnings: "₱0.00",
    deductions: "₱0.00",
    netPayable: "₱0.00",
    emailRetry: 0,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "3",
    employeeId: "EMP-00003",
    employeeName: "Jennifer Michael Davis",
    employeeStatus: "Active",
    totalPayroll: 0,
    startDate: "",
    endDate: "",
    paymentStatus: "Due",
    emailStatus: "Not Sent",
    grossEarnings: "₱0.00",
    deductions: "₱0.00",
    netPayable: "₱0.00",
    emailRetry: 0,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "4",
    employeeId: "EMP-00004",
    employeeName: "Susan Justin Howard",
    employeeStatus: "Active",
    totalPayroll: 0,
    startDate: "",
    endDate: "",
    paymentStatus: "Due",
    emailStatus: "Not Sent",
    grossEarnings: "₱0.00",
    deductions: "₱0.00",
    netPayable: "₱0.00",
    emailRetry: 0,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "5",
    employeeId: "EMP-00005",
    employeeName: "Anthony Mary Ray",
    employeeStatus: "Active",
    totalPayroll: 0,
    startDate: "",
    endDate: "",
    paymentStatus: "Due",
    emailStatus: "Not Sent",
    grossEarnings: "₱0.00",
    deductions: "₱0.00",
    netPayable: "₱0.00",
    emailRetry: 0,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "6",
    employeeId: "EMP-00006",
    employeeName: "Joan Adrienne Tyler",
    employeeStatus: "Active",
    totalPayroll: 0,
    startDate: "",
    endDate: "",
    paymentStatus: "Due",
    emailStatus: "Not Sent",
    grossEarnings: "₱0.00",
    deductions: "₱0.00",
    netPayable: "₱0.00",
    emailRetry: 0,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "7",
    employeeId: "EMP-00007",
    employeeName: "Taylor Lisa Williams",
    employeeStatus: "Active",
    totalPayroll: 1,
    startDate: "June 16, 2025",
    endDate: "June 30, 2025",
    paymentStatus: "Due",
    emailStatus: "Not Sent",
    grossEarnings: "₱15,000.00",
    deductions: "₱1,100.00",
    netPayable: "₱13,900.00",
    emailRetry: 0,
    createdAt: "July 30, 2025",
    updatedAt: "3 months ago",
  },
  {
    id: "8",
    employeeId: "EMP-00008",
    employeeName: "Valerie Christopher Morgan",
    employeeStatus: "Active",
    totalPayroll: 0,
    startDate: "",
    endDate: "",
    paymentStatus: "Due",
    emailStatus: "Not Sent",
    grossEarnings: "₱0.00",
    deductions: "₱0.00",
    netPayable: "₱0.00",
    emailRetry: 0,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "9",
    employeeId: "EMP-00009",
    employeeName: "James Kayla Herrera",
    employeeStatus: "Active",
    totalPayroll: 0,
    startDate: "",
    endDate: "",
    paymentStatus: "Due",
    emailStatus: "Not Sent",
    grossEarnings: "₱0.00",
    deductions: "₱0.00",
    netPayable: "₱0.00",
    emailRetry: 0,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "10",
    employeeId: "EMP-00010",
    employeeName: "Robin Dakota Reed",
    employeeStatus: "Termination Requested",
    totalPayroll: 0,
    startDate: "",
    endDate: "",
    paymentStatus: "Due",
    emailStatus: "Not Sent",
    grossEarnings: "₱0.00",
    deductions: "₱0.00",
    netPayable: "₱0.00",
    emailRetry: 0,
    createdAt: "",
    updatedAt: "",
  },
]

// Sample earnings and deductions data for the detail view
const earningsComponents = [
  { componentName: "Basic", amount: "₱10,000.00", calculatedAmount: "₱10,000.00" },
  { componentName: "Field Allowance", amount: "₱4,000.00", calculatedAmount: "₱4,000.00" },
  { componentName: "Housing Allowance", amount: "₱1,000.00", calculatedAmount: "₱1,000.00" },
]

const deductionsComponents = [
  { componentName: "Paye Tax", amount: "₱500.00", calculatedAmount: "₱500.00" },
  { componentName: "Staff Load Repayment", amount: "₱300.00", calculatedAmount: "₱300.00" },
  { componentName: "Super Annuation", amount: "₱300.00", calculatedAmount: "₱300.00" },
]

export function SalarySlipsSection() {
  const [search, setSearch] = useState("")
  const [dateRangeFilter, setDateRangeFilter] = useState("all")
  const [emailStatusFilter, setEmailStatusFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"list" | "view">("list")
  const [selectedSlip, setSelectedSlip] = useState<SalarySlip | null>(null)

  const handleView = (slip: SalarySlip) => {
    setSelectedSlip(slip)
    setViewMode("view")
  }

  const handlePrint = () => {
    window.print()
  }

  if (viewMode === "view" && selectedSlip) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <span>Dashboard</span>
                <ChevronRight className="h-4 w-4" />
                <span>Salary Slips</span>
              </div>
              <CardTitle>
                Salary Slip for {selectedSlip.employeeName} ({selectedSlip.startDate} - {selectedSlip.endDate})
              </CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handlePrint}>
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
              <Button variant="outline" onClick={() => setViewMode("list")}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Payroll Details Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Payroll Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Start</div>
                  <div className="font-medium">{selectedSlip.startDate}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">End</div>
                  <div className="font-medium">{selectedSlip.endDate}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Payroll Date</div>
                  <div className="font-medium">Jul 31, 2025</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Approval Cutoff</div>
                  <div className="font-medium">Jul 30, 2025</div>
                </div>
              </div>
            </div>

            {/* Salary Slip Details Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Salary Slip Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Gross Earnings</div>
                  <div className="text-lg font-semibold">{selectedSlip.grossEarnings}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Total Deductions</div>
                  <div className="text-lg font-semibold">{selectedSlip.deductions}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Net Payable</div>
                  <div className="text-lg font-semibold">{selectedSlip.netPayable}</div>
                </div>
              </div>
            </div>

            {/* Earnings Components Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Earnings Components</h3>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Component Name</TableHead>
                      <TableHead>Amount(₱)</TableHead>
                      <TableHead>Calculated Amount(₱)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {earningsComponents.map((component, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{component.componentName}</TableCell>
                        <TableCell>{component.amount}</TableCell>
                        <TableCell>{component.calculatedAmount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Deductions Components Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Deductions Components</h3>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Component Name</TableHead>
                      <TableHead>Amount(₱)</TableHead>
                      <TableHead>Calculated Amount(₱)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {deductionsComponents.map((component, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{component.componentName}</TableCell>
                        <TableCell>{component.amount}</TableCell>
                        <TableCell>{component.calculatedAmount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span>Dashboard</span>
          <ChevronRight className="h-4 w-4" />
          <span>Salary Slips</span>
        </div>
        <CardTitle>Salary Slips</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4 flex-wrap">
              <Select value={dateRangeFilter} onValueChange={setDateRangeFilter}>
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Filter by Payroll Start Date - End Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dates</SelectItem>
                  <SelectItem value="2025-06">June 2025</SelectItem>
                  <SelectItem value="2025-07">July 2025</SelectItem>
                  <SelectItem value="2025-08">August 2025</SelectItem>
                  <SelectItem value="2025-09">September 2025</SelectItem>
                </SelectContent>
              </Select>
              <Select value={emailStatusFilter} onValueChange={setEmailStatusFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by Email Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="not sent">Not Sent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8" title="Refresh">
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" title="Column Visibility">
                <Columns className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" title="More Options">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <DataTable
            data={salarySlips}
            search={search}
            onSearchChange={setSearch}
            dateRangeFilter={dateRangeFilter}
            onDateRangeFilterChange={setDateRangeFilter}
            emailStatusFilter={emailStatusFilter}
            onEmailStatusFilterChange={setEmailStatusFilter}
            onView={handleView}
            onEdit={(slip) => {
              // TODO: Implement edit
              console.log("Edit", slip)
            }}
            onDelete={(slip) => {
              // TODO: Implement delete
              console.log("Delete", slip)
            }}
            onSendEmail={(slip) => {
              // TODO: Implement send email
              console.log("Send Email", slip)
            }}
            onMarkAsPaid={(slip) => {
              // TODO: Implement mark as paid
              console.log("Mark as Paid", slip)
            }}
            onViewAll={(employeeId) => {
              // TODO: Implement view all
              console.log("View All", employeeId)
            }}
          />
        </div>
      </CardContent>
    </Card>
  )
}

