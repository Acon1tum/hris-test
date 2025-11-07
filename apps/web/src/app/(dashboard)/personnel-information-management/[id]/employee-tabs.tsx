"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Search,
  Users,
  Clock,
  AlertTriangle,
  FileCheck,
  DollarSign,
  Clock as ClockIcon,
  CheckCircle2,
  Target,
  Calendar as CalendarIcon,
  TrendingUp,
  CheckCircle,
  Pause,
  AlertCircle,
  MoreHorizontal,
  RefreshCw,
  Maximize2,
  Filter,
  ChevronLeft,
  ChevronRight,
  Edit,
} from "lucide-react"
import { useState } from "react"
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths } from "date-fns"

// Empty state component
const EmptyState = ({ message = "No Records Found!" }: { message?: string }) => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="relative mb-4">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 border-2 border-dashed rounded-full border-muted-foreground/20"></div>
      </div>
      <div className="relative flex items-center justify-center">
        <Search className="w-16 h-16 text-muted-foreground/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-muted-foreground/40">?</span>
        </div>
      </div>
    </div>
    <p className="text-lg font-semibold text-muted-foreground">{message}</p>
  </div>
)

// Summary Card Component
const SummaryCard = ({ 
  icon: Icon, 
  label, 
  value, 
  iconColor = "text-blue-500" 
}: { 
  icon: any
  label: string
  value: string | number
  iconColor?: string
}) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg bg-muted ${iconColor}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </CardContent>
  </Card>
)

// Salary Tab
export function SalaryTab() {
  const [payrollDateFilter, setPayrollDateFilter] = useState("")

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Remuneration */}
        <Card>
          <CardHeader>
            <CardTitle>Current Remuneration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Earnings</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Basic</span>
                  <span className="font-medium">P10,000.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Field Allowance</span>
                  <span className="font-medium">P4,000.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Housing Allowance</span>
                  <span className="font-medium">P1,000.00</span>
                </div>
              </div>
            </div>
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3">Deductions</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Paye Tax</span>
                  <span className="font-medium">P500.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Staff Loan Repayment</span>
                  <span className="font-medium">P300.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Supper Annuation</span>
                  <span className="font-medium">P300.00</span>
                </div>
              </div>
            </div>
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3">Non Payment</h3>
              <p className="text-sm text-muted-foreground">No non-payment items</p>
            </div>
          </CardContent>
        </Card>

        {/* Salary History */}
        <Card>
          <CardHeader>
            <CardTitle>Salary History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Badge variant="default" className="bg-green-500">Current</Badge>
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-muted-foreground">Position:</span>
                  <p className="font-medium">Assistant</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Effective Date:</span>
                  <p className="font-medium">Effective Aug 30, 2025</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Amount:</span>
                  <p className="font-medium">P0.00</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Past Records Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Past Records</CardTitle>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Filter by Payroll Start Date - End Date"
                value={payrollDateFilter}
                onChange={(e) => setPayrollDateFilter(e.target.value)}
                className="w-64"
              />
              <Button variant="ghost" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Maximize2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Payment Status</TableHead>
                  <TableHead>Gross Earnings</TableHead>
                  <TableHead>Net Payable</TableHead>
                  <TableHead>Total Deductions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={6}>
                    <EmptyState />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Attendance Tab
