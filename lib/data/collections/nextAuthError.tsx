import { TypesNextAuthError } from 'lib/types';

export const DATA_NEXTAUTH_ERROR: TypesNextAuthError[] = [
  {
    _id: 'default',
    message: 'Unable to sign in.',
  },
  {
    _id: 'signin',
    message: 'Try signing in with a different account.',
  },
  {
    _id: 'oauthsignin',
    message: 'Try signing in with a different account.',
  },
  {
    _id: 'oauthcallback',
    message: 'Try signing in with a different account.',
  },
  {
    _id: 'oauthcreateaccount',
    message: 'Try signing in with a different account.',
  },
  {
    _id: 'emailcreateaccount',
    message: 'Try signing in with a different account.',
  },
  {
    _id: 'callback',
    message: 'Try signing in with a different account.',
  },
  {
    _id: 'oauthaccountnotlinked',
    message: 'To confirm your identity, sign in with the same account you used originally.',
  },
  {
    _id: 'emailsignin',
    message: 'The e-mail could not be sent.',
  },
  {
    _id: 'credentialssignin',
    message: 'Sign in failed. Check the details you provided are correct.',
  },
  {
    _id: 'sessionrequired',
    message: 'Please sign in to access this page.',
  },
];
