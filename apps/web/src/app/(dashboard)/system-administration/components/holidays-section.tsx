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
import { Plus, ArrowLeft, CalendarIcon, Loader2, X } from "lucide-react"
import { useState } from "react"
import { DataTable } from "@/components/holidays/data-table"
import { type Holiday } from "@/components/holidays/columns"
import { useHolidays, useCreateHoliday, useUpdateHoliday, useDeleteHoliday } from "@/hooks/useHolidays"
import { toast } from "sonner"

export function HolidaysSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  // Hooks
  const { data: holidays = [], isLoading, error } = useHolidays()
  const createMutation = useCreateHoliday()
  const updateMutation = useUpdateHoliday()
  const deleteMutation = useDeleteHoliday()
  
  // Form state - for single holiday entry
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    year: new Date().getFullYear(),
    description: "",
    isRecurring: false,
  })

  // Convert holidays to match the Holiday type from columns
  const holidayData: Holiday[] = holidays.map((holiday) => ({
    id: holiday.id,
    name: holiday.name,
    date: new Date(holiday.date).toLocaleDateString(),
    year: holiday.year,
    description: holiday.description || undefined,
    isRecurring: holiday.isRecurring,
    createdAt: new Date(holiday.createdAt).toLocaleDateString(),
  }))

  // Generate year options (current year ± 10 years)
  const currentYear = new Date().getFullYear()
  const yearOptions = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i)

  const resetForm = () => {
    setFormData({
      name: "",
      date: "",
      year: new Date().getFullYear(),
      description: "",
      isRecurring: false,
    })
    setEditingId(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.date) {
      toast.error("Please select a date")
      return
    }

    try {
      if (editingId) {
        await updateMutation.mutateAsync({
          id: editingId,
          data: {
            name: formData.name,
            date: formData.date,
            year: formData.year,
            description: formData.description || null,
            isRecurring: formData.isRecurring,
          },
        })
        toast.success("Holiday updated successfully")
      } else {
        await createMutation.mutateAsync({
          name: formData.name,
          date: formData.date,
          year: formData.year,
          description: formData.description || null,
          isRecurring: formData.isRecurring,
        })
        toast.success("Holiday created successfully")
      }
      
      setIsCreating(false)
      setEditingId(null)
      resetForm()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save holiday")
    }
  }

  const handleEdit = (holiday: Holiday) => {
    const fullHoliday = holidays.find((h) => h.id === holiday.id)
    if (fullHoliday) {
      const date = new Date(fullHoliday.date)
      setFormData({
        name: fullHoliday.name,
        date: date.toISOString().split('T')[0],
        year: fullHoliday.year,
        description: fullHoliday.description || "",
        isRecurring: fullHoliday.isRecurring,
      })
      setEditingId(fullHoliday.id)
      setIsCreating(true)
    }
  }

  const handleDelete = async (holiday: Holiday) => {
    if (!confirm(`Are you sure you want to delete "${holiday.name}"?`)) {
      return
    }

    try {
      await deleteMutation.mutateAsync(holiday.id)
      toast.success("Holiday deleted successfully")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete holiday")
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
              <CardTitle>{editingId ? 'Edit Holiday' : 'Add Holiday'}</CardTitle>
              <CardDescription className="mt-1">Dashboard &gt; Holidays</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Information Section */}
            <div className="space-y-4 p-4 border rounded-lg">
              <h3 className="text-lg font-semibold">Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter holiday name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">
                    Date <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => {
                        setFormData({ ...formData, date: e.target.value })
                        // Auto-update year based on selected date
                        if (e.target.value) {
                          const selectedYear = new Date(e.target.value).getFullYear()
                          setFormData((prev) => ({ ...prev, year: selectedYear }))
                        }
                      }}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">
                    Year <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.year.toString()}
                    onValueChange={(value) => setFormData({ ...formData, year: parseInt(value) })}
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
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter description"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="isRecurring">Recurring Holiday</Label>
                <input
                  id="isRecurring"
                  type="checkbox"
                  checked={formData.isRecurring}
                  onChange={(e) => setFormData({ ...formData, isRecurring: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300"
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

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Holidays</CardTitle>
          <CardDescription>Manage holiday calendars and public holidays</CardDescription>
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
          <CardTitle>Holidays</CardTitle>
          <CardDescription>Manage holiday calendars and public holidays</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-destructive">
            Error loading holidays: {error instanceof Error ? error.message : "Unknown error"}
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
            <CardTitle>Holidays</CardTitle>
            <CardDescription>Manage holiday calendars and public holidays</CardDescription>
          </div>
          <Button onClick={() => { setIsCreating(true); resetForm(); }}>
            <Plus className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          data={holidayData}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          onView={(holiday) => {
            handleEdit(holiday)
          }}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </CardContent>
    </Card>
  )
}
