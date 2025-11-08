import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { employmentTypeService, CreateEmploymentTypeData, UpdateEmploymentTypeData, EmploymentTypeFromAPI } from '@/services/employment-type.service';

const EMPLOYMENT_TYPE_QUERY_KEY = 'employment-types';

export function useEmploymentTypes() {
  return useQuery<EmploymentTypeFromAPI[]>({
    queryKey: [EMPLOYMENT_TYPE_QUERY_KEY],
    queryFn: () => employmentTypeService.getAll(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useEmploymentType(id: string) {
  return useQuery<EmploymentTypeFromAPI>({
    queryKey: [EMPLOYMENT_TYPE_QUERY_KEY, id],
    queryFn: () => employmentTypeService.getById(id),
    enabled: !!id,
  });
}

export function useCreateEmploymentType() {
  const queryClient = useQueryClient();
  return useMutation<EmploymentTypeFromAPI, Error, CreateEmploymentTypeData>({
    mutationFn: (data) => employmentTypeService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EMPLOYMENT_TYPE_QUERY_KEY] });
    },
  });
}

export function useUpdateEmploymentType() {
  const queryClient = useQueryClient();
  return useMutation<EmploymentTypeFromAPI, Error, { id: string; data: UpdateEmploymentTypeData }>({
    mutationFn: ({ id, data }) => employmentTypeService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [EMPLOYMENT_TYPE_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [EMPLOYMENT_TYPE_QUERY_KEY, variables.id] });
    },
  });
}

export function useDeleteEmploymentType() {
  const queryClient = useQueryClient();
  return useMutation<{ message: string }, Error, string>({
    mutationFn: (id) => employmentTypeService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EMPLOYMENT_TYPE_QUERY_KEY] });
    },
  });
}

