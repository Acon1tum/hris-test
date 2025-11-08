"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, ArrowLeft, Loader2 } from "lucide-react"
import { useState } from "react"
import { DataTable } from "@/components/overtime/data-table"
import { type OvertimePolicy } from "@/components/overtime/columns"
import { useOvertimePolicies, useCreateOvertimePolicy, useUpdateOvertimePolicy, useDeleteOvertimePolicy } from "@/hooks/useOvertimePolicies"
import { toast } from "sonner"

// Sample data for dropdowns
const overtimePayComponents = [
  { id: "1", name: "Basic Overtime Pay" },
  { id: "2", name: "Premium Overtime Pay" },
  { id: "3", name: "Holiday Overtime Pay" },
]

const calculateBasedOnOptions = [
  { value: "total-gross", label: "Total Gross" },
  { value: "basic-salary", label: "Basic Salary" },
  { value: "hourly-rate", label: "Hourly Rate" },
]

export function OvertimeSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  // Hooks
  const { data: overtimePolicies = [], isLoading, error } = useOvertimePolicies()
  const createMutation = useCreateOvertimePolicy()
  const updateMutation = useUpdateOvertimePolicy()
  const deleteMutation = useDeleteOvertimePolicy()
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    overtimePayComponent: null as string | null,
    description: "",
    regularHoursPerDay: 8,
    regularHoursPerWeek: 40,
    weekdayOvertimeMultiplier: 1.5,
    weekendMultiplier: 1.5,
    holidayMultiplier: 2.0,
    maxDailyOvertimeHours: null as number | null,
    maxWeeklyOvertimeHours: null as number | null,
    maxMonthlyOvertimeHours: null as number | null,
    calculateBasedOn: "total-gross",
    applicableAfterWorkingDays: null as number | null,
  })

  // Convert overtime policies to match the OvertimePolicy type from columns
  const overtimePolicyData: OvertimePolicy[] = overtimePolicies.map((policy) => ({
    id: policy.id,
    name: policy.name,
    rate: `${policy.weekdayOvertimeMultiplier}x`,
    description: policy.description || "",
    createdAt: new Date(policy.createdAt).toLocaleDateString(),
  }))

  const resetForm = () => {
    setFormData({
      name: "",
      overtimePayComponent: null,
      description: "",
      regularHoursPerDay: 8,
      regularHoursPerWeek: 40,
      weekdayOvertimeMultiplier: 1.5,
      weekendMultiplier: 1.5,
      holidayMultiplier: 2.0,
      maxDailyOvertimeHours: null,
      maxWeeklyOvertimeHours: null,
      maxMonthlyOvertimeHours: null,
      calculateBasedOn: "total-gross",
      applicableAfterWorkingDays: null,
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
            overtimePayComponent: formData.overtimePayComponent || null,
            maxDailyOvertimeHours: formData.maxDailyOvertimeHours,
            maxWeeklyOvertimeHours: formData.maxWeeklyOvertimeHours,
            maxMonthlyOvertimeHours: formData.maxMonthlyOvertimeHours,
            applicableAfterWorkingDays: formData.applicableAfterWorkingDays,
          },
        })
        toast.success("Overtime policy updated successfully")
      } else {
        await createMutation.mutateAsync({
          ...formData,
          description: formData.description || null,
          overtimePayComponent: formData.overtimePayComponent || null,
          maxDailyOvertimeHours: formData.maxDailyOvertimeHours,
          maxWeeklyOvertimeHours: formData.maxWeeklyOvertimeHours,
          maxMonthlyOvertimeHours: formData.maxMonthlyOvertimeHours,
          applicableAfterWorkingDays: formData.applicableAfterWorkingDays,
        })
        toast.success("Overtime policy created successfully")
      }
      
      setIsCreating(false)
      setEditingId(null)
      resetForm()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save overtime policy")
    }
  }

  const handleEdit = (policy: OvertimePolicy) => {
    const fullPolicy = overtimePolicies.find((p) => p.id === policy.id)
    if (fullPolicy) {
      setFormData({
        name: fullPolicy.name,
        overtimePayComponent: fullPolicy.overtimePayComponent,
        description: fullPolicy.description || "",
        regularHoursPerDay: fullPolicy.regularHoursPerDay,
        regularHoursPerWeek: fullPolicy.regularHoursPerWeek,
        weekdayOvertimeMultiplier: Number(fullPolicy.weekdayOvertimeMultiplier),
        weekendMultiplier: Number(fullPolicy.weekendMultiplier),
        holidayMultiplier: Number(fullPolicy.holidayMultiplier),
        maxDailyOvertimeHours: fullPolicy.maxDailyOvertimeHours,
        maxWeeklyOvertimeHours: fullPolicy.maxWeeklyOvertimeHours,
        maxMonthlyOvertimeHours: fullPolicy.maxMonthlyOvertimeHours,
        calculateBasedOn: fullPolicy.calculateBasedOn,
        applicableAfterWorkingDays: fullPolicy.applicableAfterWorkingDays,
      })
      setEditingId(fullPolicy.id)
      setIsCreating(true)
    }
  }

  const handleDelete = async (policy: OvertimePolicy) => {
    if (!confirm(`Are you sure you want to delete "${policy.name}"?`)) {
      return
    }

    try {
      await deleteMutation.mutateAsync(policy.id)
      toast.success("Overtime policy deleted successfully")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete overtime policy")
    }
  }

  const handleCancel = () => {
    setIsCreating(false)
    setEditingId(null)
    resetForm()
  }

  if (isCreating) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{editingId ? 'Edit Overtime Policy' : 'Create New Overtime Policy'}</CardTitle>
              <CardDescription className="mt-1">Dashboard &gt; Overtime Policies</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Policy Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Policy Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter Overtime Policy Name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="overtimePayComponent">
                    Select Overtime Pay Component
                  </Label>
                  <Select
                    value={formData.overtimePayComponent || "none"}
                    onValueChange={(value) => setFormData({ ...formData, overtimePayComponent: value === "none" ? null : value })}
                  >
                    <SelectTrigger id="overtimePayComponent">
                      <SelectValue placeholder="Select Overtime Pay Component" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {overtimePayComponents.map((component) => (
                        <SelectItem key={component.id} value={component.id}>
                          {component.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter a description for the policy"
                  rows={4}
                  className="resize-none"
                />
              </div>
            </div>

            {/* Regular Hours */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-lg font-semibold">Regular Hours</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="regularHoursPerDay">
                    Regular Hours Per Day <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="regularHoursPerDay"
                    type="number"
                    value={formData.regularHoursPerDay}
                    onChange={(e) => setFormData({ ...formData, regularHoursPerDay: parseInt(e.target.value) || 8 })}
                    placeholder="Enter Regular Hours Per Day. Example: 8"
                    min="0"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="regularHoursPerWeek">
                    Regular Hours Per Week <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="regularHoursPerWeek"
                    type="number"
                    value={formData.regularHoursPerWeek}
                    onChange={(e) => setFormData({ ...formData, regularHoursPerWeek: parseInt(e.target.value) || 40 })}
                    placeholder="Enter Regular Hours Per Week. Example: 40"
                    min="0"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Overtime Rates */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-lg font-semibold">Overtime Rates</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weekdayOvertimeMultiplier">
                    Weekday Overtime Multiplier <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="weekdayOvertimeMultiplier"
                    type="number"
                    step="0.1"
                    value={formData.weekdayOvertimeMultiplier}
                    onChange={(e) => setFormData({ ...formData, weekdayOvertimeMultiplier: parseFloat(e.target.value) || 1.5 })}
                    placeholder="Enter Weekday Overtime Multiplier. Example: 1.5"
                    min="0"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weekendMultiplier">
                    Weekend Multiplier <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="weekendMultiplier"
                    type="number"
                    step="0.1"
                    value={formData.weekendMultiplier}
                    onChange={(e) => setFormData({ ...formData, weekendMultiplier: parseFloat(e.target.value) || 1.5 })}
                    placeholder="Enter Weekend Multiplier. Example: 1.5"
                    min="0"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="holidayMultiplier">
                    Holiday Multiplier <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="holidayMultiplier"
                    type="number"
                    step="0.1"
                    value={formData.holidayMultiplier}
                    onChange={(e) => setFormData({ ...formData, holidayMultiplier: parseFloat(e.target.value) || 2.0 })}
                    placeholder="Enter Holiday Multiplier. Example: 2.0"
                    min="0"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Max Overtime Hours */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-lg font-semibold">Max Overtime Hours</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxDailyOvertimeHours">Max Daily Overtime Hours</Label>
                  <Input
                    id="maxDailyOvertimeHours"
                    type="number"
                    min="0"
                    value={formData.maxDailyOvertimeHours ?? ""}
                    onChange={(e) => setFormData({ ...formData, maxDailyOvertimeHours: e.target.value ? parseInt(e.target.value) : null })}
                    placeholder="Enter Max Daily Overtime Hours. Example: 4"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxWeeklyOvertimeHours">Max Weekly Overtime Hours</Label>
                  <Input
                    id="maxWeeklyOvertimeHours"
                    type="number"
                    min="0"
                    value={formData.maxWeeklyOvertimeHours ?? ""}
                    onChange={(e) => setFormData({ ...formData, maxWeeklyOvertimeHours: e.target.value ? parseInt(e.target.value) : null })}
                    placeholder="Enter Max Weekly Overtime Hours. Example: 10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxMonthlyOvertimeHours">Max Monthly Overtime Hours</Label>
                  <Input
                    id="maxMonthlyOvertimeHours"
                    type="number"
                    min="0"
                    value={formData.maxMonthlyOvertimeHours ?? ""}
                    onChange={(e) => setFormData({ ...formData, maxMonthlyOvertimeHours: e.target.value ? parseInt(e.target.value) : null })}
                    placeholder="Enter Max Monthly Overtime Hours. Example: 40"
                  />
                </div>
              </div>
            </div>

            {/* Overtime Policy Settings */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-lg font-semibold">Overtime Policy Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="calculateBasedOn">
                    Calculate Based On <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.calculateBasedOn}
                    onValueChange={(value) => setFormData({ ...formData, calculateBasedOn: value })}
                    required
                  >
                    <SelectTrigger id="calculateBasedOn">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {calculateBasedOnOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="applicableAfterWorkingDays">Applicable After Working Days</Label>
                  <Input
                    id="applicableAfterWorkingDays"
                    type="number"
                    min="0"
                    value={formData.applicableAfterWorkingDays ?? ""}
                    onChange={(e) => setFormData({ ...formData, applicableAfterWorkingDays: e.target.value ? parseInt(e.target.value) : null })}
                    placeholder="Enter number of working days"
                  />
                </div>
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

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Overtime Policies</CardTitle>
          <CardDescription>Manage overtime compensation policies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Overtime Policies</CardTitle>
          <CardDescription>Manage overtime compensation policies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-destructive">
            Error loading overtime policies: {error instanceof Error ? error.message : "Unknown error"}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Overtime Policies</CardTitle>
            <CardDescription>Manage overtime compensation policies</CardDescription>
          </div>
          <Button onClick={() => { setIsCreating(true); resetForm(); }}>
            <Plus className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          data={overtimePolicyData}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          onView={(policy) => {
            handleEdit(policy)
          }}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </CardContent>
    </Card>
  )
} 