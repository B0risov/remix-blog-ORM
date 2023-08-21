import { PrismaClient } from '@prisma/client';
import { createCookieSessionStorage } from "@remix-run/node"; 
const bcrypt = require('bcrypt');

const client = new PrismaClient();

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "__session",
      secrets: ["X2kR8pU5zW3cQeSvYz8CfA4dG7jKmNp"], 
      sameSite: "lax",
    },
  });

async function authenticateAndSetSession(username, password) {
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
    session.set("userId", user.id);
    await commitSession(session);
    return true;
  }

  return false;
}

export { getSession, commitSession, destroySession, authenticateAndSetSession };