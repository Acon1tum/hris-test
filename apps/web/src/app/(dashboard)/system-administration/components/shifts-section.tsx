"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, ArrowLeft, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import { DataTable } from "@/components/shifts/data-table"
import { type Shift } from "@/components/shifts/columns"
import { useShifts, useCreateShift, useUpdateShift, useDeleteShift } from "@/hooks/useShifts"
import { toast } from "sonner"

export function ShiftsSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  // Hooks
  const { data: shifts = [], isLoading, error } = useShifts()
  const createMutation = useCreateShift()
  const updateMutation = useUpdateShift()
  const deleteMutation = useDeleteShift()
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    startTime: "08:00:00",
    endTime: "17:00:00",
    days: null as string | null,
    breakDuration: null as number | null,
    overtimeMultiplier: null as number | null,
  })

  // Convert shifts to match the Shift type from columns
  const shiftData: Shift[] = shifts.map((shift) => ({
    id: shift.id,
    name: shift.name,
    code: shift.code,
    startTime: shift.startTime,
    endTime: shift.endTime,
    createdAt: new Date(shift.createdAt).toLocaleDateString(),
  }))

  // Auto-generate code from name
  useEffect(() => {
    if (formData.name && !editingId) {
      const code = formData.name
        .toUpperCase()
        .replace(/\s+/g, '-')
        .replace(/[^A-Z0-9-]/g, '')
        .substring(0, 20)
      setFormData((prev) => ({ ...prev, code }))
    }
  }, [formData.name, editingId])

  const resetForm = () => {
    setFormData({
      name: "",
      code: "",
      startTime: "08:00:00",
      endTime: "17:00:00",
      days: null,
      breakDuration: null,
      overtimeMultiplier: null,
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
            name: formData.name,
            code: formData.code,
            startTime: formData.startTime,
            endTime: formData.endTime,
            days: formData.days,
            breakDuration: formData.breakDuration,
            overtimeMultiplier: formData.overtimeMultiplier,
          },
        })
        toast.success("Shift updated successfully")
      } else {
        await createMutation.mutateAsync({
          name: formData.name,
          code: formData.code,
          startTime: formData.startTime,
          endTime: formData.endTime,
          days: formData.days,
          breakDuration: formData.breakDuration,
          overtimeMultiplier: formData.overtimeMultiplier,
        })
        toast.success("Shift created successfully")
      }
      
      setIsCreating(false)
      setEditingId(null)
      resetForm()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save shift")
    }
  }

  const handleEdit = (shift: Shift) => {
    const fullShift = shifts.find((s) => s.id === shift.id)
    if (fullShift) {
      setFormData({
        name: fullShift.name,
        code: fullShift.code,
        startTime: fullShift.startTime,
        endTime: fullShift.endTime,
        days: fullShift.days,
        breakDuration: fullShift.breakDuration ? Number(fullShift.breakDuration) : null,
        overtimeMultiplier: fullShift.overtimeMultiplier ? Number(fullShift.overtimeMultiplier) : null,
      })
      setEditingId(fullShift.id)
      setIsCreating(true)
    }
  }

  const handleDelete = async (shift: Shift) => {
    if (!confirm(`Are you sure you want to delete "${shift.name}"?`)) {
      return
    }

    try {
      await deleteMutation.mutateAsync(shift.id)
      toast.success("Shift deleted successfully")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete shift")
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
              <CardTitle>{editingId ? 'Edit Shift' : 'Create New Shift'}</CardTitle>
              <CardDescription className="mt-1">Dashboard &gt; Shift Types</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter shift name"
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
                    placeholder="Enter shift code"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">
                    Start Time <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="startTime"
                    type="time"
                    step="1"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endTime">
                    End Time <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="endTime"
                    type="time"
                    step="1"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="days">Days</Label>
                <Input
                  id="days"
                  value={formData.days || ""}
                  onChange={(e) => setFormData({ ...formData, days: e.target.value || null })}
                  placeholder="e.g., Monday x + 4"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="breakDuration">Break Duration (hours)</Label>
                  <Input
                    id="breakDuration"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.breakDuration ?? ""}
                    onChange={(e) => setFormData({ ...formData, breakDuration: e.target.value ? parseFloat(e.target.value) : null })}
                    placeholder="Enter break duration"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="overtimeMultiplier">Overtime Multiplier</Label>
                  <Input
                    id="overtimeMultiplier"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.overtimeMultiplier ?? ""}
                    onChange={(e) => setFormData({ ...formData, overtimeMultiplier: e.target.value ? parseFloat(e.target.value) : null })}
                    placeholder="Enter overtime multiplier"
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
          <CardTitle>Shift Types</CardTitle>
          <CardDescription>Manage work shift schedules</CardDescription>
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
          <CardTitle>Shift Types</CardTitle>
          <CardDescription>Manage work shift schedules</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-destructive">
            Error loading shifts: {error instanceof Error ? error.message : "Unknown error"}
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
            <CardTitle>Shift Types</CardTitle>
            <CardDescription>Manage work shift schedules</CardDescription>
          </div>
          <Button onClick={() => { setIsCreating(true); resetForm(); }}>
            <Plus className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          data={shiftData}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          onView={(shift) => {
            handleEdit(shift)
          }}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </CardContent>
    </Card>
  )
}
