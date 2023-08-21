import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '@/_lib/db/mongodb';
import NextAuth, { NextAuthOptions } from 'next-auth';
import { envNextAuth } from '@/_lib/configs/envSchema';
import { providerEmail, providerGoogle, providerGithub } from '../_providers';

export const authOptions: NextAuthOptions = {
  providers: [providerEmail, providerGoogle, providerGithub],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        try {
          token.user = {
            _id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          };
        } catch (error) {
          console.error('JWT callback error: ', error);
          throw new Error('Token is not defined');
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session) {
        try {
          session.user = {
            _id: token.user._id,
            email: token.user.email,
            name: token.user.name,
            image: token.user.image,
          };
        } catch (error) {
          console.error('Session callback error: ', error);
          throw new Error('Token or user in token is not defined');
        }
      }
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
    secret: envNextAuth.NEXTAUTH_JWT_SECRET,
  },
  secret: envNextAuth.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
