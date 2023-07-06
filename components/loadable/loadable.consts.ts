export type SPINNER = (typeof SPINNER)[keyof typeof SPINNER];
export const SPINNER = {
  authForm: 'authForm',
  verificationConfirm: 'verificationConfirm',
} as const;

export const errorStateMessage = 'Something went wrong! Please try again.';
