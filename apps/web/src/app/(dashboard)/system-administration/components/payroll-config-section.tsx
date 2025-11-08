"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, Plus, Loader2 } from "lucide-react"
import { useState } from "react"
import { DataTable } from "@/components/payroll-configs/data-table"
import { type PayrollConfig } from "@/components/payroll-configs/columns"
import { usePayrollConfigs, useCreatePayrollConfig, useUpdatePayrollConfig, useDeletePayrollConfig } from "@/hooks/usePayrollConfigs"
import { useOrganizations } from "@/hooks/useOrganizations"
import { toast } from "sonner"

// Sample data for dropdowns
const payrollFrequencies = [
  { value: "weekly", label: "Weekly" },
  { value: "bi-weekly", label: "Bi-Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "annually", label: "Annually" },
]

export function PayrollConfigSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  // Hooks
  const { data: payrollConfigs = [], isLoading, error } = usePayrollConfigs()
  const { data: organizations = [] } = useOrganizations()
  const createMutation = useCreatePayrollConfig()
  const updateMutation = useUpdatePayrollConfig()
  const deleteMutation = useDeletePayrollConfig()
  
  // Form state
  const [formData, setFormData] = useState({
    payrollFrequency: "monthly",
    automatedPayroll: false,
    organizationId: null as string | null,
  })

  // Convert payroll configs to match the PayrollConfig type from columns
  const payrollConfigData: PayrollConfig[] = payrollConfigs.map((config) => ({
    id: config.id,
    payrollFrequency: config.payrollFrequency,
    automatedPayroll: config.automatedPayroll,
    createdAt: new Date(config.createdAt).toLocaleDateString(),
  }))

  const resetForm = () => {
    setFormData({
      payrollFrequency: "monthly",
      automatedPayroll: false,
      organizationId: null,
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
            payrollFrequency: formData.payrollFrequency,
            automatedPayroll: formData.automatedPayroll,
            organizationId: formData.organizationId,
          },
        })
        toast.success("Payroll configuration updated successfully")
      } else {
        await createMutation.mutateAsync({
          payrollFrequency: formData.payrollFrequency,
          automatedPayroll: formData.automatedPayroll,
          organizationId: formData.organizationId,
        })
        toast.success("Payroll configuration created successfully")
      }
      
      setIsCreating(false)
      setEditingId(null)
      resetForm()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save payroll configuration")
    }
  }

  const handleEdit = (config: PayrollConfig) => {
    const fullConfig = payrollConfigs.find((c) => c.id === config.id)
    if (fullConfig) {
      setFormData({
        payrollFrequency: fullConfig.payrollFrequency,
        automatedPayroll: fullConfig.automatedPayroll,
        organizationId: fullConfig.organizationId || null,
      })
      setEditingId(fullConfig.id)
      setIsCreating(true)
    }
  }

  const handleDelete = async (config: PayrollConfig) => {
    if (!confirm(`Are you sure you want to delete this payroll configuration?`)) {
      return
    }

    try {
      await deleteMutation.mutateAsync(config.id)
      toast.success("Payroll configuration deleted successfully")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete payroll configuration")
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
          <CardTitle>{editingId ? 'Edit Payroll Configuration' : 'Setup Payroll Configuration'}</CardTitle>
          <CardDescription className="mt-1">Dashboard &gt; Payroll Configuration</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="organizationId">Organization</Label>
                <Select
                  value={formData.organizationId || "none"}
                  onValueChange={(value) => setFormData({ ...formData, organizationId: value === "none" ? null : value })}
                >
                  <SelectTrigger id="organizationId">
                    <SelectValue placeholder="Select Organization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {organizations.map((org) => (
                      <SelectItem key={org.id} value={org.id}>
                        {org.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="payrollFrequency">
                  Payroll Frequency <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.payrollFrequency}
                  onValueChange={(value) => setFormData({ ...formData, payrollFrequency: value })}
                  required
                >
                  <SelectTrigger id="payrollFrequency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {payrollFrequencies.map((freq) => (
                      <SelectItem key={freq.value} value={freq.value}>
                        {freq.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="automatedPayroll">Automated Payroll</Label>
                <Switch
                  id="automatedPayroll"
                  checked={formData.automatedPayroll}
                  onCheckedChange={(checked) => setFormData({ ...formData, automatedPayroll: checked })}
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
          <CardTitle>Payroll Configuration</CardTitle>
          <CardDescription>Manage payroll configuration settings</CardDescription>
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
          <CardTitle>Payroll Configuration</CardTitle>
          <CardDescription>Manage payroll configuration settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-destructive">
            Error loading payroll configurations: {error instanceof Error ? error.message : "Unknown error"}
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
            <CardTitle>Payroll Configuration</CardTitle>
            <CardDescription>Manage payroll configuration settings</CardDescription>
          </div>
          <Button onClick={() => { setIsCreating(true); resetForm(); }}>
            <Plus className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          data={payrollConfigData}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          onView={(config) => {
            handleEdit(config)
          }}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </CardContent>
    </Card>
  )
}
