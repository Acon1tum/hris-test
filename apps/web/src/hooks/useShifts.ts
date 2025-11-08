import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { shiftService, CreateShiftData, UpdateShiftData, ShiftFromAPI } from '@/services/shift.service';

const SHIFT_QUERY_KEY = 'shifts';

export function useShifts() {
  return useQuery<ShiftFromAPI[]>({
    queryKey: [SHIFT_QUERY_KEY],
    queryFn: () => shiftService.getAll(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useShift(id: string) {
  return useQuery<ShiftFromAPI>({
    queryKey: [SHIFT_QUERY_KEY, id],
    queryFn: () => shiftService.getById(id),
    enabled: !!id,
  });
}

export function useCreateShift() {
  const queryClient = useQueryClient();
  return useMutation<ShiftFromAPI, Error, CreateShiftData>({
    mutationFn: (data) => shiftService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SHIFT_QUERY_KEY] });
    },
  });
}

export function useUpdateShift() {
  const queryClient = useQueryClient();
  return useMutation<ShiftFromAPI, Error, { id: string; data: UpdateShiftData }>({
    mutationFn: ({ id, data }) => shiftService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [SHIFT_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [SHIFT_QUERY_KEY, variables.id] });
    },
  });
}

export function useDeleteShift() {
  const queryClient = useQueryClient();
  return useMutation<{ message: string }, Error, string>({
    mutationFn: (id) => shiftService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SHIFT_QUERY_KEY] });
    },
  });
}

