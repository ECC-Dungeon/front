import { env } from '@/config/env';
import { http, HttpResponse } from 'msw';

import { db } from '../db';
import { networkDelay, requireAuth, sanitizeUser } from '../utils';

export const usersHandlers = [
  http.get(`${env.API_URL}/users`, async ({ cookies }) => {
    await networkDelay();

    try {
      const { error } = requireAuth(cookies);
      if (error) {
        return HttpResponse.json({ message: error }, { status: 401 });
      }
      const result = db.user.findMany({}).map(sanitizeUser);

      return HttpResponse.json({ data: result });
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      );
    }
  }),
];
