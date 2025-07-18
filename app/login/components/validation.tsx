import { z } from 'zod';

export const formSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .refine((val) => val.endsWith('@zod.com'), {
      message: 'Email must end with @zod.com',
    }),
  username: z
    .string()
    .min(5, { message: 'Username must be at least 5 characters' }),
  password: z
    .string()
    .min(10, {
      message:
        'Password must be at least 10 characters and contain at least one number',
    })
    .refine((val) => val.match(/\d/), {
      message: 'Password must contain at least one number',
    }),
});

export type FormData = z.infer<typeof formSchema>;

export async function loginSubmit(formData: FormData) {
  const result = formSchema.safeParse(formData);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
      message: 'Login failed',
    };
  }
  return {
    success: true,
    message: 'Login successful',
  };
}
