//app/login/actions.ts
'use server';

import { z } from 'zod';
import { findUserByEmail, verifyPassword } from '../lib/auth';
import { getSession } from '../lib/session';
import { redirect } from 'next/navigation';

const loginSchema = z.object({
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
    .max(20, { message: 'Username must not exceed 20 characters' }),
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

type FormData = z.infer<typeof loginSchema>;

export async function loginAction(formData: FormData): Promise<{
  success: boolean;
  message: string;
  errors?: Partial<Record<keyof FormData, string[]>>;
}> {
  const result = loginSchema.safeParse(formData);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
      message: 'Please fix the errors below',
    };
  }

  const { email, password } = result.data;

  try {
    // Find user by email
    const user = await findUserByEmail(email);
    if (!user) {
      return {
        success: false,
        message: 'Invalid email or password',
      };
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      return {
        success: false,
        message: 'Invalid email or password',
      };
    }

    // Set session
    const session = await getSession();
    session.userId = user.id;
    session.username = user.username;
    session.email = user.email;
    session.isLoggedIn = true;
    await session.save();

    return {
      success: true,
      message: 'Login successful! Redirecting...',
    };
  } catch (error) {
    console.error('Error during login:', error);
    return {
      success: false,
      message: 'Login failed. Please try again.',
    };
  }
}
