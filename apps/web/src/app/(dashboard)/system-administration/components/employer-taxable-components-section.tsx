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
import { Plus, ArrowLeft, ChevronUp, ChevronDown, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import { DataTable } from "@/components/employer-taxable-components/data-table"
import { type EmployerTaxableComponent } from "@/components/employer-taxable-components/columns"
import { useEmployerTaxableComponents, useCreateEmployerTaxableComponent, useUpdateEmployerTaxableComponent, useDeleteEmployerTaxableComponent } from "@/hooks/useEmployerTaxableComponents"
import { toast } from "sonner"

// Sample data for dropdowns
const componentTypes = [
  { value: "superannuation", label: "Superannuation" },
  { value: "tax", label: "Tax" },
  { value: "insurance", label: "Insurance" },
  { value: "pension", label: "Pension" },
]

const rateTypes = [
  { value: "fixed", label: "Fixed" },
  { value: "percentage", label: "Percentage" },
  { value: "variable", label: "Variable" },
]

const accounts = [
  { value: "101-10207", label: "101-10207 - Wages & Bonous" },
  { value: "101-10402", label: "101-10402 - Tax Disbursment" },
  { value: "204-10103", label: "204-10103 - Bank Loan Payable" },
  { value: "101-10205", label: "101-10205 - Payroll Clearing Account" },
]

const entryTypes = [
  { value: "debit", label: "Debit" },
  { value: "credit", label: "Credit" },
]

export function EmployerTaxableComponentsSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  // Hooks
  const { data: employerTaxableComponents = [], isLoading, error } = useEmployerTaxableComponents()
  const createMutation = useCreateEmployerTaxableComponent()
  const updateMutation = useUpdateEmployerTaxableComponent()
  const deleteMutation = useDeleteEmployerTaxableComponent()
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    abbreviation: "",
    type: "superannuation",
    description: "",
    rateType: "fixed",
    rate: 0,
    account: null as string | null,
    entryType: "debit",
  })

  // Convert employer taxable components to match the EmployerTaxableComponent type from columns
  const componentData: EmployerTaxableComponent[] = employerTaxableComponents.map((component) => ({
    id: component.id,
    name: component.name,
    code: component.code,
    type: component.type,
    taxType: component.type, // Map type to taxType for backward compatibility
    description: component.description || "",
    createdAt: new Date(component.createdAt).toLocaleDateString(),
  }))

  // Auto-generate code from abbreviation
  useEffect(() => {
    if (formData.abbreviation && !editingId) {
      const code = formData.abbreviation
        .toUpperCase()
        .replace(/\s+/g, '-')
        .replace(/[^A-Z0-9-]/g, '')
        .substring(0, 20)
      // Don't auto-update if user is typing
    }
  }, [formData.abbreviation, editingId])

  const resetForm = () => {
    setFormData({
      name: "",
      abbreviation: "",
      type: "superannuation",
      description: "",
      rateType: "fixed",
      rate: 0,
      account: null,
      entryType: "debit",
    })
    setEditingId(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Generate code from abbreviation if not provided
    const code = formData.abbreviation
      .toUpperCase()
      .replace(/\s+/g, '-')
      .replace(/[^A-Z0-9-]/g, '')
      .substring(0, 20) || formData.name
        .toUpperCase()
        .replace(/\s+/g, '-')
        .replace(/[^A-Z0-9-]/g, '')
        .substring(0, 20)

    try {
      if (editingId) {
        await updateMutation.mutateAsync({
          id: editingId,
          data: {
            name: formData.name,
            code: code,
            type: formData.type,
            description: formData.description || null,
            rateType: formData.rateType,
            rate: formData.rate,
            account: formData.account,
            entryType: formData.entryType,
          },
        })
        toast.success("Employer taxable component updated successfully")
      } else {
        await createMutation.mutateAsync({
          name: formData.name,
          code: code,
          type: formData.type,
          description: formData.description || null,
          rateType: formData.rateType,
          rate: formData.rate,
          account: formData.account,
          entryType: formData.entryType,
        })
        toast.success("Employer taxable component created successfully")
      }
      
      setIsCreating(false)
      setEditingId(null)
      resetForm()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save employer taxable component")
    }
  }

  const handleEdit = (component: EmployerTaxableComponent) => {
    const fullComponent = employerTaxableComponents.find((c) => c.id === component.id)
    if (fullComponent) {
      setFormData({
        name: fullComponent.name,
        abbreviation: fullComponent.code,
        type: fullComponent.type,
        description: fullComponent.description || "",
        rateType: fullComponent.rateType,
        rate: Number(fullComponent.rate),
        account: fullComponent.account,
        entryType: fullComponent.entryType,
      })
      setEditingId(fullComponent.id)
      setIsCreating(true)
    }
  }

  const handleDelete = async (component: EmployerTaxableComponent) => {
    if (!confirm(`Are you sure you want to delete "${component.name}"?`)) {
      return
    }

    try {
      await deleteMutation.mutateAsync(component.id)
      toast.success("Employer taxable component deleted successfully")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete employer taxable component")
    }
  }

  const handleCancel = () => {
    setIsCreating(false)
    setEditingId(null)
    resetForm()
  }

  const handleIncrementRate = () => {
    setFormData({ ...formData, rate: formData.rate + 1 })
  }

  const handleDecrementRate = () => {
    if (formData.rate > 0) {
      setFormData({ ...formData, rate: formData.rate - 1 })
    }
  }

  if (isCreating) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{editingId ? 'Edit Employer Taxable Component' : 'Add new employer taxable component'}</CardTitle>
              <CardDescription className="mt-1">Dashboard &gt; Employer Taxable Salary Component</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First Section - General Details */}
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
                    placeholder="Component Name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="abbreviation">
                    Abbreviation <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="abbreviation"
                    value={formData.abbreviation}
                    onChange={(e) => setFormData({ ...formData, abbreviation: e.target.value })}
                    placeholder="Component Abbreviation (will be used as code)"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">
                    Type <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                    required
                  >
                    <SelectTrigger id="type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {componentTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rateType">
                    Rate Type <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.rateType}
                    onValueChange={(value) => setFormData({ ...formData, rateType: value })}
                    required
                  >
                    <SelectTrigger id="rateType">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {rateTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
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
                  placeholder="Component Description"
                  rows={4}
                  className="resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rate">
                  Rate <span className="text-destructive">*</span>
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="rate"
                    type="number"
                    value={formData.rate}
                    onChange={(e) => setFormData({ ...formData, rate: parseFloat(e.target.value) || 0 })}
                    min="0"
                    step="0.01"
                    required
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleIncrementRate}
                    className="h-9 w-9"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleDecrementRate}
                    className="h-9 w-9"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Second Section - Accounts & Entry Type */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-lg font-semibold">Accounts & Entry Type</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="account">Account</Label>
                  <Select
                    value={formData.account || "none"}
                    onValueChange={(value) => setFormData({ ...formData, account: value === "none" ? null : value })}
                  >
                    <SelectTrigger id="account">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {accounts.map((account) => (
                        <SelectItem key={account.value} value={account.value}>
                          {account.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="entryType">
                    Entry Type <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.entryType}
                    onValueChange={(value) => setFormData({ ...formData, entryType: value })}
                    required
                  >
                    <SelectTrigger id="entryType">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {entryTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
          <CardTitle>Employer Taxable Components</CardTitle>
          <CardDescription>Manage taxable components for payroll</CardDescription>
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
          <CardTitle>Employer Taxable Components</CardTitle>
          <CardDescription>Manage taxable components for payroll</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-destructive">
            Error loading employer taxable components: {error instanceof Error ? error.message : "Unknown error"}
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
            <CardTitle>Employer Taxable Components</CardTitle>
            <CardDescription>Manage taxable components for payroll</CardDescription>
          </div>
          <Button onClick={() => { setIsCreating(true); resetForm(); }}>
            <Plus className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          data={componentData}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          onView={(component) => {
            handleEdit(component)
          }}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </CardContent>
    </Card>
  )
}
