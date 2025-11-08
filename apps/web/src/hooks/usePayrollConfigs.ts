import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { payrollConfigService, CreatePayrollConfigData, UpdatePayrollConfigData, PayrollConfigFromAPI } from '@/services/payroll-config.service';

const PAYROLL_CONFIG_QUERY_KEY = 'payroll-configs';

export function usePayrollConfigs() {
  return useQuery<PayrollConfigFromAPI[]>({
    queryKey: [PAYROLL_CONFIG_QUERY_KEY],
    queryFn: () => payrollConfigService.getAll(),
    staleTime: 5 * 60 * 1000,
  });
}

export function usePayrollConfig(id: string) {
  return useQuery<PayrollConfigFromAPI>({
    queryKey: [PAYROLL_CONFIG_QUERY_KEY, id],
    queryFn: () => payrollConfigService.getById(id),
    enabled: !!id,
  });
}

export function usePayrollConfigsByOrganization(organizationId: string) {
  return useQuery<PayrollConfigFromAPI[]>({
    queryKey: [PAYROLL_CONFIG_QUERY_KEY, 'organization', organizationId],
    queryFn: () => payrollConfigService.getByOrganization(organizationId),
    enabled: !!organizationId,
  });
}

export function useCreatePayrollConfig() {
  const queryClient = useQueryClient();
  return useMutation<PayrollConfigFromAPI, Error, CreatePayrollConfigData>({
    mutationFn: (data) => payrollConfigService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PAYROLL_CONFIG_QUERY_KEY] });
    },
  });
}

export function useUpdatePayrollConfig() {
  const queryClient = useQueryClient();
  return useMutation<PayrollConfigFromAPI, Error, { id: string; data: UpdatePayrollConfigData }>({
    mutationFn: ({ id, data }) => payrollConfigService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [PAYROLL_CONFIG_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [PAYROLL_CONFIG_QUERY_KEY, variables.id] });
    },
  });
}

export function useDeletePayrollConfig() {
  const queryClient = useQueryClient();
  return useMutation<{ message: string }, Error, string>({
    mutationFn: (id) => payrollConfigService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PAYROLL_CONFIG_QUERY_KEY] });
    },
  });
}

