export type USER = (typeof USER)[keyof typeof USER];
export const USER = {
  email: 'email',
  password: 'password',
} as const;
