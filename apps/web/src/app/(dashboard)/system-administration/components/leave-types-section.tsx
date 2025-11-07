"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, ArrowLeft } from "lucide-react"
import { useState } from "react"
import { DataTable } from "@/components/leave-types/data-table"
import { type LeaveType } from "@/components/leave-types/columns"

const leaveTypes: LeaveType[] = [
  { id: "1", name: "Annual Leave", code: "AL", daysPerYear: 15, description: "Annual vacation leave", createdAt: "July 24, 2025" },
  { id: "2", name: "Sick Leave", code: "SL", daysPerYear: 10, description: "Medical leave", createdAt: "July 24, 2025" },
  { id: "3", name: "Personal Leave", code: "PL", daysPerYear: 5, description: "Personal time off", createdAt: "July 24, 2025" },
]

// Sample data for dropdowns
const earnedLeaveFrequencies = [
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "yearly", label: "Yearly" },
]

const allocateOnDayOptions = [
  { value: "joining-date", label: "Joining Date" },
  { value: "anniversary", label: "Anniversary" },
  { value: "calendar-year", label: "Calendar Year" },
]

export function LeaveTypesSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    applicableAfter: "",
    maxConsecutiveLeaves: "",
    earnedLeaveFrequency: "monthly",
    allocateOnDay: "joining-date",
    nonEncashableLeaves: "",
    fractionOfDailySalary: "",
    maxEncashableLeaves: "",
    isEarnedLeave: false,
    isPartiallyPaidLeave: false,
    allowOverAllocation: false,
    isEncashmentAllowed: false,
    isCarryForward: false,
    isOptionalLeave: false,
    includeHolidaysWithinLeaves: false,
    isLeaveWithoutPay: false,
    allowNegativeBalance: false,
    isCompensatory: false,
    isIncrementalLeave: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement form submission
    console.log("Form data:", formData)
    setIsCreating(false)
  }

  const handleEdit = (type: LeaveType) => {
    // TODO: Load leave type data into form
    setIsCreating(true)
  }

  if (isCreating) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Add New Leave Type</CardTitle>
              <CardDescription className="mt-1">Dashboard &gt; Leave Types</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Top Section - Input Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                <Label htmlFor="applicableAfter">Applicable After (Working Days)</Label>
                <Input
                  id="applicableAfter"
                  type="number"
                  value={formData.applicableAfter}
                  onChange={(e) => setFormData({ ...formData, applicableAfter: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxConsecutiveLeaves">Maximum Consecutive Leaves Allowed</Label>
                <Input
                  id="maxConsecutiveLeaves"
                  type="number"
                  value={formData.maxConsecutiveLeaves}
                  onChange={(e) => setFormData({ ...formData, maxConsecutiveLeaves: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="earnedLeaveFrequency">Earned Leave Frequency</Label>
                <Select
                  value={formData.earnedLeaveFrequency}
                  onValueChange={(value) => setFormData({ ...formData, earnedLeaveFrequency: value })}
                >
                  <SelectTrigger id="earnedLeaveFrequency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {earnedLeaveFrequencies.map((freq) => (
                      <SelectItem key={freq.value} value={freq.value}>
                        {freq.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="allocateOnDay">Allocate On Day</Label>
                <Select
                  value={formData.allocateOnDay}
                  onValueChange={(value) => setFormData({ ...formData, allocateOnDay: value })}
                >
                  <SelectTrigger id="allocateOnDay">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {allocateOnDayOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nonEncashableLeaves">Non Encashable Leaves</Label>
                <Input
                  id="nonEncashableLeaves"
                  type="number"
                  value={formData.nonEncashableLeaves}
                  onChange={(e) => setFormData({ ...formData, nonEncashableLeaves: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fractionOfDailySalary">Fraction Of Daily Salary Per Leave</Label>
                <Input
                  id="fractionOfDailySalary"
                  type="number"
                  step="0.01"
                  value={formData.fractionOfDailySalary}
                  onChange={(e) => setFormData({ ...formData, fractionOfDailySalary: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxEncashableLeaves">Maximum Encashable Leaves</Label>
                <Input
                  id="maxEncashableLeaves"
                  type="number"
                  value={formData.maxEncashableLeaves}
                  onChange={(e) => setFormData({ ...formData, maxEncashableLeaves: e.target.value })}
                />
              </div>
            </div>

            {/* Middle Section - Toggle Switches */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t">
              {/* Column 1 */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="isEarnedLeave">Is Earned Leave</Label>
                  <Switch
                    id="isEarnedLeave"
                    checked={formData.isEarnedLeave}
                    onCheckedChange={(checked) => setFormData({ ...formData, isEarnedLeave: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="isPartiallyPaidLeave">Is Partially Paid Leave</Label>
                  <Switch
                    id="isPartiallyPaidLeave"
                    checked={formData.isPartiallyPaidLeave}
                    onCheckedChange={(checked) => setFormData({ ...formData, isPartiallyPaidLeave: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="allowOverAllocation">Allow Over Allocation</Label>
                  <Switch
                    id="allowOverAllocation"
                    checked={formData.allowOverAllocation}
                    onCheckedChange={(checked) => setFormData({ ...formData, allowOverAllocation: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="isEncashmentAllowed">Is Encashment Allowed</Label>
                  <Switch
                    id="isEncashmentAllowed"
                    checked={formData.isEncashmentAllowed}
                    onCheckedChange={(checked) => setFormData({ ...formData, isEncashmentAllowed: checked })}
                  />
                </div>
              </div>

              {/* Column 2 */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="isCarryForward">Is Carry Forward</Label>
                  <Switch
                    id="isCarryForward"
                    checked={formData.isCarryForward}
                    onCheckedChange={(checked) => setFormData({ ...formData, isCarryForward: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="isOptionalLeave">Is Optional Leave</Label>
                  <Switch
                    id="isOptionalLeave"
                    checked={formData.isOptionalLeave}
                    onCheckedChange={(checked) => setFormData({ ...formData, isOptionalLeave: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="includeHolidaysWithinLeaves">Include Holidays Within Leaves As Leaves</Label>
                  <Switch
                    id="includeHolidaysWithinLeaves"
                    checked={formData.includeHolidaysWithinLeaves}
                    onCheckedChange={(checked) => setFormData({ ...formData, includeHolidaysWithinLeaves: checked })}
                  />
                </div>
              </div>

              {/* Column 3 */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="isLeaveWithoutPay">Is Leave Without Pay</Label>
                  <Switch
                    id="isLeaveWithoutPay"
                    checked={formData.isLeaveWithoutPay}
                    onCheckedChange={(checked) => setFormData({ ...formData, isLeaveWithoutPay: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="allowNegativeBalance">Allow Negative Balance</Label>
                  <Switch
                    id="allowNegativeBalance"
                    checked={formData.allowNegativeBalance}
                    onCheckedChange={(checked) => setFormData({ ...formData, allowNegativeBalance: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="isCompensatory">Is Compensatory</Label>
                  <Switch
                    id="isCompensatory"
                    checked={formData.isCompensatory}
                    onCheckedChange={(checked) => setFormData({ ...formData, isCompensatory: checked })}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Section - Single Toggle */}
            <div className="pt-4 border-t">
              <div className="flex items-center justify-between">
                <Label htmlFor="isIncrementalLeave">Is Incremental Leave</Label>
                <Switch
                  id="isIncrementalLeave"
                  checked={formData.isIncrementalLeave}
                  onCheckedChange={(checked) => setFormData({ ...formData, isIncrementalLeave: checked })}
                />
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
            <CardTitle>Leave Types</CardTitle>
            <CardDescription>Manage leave type definitions and rules</CardDescription>
          </div>
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          data={leaveTypes}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          onView={(type) => {
            // TODO: Implement view
            console.log("View", type)
          }}
          onEdit={(type) => {
            handleEdit(type)
          }}
          onDelete={(type) => {
            // TODO: Implement delete
            console.log("Delete", type)
          }}
        />
      </CardContent>
    </Card>
  )
} 