import { databaseConnect } from '@lib/dataConnections/databaseConnection';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '@lib/dataConnections/mongodb';
import User from '@lib/models/User';
import { Users } from '@lib/types';
import { compareHashedDataString } from '@states/utils';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
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

        return { email: user.email } as typeof user;
      },
    }),
  ],
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
});
