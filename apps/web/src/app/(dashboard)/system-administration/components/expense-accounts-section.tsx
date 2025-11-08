"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, ArrowLeft, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import { DataTable } from "@/components/expense-accounts/data-table"
import { type ExpenseAccount } from "@/components/expense-accounts/columns"
import { useExpenseAccounts, useCreateExpenseAccount, useUpdateExpenseAccount, useDeleteExpenseAccount } from "@/hooks/useExpenseAccounts"
import { toast } from "sonner"

export function ExpenseAccountsSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  // Hooks
  const { data: expenseAccounts = [], isLoading, error } = useExpenseAccounts()
  const createMutation = useCreateExpenseAccount()
  const updateMutation = useUpdateExpenseAccount()
  const deleteMutation = useDeleteExpenseAccount()
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    accountNumber: "",
    description: "",
    expenseType: null as string | null,
    account: null as string | null,
  })

  // Convert expense accounts to match the ExpenseAccount type from columns
  const expenseAccountData: ExpenseAccount[] = expenseAccounts.map((account) => ({
    id: account.id,
    name: account.name,
    code: account.code,
    accountNumber: account.accountNumber,
    description: account.description || "",
    createdAt: new Date(account.createdAt).toLocaleDateString(),
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
      accountNumber: "",
      description: "",
      expenseType: null,
      account: null,
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
            accountNumber: formData.accountNumber,
            description: formData.description || null,
            expenseType: formData.expenseType,
            account: formData.account,
          },
        })
        toast.success("Expense account updated successfully")
      } else {
        await createMutation.mutateAsync({
          name: formData.name,
          code: formData.code,
          accountNumber: formData.accountNumber,
          description: formData.description || null,
          expenseType: formData.expenseType,
          account: formData.account,
        })
        toast.success("Expense account created successfully")
      }
      
      setIsCreating(false)
      setEditingId(null)
      resetForm()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save expense account")
    }
  }

  const handleEdit = (account: ExpenseAccount) => {
    const fullAccount = expenseAccounts.find((a) => a.id === account.id)
    if (fullAccount) {
      setFormData({
        name: fullAccount.name,
        code: fullAccount.code,
        accountNumber: fullAccount.accountNumber,
        description: fullAccount.description || "",
        expenseType: fullAccount.expenseType,
        account: fullAccount.account,
      })
      setEditingId(fullAccount.id)
      setIsCreating(true)
    }
  }

  const handleDelete = async (account: ExpenseAccount) => {
    if (!confirm(`Are you sure you want to delete "${account.name}"?`)) {
      return
    }

    try {
      await deleteMutation.mutateAsync(account.id)
      toast.success("Expense account deleted successfully")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete expense account")
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
              <CardTitle>{editingId ? 'Edit Expense Account' : 'Create New Expense Account'}</CardTitle>
              <CardDescription className="mt-1">Dashboard &gt; Payroll Expense Accounts</CardDescription>
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
                    placeholder="Enter expense account name"
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
                    placeholder="Enter expense account code"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountNumber">
                  Account Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="accountNumber"
                  value={formData.accountNumber}
                  onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                  placeholder="Enter account number"
                  required
                />
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expenseType">Expense Type</Label>
                  <Input
                    id="expenseType"
                    value={formData.expenseType || ""}
                    onChange={(e) => setFormData({ ...formData, expenseType: e.target.value || null })}
                    placeholder="e.g., Salary Expense"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="account">Account</Label>
                  <Input
                    id="account"
                    value={formData.account || ""}
                    onChange={(e) => setFormData({ ...formData, account: e.target.value || null })}
                    placeholder="e.g., 101-10207"
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
          <CardTitle>Payroll Expense Accounts</CardTitle>
          <CardDescription>Manage payroll expense account mappings</CardDescription>
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
          <CardTitle>Payroll Expense Accounts</CardTitle>
          <CardDescription>Manage payroll expense account mappings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-destructive">
            Error loading expense accounts: {error instanceof Error ? error.message : "Unknown error"}
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
            <CardTitle>Payroll Expense Accounts</CardTitle>
            <CardDescription>Manage payroll expense account mappings</CardDescription>
          </div>
          <Button onClick={() => { setIsCreating(true); resetForm(); }}>
            <Plus className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          data={expenseAccountData}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          onView={(account) => {
            handleEdit(account)
          }}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </CardContent>
    </Card>
  )
}
