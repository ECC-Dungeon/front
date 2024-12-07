import { HttpResponse, http } from 'msw';

import { env } from '@/config/env';

import { networkDelay } from '../utils';

import { teamNameHandler } from './team-name';
import { floorHandler } from './floor';
import { gameStatusHandler } from './game-status';

export const handlers = [
  ...teamNameHandler,
  ...floorHandler,
  ...gameStatusHandler,
  http.get(`${env.API_URL}/healthcheck`, async () => {
    await networkDelay();
    return HttpResponse.json({ ok: true });
  }),
];
