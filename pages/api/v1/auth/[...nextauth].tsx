import clientPromise from '@lib/dataConnections/mongodb';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';

export const authOptions: NextAuthOptions = {
  providers: [
    EmailProvider({
      server: {
        host: process.env.GCR_EMAIL_SERVER_HOST,
        port: process.env.GCR_EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.GCR_EMAIL_FROM,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          _id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (session)
        session.user = {
          _id: token.user._id,
          email: token.user.email,
          name: token.user.name,
          image: token.user.image,
        };
      return session;
    },
  },
  pages: {
    signIn: '/auth',
    signOut: '/',
    error: '/auth',
  },
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
  },
  debug: process.env.NODE_ENV === 'development',
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