export function AttendanceTab() {
  const [statusFilter, setStatusFilter] = useState("")
  const [dateFilter, setDateFilter] = useState("")
  const [attendanceTypeFilter, setAttendanceTypeFilter] = useState("")

  const attendanceRecords = [
    {
      id: "1",
      date: "September 05, 2025",
      clockIn: "September 05, 2025",
      clockOut: "September 05, 2025",
      attendanceStatus: "On Time",
      status: "Present",
      totalHours: "January 01, 1970",
      overtime: "---",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard icon={Users} label="Total Present" value={1} iconColor="text-blue-500" />
        <SummaryCard icon={Clock} label="On Time" value={1} iconColor="text-green-500" />
        <SummaryCard icon={AlertTriangle} label="Late" value={0} iconColor="text-red-500" />
        <SummaryCard icon={ClockIcon} label="Overtime (Hours)" value="0.00" iconColor="text-purple-500" />
      </div>

      {/* Attendance Records Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Attendance Records</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Showing 1-1 of 1</p>
            </div>
            <div className="flex items-center gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="present">Present</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                  <SelectItem value="late">Late</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
              <Select value={attendanceTypeFilter} onValueChange={setAttendanceTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by Attendance Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="regular">Regular</SelectItem>
                  <SelectItem value="overtime">Overtime</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="ghost" size="icon">
                <Maximize2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Clock In</TableHead>
                  <TableHead>Clock Out</TableHead>
                  <TableHead>Attendance Status</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total Hours</TableHead>
                  <TableHead>Overtime</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{record.clockIn}</TableCell>
                    <TableCell>{record.clockOut}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{record.attendanceStatus}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="default" className="bg-green-500">{record.status}</Badge>
                    </TableCell>
                    <TableCell>{record.totalHours}</TableCell>
                    <TableCell>{record.overtime}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Rows per page:</span>
              <Select defaultValue="10">
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">1</Button>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Leaves Tab
export function LeavesTab() {
  const [statusFilter, setStatusFilter] = useState("")
  const [leaveTypeFilter, setLeaveTypeFilter] = useState("")

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard icon={FileCheck} label="Leaves applications" value={0} iconColor="text-blue-500" />
        <SummaryCard icon={AlertCircle} label="Pending Approval" value={0} iconColor="text-orange-500" />
        <SummaryCard icon={CalendarIcon} label="Days Available" value={0} iconColor="text-green-500" />
        <SummaryCard icon={TrendingUp} label="Utilization Rate" value="0.00%" iconColor="text-purple-500" />
      </div>

      {/* Leave Balance by Type */}
      <Card>
        <CardHeader>
          <CardTitle>Leave Balance by Type</CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState />
        </CardContent>
      </Card>

      {/* Leave History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Leave History</CardTitle>
            <div className="flex items-center gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={leaveTypeFilter} onValueChange={setLeaveTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select Leave Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="annual">Annual Leave</SelectItem>
                  <SelectItem value="sick">Sick Leave</SelectItem>
                  <SelectItem value="personal">Personal Leave</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="ghost" size="icon">
                <Maximize2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date Requested</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Leave Type</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Approved By</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total Days</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={8}>
                    <EmptyState />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Expense Claims Tab
export function ExpenseClaimsTab() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <SummaryCard icon={FileCheck} label="Submitted Claims" value={0} iconColor="text-blue-500" />
        <SummaryCard icon={DollarSign} label="Expenses" value="P0.00" iconColor="text-green-500" />
        <SummaryCard icon={ClockIcon} label="Pending" value="P0.00" iconColor="text-orange-500" />
        <SummaryCard icon={CheckCircle2} label="Approved" value="P0.00" iconColor="text-green-500" />
        <SummaryCard icon={Target} label="Rejected" value="P0.00" iconColor="text-red-500" />
      </div>

      {/* Expense Claims Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="ghost" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Maximize2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Expense Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={5}>
                    <EmptyState />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Assigned Assets Tab
export function AssignedAssetsTab() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 w-64"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
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
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset Name</TableHead>
                <TableHead>Asset Model</TableHead>
                <TableHead>Asset Condition</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Assigned Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={7}>
                  <EmptyState />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

// Shift Assigned Tab
export function ShiftAssignedTab() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 1)) // November 2025
  const [viewMode, setViewMode] = useState("month")

  // Sample shift data - Morning shifts on weekdays
  const shifts = [
    { date: new Date(2025, 10, 3), name: "Morning", startTime: "06:00 AM", endTime: "11:00 AM" },
    { date: new Date(2025, 10, 4), name: "Morning", startTime: "06:00 AM", endTime: "11:00 AM" },
    { date: new Date(2025, 10, 5), name: "Morning", startTime: "06:00 AM", endTime: "11:00 AM" },
    { date: new Date(2025, 10, 6), name: "Morning", startTime: "06:00 AM", endTime: "11:00 AM" },
    { date: new Date(2025, 10, 7), name: "Morning", startTime: "06:00 AM", endTime: "11:00 AM" },
    { date: new Date(2025, 10, 10), name: "Morning", startTime: "06:00 AM", endTime: "11:00 AM" },
    { date: new Date(2025, 10, 11), name: "Morning", startTime: "06:00 AM", endTime: "11:00 AM" },
    { date: new Date(2025, 10, 12), name: "Morning", startTime: "06:00 AM", endTime: "11:00 AM" },
    { date: new Date(2025, 10, 13), name: "Morning", startTime: "06:00 AM", endTime: "11:00 AM" },
    { date: new Date(2025, 10, 14), name: "Morning", startTime: "06:00 AM", endTime: "11:00 AM" },
    { date: new Date(2025, 10, 17), name: "Morning", startTime: "06:00 AM", endTime: "11:00 AM" },
    { date: new Date(2025, 10, 18), name: "Morning", startTime: "06:00 AM", endTime: "11:00 AM" },
    { date: new Date(2025, 10, 19), name: "Morning", startTime: "06:00 AM", endTime: "11:00 AM" },
    { date: new Date(2025, 10, 20), name: "Morning", startTime: "06:00 AM", endTime: "11:00 AM" },
    { date: new Date(2025, 10, 21), name: "Morning", startTime: "06:00 AM", endTime: "11:00 AM" },
    { date: new Date(2025, 10, 24), name: "Morning", startTime: "06:00 AM", endTime: "11:00 AM" },
    { date: new Date(2025, 10, 25), name: "Morning", startTime: "06:00 AM", endTime: "11:00 AM" },
    { date: new Date(2025, 10, 26), name: "Morning", startTime: "06:00 AM", endTime: "11:00 AM" },
    { date: new Date(2025, 10, 27), name: "Morning", startTime: "06:00 AM", endTime: "11:00 AM" },
    { date: new Date(2025, 10, 28), name: "Morning", startTime: "06:00 AM", endTime: "11:00 AM" },
  ]

  const getShiftForDate = (date: Date) => {
    return shifts.find(
      (shift) =>
        shift.date.getDate() === date.getDate() &&
        shift.date.getMonth() === date.getMonth() &&
        shift.date.getFullYear() === date.getFullYear()
    )
  }

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const calendarStart = startOfWeek(monthStart)
  const calendarEnd = endOfWeek(monthEnd)
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd })

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }

  const handleToday = () => {
    setCurrentDate(new Date())
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={handleToday}>
              Today
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={handlePreviousMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-semibold min-w-[120px] text-center">
                {format(currentDate, "MMM, yyyy")}
              </h2>
              <Button variant="ghost" size="icon" onClick={handleNextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Select value={viewMode} onValueChange={setViewMode}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="day">Day</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          {/* Week day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day) => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => {
              const shift = getShiftForDate(day)
              const isCurrentMonth = isSameMonth(day, currentDate)
              const isCurrentDay = isToday(day)

              return (
                <div
                  key={index}
                  className={`
                    min-h-[100px] border rounded-md p-2
                    ${isCurrentMonth ? "bg-card" : "bg-muted/30"}
                    ${isCurrentDay ? "ring-2 ring-primary" : ""}
                  `}
                >
                  <div
                    className={`
                      text-sm font-medium mb-1
                      ${isCurrentMonth ? "text-foreground" : "text-muted-foreground"}
                      ${isCurrentDay ? "text-primary" : ""}
                    `}
                  >
                    {format(day, "d")}
                  </div>
                  {shift && (
                    <div className="bg-muted rounded p-1.5 text-xs">
                      <div className="font-medium">{shift.name}</div>
                      <div className="text-muted-foreground">
                        {shift.startTime} - {shift.endTime}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Training Tab
export function TrainingTab() {
  const [searchQuery, setSearchQuery] = useState("")
  const [subTab, setSubTab] = useState("trainer")

  return (
    <div className="space-y-6">
      <Tabs value={subTab} onValueChange={setSubTab}>
        <TabsList>
          <TabsTrigger value="trainer">Trainer</TabsTrigger>
          <TabsTrigger value="enrollment">Enrollment</TabsTrigger>
          <TabsTrigger value="requested">Requested</TabsTrigger>
        </TabsList>

        <TabsContent value={subTab} className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8 w-64"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
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
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Delivery Mode</TableHead>
                      <TableHead>Training Level</TableHead>
                      <TableHead>Training Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Com</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={9}>
                        <EmptyState />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Travel Requests Tab
export function TravelRequestsTab() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  const travelRequests = [
    {
      id: "1",
      travelType: "Domestic Travel",
      project: "Fiji Data Collection Trai...",
      purpose: "",
      status: "Pending",
      from: "honiara_solomon_islands",
      to: "Central",
      flightNumber: "PR-3329",
    },
    {
      id: "2",
      travelType: "Domestic Travel",
      project: "Educational Materials ...",
      purpose: "",
      status: "Approved",
      from: "Tongatapu",
      to: "Central",
      flightNumber: "NA-8879",
    },
    {
      id: "3",
      travelType: "Domestic Travel",
      project: "Educational Materials ...",
      purpose: "",
      status: "Approved",
      from: "Tongatapu",
      to: "Central",
      flightNumber: "BN-4442",
    },
    {
      id: "4",
      travelType: "International Conference",
      project: "Community Data Colle...",
      purpose: "",
      status: "Approved",
      from: "Tongatapu",
      to: "Central",
      flightNumber: "VQ-7789",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by type"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 w-64"
              />
            </div>
            <p className="text-sm text-muted-foreground">Showing 1-4 of 4</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
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
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Travel Type</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Flight Number</TableHead>
                <TableHead className="w-[70px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {travelRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium text-blue-600 hover:underline cursor-pointer">
                    {request.travelType}
                  </TableCell>
                  <TableCell>{request.project}</TableCell>
                  <TableCell>{request.purpose || "—"}</TableCell>
                  <TableCell>
                    <Badge
                      variant={request.status === "Approved" ? "default" : "secondary"}
                      className={
                        request.status === "Approved"
                          ? "bg-green-500"
                          : request.status === "Pending"
                          ? "bg-orange-500"
                          : ""
                      }
                    >
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{request.from}</TableCell>
                  <TableCell>{request.to}</TableCell>
                  <TableCell>{request.flightNumber}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Rows per page:</span>
            <Select defaultValue="10">
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">1</Button>
            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Induction Plan Tab
export function InductionPlanTab() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <SummaryCard icon={CalendarIcon} label="Total" value={0} iconColor="text-blue-500" />
        <SummaryCard icon={CheckCircle} label="Completed" value={0} iconColor="text-green-500" />
        <SummaryCard icon={ClockIcon} label="In Progress" value={0} iconColor="text-blue-500" />
        <SummaryCard icon={Pause} label="Not Started" value={0} iconColor="text-orange-500" />
        <SummaryCard icon={AlertCircle} label="Overdue" value={0} iconColor="text-red-500" />
      </div>

      {/* Induction Plan Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by batch name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="not-started">Not Started</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
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
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Batch Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Remaining Tasks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={4}>
                    <EmptyState />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Incidents Tab
export function IncidentsTab() {
  const [statusFilter, setStatusFilter] = useState("")
  const [dateFilter, setDateFilter] = useState("")

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">No Records found</p>
          <div className="flex items-center gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
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
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Reports To</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={8}>
                  <EmptyState />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

// Activities Tab
export function ActivitiesTab() {
  const [subTab, setSubTab] = useState("responsible")

  return (
    <div className="space-y-6">
      <Tabs value={subTab} onValueChange={setSubTab}>
        <TabsList>
          <TabsTrigger value="responsible">Responsible</TabsTrigger>
          <TabsTrigger value="involved">Involved</TabsTrigger>
        </TabsList>

        <TabsContent value={subTab} className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">No Records found</p>
                <div className="flex items-center gap-2">
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
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Activity Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Responsible Person</TableHead>
                      <TableHead>Roles</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Reminders</TableHead>
                      <TableHead>Email Status</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>Created At</TableHead>
                      <TableHead>Updated At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={11}>
                        <EmptyState />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Resignations Tab
export function ResignationsTab() {
  const [statusFilter, setStatusFilter] = useState("")
  const [typeFilter, setTypeFilter] = useState("")

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">No Records found</p>
          <div className="flex items-center gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="voluntary">Voluntary</SelectItem>
                <SelectItem value="involuntary">Involuntary</SelectItem>
              </SelectContent>
            </Select>
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
        </div>
      </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reason</TableHead>
                  <TableHead>Termination Type</TableHead>
                  <TableHead>Last Working Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Termination Requested Date</TableHead>
                  <TableHead>Final Pay Generated</TableHead>
                  <TableHead>Termination Date</TableHead>
                  <TableHead>Approval Reject Reason</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={8}>
                    <EmptyState />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    )
}

// Audit Trails Tab
export function AuditTrailsTab() {
  const auditEntries = [
    {
      id: "1",
      date: "Aug 26, 2025 12:53 a",
      action: "sajid updated Lauren",
      details: "",
    },
    {
      id: "2",
      date: "Aug 26, 2025 12:50 a",
      action: "sajid updated Lauren",
      details: "Check Details",
    },
    {
      id: "3",
      date: "Aug 13, 2025 11:49 a",
      action: "sajid updated Dilara khanom Nitu",
      details: "Check Details",
    },
  ]

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          {auditEntries.map((entry) => (
            <div key={entry.id} className="flex items-start gap-4 pb-4 border-b last:border-0">
              <div className="p-2 rounded-lg bg-muted">
                <Edit className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">{entry.date}</p>
                <p className="text-sm">
                  <span className="font-semibold">sajid</span> updated{" "}
                  <span className="font-semibold">
                    {entry.action.includes("Lauren") ? "Lauren" : "Dilara khanom Nitu"}
                  </span>
                  {entry.details && (
                    <>
                      , <span className="text-blue-600 hover:underline cursor-pointer">{entry.details}</span>
                    </>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-6 pt-4 border-t">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Rows per page:</span>
            <Select defaultValue="10">
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">1</Button>
            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

