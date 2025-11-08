import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { overtimePolicyService, CreateOvertimePolicyData, UpdateOvertimePolicyData, OvertimePolicyFromAPI } from '@/services/overtime-policy.service';

const OVERTIME_POLICY_QUERY_KEY = 'overtime-policies';

export function useOvertimePolicies() {
  return useQuery<OvertimePolicyFromAPI[]>({
    queryKey: [OVERTIME_POLICY_QUERY_KEY],
    queryFn: () => overtimePolicyService.getAll(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useOvertimePolicy(id: string) {
  return useQuery<OvertimePolicyFromAPI>({
    queryKey: [OVERTIME_POLICY_QUERY_KEY, id],
    queryFn: () => overtimePolicyService.getById(id),
    enabled: !!id,
  });
}

export function useCreateOvertimePolicy() {
  const queryClient = useQueryClient();
  return useMutation<OvertimePolicyFromAPI, Error, CreateOvertimePolicyData>({
    mutationFn: (data) => overtimePolicyService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [OVERTIME_POLICY_QUERY_KEY] });
    },
  });
}

export function useUpdateOvertimePolicy() {
  const queryClient = useQueryClient();
  return useMutation<OvertimePolicyFromAPI, Error, { id: string; data: UpdateOvertimePolicyData }>({
    mutationFn: ({ id, data }) => overtimePolicyService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [OVERTIME_POLICY_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [OVERTIME_POLICY_QUERY_KEY, variables.id] });
    },
  });
}

export function useDeleteOvertimePolicy() {
  const queryClient = useQueryClient();
  return useMutation<{ message: string }, Error, string>({
    mutationFn: (id) => overtimePolicyService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [OVERTIME_POLICY_QUERY_KEY] });
    },
  });
}

