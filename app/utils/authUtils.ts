import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { authenticateAndSetSession, commitSession, getSession } from './sessionUtils'; 

const client = new PrismaClient();

async function authenticateUser(username, password) {
  const user = await client.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!user) {
    return false;
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (isValidPassword) {
    const session = await getSession();
    if (!session.get("userId")) {
      return false;
    }
    session.set("userId", user.id);
    await commitSession(session);
    return true;
  }

  return false;
}