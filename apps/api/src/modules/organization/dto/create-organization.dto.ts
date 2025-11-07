import { z } from 'zod';

export const CreateOrganizationDto = z.object({
  name: z.string().min(1, 'Organization name is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  currencyCode: z.string().min(1, 'Currency code is required').default('PHP'),
  dayFormat: z.string().min(1, 'Day format is required').default('F d, Y'),
  timeFormat: z.string().min(1, 'Time format is required').default('h:i:s A'),
  timeZone: z.string().min(1, 'Time zone is required').default('Asia/Manila'),
  domain: z.string().optional(),
  employeeIdLabel: z.string().min(1, 'Employee ID label is required').default('Employee ID'),
  avatar: z.string().url().optional().nullable(),
  isActive: z.boolean().default(true),
});

export type CreateOrganizationDto = z.infer<typeof CreateOrganizationDto>;

