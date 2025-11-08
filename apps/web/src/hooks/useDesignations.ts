import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { designationService, CreateDesignationData, UpdateDesignationData, DesignationFromAPI } from '@/services/designation.service';

const DESIGNATION_QUERY_KEY = 'designations';

export function useDesignations() {
  return useQuery<DesignationFromAPI[]>({
    queryKey: [DESIGNATION_QUERY_KEY],
    queryFn: () => designationService.getAll(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useDesignation(id: string) {
  return useQuery<DesignationFromAPI>({
    queryKey: [DESIGNATION_QUERY_KEY, id],
    queryFn: () => designationService.getById(id),
    enabled: !!id,
  });
}

export function useCreateDesignation() {
  const queryClient = useQueryClient();
  return useMutation<DesignationFromAPI, Error, CreateDesignationData>({
    mutationFn: (data) => designationService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DESIGNATION_QUERY_KEY] });
    },
  });
}

export function useUpdateDesignation() {
  const queryClient = useQueryClient();
  return useMutation<DesignationFromAPI, Error, { id: string; data: UpdateDesignationData }>({
    mutationFn: ({ id, data }) => designationService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [DESIGNATION_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [DESIGNATION_QUERY_KEY, variables.id] });
    },
  });
}

export function useDeleteDesignation() {
  const queryClient = useQueryClient();
  return useMutation<{ message: string }, Error, string>({
    mutationFn: (id) => designationService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DESIGNATION_QUERY_KEY] });
    },
  });
}

