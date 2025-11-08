import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { graceTimeService, CreateGraceTimeData, UpdateGraceTimeData, GraceTimeFromAPI } from '@/services/grace-time.service';

const GRACE_TIME_QUERY_KEY = 'grace-times';

export function useGraceTimes() {
  return useQuery<GraceTimeFromAPI[]>({
    queryKey: [GRACE_TIME_QUERY_KEY],
    queryFn: () => graceTimeService.getAll(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useGraceTime(id: string) {
  return useQuery<GraceTimeFromAPI>({
    queryKey: [GRACE_TIME_QUERY_KEY, id],
    queryFn: () => graceTimeService.getById(id),
    enabled: !!id,
  });
}

export function useGraceTimeByOrganization(organizationId: string) {
  return useQuery<GraceTimeFromAPI>({
    queryKey: [GRACE_TIME_QUERY_KEY, 'organization', organizationId],
    queryFn: () => graceTimeService.getByOrganization(organizationId),
    enabled: !!organizationId,
  });
}

export function useCreateGraceTime() {
  const queryClient = useQueryClient();
  return useMutation<GraceTimeFromAPI, Error, CreateGraceTimeData>({
    mutationFn: (data) => graceTimeService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GRACE_TIME_QUERY_KEY] });
    },
  });
}

export function useUpdateGraceTime() {
  const queryClient = useQueryClient();
  return useMutation<GraceTimeFromAPI, Error, { id: string; data: UpdateGraceTimeData }>({
    mutationFn: ({ id, data }) => graceTimeService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [GRACE_TIME_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [GRACE_TIME_QUERY_KEY, variables.id] });
    },
  });
}

export function useUpdateGraceTimeByOrganization() {
  const queryClient = useQueryClient();
  return useMutation<GraceTimeFromAPI, Error, { organizationId: string; data: UpdateGraceTimeData }>({
    mutationFn: ({ organizationId, data }) => graceTimeService.updateByOrganization(organizationId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [GRACE_TIME_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [GRACE_TIME_QUERY_KEY, 'organization', variables.organizationId] });
    },
  });
}

export function useDeleteGraceTime() {
  const queryClient = useQueryClient();
  return useMutation<{ message: string }, Error, string>({
    mutationFn: (id) => graceTimeService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GRACE_TIME_QUERY_KEY] });
    },
  });
}

