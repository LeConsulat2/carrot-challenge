//app/lib/auth.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function createUser(
  email: string,
  username: string,
  password: string,
) {
  const hashedPassword = await hashPassword(password);

  return prisma.user.create({
    data: {
      email,
      username,
      password: hashedPassword,
    },
  });
}
