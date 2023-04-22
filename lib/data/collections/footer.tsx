import { PATH_HOME } from '@constAssertions/data';

export type TypesName =
  | 'spotlightHeader'
  | 'spotlightSubHeader'
  | 'spotlightBody'
  | 'overloadHeader'
  | 'overloadSubHeader'
  | 'overloadBody';
type TypesValues = 'startPosition' | 'multiplier';
export type TypesDataScrollRate<T> = {
  name: T;
  adjuster?: number;
} & Record<TypesValues, number>;

interface TypesFooterNavigation {
  name: string;
  path: PATH_HOME;
}

type social = 'name' | 'link' | 'path';
export type TypesFooterSocial = Record<social, string>;

export const DATA_FOOTER_NAVIGATION: TypesFooterNavigation[] = [
  { name: 'About', path: PATH_HOME['home'] },
  { name: 'Feature', path: PATH_HOME['features'] },
  { name: 'Implementation', path: PATH_HOME['implementations'] },
  { name: 'Pricing', path: PATH_HOME['pricing'] },
  { name: 'Demo', path: PATH_HOME['demo'] },
  { name: 'Contact', path: PATH_HOME['contact'] },
];

export const DATA_FOOTER_SOCIAL: TypesFooterSocial[] = [
  {
    name: 'GitHub',
    link: process.env.NEXT_PUBLIC_SOCIAL_GITHUB as string,
    path: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z',
  },
];

export const DATA_FOOTER_SCROLL_RATE: TypesDataScrollRate<TypesName>[] = [
  {
    name: 'spotlightHeader',
    startPosition: 1500,
    multiplier: 350,
    adjuster: 2,
  },
  {
    name: 'spotlightSubHeader',
    startPosition: 1500,
    multiplier: 500,
    adjuster: 2,
  },
  {
    name: 'spotlightBody',
    startPosition: 1700,
    multiplier: 500,
    adjuster: 2,
  },
  {
    name: 'overloadHeader',
    startPosition: 1900,
    multiplier: 350,
    adjuster: 3.5,
  },
  {
    name: 'overloadSubHeader',
    startPosition: 1900,
    multiplier: 500,
    adjuster: 3.5,
  },
  {
    name: 'overloadBody',
    startPosition: 2100,
    multiplier: 500,
    adjuster: 3.5,
  },
];
