import { z } from 'zod';

export const CreateGraceTimeDto = z.object({
  organizationId: z.string().min(1, 'Organization ID is required'),
  arrivalGraceEnabled: z.boolean().default(true),
  arrivalGraceTime: z.number().int().min(0).default(10),
  departureGraceEnabled: z.boolean().default(true),
  departureGraceTime: z.number().int().min(0).default(15),
  breakGraceEnabled: z.boolean().default(true),
  breakGraceTime: z.number().int().min(0).default(5),
  earlyLeaveGraceEnabled: z.boolean().default(true),
  earlyLeaveGraceTime: z.number().int().min(0).default(30),
});

export type CreateGraceTimeDto = z.infer<typeof CreateGraceTimeDto>;


