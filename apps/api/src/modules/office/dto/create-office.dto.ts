import { z } from 'zod';

const phoneNumberSchema = z.object({
  countryCode: z.string().default('+63'),
  number: z.string().min(1, 'Phone number is required'),
  type: z.string().optional().nullable(),
  isPrimary: z.boolean().default(false),
});

const emailAddressSchema = z.object({
  email: z.string().email('Invalid email address'),
  type: z.string().optional().nullable(),
  isPrimary: z.boolean().default(false),
});

export const CreateOfficeDto = z.object({
  name: z.string().min(1, 'Office name is required'),
  branchName: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  addressLine1: z.string().min(1, 'Address line 1 is required'),
  addressLine2: z.string().optional().nullable(),
  barangay: z.string().optional().nullable(),
  city: z.string().min(1, 'City is required'),
  province: z.string().min(1, 'Province is required'),
  region: z.string().min(1, 'Region is required'),
  zipCode: z.string().min(1, 'Zip code is required'),
  country: z.string().default('Philippines'),
  isActive: z.boolean().default(true),
  phoneNumbers: z.array(phoneNumberSchema).optional().default([]),
  emailAddresses: z.array(emailAddressSchema).optional().default([]),
});

export type CreateOfficeDto = z.infer<typeof CreateOfficeDto>;

