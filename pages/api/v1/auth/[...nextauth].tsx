import { databaseConnect } from '@lib/dataConnections/databaseConnection';
import clientPromise from '@lib/dataConnections/mongodb';
import User from '@lib/models/User';
import { Users } from '@lib/types';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { compareHashedDataString } from '@states/utils';
import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        await databaseConnect();

        const query: Partial<Users> = {
          email: credentials?.email,
        };

        const user = await User.findOne(query);
        const validPassword = credentials && (await compareHashedDataString(credentials.password, user.password));

        if (!user || !validPassword) throw new Error('Invalid email or password!');

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          email: user.email,
          _id: user.id,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (session)
        session.user = {
          email: token.user.email,
          _id: token.user._id,
        };
      return session;
    },
  },
  pages: {
    signIn: '/auth',
    signOut: '/app',
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
