import { STORAGE_KEY } from '@constAssertions/storage';
import validator from 'validator';

// Days
export const dayInSecond = 60 * 60 * 24;

// tailwind classNames
export const classNames = (...classes: unknown[]) => classes.filter(Boolean).join(' ') || undefined;

// Query Joins
export const queries = (...queries: unknown[]) => queries.filter(Boolean).join('&') || '';

// path joins
export const paths = (...paths: unknown[]) => paths.filter(Boolean).join('') || '';

// test-utils for custom render

export const fetchWithRetry = async (url: string, options?: {}, retryCount = 3) => {
  const offSession = getSessionStorage(STORAGE_KEY['offSession']);
  let response;
  if (offSession) throw response;
  for (let i = 0; i < retryCount; i++) {
    try {
      response = await fetch(url, options);
      if (response.ok) return response;
    } catch (error) {
      response = error;
    }
    // delay re-attempt to fetch every time fetch fails
    await new Promise((resolve) => setTimeout(resolve, 700));
  }
  throw response;
};

// timer
export const hasTimePast = (updateTimeInMilliSeconds: number, checkingTimeInMinutes?: number) => {
  const currentTime = Date.now();
  const difference = currentTime - updateTimeInMilliSeconds;
  const numberOfMinutes = checkingTimeInMinutes ?? 10;
  const checkingTime = numberOfMinutes * 60 * 1000;

  return difference > checkingTime;
};

export const cloudflareLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  const params = [`width=${width}`, `quality=${quality || 75}`, `format=${'webp' || 'webp'}`];
  return `${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/cdn-cgi/image/${params.join(',')}/${src}`;
};

// test if email has standard format of email address
export const validateEmailFormat = (email: string) => {
  const emailFormat = new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]{2,}$');
  return emailFormat.test(email);
};

export const getSessionStorage = (queryKey: STORAGE_KEY) => {
  const session = sessionStorage.getItem(queryKey);
  return session && JSON.parse(session);
};
export const setSessionStorage = (queryKey: STORAGE_KEY, value: unknown) =>
  sessionStorage.setItem(queryKey, JSON.stringify(value));
export const delSessionStorage = (queryKey: STORAGE_KEY) => sessionStorage.removeItem(queryKey);

export const retentionPolicy = ({ day }: { day: number }) => {
  //set 0 to set to 5 second as immediate action or set day to set day
  const now = (time?: number) => new Date(Date.now() + 1000 * (time ?? 5));
  if (day === 0) {
    return now();
  }
  return now(60 * 60 * 24 * day);
};

export const sanitize = (data: string) => data && validator.escape(validator.trim(data));

export const sanitizeObject = (obj: object) => {
  const sanitizedEntries = Object.entries(obj).map(([key, value]) => {
    return [key, typeof value === 'string' ? sanitize(value as string) : value];
  });
  return Object.fromEntries(sanitizedEntries) as typeof obj;
};
