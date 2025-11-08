import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { departmentService, CreateDepartmentData, UpdateDepartmentData } from '@/services/department.service';

const DEPARTMENT_QUERY_KEY = 'departments';

export function useDepartments() {
  return useQuery({
    queryKey: [DEPARTMENT_QUERY_KEY],
    queryFn: () => departmentService.getAll(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useDepartment(id: string) {
  return useQuery({
    queryKey: [DEPARTMENT_QUERY_KEY, id],
    queryFn: () => departmentService.getById(id),
    enabled: !!id,
  });
}

export function useCreateDepartment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateDepartmentData) => departmentService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DEPARTMENT_QUERY_KEY] });
    },
  });
}

export function useUpdateDepartment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateDepartmentData }) =>
      departmentService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [DEPARTMENT_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [DEPARTMENT_QUERY_KEY, variables.id] });
    },
  });
}

export function useDeleteDepartment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => departmentService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DEPARTMENT_QUERY_KEY] });
    },
  });
}

