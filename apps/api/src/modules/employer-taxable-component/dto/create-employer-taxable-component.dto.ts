import { z } from 'zod';

export const CreateEmployerTaxableComponentDto = z.object({
  name: z.string().min(1, 'Name is required'),
  code: z.string().min(1, 'Code is required'),
  type: z.string().min(1, 'Type is required'),
  description: z.string().nullable().optional(),
  rateType: z.string().default('fixed'),
  rate: z.number().min(0, 'Rate must be non-negative'),
  account: z.string().nullable().optional(),
  entryType: z.string().default('debit'),
  isActive: z.boolean().default(true),
});

export type CreateEmployerTaxableComponentDto = z.infer<typeof CreateEmployerTaxableComponentDto>;

