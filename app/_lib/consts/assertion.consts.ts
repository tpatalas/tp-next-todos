export type PATH_ROUTE = (typeof PATH_ROUTE)[keyof typeof PATH_ROUTE];
export const PATH_ROUTE = {
  home: '/',
  demo: '/app',
  features: '/features',
  implementations: '/implementations',
  pricing: '/pricing',
  contact: '/contact',
  auth: '/auth',
} as const;

export type PATH_IMAGE = (typeof PATH_IMAGE)[keyof typeof PATH_IMAGE];
export const PATH_IMAGE = {
  // app
  focus: 'app-focus.png',
  urgent: 'app-urgent.png',
  important: 'app-important.png',
  showAll: 'app-showall.png',
  completed: 'app-completed.png',
  label: 'app-label.png',
  avatar: 'app-user-avatar.png',
  // landing page
  demo: 'home-demo-image-desk.png',
  contentFocus: 'home-content-focus.png',
  contentOrganize: 'home-content-organize.png',
  underConstruction: 'home-under-construction.png',
} as const;
