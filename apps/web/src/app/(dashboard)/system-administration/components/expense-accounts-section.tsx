"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus, ArrowLeft, Minus, ChevronUp, ChevronDown } from "lucide-react"
import { useState } from "react"
import { DataTable } from "@/components/expense-accounts/data-table"
import { type ExpenseAccount } from "@/components/expense-accounts/columns"

const expenseAccounts: ExpenseAccount[] = [
  { id: "1", name: "Salary Expense", code: "SAL-EXP", accountNumber: "6001", description: "Employee salaries", createdAt: "July 24, 2025" },
  { id: "2", name: "Benefits Expense", code: "BEN-EXP", accountNumber: "6002", description: "Employee benefits", createdAt: "July 24, 2025" },
]

// Sample account options
const accountOptions = [
  { value: "101-10207", label: "101-10207 - Wages & Bonous" },
  { value: "101-10402", label: "101-10402 - Tax Disbursment" },
  { value: "204-10103", label: "204-10103 - Bank Loan Payable" },
  { value: "101-10205", label: "101-10205 - Payroll Clearing Account" },
  { value: "101-108", label: "101-108 - Summit Business Savings" },
]

type ExpenseAccountRow = {
  id: string
  expenseType: string
  account: string
}

export function ExpenseAccountsSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  
  // Form state - editable table rows
  const [expenseRows, setExpenseRows] = useState<ExpenseAccountRow[]>([
    { id: "1", expenseType: "Salary Expense", account: "101-10207" },
    { id: "2", expenseType: "Tax Expense", account: "101-10402" },
    { id: "3", expenseType: "Payable Bank Account", account: "204-10103" },
    { id: "4", expenseType: "Salary Payable", account: "101-10205" },
    { id: "5", expenseType: "Superannuation Payable", account: "101-108" },
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement form submission
    console.log("Expense accounts:", expenseRows)
    setIsEditing(false)
  }

  const handleAddRow = () => {
    const newRow: ExpenseAccountRow = {
      id: Date.now().toString(),
      expenseType: "",
      account: "",
    }
    setExpenseRows([...expenseRows, newRow])
  }

  const handleDeleteRow = (id: string) => {
    setExpenseRows(expenseRows.filter((row) => row.id !== id))
  }

  const handleMoveRow = (index: number, direction: "up" | "down") => {
    const newRows = [...expenseRows]
    if (direction === "up" && index > 0) {
      [newRows[index - 1], newRows[index]] = [newRows[index], newRows[index - 1]]
    } else if (direction === "down" && index < newRows.length - 1) {
      [newRows[index], newRows[index + 1]] = [newRows[index + 1], newRows[index]]
    }
    setExpenseRows(newRows)
  }

  const handleFieldChange = (rowId: string, field: keyof ExpenseAccountRow, value: string) => {
    setExpenseRows(
      expenseRows.map((row) =>
        row.id === rowId ? { ...row, [field]: value } : row
      )
    )
  }

  const handleEdit = (account: ExpenseAccount) => {
    // TODO: Load expense account data into form
    setIsEditing(true)
  }

  if (isEditing) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Setup Payroll</CardTitle>
              <CardDescription className="mt-1">Dashboard &gt; Payroll Expense Accounts</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Payroll Expense Accounts</h3>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        Expense Type <span className="text-destructive">*</span>
                      </TableHead>
                      <TableHead>
                        Account <span className="text-destructive">*</span>
                      </TableHead>
                      <TableHead className="w-[100px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {expenseRows.map((row, index) => (
                      <TableRow key={row.id}>
                        <TableCell>
                          <Input
                            value={row.expenseType}
                            onChange={(e) => handleFieldChange(row.id, "expenseType", e.target.value)}
                            className="w-full"
                            placeholder="Enter expense type"
                            required
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Select
                              value={row.account}
                              onValueChange={(value) => handleFieldChange(row.id, "account", value)}
                              required
                            >
                              <SelectTrigger className="flex-1">
                                <SelectValue placeholder="Select account" />
                              </SelectTrigger>
                              <SelectContent>
                                {accountOptions.map((account) => (
                                  <SelectItem key={account.value} value={account.value}>
                                    {account.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <div className="flex flex-col">
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-4 w-8 p-0"
                                onClick={() => handleMoveRow(index, "up")}
                                disabled={index === 0}
                              >
                                <ChevronUp className="h-3 w-3" />
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-4 w-8 p-0"
                                onClick={() => handleMoveRow(index, "down")}
                                disabled={index === expenseRows.length - 1}
                              >
                                <ChevronDown className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {index === expenseRows.length - 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-green-600 hover:text-green-700"
                                onClick={handleAddRow}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-600 hover:text-red-700"
                              onClick={() => handleDeleteRow(row.id)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
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
            <CardTitle>Payroll Expense Accounts</CardTitle>
            <CardDescription>Manage payroll expense account mappings</CardDescription>
          </div>
          <Button onClick={() => setIsEditing(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          data={expenseAccounts}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          onView={(account) => {
            // TODO: Implement view
            console.log("View", account)
          }}
          onEdit={(account) => {
            handleEdit(account)
          }}
          onDelete={(account) => {
            // TODO: Implement delete
            console.log("Delete", account)
          }}
        />
      </CardContent>
    </Card>
  )
} 