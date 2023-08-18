import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const client = new PrismaClient();

export async function handleAuthAction(request) {
  if (request.method === 'POST') {
    const form = await request.formData();
    const username = form.get('username');
    const password = form.get('password');

    const user = await client.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      return {
        status: 401,
        body: JSON.stringify({
          error: 'Wrong username or password',
        }),
      };
    } else {
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return {
          status: 401,
          body: JSON.stringify({
            error: 'Wrong username or password',
          }),
        };
      } else {
        return {
          status: 200,
          body: JSON.stringify({
            success: true,
          }),
        };
      }
    }
  } else {
    return {
      status: 405,
      body: JSON.stringify({
        error: 'Invalid request method',
      }),
    };
  }
}

export default handleAuthAction