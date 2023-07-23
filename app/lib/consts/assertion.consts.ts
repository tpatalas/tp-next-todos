export type PATH_HOME = (typeof PATH_HOME)[keyof typeof PATH_HOME];
export const PATH_HOME = {
  home: '/',
  demo: '/app',
  features: '/features',
  implementations: '/implementations',
  pricing: '/pricing',
  contact: '/contact',
  auth: '/auth',
} as const;

export type PATH_IMAGE_HOME = (typeof PATH_IMAGE_HOME)[keyof typeof PATH_IMAGE_HOME];
export const PATH_IMAGE_HOME = {
  demo: 'home-demo-image-desk.png',
  contentFocus: 'home-content-focus.png',
  contentOrganize: 'home-content-organize.png',
  underConstruction: 'home-under-construction.png',
} as const;
