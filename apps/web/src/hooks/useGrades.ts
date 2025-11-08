import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { gradeService, CreateGradeData, UpdateGradeData, GradeFromAPI } from '@/services/grade.service';

const GRADE_QUERY_KEY = 'grades';

export function useGrades() {
  return useQuery<GradeFromAPI[]>({
    queryKey: [GRADE_QUERY_KEY],
    queryFn: () => gradeService.getAll(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useGrade(id: string) {
  return useQuery<GradeFromAPI>({
    queryKey: [GRADE_QUERY_KEY, id],
    queryFn: () => gradeService.getById(id),
    enabled: !!id,
  });
}

export function useCreateGrade() {
  const queryClient = useQueryClient();
  return useMutation<GradeFromAPI, Error, CreateGradeData>({
    mutationFn: (data) => gradeService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GRADE_QUERY_KEY] });
    },
  });
}

export function useUpdateGrade() {
  const queryClient = useQueryClient();
  return useMutation<GradeFromAPI, Error, { id: string; data: UpdateGradeData }>({
    mutationFn: ({ id, data }) => gradeService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [GRADE_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [GRADE_QUERY_KEY, variables.id] });
    },
  });
}

export function useDeleteGrade() {
  const queryClient = useQueryClient();
  return useMutation<{ message: string }, Error, string>({
    mutationFn: (id) => gradeService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GRADE_QUERY_KEY] });
    },
  });
}

