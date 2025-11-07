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
import { Plus, ArrowLeft, Minus } from "lucide-react"
import { useState } from "react"
import { DataTable } from "@/components/leave-policies/data-table"
import { type LeavePolicy } from "@/components/leave-policies/columns"

const leavePolicies: LeavePolicy[] = [
  { id: "1", name: "Standard Leave Policy", description: "Standard annual leave allocation", maxDays: 15, createdAt: "July 24, 2025" },
  { id: "2", name: "Manager Leave Policy", description: "Enhanced leave for managers", maxDays: 20, createdAt: "July 24, 2025" },
]

// Sample data for dropdowns
const employmentTypes = [
  { id: "1", name: "Full Time" },
  { id: "2", name: "Part Time" },
  { id: "3", name: "Contract" },
  { id: "4", name: "Temporary" },
]

const leaveTypes = [
  { id: "1", name: "Annual Leave" },
  { id: "2", name: "Sick Leave" },
  { id: "3", name: "Personal Leave" },
  { id: "4", name: "Casual Leave" },
]

export function LeavePoliciesSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    employmentType: "",
    leaveType: "",
    numberOfDays: "0",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement form submission
    console.log("Form data:", formData)
    setIsCreating(false)
  }

  const handleIncrementDays = () => {
    const currentDays = parseInt(formData.numberOfDays) || 0
    setFormData({ ...formData, numberOfDays: (currentDays + 1).toString() })
  }

  const handleDecrementDays = () => {
    const currentDays = parseInt(formData.numberOfDays) || 0
    if (currentDays > 0) {
      setFormData({ ...formData, numberOfDays: (currentDays - 1).toString() })
    }
  }

  const handleEdit = (policy: LeavePolicy) => {
    // TODO: Load leave policy data into form
    setIsCreating(true)
  }

  if (isCreating) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Add New Leave Policy</CardTitle>
              <CardDescription className="mt-1">Dashboard &gt; Leave Policies</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <Label htmlFor="employmentType">
                  Employment Type <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.employmentType}
                  onValueChange={(value) => setFormData({ ...formData, employmentType: value })}
                  required
                >
                  <SelectTrigger id="employmentType">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {employmentTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="leaveType">
                  Leave Type <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.leaveType}
                  onValueChange={(value) => setFormData({ ...formData, leaveType: value })}
                  required
                >
                  <SelectTrigger id="leaveType">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {leaveTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="numberOfDays">
                  Number of Days <span className="text-destructive">*</span>
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="numberOfDays"
                    type="number"
                    value={formData.numberOfDays}
                    onChange={(e) => setFormData({ ...formData, numberOfDays: e.target.value })}
                    min="0"
                    required
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleIncrementDays}
                    className="h-9 w-9 text-green-600 hover:text-green-700"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleDecrementDays}
                    className="h-9 w-9 text-red-600 hover:text-red-700"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
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

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Leave Policy</CardTitle>
            <CardDescription>Manage leave policies and allocations</CardDescription>
          </div>
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          data={leavePolicies}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          onView={(policy) => {
            // TODO: Implement view
            console.log("View", policy)
          }}
          onEdit={(policy) => {
            handleEdit(policy)
          }}
          onDelete={(policy) => {
            // TODO: Implement delete
            console.log("Delete", policy)
          }}
        />
      </CardContent>
    </Card>
  )
} 