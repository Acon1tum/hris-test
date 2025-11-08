import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { leaveTypeService, CreateLeaveTypeData, UpdateLeaveTypeData, LeaveTypeFromAPI } from '@/services/leave-type.service';

const LEAVE_TYPE_QUERY_KEY = 'leave-types';

export function useLeaveTypes() {
  return useQuery<LeaveTypeFromAPI[]>({
    queryKey: [LEAVE_TYPE_QUERY_KEY],
    queryFn: () => leaveTypeService.getAll(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useLeaveType(id: string) {
  return useQuery<LeaveTypeFromAPI>({
    queryKey: [LEAVE_TYPE_QUERY_KEY, id],
    queryFn: () => leaveTypeService.getById(id),
    enabled: !!id,
  });
}

export function useCreateLeaveType() {
  const queryClient = useQueryClient();
  return useMutation<LeaveTypeFromAPI, Error, CreateLeaveTypeData>({
    mutationFn: (data) => leaveTypeService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LEAVE_TYPE_QUERY_KEY] });
    },
  });
}

export function useUpdateLeaveType() {
  const queryClient = useQueryClient();
  return useMutation<LeaveTypeFromAPI, Error, { id: string; data: UpdateLeaveTypeData }>({
    mutationFn: ({ id, data }) => leaveTypeService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [LEAVE_TYPE_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [LEAVE_TYPE_QUERY_KEY, variables.id] });
    },
  });
}

export function useDeleteLeaveType() {
  const queryClient = useQueryClient();
  return useMutation<{ message: string }, Error, string>({
    mutationFn: (id) => leaveTypeService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LEAVE_TYPE_QUERY_KEY] });
    },
  });
}

