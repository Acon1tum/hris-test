"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, Plus, RefreshCw, Maximize2, Filter, ArrowLeft, Calendar as CalendarIcon } from "lucide-react"
import { DataTable } from "@/components/bonus-pay/data-table"
import { type BonusPay } from "@/components/bonus-pay/columns"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Sample bonus pay data (empty array to show empty state)
const bonusPayRecords: BonusPay[] = []

export function BonusPaySection() {
  const [search, setSearch] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({
    amount: "0",
    employee: "",
    payrollApplicableDate: "",
    salaryComponent: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement form submission
    console.log("Form data:", formData)
    setIsCreating(false)
  }

  if (isCreating) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <span>Dashboard</span>
                <ChevronRight className="h-4 w-4" />
                <span>Retention Bonus</span>
              </div>
              <CardTitle>New Bonus Pay</CardTitle>
            </div>
            <Button variant="outline" onClick={() => setIsCreating(false)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Row */}
              <div className="space-y-2">
                <Label htmlFor="amount">
                  Amount <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₱</span>
                  <Input
                    id="amount"
                    type="number"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    className="pl-8"
                    placeholder="0"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="employee">
                  Employee <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.employee}
                  onValueChange={(value) =>
                    setFormData({ ...formData, employee: value })
                  }
                  required
                >
                  <SelectTrigger id="employee">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">James Jason Tate</SelectItem>
                    <SelectItem value="2">Lauren Marsh</SelectItem>
                    <SelectItem value="3">Jaehee Kim</SelectItem>
                    <SelectItem value="4">Jennifer Michael Davis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="payrollApplicableDate">
                  Payroll Applicable Date <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="payrollApplicableDate"
                    type="date"
                    value={formData.payrollApplicableDate}
                    onChange={(e) =>
                      setFormData({ ...formData, payrollApplicableDate: e.target.value })
                    }
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="salaryComponent">
                  Salary Component <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.salaryComponent}
                  onValueChange={(value) =>
                    setFormData({ ...formData, salaryComponent: value })
                  }
                  required
                >
                  <SelectTrigger id="salaryComponent">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="allowance">Allowance</SelectItem>
                    <SelectItem value="bonus">Bonus</SelectItem>
                    <SelectItem value="overtime">Overtime</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" type="button" onClick={() => setIsCreating(false)}>
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
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <span>Dashboard</span>
              <ChevronRight className="h-4 w-4" />
              <span>Bonus Pay</span>
            </div>
            <CardTitle>Bonus Pay</CardTitle>
          </div>
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Action Icons */}
          <div className="flex items-center justify-end gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" title="Fullscreen">
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" title="Refresh">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" title="Filter">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <DataTable
            data={bonusPayRecords}
            search={search}
            onSearchChange={setSearch}
            onView={(bonus) => {
              // TODO: Implement view
              console.log("View", bonus)
            }}
            onEdit={(bonus) => {
              // TODO: Implement edit
              console.log("Edit", bonus)
            }}
            onDelete={(bonus) => {
              // TODO: Implement delete
              console.log("Delete", bonus)
            }}
          />
        </div>
      </CardContent>
    </Card>
  )
}

