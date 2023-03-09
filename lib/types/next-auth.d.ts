/* eslint-disable @typescript-eslint/no-unused-vars */
import { JWT } from 'next-auth/jwt';
import NextAuth from 'next-auth';

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      _id: string;
      email: string | null | undefined;
    };
  }
}

declare module 'next-auth' {
  interface Session {
    user: {
      _id?: string;
      email: string | null | undefined;
    };
  }
}
