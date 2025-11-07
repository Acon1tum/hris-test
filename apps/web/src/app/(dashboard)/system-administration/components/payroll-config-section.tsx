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
import { ArrowLeft, Plus } from "lucide-react"
import { useState } from "react"
import { DataTable } from "@/components/payroll-configs/data-table"
import { type PayrollConfig } from "@/components/payroll-configs/columns"

// Sample data for dropdowns
const payrollFrequencies = [
  { value: "weekly", label: "Weekly" },
  { value: "bi-weekly", label: "Bi-Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "annually", label: "Annually" },
]

// Sample payroll configs data
const payrollConfigs: PayrollConfig[] = [
  { id: "1", payrollFrequency: "monthly", automatedPayroll: false, createdAt: "July 24, 2025" },
]

export function PayrollConfigSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({
    payrollFrequency: "monthly",
    automatedPayroll: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement form submission
    console.log("Payroll config:", formData)
    setIsCreating(false)
  }

  const handleEdit = (config: PayrollConfig) => {
    // TODO: Load payroll config data into form
    setFormData({
      payrollFrequency: config.payrollFrequency,
      automatedPayroll: config.automatedPayroll,
    })
    setIsCreating(true)
  }

  if (isCreating) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Setup Payroll Configuration</CardTitle>
          <CardDescription className="mt-1">Dashboard &gt; Payroll Configuration</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
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
            <CardTitle>Payroll Configuration</CardTitle>
            <CardDescription>Manage payroll configuration settings</CardDescription>
          </div>
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          data={payrollConfigs}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          onView={(config) => {
            // TODO: Implement view
            console.log("View", config)
          }}
          onEdit={(config) => {
            handleEdit(config)
          }}
          onDelete={(config) => {
            // TODO: Implement delete
            console.log("Delete", config)
          }}
        />
      </CardContent>
    </Card>
  )
} 