"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, ArrowLeft, CalendarIcon, MoreHorizontal } from "lucide-react"
import { useState } from "react"
import { DataTable } from "@/components/holidays/data-table"
import { type Holiday } from "@/components/holidays/columns"

// Sample weekend days options
const weekendDaysOptions = [
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" },
  { value: "friday-saturday", label: "Friday, Saturday" },
  { value: "saturday-sunday", label: "Saturday, Sunday" },
]

export function HolidaysSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [holidayEntries, setHolidayEntries] = useState<Array<{
    id: string
    date: string
    name: string
  }>>([])
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    totalDays: "0",
    fromDate: "",
    toDate: "",
    year: "",
    weekendDays: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement form submission
    console.log("Form data:", formData, "Entries:", holidayEntries)
  }

  const handleAddEntry = () => {
    const newEntry = {
      id: Date.now().toString(),
      date: "",
      name: "",
    }
    setHolidayEntries([...holidayEntries, newEntry])
  }

  const handleEntryChange = (id: string, field: string, value: string) => {
    setHolidayEntries(
      holidayEntries.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    )
  }

  const handleRemoveEntry = (id: string) => {
    setHolidayEntries(holidayEntries.filter((entry) => entry.id !== id))
  }

  // Generate year options (current year ± 10 years)
  const currentYear = new Date().getFullYear()
  const yearOptions = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i)

  if (isCreating) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Add Holiday</CardTitle>
              <CardDescription className="mt-1">Dashboard &gt; Holidays</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Information Section */}
            <div className="space-y-4 p-4 border rounded-lg">
              <h3 className="text-lg font-semibold">Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalDays">Total Days</Label>
                  <Input
                    id="totalDays"
                    type="number"
                    value={formData.totalDays}
                    onChange={(e) => setFormData({ ...formData, totalDays: e.target.value })}
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fromDate">From Date</Label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="fromDate"
                      type="date"
                      value={formData.fromDate}
                      onChange={(e) => setFormData({ ...formData, fromDate: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="toDate">To Date</Label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="toDate"
                      type="date"
                      value={formData.toDate}
                      onChange={(e) => setFormData({ ...formData, toDate: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">
                    Year <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.year}
                    onValueChange={(value) => setFormData({ ...formData, year: value })}
                    required
                  >
                    <SelectTrigger id="year">
                      <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {yearOptions.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weekendDays">
                    Weekend Days <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.weekendDays}
                    onValueChange={(value) => setFormData({ ...formData, weekendDays: value })}
                    required
                  >
                    <SelectTrigger id="weekendDays">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      {weekendDaysOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Holiday Lists Section */}
            <div className="space-y-4 p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Holiday Lists</h3>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddEntry}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Entry
                </Button>
              </div>
              
              {holidayEntries.length > 0 && (
                <div className="space-y-3">
                  {holidayEntries.map((entry) => (
                    <div key={entry.id} className="flex items-center gap-2 p-3 border rounded-md">
                      <div className="relative flex-1">
                        <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="date"
                          value={entry.date}
                          onChange={(e) => handleEntryChange(entry.id, "date", e.target.value)}
                          className="pl-10"
                          placeholder="Select Date"
                        />
                      </div>
                      <Input
                        value={entry.name}
                        onChange={(e) => handleEntryChange(entry.id, "name", e.target.value)}
                        placeholder="Holiday Name"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveEntry(entry.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCreating(false)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    )
  }

  // Empty holidays array for now - will be populated when holidays are created
  const holidays: Holiday[] = []

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Holidays</CardTitle>
            <CardDescription>Manage holiday calendars and public holidays</CardDescription>
          </div>
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          data={holidays}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          onView={(holiday) => {
            // TODO: Implement view
            console.log("View", holiday)
          }}
          onEdit={(holiday) => {
            // TODO: Implement edit
            console.log("Edit", holiday)
          }}
          onDelete={(holiday) => {
            // TODO: Implement delete
            console.log("Delete", holiday)
          }}
        />
      </CardContent>
    </Card>
  )
}
