import { z } from 'zod';

const envNextAuthProvidersSchema = z.object({
  GCR_EMAIL_SERVER_HOST: z.string().email('GCR_EMAIL_SERVER_HOST should be a valid email'),
  GCR_EMAIL_SERVER_PORT: z.number().nonnegative('GCR_EMAIL_SERVER_PORT not defined'),
  EMAIL_SERVER_USER: z.string().nonempty('EMAIL_SERVER_USER not defined'),
  EMAIL_SERVER_PASSWORD: z.string().nonempty('EMAIL_SERVER_PASSWORD not defined'),
  GCR_EMAIL_FROM: z.string().nonempty('GCR_EMAIL_FROM not defined'),
  GOOGLE_CLIENT_ID: z.string().nonempty('GOOGLE_CLIENT_ID not defined'),
  GOOGLE_CLIENT_SECRET: z.string().nonempty('GOOGLE_CLIENT_SECRET not defined'),
  GITHUB_CLIENT_ID: z.string().nonempty('GITHUB_CLIENT_ID not defined'),
  GITHUB_CLIENT_SECRET: z.string().nonempty('GITHUB_CLIENT_SECRET not defined'),
});

const envNextAuthSecretsSchema = z.object({
  NEXTAUTH_JWT_SECRET: z.string().nonempty('NEXTAUTH_JWT_SECRET not defined'),
  NEXTAUTH_SECRET: z.string().nonempty('NEXTAUTH_SECRET not defined'),
});

export const envProviders = envNextAuthProvidersSchema.parse(process.env);
export const envNextAuth = envNextAuthSecretsSchema.parse(process.env);
