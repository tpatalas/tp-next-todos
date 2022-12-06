import { TypesQuery } from '@lib/types';
import { cachedData } from './stateArrayObjects';
import { CACHED_DATA } from './stateObjects';

interface TypesCachedData {
  key: CACHED_DATA;
  cachedTimer: number;
  data: TypesQuery;
}

const cache: TypesQuery = {};
export const getCachedData = (key: TypesCachedData['key']) => {
  if (!cache[key]) {
    cache[key] = cachedData().find((data) => data.key === key);
  }
  if (Object.keys(cache).length > 0) {
    setTimeout(() => {
      const currentTime = new Date().getTime();
      Object.keys(cache).forEach((key) => {
        const seconds = currentTime - cache[key].cachedTimer;

        seconds > 300 && delete cache[key]; // Expire after 300 seconds (5 min)
      });
    }, 5000);
  }

  return cache[key]['data'];
};
