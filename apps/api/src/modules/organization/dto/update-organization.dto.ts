import { z } from 'zod';

export const UpdateOrganizationDto = z.object({
  name: z.string().min(1, 'Organization name is required').optional(),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens').optional(),
  currencyCode: z.string().min(1, 'Currency code is required').optional(),
  dayFormat: z.string().min(1, 'Day format is required').optional(),
  timeFormat: z.string().min(1, 'Time format is required').optional(),
  timeZone: z.string().min(1, 'Time zone is required').optional(),
  domain: z.string().optional().nullable(),
  employeeIdLabel: z.string().min(1, 'Employee ID label is required').optional(),
  avatar: z.string().url().optional().nullable(),
  isActive: z.boolean().optional(),
});

export type UpdateOrganizationDto = z.infer<typeof UpdateOrganizationDto>;

