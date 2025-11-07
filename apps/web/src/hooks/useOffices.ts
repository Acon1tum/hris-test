import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { officeService, CreateOfficeData, UpdateOfficeData } from '@/services/office.service';

const OFFICE_QUERY_KEY = 'offices';

export function useOffices() {
  return useQuery({
    queryKey: [OFFICE_QUERY_KEY],
    queryFn: () => officeService.getAll(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useOffice(id: string) {
  return useQuery({
    queryKey: [OFFICE_QUERY_KEY, id],
    queryFn: () => officeService.getById(id),
    enabled: !!id,
  });
}

export function useCreateOffice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateOfficeData) => officeService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [OFFICE_QUERY_KEY] });
    },
  });
}

export function useUpdateOffice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateOfficeData }) =>
      officeService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [OFFICE_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [OFFICE_QUERY_KEY, variables.id] });
    },
  });
}

export function useDeleteOffice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => officeService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [OFFICE_QUERY_KEY] });
    },
  });
}

