import NextAuth from 'next-auth';

import { authConfig } from './auth.config';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  update,
} = NextAuth({
  ...authConfig,
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  callbacks: {},
  session: { strategy: 'jwt' },
});
