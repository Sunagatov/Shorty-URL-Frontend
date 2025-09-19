import { z } from 'zod';
import { VALIDATION_RULES } from '../constants';

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, VALIDATION_RULES.EMAIL.REQUIRED)
    .email(VALIDATION_RULES.EMAIL.INVALID),
  password: z
    .string()
    .min(1, VALIDATION_RULES.PASSWORD.REQUIRED)
    .min(8, VALIDATION_RULES.PASSWORD.MIN_LENGTH),
});

export const signUpSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
  country: z.string().optional(),
  age: z.string().min(1, 'Age is required'),
  email: z
    .string()
    .min(1, VALIDATION_RULES.EMAIL.REQUIRED)
    .email(VALIDATION_RULES.EMAIL.INVALID)
    .max(100),
  password: z
    .string()
    .min(8, VALIDATION_RULES.PASSWORD.MIN_LENGTH)
    .max(50),
});

export const createUrlSchema = z.object({
  originalUrl: z
    .string()
    .min(1, VALIDATION_RULES.URL.REQUIRED)
    .url(VALIDATION_RULES.URL.INVALID),
  customAlias: z.string().optional(),
  expiresAt: z.string().optional(),
});

export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type CreateUrlFormData = z.infer<typeof createUrlSchema>;