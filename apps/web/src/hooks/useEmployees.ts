import { useQuery } from '@tanstack/react-query';
import { employeeService } from '@/services/employee.service';

const EMPLOYEE_QUERY_KEY = 'employees';

export function useEmployees() {
  return useQuery({
    queryKey: [EMPLOYEE_QUERY_KEY],
    queryFn: () => employeeService.getAll(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useEmployee(id: string) {
  return useQuery({
    queryKey: [EMPLOYEE_QUERY_KEY, id],
    queryFn: () => employeeService.getById(id),
    enabled: !!id,
  });
}

