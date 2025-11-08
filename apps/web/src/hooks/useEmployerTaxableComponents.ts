import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { employerTaxableComponentService, CreateEmployerTaxableComponentData, UpdateEmployerTaxableComponentData, EmployerTaxableComponentFromAPI } from '@/services/employer-taxable-component.service';

const EMPLOYER_TAXABLE_COMPONENT_QUERY_KEY = 'employer-taxable-components';

export function useEmployerTaxableComponents() {
  return useQuery<EmployerTaxableComponentFromAPI[]>({
    queryKey: [EMPLOYER_TAXABLE_COMPONENT_QUERY_KEY],
    queryFn: () => employerTaxableComponentService.getAll(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useEmployerTaxableComponent(id: string) {
  return useQuery<EmployerTaxableComponentFromAPI>({
    queryKey: [EMPLOYER_TAXABLE_COMPONENT_QUERY_KEY, id],
    queryFn: () => employerTaxableComponentService.getById(id),
    enabled: !!id,
  });
}

export function useCreateEmployerTaxableComponent() {
  const queryClient = useQueryClient();
  return useMutation<EmployerTaxableComponentFromAPI, Error, CreateEmployerTaxableComponentData>({
    mutationFn: (data) => employerTaxableComponentService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EMPLOYER_TAXABLE_COMPONENT_QUERY_KEY] });
    },
  });
}

export function useUpdateEmployerTaxableComponent() {
  const queryClient = useQueryClient();
  return useMutation<EmployerTaxableComponentFromAPI, Error, { id: string; data: UpdateEmployerTaxableComponentData }>({
    mutationFn: ({ id, data }) => employerTaxableComponentService.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: [EMPLOYER_TAXABLE_COMPONENT_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [EMPLOYER_TAXABLE_COMPONENT_QUERY_KEY, id] });
    },
  });
}

export function useDeleteEmployerTaxableComponent() {
  const queryClient = useQueryClient();
  return useMutation<{ message: string }, Error, string>({
    mutationFn: (id) => employerTaxableComponentService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EMPLOYER_TAXABLE_COMPONENT_QUERY_KEY] });
    },
  });
}

