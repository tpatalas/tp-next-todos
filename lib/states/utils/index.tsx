import { CATCH } from '@data/dataTypesConst';
import { render, RenderOptions } from '@testing-library/react';
import React, { FC, ReactElement } from 'react';
import { atom, atomFamily, RecoilRoot } from 'recoil';
import { hash, compare } from 'bcryptjs';

/**
 * Atoms
 */
export const atomCatch = atomFamily<boolean, CATCH>({
  key: 'atomCatch',
  default: false,
});

export const atomDisableScroll = atom<boolean>({
  key: 'atomDisableScroll',
  default: false,
});

/**
 * Utils
 **/

// Days
export const dayInSecond = 60 * 60 * 24;

// tailwind classNames
export const classNames = (...classes: unknown[]) => classes.filter(Boolean).join(' ') || undefined;

// Query Joins
export const queries = (...queries: unknown[]) => queries.filter(Boolean).join('&') || '';

// path joins
export const paths = (...paths: unknown[]) => paths.filter(Boolean).join('') || '';

// test-utils for custom render
const RecoilRootProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export const renderWithRecoilRoot = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: RecoilRootProvider, ...options });

export const fetchWithRetry = async (url: string, options?: {}, retryCount = 3) => {
  let response;
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

export const nextImageLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${src}?w=${width}&q=${quality || 75}`;
};
// hash data string with bcrypt
export const hashDataString = async (data: string) => await hash(data, 12);

// compare hash data string with bcrypt
export const compareHashedDataString = async (data: string, hashedData: string) => await compare(data, hashedData);

// test password with regex
export const validateStrongPassword = (password: string) => {
  //Minimum 8 characters, maximum 100 characters at least one uppercase letter, one lowercase letter, one number and one special character
  const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,100})');
  return strongRegex.test(password);
};

// test if email has standard format of email address
export const validateEmailFormat = (email: string) => {
  const emailFormat = new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$');
  return emailFormat.test(email);
};
