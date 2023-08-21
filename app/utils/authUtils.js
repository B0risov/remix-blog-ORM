import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { authenticateAndSetSession } from './sessionUtils'; // Импортируйте новую утилиту для сессий

const client = new PrismaClient();

export async function authenticateUser(username, password) {
  return await authenticateAndSetSession(username, password); // Используйте новую функцию
}