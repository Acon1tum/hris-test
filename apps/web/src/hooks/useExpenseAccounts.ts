import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { expenseAccountService, CreateExpenseAccountData, UpdateExpenseAccountData, ExpenseAccountFromAPI } from '@/services/expense-account.service';

const EXPENSE_ACCOUNT_QUERY_KEY = 'expense-accounts';

export function useExpenseAccounts() {
  return useQuery<ExpenseAccountFromAPI[]>({
    queryKey: [EXPENSE_ACCOUNT_QUERY_KEY],
    queryFn: () => expenseAccountService.getAll(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useExpenseAccount(id: string) {
  return useQuery<ExpenseAccountFromAPI>({
    queryKey: [EXPENSE_ACCOUNT_QUERY_KEY, id],
    queryFn: () => expenseAccountService.getById(id),
    enabled: !!id,
  });
}

export function useCreateExpenseAccount() {
  const queryClient = useQueryClient();
  return useMutation<ExpenseAccountFromAPI, Error, CreateExpenseAccountData>({
    mutationFn: (data) => expenseAccountService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EXPENSE_ACCOUNT_QUERY_KEY] });
    },
  });
}

export function useUpdateExpenseAccount() {
  const queryClient = useQueryClient();
  return useMutation<ExpenseAccountFromAPI, Error, { id: string; data: UpdateExpenseAccountData }>({
    mutationFn: ({ id, data }) => expenseAccountService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [EXPENSE_ACCOUNT_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [EXPENSE_ACCOUNT_QUERY_KEY, variables.id] });
    },
  });
}

export function useDeleteExpenseAccount() {
  const queryClient = useQueryClient();
  return useMutation<{ message: string }, Error, string>({
    mutationFn: (id) => expenseAccountService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EXPENSE_ACCOUNT_QUERY_KEY] });
    },
  });
}

