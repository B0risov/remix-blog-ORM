import { PrismaClient } from '@prisma/client';
import { authenticateUser } from '~/utils/authUtils';
import { createErrorResponse, createSuccessResponse } from '~/utils/responseUtils';

const client = new PrismaClient();

export async function handleAuthAction(request) {
  if (request.method === 'POST') {
    const form = await request.formData();
    const username = form.get('username');
    const password = form.get('password');

    const isValidPassword = await authenticateUser(username, password);

    if (!isValidPassword) {
      return createErrorResponse(401, 'Wrong username or password');
    } else {
      return createSuccessResponse(200);
    }
  } else {
    return createErrorResponse(405, 'Invalid request method');
  }
}

export default handleAuthAction;
