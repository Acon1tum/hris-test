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
import { Plus, ArrowLeft, ChevronUp, ChevronDown } from "lucide-react"
import { useState } from "react"
import { DataTable } from "@/components/employer-taxable-components/data-table"
import { type EmployerTaxableComponent } from "@/components/employer-taxable-components/columns"

const taxableComponents: EmployerTaxableComponent[] = [
  { id: "1", name: "Basic Salary", code: "BASIC", taxType: "Taxable", description: "Base salary component", createdAt: "July 24, 2025" },
  { id: "2", name: "Allowance", code: "ALLOW", taxType: "Taxable", description: "Monthly allowance", createdAt: "July 24, 2025" },
  { id: "3", name: "Bonus", code: "BONUS", taxType: "Taxable", description: "Performance bonus", createdAt: "July 24, 2025" },
]

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
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    abbreviation: "",
    type: "superannuation",
    description: "",
    rateType: "fixed",
    rate: "0",
    account: "",
    entryType: "debit",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement form submission
    console.log("Form data:", formData)
    setIsCreating(false)
  }

  const handleIncrementRate = () => {
    const currentRate = parseFloat(formData.rate) || 0
    setFormData({ ...formData, rate: (currentRate + 1).toString() })
  }

  const handleDecrementRate = () => {
    const currentRate = parseFloat(formData.rate) || 0
    if (currentRate > 0) {
      setFormData({ ...formData, rate: (currentRate - 1).toString() })
    }
  }

  const handleEdit = (component: EmployerTaxableComponent) => {
    // TODO: Load component data into form
    setIsCreating(true)
  }

  if (isCreating) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Add new employer taxable component</CardTitle>
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
                  <Label htmlFor="abbreviation">Abbreviation</Label>
                  <Input
                    id="abbreviation"
                    value={formData.abbreviation}
                    onChange={(e) => setFormData({ ...formData, abbreviation: e.target.value })}
                    placeholder="Component Abbreviation"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
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
                    onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
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
                  <Label htmlFor="account">
                    Account <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.account}
                    onValueChange={(value) => setFormData({ ...formData, account: value })}
                    required
                  >
                    <SelectTrigger id="account">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
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
            <CardTitle>Employer Taxable Components</CardTitle>
            <CardDescription>Manage taxable components for payroll</CardDescription>
          </div>
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          data={taxableComponents}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          onView={(component) => {
            // TODO: Implement view
            console.log("View", component)
          }}
          onEdit={(component) => {
            handleEdit(component)
          }}
          onDelete={(component) => {
            // TODO: Implement delete
            console.log("Delete", component)
          }}
        />
      </CardContent>
    </Card>
  )
}
