import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const client = new PrismaClient();

export async function authenticateUser(username, password) {
  const user = await client.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!user) {
    return false;
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  return isValidPassword;
}