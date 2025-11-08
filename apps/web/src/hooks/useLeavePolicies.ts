import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { leavePolicyService, CreateLeavePolicyData, UpdateLeavePolicyData, LeavePolicyFromAPI } from '@/services/leave-policy.service';

const LEAVE_POLICY_QUERY_KEY = 'leave-policies';

export function useLeavePolicies() {
  return useQuery<LeavePolicyFromAPI[]>({
    queryKey: [LEAVE_POLICY_QUERY_KEY],
    queryFn: () => leavePolicyService.getAll(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useLeavePolicy(id: string) {
  return useQuery<LeavePolicyFromAPI>({
    queryKey: [LEAVE_POLICY_QUERY_KEY, id],
    queryFn: () => leavePolicyService.getById(id),
    enabled: !!id,
  });
}

export function useCreateLeavePolicy() {
  const queryClient = useQueryClient();
  return useMutation<LeavePolicyFromAPI, Error, CreateLeavePolicyData>({
    mutationFn: (data) => leavePolicyService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LEAVE_POLICY_QUERY_KEY] });
    },
  });
}

export function useUpdateLeavePolicy() {
  const queryClient = useQueryClient();
  return useMutation<LeavePolicyFromAPI, Error, { id: string; data: UpdateLeavePolicyData }>({
    mutationFn: ({ id, data }) => leavePolicyService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [LEAVE_POLICY_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [LEAVE_POLICY_QUERY_KEY, variables.id] });
    },
  });
}

export function useDeleteLeavePolicy() {
  const queryClient = useQueryClient();
  return useMutation<{ message: string }, Error, string>({
    mutationFn: (id) => leavePolicyService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LEAVE_POLICY_QUERY_KEY] });
    },
  });
}

