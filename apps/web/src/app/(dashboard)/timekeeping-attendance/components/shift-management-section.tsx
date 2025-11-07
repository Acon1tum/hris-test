"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronRight, ChevronLeft, Search } from "lucide-react"
import { useState } from "react"
import { startOfMonth, endOfMonth, getDaysInMonth, format, startOfWeek, addDays, isSameMonth, isSameDay } from "date-fns"

// Sample employees with initials
const employees = [
  { id: "1", name: "Peter", initials: "P", avatar: "/avatars/peter.jpg" },
  { id: "2", name: "John", initials: "J", avatar: "/avatars/john.jpg" },
  { id: "3", name: "Lisa", initials: "L", avatar: "/avatars/lisa.jpg" },
  { id: "4", name: "Alex", initials: "A", avatar: "/avatars/alex.jpg" },
]

// Sample shift assignments - dates with shifts in November 2025
const shiftAssignments: Record<string, { employees: string[], additionalCount: number }> = {
  "2025-11-03": { employees: ["P", "J", "L", "A"], additionalCount: 30 },
  "2025-11-04": { employees: ["P", "J", "L", "A"], additionalCount: 30 },
  "2025-11-05": { employees: ["P", "J", "L", "A"], additionalCount: 30 },
  "2025-11-06": { employees: ["P", "J", "L", "A"], additionalCount: 30 },
  "2025-11-07": { employees: ["P", "J", "L", "A"], additionalCount: 30 },
  "2025-11-10": { employees: ["P", "J", "L", "A"], additionalCount: 30 },
  "2025-11-11": { employees: ["P", "J", "L", "A"], additionalCount: 30 },
  "2025-11-12": { employees: ["P", "J", "L", "A"], additionalCount: 30 },
  "2025-11-13": { employees: ["P", "J", "L", "A"], additionalCount: 30 },
  "2025-11-14": { employees: ["P", "J", "L", "A"], additionalCount: 30 },
  "2025-11-17": { employees: ["P", "J", "L", "A"], additionalCount: 30 },
  "2025-11-18": { employees: ["P", "J", "L", "A"], additionalCount: 30 },
  "2025-11-19": { employees: ["P", "J", "L", "A"], additionalCount: 30 },
  "2025-11-20": { employees: ["P", "J", "L", "A"], additionalCount: 30 },
  "2025-11-21": { employees: ["P", "J", "L", "A"], additionalCount: 30 },
  "2025-11-24": { employees: ["P", "J", "L", "A"], additionalCount: 30 },
  "2025-11-25": { employees: ["P", "J", "L", "A"], additionalCount: 30 },
  "2025-11-26": { employees: ["P", "J", "L", "A"], additionalCount: 30 },
  "2025-11-27": { employees: ["P", "J", "L", "A"], additionalCount: 30 },
  "2025-11-28": { employees: ["P", "J", "L", "A"], additionalCount: 30 },
}

const departments = [
  { id: "1", name: "Sales" },
  { id: "2", name: "Marketing" },
  { id: "3", name: "HR" },
  { id: "4", name: "IT" },
]

const offices = [
  { id: "1", name: "Head Office" },
  { id: "2", name: "Branch Office 1" },
  { id: "3", name: "Branch Office 2" },
]

const allEmployees = [
  { id: "1", name: "Amor", employeeId: "EMP-00022" },
  { id: "2", name: "Anthony Mary Ray", employeeId: "EMP-00005" },
  { id: "3", name: "Ashton Starc", employeeId: "EMP-00034" },
  { id: "4", name: "Brandon Lewis", employeeId: "EMP-00030" },
]

export function ShiftManagementSection() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 1)) // November 2025
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month")
  const [employeeFilter, setEmployeeFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [officeFilter, setOfficeFilter] = useState("all")

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const daysInMonth = getDaysInMonth(currentDate)
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 })

  // Generate calendar days
  const calendarDays: Date[] = []
  const daysToShow = 42 // 6 weeks
  for (let i = 0; i < daysToShow; i++) {
    calendarDays.push(addDays(calendarStart, i))
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const handleToday = () => {
    setCurrentDate(new Date())
  }

  const getInitials = (initial: string) => {
    return initial
  }

  const formatMonthYear = (date: Date) => {
    return format(date, "MMM, yyyy")
  }

  const formatDateKey = (date: Date) => {
    return format(date, "yyyy-MM-dd")
  }

  const getShiftForDate = (date: Date) => {
    const dateKey = formatDateKey(date)
    return shiftAssignments[dateKey]
  }

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <span>Dashboard</span>
              <ChevronRight className="h-4 w-4" />
              <span>Shift Managements</span>
            </div>
            <CardTitle>Shift Managements</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
            <Select value={employeeFilter} onValueChange={setEmployeeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Employee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Employees</SelectItem>
                {allEmployees.map((emp) => (
                  <SelectItem key={emp.id} value={emp.id}>
                    {emp.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={officeFilter} onValueChange={setOfficeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Office" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Offices</SelectItem>
                {offices.map((office) => (
                  <SelectItem key={office.id} value={office.id}>
                    {office.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Calendar Navigation */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleToday}>
                Today
              </Button>
              <Button variant="outline" size="icon" onClick={handlePrevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleNextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <div className="text-lg font-semibold ml-4">
                {formatMonthYear(currentDate)}
              </div>
            </div>
            <Select value={viewMode} onValueChange={(value: "month" | "week" | "day") => setViewMode(value)}>
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

          {/* Calendar Grid */}
          <div className="border rounded-lg">
            {/* Weekday Headers */}
            <div className="grid grid-cols-7 border-b">
              {weekDays.map((day) => (
                <div key={day} className="p-2 text-center text-sm font-medium border-r last:border-r-0">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7">
              {calendarDays.map((day, index) => {
                const isCurrentMonth = isSameMonth(day, currentDate)
                const isToday = isSameDay(day, new Date())
                const shiftData = getShiftForDate(day)
                const isWeekend = day.getDay() === 0 || day.getDay() === 6

                return (
                  <div
                    key={index}
                    className={`min-h-[100px] border-r border-b last:border-r-0 p-2 ${
                      !isCurrentMonth ? "bg-muted/30 text-muted-foreground" : ""
                    } ${isToday ? "bg-accent/50" : ""}`}
                  >
                    <div className="text-sm font-medium mb-1">{format(day, "d")}</div>
                    {shiftData && isCurrentMonth && !isWeekend && (
                      <div className="mt-1">
                        <div className="flex items-center gap-1 flex-wrap">
                          {shiftData.employees.slice(0, 4).map((initial, idx) => (
                            <Avatar key={idx} className="h-6 w-6 text-xs">
                              <AvatarFallback className="bg-primary text-primary-foreground text-[10px]">
                                {getInitials(initial)}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {shiftData.additionalCount > 0 && (
                            <Badge variant="secondary" className="h-6 px-1.5 text-[10px]">
                              +{shiftData.additionalCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
