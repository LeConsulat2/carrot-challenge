//app/login/components/validation.tsx

import { z } from 'zod';

export const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email' })
    .refine((val) => val.endsWith('@zod.com'), {
      message: 'Email must end with @zod.com',
    }),
  username: z
    .string()
    .min(1, { message: 'Username is required' })
    .min(5, { message: 'Username must be at least 5 characters' })
    .max(20, { message: 'username must not exceed 20 characters' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(10, { message: 'Password must be at least 10 characters' })
    .refine((val) => val.match(/\d/), {
      message: 'Password must contain at least one number',
    })
    .refine((val) => /[A-Z]/.test(val), {
      message: 'Password must contain at least one uppercase',
    }),
});

export type FormData = z.infer<typeof formSchema>;

export async function loginSubmit(formData: FormData): Promise<{
  success: boolean;
  message: string;
  errors?: Partial<Record<keyof FormData, string[]>>;
}> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const result = formSchema.safeParse(formData);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
      message: 'Please fix the errors below',
    };
  }

  return {
    success: true,
    message: 'Login successful',
  };
}
