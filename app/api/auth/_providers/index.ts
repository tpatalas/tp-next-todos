import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import { envProviders } from '@/_lib/configs/envSchema';

export const providerEmail = EmailProvider({
  server: {
    host: envProviders.GCR_EMAIL_SERVER_HOST,
    port: envProviders.GCR_EMAIL_SERVER_PORT,
    auth: {
      user: envProviders.EMAIL_SERVER_USER,
      pass: envProviders.EMAIL_SERVER_PASSWORD,
    },
  },
  from: envProviders.GCR_EMAIL_FROM,
});

export const providerGoogle = GoogleProvider({
  clientId: envProviders.GOOGLE_CLIENT_ID,
  clientSecret: envProviders.GOOGLE_CLIENT_SECRET,
});

export const providerGithub = GitHubProvider({
  clientId: envProviders.GITHUB_CLIENT_ID,
  clientSecret: envProviders.GITHUB_CLIENT_SECRET,
});
