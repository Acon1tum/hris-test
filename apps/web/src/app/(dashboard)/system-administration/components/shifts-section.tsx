"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus, ArrowLeft, Minus, X, ChevronUp, ChevronDown } from "lucide-react"
import { useState } from "react"
import { DataTable } from "@/components/shifts/data-table"
import { type Shift } from "@/components/shifts/columns"

const shifts: Shift[] = [
  { id: "1", name: "Morning Shift", code: "MORN", startTime: "08:00", endTime: "16:00", createdAt: "July 24, 2025" },
  { id: "2", name: "Afternoon Shift", code: "AFT", startTime: "12:00", endTime: "20:00", createdAt: "July 24, 2025" },
  { id: "3", name: "Night Shift", code: "NIGHT", startTime: "20:00", endTime: "04:00", createdAt: "July 24, 2025" },
]

type ShiftTypeRow = {
  id: string
  name: string
  startTime: string
  endTime: string
  days: string
  breakDuration: string
  overtimeMultiplier: string
}

export function ShiftsSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  
  // Form state - editable table rows
  const [shiftRows, setShiftRows] = useState<ShiftTypeRow[]>([
    { id: "1", name: "Evening", startTime: "19:00:00", endTime: "22:00:00", days: "Monday x + 4", breakDuration: "0.00", overtimeMultiplier: "1.00" },
    { id: "2", name: "Late Night", startTime: "02:00:00", endTime: "06:00:00", days: "Monday x + 4", breakDuration: "0.00", overtimeMultiplier: "1.00" },
    { id: "3", name: "Morning", startTime: "06:00:00", endTime: "11:00:00", days: "Monday x + 4", breakDuration: "0.00", overtimeMultiplier: "1.00" },
    { id: "4", name: "Night", startTime: "22:00:00", endTime: "02:00:00", days: "Monday x + 4", breakDuration: "0.00", overtimeMultiplier: "1.00" },
    { id: "5", name: "Regular", startTime: "11:00:00", endTime: "19:00:00", days: "Monday x + 4", breakDuration: "0.00", overtimeMultiplier: "1.00" },
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement form submission
    console.log("Shift types:", shiftRows)
    setIsEditing(false)
  }

  const handleAddRow = () => {
    const newRow: ShiftTypeRow = {
      id: Date.now().toString(),
      name: "",
      startTime: "08:00:00",
      endTime: "17:00:00",
      days: "Monday x + 4",
      breakDuration: "0.00",
      overtimeMultiplier: "1.00",
    }
    setShiftRows([...shiftRows, newRow])
  }

  const handleDeleteRow = (id: string) => {
    setShiftRows(shiftRows.filter((row) => row.id !== id))
  }

  const handleMoveRow = (index: number, direction: "up" | "down") => {
    const newRows = [...shiftRows]
    if (direction === "up" && index > 0) {
      [newRows[index - 1], newRows[index]] = [newRows[index], newRows[index - 1]]
    } else if (direction === "down" && index < newRows.length - 1) {
      [newRows[index], newRows[index + 1]] = [newRows[index + 1], newRows[index]]
    }
    setShiftRows(newRows)
  }

  const handleClearField = (rowId: string, field: keyof ShiftTypeRow) => {
    setShiftRows(
      shiftRows.map((row) =>
        row.id === rowId ? { ...row, [field]: "" } : row
      )
    )
  }

  const handleFieldChange = (rowId: string, field: keyof ShiftTypeRow, value: string) => {
    setShiftRows(
      shiftRows.map((row) =>
        row.id === rowId ? { ...row, [field]: value } : row
      )
    )
  }

  const handleEdit = (shift: Shift) => {
    // TODO: Load shift data into form
    setIsEditing(true)
  }

  if (isEditing) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Update Shift Type</CardTitle>
              <CardDescription className="mt-1">Dashboard &gt; Shift Types</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Shift Types</h3>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Start Time</TableHead>
                      <TableHead>End Time</TableHead>
                      <TableHead>Days</TableHead>
                      <TableHead>Break Duration(hours)</TableHead>
                      <TableHead>Overtime Multiplier</TableHead>
                      <TableHead className="w-[100px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {shiftRows.map((row, index) => (
                      <TableRow key={row.id}>
                        <TableCell>
                          <Input
                            value={row.name}
                            onChange={(e) => handleFieldChange(row.id, "name", e.target.value)}
                            className="w-full"
                            placeholder="Shift name"
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Input
                              type="time"
                              value={row.startTime}
                              onChange={(e) => handleFieldChange(row.id, "startTime", e.target.value)}
                              className="w-full"
                              step="1"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleClearField(row.id, "startTime")}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                            <div className="flex flex-col">
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-4 w-8 p-0"
                                onClick={() => handleMoveRow(index, "up")}
                                disabled={index === 0}
                              >
                                <ChevronUp className="h-3 w-3" />
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-4 w-8 p-0"
                                onClick={() => handleMoveRow(index, "down")}
                                disabled={index === shiftRows.length - 1}
                              >
                                <ChevronDown className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Input
                              type="time"
                              value={row.endTime}
                              onChange={(e) => handleFieldChange(row.id, "endTime", e.target.value)}
                              className="w-full"
                              step="1"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleClearField(row.id, "endTime")}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                            <div className="flex flex-col">
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-4 w-8 p-0"
                                onClick={() => handleMoveRow(index, "up")}
                                disabled={index === 0}
                              >
                                <ChevronUp className="h-3 w-3" />
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-4 w-8 p-0"
                                onClick={() => handleMoveRow(index, "down")}
                                disabled={index === shiftRows.length - 1}
                              >
                                <ChevronDown className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Input
                              value={row.days}
                              onChange={(e) => handleFieldChange(row.id, "days", e.target.value)}
                              className="w-full"
                              placeholder="Monday x + 4"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleClearField(row.id, "days")}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                            <div className="flex flex-col">
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-4 w-8 p-0"
                                onClick={() => handleMoveRow(index, "up")}
                                disabled={index === 0}
                              >
                                <ChevronUp className="h-3 w-3" />
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-4 w-8 p-0"
                                onClick={() => handleMoveRow(index, "down")}
                                disabled={index === shiftRows.length - 1}
                              >
                                <ChevronDown className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            step="0.01"
                            value={row.breakDuration}
                            onChange={(e) => handleFieldChange(row.id, "breakDuration", e.target.value)}
                            className="w-full"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            step="0.01"
                            value={row.overtimeMultiplier}
                            onChange={(e) => handleFieldChange(row.id, "overtimeMultiplier", e.target.value)}
                            className="w-full"
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {index === shiftRows.length - 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-green-600 hover:text-green-700"
                                onClick={handleAddRow}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-600 hover:text-red-700"
                              onClick={() => handleDeleteRow(row.id)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
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

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Shift Types</CardTitle>
            <CardDescription>Manage work shift schedules</CardDescription>
          </div>
          <Button onClick={() => setIsEditing(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          data={shifts}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          onView={(shift) => {
            // TODO: Implement view
            console.log("View", shift)
          }}
          onEdit={(shift) => {
            handleEdit(shift)
          }}
          onDelete={(shift) => {
            // TODO: Implement delete
            console.log("Delete", shift)
          }}
        />
      </CardContent>
    </Card>
  )
} 