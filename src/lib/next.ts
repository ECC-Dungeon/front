import { env } from '@/config/env';

export const getNext = async (clearFloor: number) => {
  const response = await fetch(
    `${env.API_URL}/game/next?clearFloor=${clearFloor}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('GameToken') || '',
      },
    },
  );
  const data = await response.json();
  return data;
};
