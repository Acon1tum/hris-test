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
import { Plus, ArrowLeft, Minus, Loader2 } from "lucide-react"
import { useState } from "react"
import { DataTable } from "@/components/leave-policies/data-table"
import { type LeavePolicy } from "@/components/leave-policies/columns"
import { useLeavePolicies, useCreateLeavePolicy, useUpdateLeavePolicy, useDeleteLeavePolicy } from "@/hooks/useLeavePolicies"
import { useEmploymentTypes } from "@/hooks/useEmploymentTypes"
import { useLeaveTypes } from "@/hooks/useLeaveTypes"
import { toast } from "sonner"

export function LeavePoliciesSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  // Hooks
  const { data: leavePolicies = [], isLoading, error } = useLeavePolicies()
  const { data: employmentTypes = [] } = useEmploymentTypes()
  const { data: leaveTypes = [] } = useLeaveTypes()
  const createMutation = useCreateLeavePolicy()
  const updateMutation = useUpdateLeavePolicy()
  const deleteMutation = useDeleteLeavePolicy()
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    employmentTypeId: "none",
    leaveTypeId: "none",
    numberOfDays: 0,
  })

  // Convert leave policies to match the LeavePolicy type from columns
  const leavePolicyData: LeavePolicy[] = leavePolicies.map((policy) => ({
    id: policy.id,
    name: policy.name,
    description: policy.description || "",
    maxDays: policy.numberOfDays,
    createdAt: new Date(policy.createdAt).toLocaleDateString(),
  }))

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      employmentTypeId: "none",
      leaveTypeId: "none",
      numberOfDays: 0,
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
            employmentTypeId: formData.employmentTypeId === "none" ? null : formData.employmentTypeId,
            leaveTypeId: formData.leaveTypeId === "none" ? null : formData.leaveTypeId,
          },
        })
        toast.success("Leave policy updated successfully")
      } else {
        await createMutation.mutateAsync({
          ...formData,
          description: formData.description || null,
          employmentTypeId: formData.employmentTypeId === "none" ? null : formData.employmentTypeId,
          leaveTypeId: formData.leaveTypeId === "none" ? null : formData.leaveTypeId,
        })
        toast.success("Leave policy created successfully")
      }
      
      setIsCreating(false)
      setEditingId(null)
      resetForm()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save leave policy")
    }
  }

  const handleIncrementDays = () => {
    setFormData({ ...formData, numberOfDays: formData.numberOfDays + 1 })
  }

  const handleDecrementDays = () => {
    if (formData.numberOfDays > 0) {
      setFormData({ ...formData, numberOfDays: formData.numberOfDays - 1 })
    }
  }

  const handleEdit = (policy: LeavePolicy) => {
    const fullPolicy = leavePolicies.find((p) => p.id === policy.id)
    if (fullPolicy) {
      setFormData({
        name: fullPolicy.name,
        description: fullPolicy.description || "",
        employmentTypeId: fullPolicy.employmentTypeId || "none",
        leaveTypeId: fullPolicy.leaveTypeId || "none",
        numberOfDays: fullPolicy.numberOfDays,
      })
      setEditingId(fullPolicy.id)
      setIsCreating(true)
    }
  }

  const handleDelete = async (policy: LeavePolicy) => {
    if (!confirm(`Are you sure you want to delete "${policy.name}"?`)) {
      return
    }

    try {
      await deleteMutation.mutateAsync(policy.id)
      toast.success("Leave policy deleted successfully")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete leave policy")
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
              <CardTitle>{editingId ? 'Edit Leave Policy' : 'Create New Leave Policy'}</CardTitle>
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
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="resize-none"
                  placeholder="Enter description..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="employmentTypeId">Employment Type</Label>
                <Select
                  value={formData.employmentTypeId}
                  onValueChange={(value) => setFormData({ ...formData, employmentTypeId: value })}
                >
                  <SelectTrigger id="employmentTypeId">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {employmentTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="leaveTypeId">Leave Type</Label>
                <Select
                  value={formData.leaveTypeId}
                  onValueChange={(value) => setFormData({ ...formData, leaveTypeId: value })}
                >
                  <SelectTrigger id="leaveTypeId">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
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
                    onChange={(e) => setFormData({ ...formData, numberOfDays: parseInt(e.target.value) || 0 })}
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
            <CardTitle>Leave Policy</CardTitle>
            <CardDescription>Manage leave policies and allocations</CardDescription>
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
            Error loading leave policies: {error instanceof Error ? error.message : "Unknown error"}
          </div>
        ) : (
          <DataTable
            data={leavePolicyData}
            search={searchQuery}
            onSearchChange={setSearchQuery}
            onView={(policy) => {
              handleEdit(policy)
            }}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </CardContent>
    </Card>
  )
} 