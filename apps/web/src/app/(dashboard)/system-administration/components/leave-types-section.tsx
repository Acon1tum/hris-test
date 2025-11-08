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
import { Plus, ArrowLeft, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import { DataTable } from "@/components/leave-types/data-table"
import { type LeaveType } from "@/components/leave-types/columns"
import { useLeaveTypes, useCreateLeaveType, useUpdateLeaveType, useDeleteLeaveType } from "@/hooks/useLeaveTypes"
import { toast } from "sonner"

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
  const [editingId, setEditingId] = useState<string | null>(null)
  
  // Hooks
  const { data: leaveTypes = [], isLoading, error } = useLeaveTypes()
  const createMutation = useCreateLeaveType()
  const updateMutation = useUpdateLeaveType()
  const deleteMutation = useDeleteLeaveType()
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    daysPerYear: 0,
    description: "",
    applicableAfter: null as number | null,
    maxConsecutiveLeaves: null as number | null,
    earnedLeaveFrequency: "monthly",
    allocateOnDay: "joining-date",
    nonEncashableLeaves: null as number | null,
    fractionOfDailySalary: null as number | null,
    maxEncashableLeaves: null as number | null,
    maxCarryForward: 0,
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

  // Convert leave types to match the LeaveType type from columns
  const leaveTypeData: LeaveType[] = leaveTypes.map((type) => ({
    id: type.id,
    name: type.name,
    code: type.code,
    daysPerYear: type.daysPerYear,
    description: type.description || "",
    createdAt: new Date(type.createdAt).toLocaleDateString(),
  }))

  const resetForm = () => {
    setFormData({
      name: "",
      code: "",
      daysPerYear: 0,
      description: "",
      applicableAfter: null,
      maxConsecutiveLeaves: null,
      earnedLeaveFrequency: "monthly",
      allocateOnDay: "joining-date",
      nonEncashableLeaves: null,
      fractionOfDailySalary: null,
      maxEncashableLeaves: null,
      maxCarryForward: 0,
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
    setEditingId(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingId) {
        await updateMutation.mutateAsync({
          id: editingId,
          data: {
            ...formData,
            description: formData.description || null,
            applicableAfter: formData.applicableAfter,
            maxConsecutiveLeaves: formData.maxConsecutiveLeaves,
            earnedLeaveFrequency: formData.earnedLeaveFrequency || null,
            allocateOnDay: formData.allocateOnDay || null,
            nonEncashableLeaves: formData.nonEncashableLeaves,
            fractionOfDailySalary: formData.fractionOfDailySalary,
            maxEncashableLeaves: formData.maxEncashableLeaves,
          },
        })
        toast.success("Leave type updated successfully")
      } else {
        await createMutation.mutateAsync({
          ...formData,
          description: formData.description || null,
          applicableAfter: formData.applicableAfter,
          maxConsecutiveLeaves: formData.maxConsecutiveLeaves,
          earnedLeaveFrequency: formData.earnedLeaveFrequency || null,
          allocateOnDay: formData.allocateOnDay || null,
          nonEncashableLeaves: formData.nonEncashableLeaves,
          fractionOfDailySalary: formData.fractionOfDailySalary,
          maxEncashableLeaves: formData.maxEncashableLeaves,
        })
        toast.success("Leave type created successfully")
      }
      
      setIsCreating(false)
      setEditingId(null)
      resetForm()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save leave type")
    }
  }

  const handleEdit = (type: LeaveType) => {
    const fullType = leaveTypes.find((t) => t.id === type.id)
    if (fullType) {
      setFormData({
        name: fullType.name,
        code: fullType.code,
        daysPerYear: fullType.daysPerYear,
        description: fullType.description || "",
        applicableAfter: fullType.applicableAfter,
        maxConsecutiveLeaves: fullType.maxConsecutiveLeaves,
        earnedLeaveFrequency: fullType.earnedLeaveFrequency || "monthly",
        allocateOnDay: fullType.allocateOnDay || "joining-date",
        nonEncashableLeaves: fullType.nonEncashableLeaves,
        fractionOfDailySalary: fullType.fractionOfDailySalary ? Number(fullType.fractionOfDailySalary) : null,
        maxEncashableLeaves: fullType.maxEncashableLeaves,
        maxCarryForward: fullType.maxCarryForward,
        isEarnedLeave: fullType.isEarnedLeave,
        isPartiallyPaidLeave: fullType.isPartiallyPaidLeave,
        allowOverAllocation: fullType.allowOverAllocation,
        isEncashmentAllowed: fullType.isEncashmentAllowed,
        isCarryForward: fullType.isCarryForward,
        isOptionalLeave: fullType.isOptionalLeave,
        includeHolidaysWithinLeaves: fullType.includeHolidaysWithinLeaves,
        isLeaveWithoutPay: fullType.isLeaveWithoutPay,
        allowNegativeBalance: fullType.allowNegativeBalance,
        isCompensatory: fullType.isCompensatory,
        isIncrementalLeave: fullType.isIncrementalLeave,
      })
      setEditingId(fullType.id)
      setIsCreating(true)
    }
  }

  const handleDelete = async (type: LeaveType) => {
    if (!confirm(`Are you sure you want to delete "${type.name}"?`)) {
      return
    }

    try {
      await deleteMutation.mutateAsync(type.id)
      toast.success("Leave type deleted successfully")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete leave type")
    }
  }

  const handleCancel = () => {
    setIsCreating(false)
    setEditingId(null)
    resetForm()
  }

  // Auto-generate code from name
  useEffect(() => {
    if (!editingId && formData.name) {
      const code = formData.name
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, "")
        .slice(0, 10)
      setFormData((prev) => ({ ...prev, code }))
    }
  }, [formData.name, editingId])

  if (isCreating) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{editingId ? 'Edit Leave Type' : 'Create New Leave Type'}</CardTitle>
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
                <Label htmlFor="code">
                  Code <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  required
                  placeholder="Auto-generated from name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="daysPerYear">
                  Days Per Year <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="daysPerYear"
                  type="number"
                  min="0"
                  value={formData.daysPerYear}
                  onChange={(e) => setFormData({ ...formData, daysPerYear: parseInt(e.target.value) || 0 })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="applicableAfter">Applicable After (Working Days)</Label>
                <Input
                  id="applicableAfter"
                  type="number"
                  min="0"
                  value={formData.applicableAfter ?? ""}
                  onChange={(e) => setFormData({ ...formData, applicableAfter: e.target.value ? parseInt(e.target.value) : null })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxConsecutiveLeaves">Maximum Consecutive Leaves Allowed</Label>
                <Input
                  id="maxConsecutiveLeaves"
                  type="number"
                  min="0"
                  value={formData.maxConsecutiveLeaves ?? ""}
                  onChange={(e) => setFormData({ ...formData, maxConsecutiveLeaves: e.target.value ? parseInt(e.target.value) : null })}
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
                  min="0"
                  value={formData.nonEncashableLeaves ?? ""}
                  onChange={(e) => setFormData({ ...formData, nonEncashableLeaves: e.target.value ? parseInt(e.target.value) : null })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fractionOfDailySalary">Fraction Of Daily Salary Per Leave</Label>
                <Input
                  id="fractionOfDailySalary"
                  type="number"
                  step="0.01"
                  min="0"
                  max="1"
                  value={formData.fractionOfDailySalary ?? ""}
                  onChange={(e) => setFormData({ ...formData, fractionOfDailySalary: e.target.value ? parseFloat(e.target.value) : null })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxEncashableLeaves">Maximum Encashable Leaves</Label>
                <Input
                  id="maxEncashableLeaves"
                  type="number"
                  min="0"
                  value={formData.maxEncashableLeaves ?? ""}
                  onChange={(e) => setFormData({ ...formData, maxEncashableLeaves: e.target.value ? parseInt(e.target.value) : null })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxCarryForward">Max Carry Forward</Label>
                <Input
                  id="maxCarryForward"
                  type="number"
                  min="0"
                  value={formData.maxCarryForward}
                  onChange={(e) => setFormData({ ...formData, maxCarryForward: parseInt(e.target.value) || 0 })}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter description..."
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
                onClick={handleCancel}
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button 
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {(createMutation.isPending || updateMutation.isPending) && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {editingId ? "Update" : "Create"}
              </Button>
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
          <Button onClick={() => { setIsCreating(true); resetForm(); }}>
            <Plus className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <div className="text-center py-8 text-destructive">
            Error loading leave types: {error instanceof Error ? error.message : "Unknown error"}
          </div>
        ) : (
          <DataTable
            data={leaveTypeData}
            search={searchQuery}
            onSearchChange={setSearchQuery}
            onView={(type) => {
              handleEdit(type)
            }}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </CardContent>
    </Card>
  )
} 