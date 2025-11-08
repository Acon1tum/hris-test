import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { holidayService, CreateHolidayData, UpdateHolidayData, HolidayFromAPI } from '@/services/holiday.service';

const HOLIDAY_QUERY_KEY = 'holidays';

export function useHolidays() {
  return useQuery<HolidayFromAPI[]>({
    queryKey: [HOLIDAY_QUERY_KEY],
    queryFn: () => holidayService.getAll(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useHoliday(id: string) {
  return useQuery<HolidayFromAPI>({
    queryKey: [HOLIDAY_QUERY_KEY, id],
    queryFn: () => holidayService.getById(id),
    enabled: !!id,
  });
}

export function useHolidaysByYear(year: number) {
  return useQuery<HolidayFromAPI[]>({
    queryKey: [HOLIDAY_QUERY_KEY, 'year', year],
    queryFn: () => holidayService.getByYear(year),
    enabled: !!year && year > 2000 && year < 2100,
  });
}

export function useCreateHoliday() {
  const queryClient = useQueryClient();
  return useMutation<HolidayFromAPI, Error, CreateHolidayData>({
    mutationFn: (data) => holidayService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [HOLIDAY_QUERY_KEY] });
    },
  });
}

export function useUpdateHoliday() {
  const queryClient = useQueryClient();
  return useMutation<HolidayFromAPI, Error, { id: string; data: UpdateHolidayData }>({
    mutationFn: ({ id, data }) => holidayService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [HOLIDAY_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [HOLIDAY_QUERY_KEY, variables.id] });
    },
  });
}

export function useDeleteHoliday() {
  const queryClient = useQueryClient();
  return useMutation<{ message: string }, Error, string>({
    mutationFn: (id) => holidayService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [HOLIDAY_QUERY_KEY] });
    },
  });
}

