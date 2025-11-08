import { z } from 'zod';

export const UpdateEmployerTaxableComponentDto = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  code: z.string().min(1, 'Code is required').optional(),
  type: z.string().min(1, 'Type is required').optional(),
  description: z.string().nullable().optional(),
  rateType: z.string().optional(),
  rate: z.number().min(0, 'Rate must be non-negative').optional(),
  account: z.string().nullable().optional(),
  entryType: z.string().optional(),
  isActive: z.boolean().optional(),
});

export type UpdateEmployerTaxableComponentDto = z.infer<typeof UpdateEmployerTaxableComponentDto>;

