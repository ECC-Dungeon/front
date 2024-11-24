import { HttpResponse, http } from 'msw';

import { env } from '@/config/env';

import { networkDelay } from '../utils';

import { authHandlers } from './auth';
import { usersHandlers } from './users';
import { teamNameHandler } from './team-name';

export const handlers = [
  ...authHandlers,
  ...usersHandlers,
  ...teamNameHandler,
  http.get(`${env.API_URL}/healthcheck`, async () => {
    await networkDelay();
    return HttpResponse.json({ ok: true });
  }),
];
