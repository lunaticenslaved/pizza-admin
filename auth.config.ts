import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { LoginSchema } from '@/features/auth';
import { ADMIN_PASSWORD } from '@/shared/server-constants';

export const authConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { password } = validatedFields.data;

          if (password === ADMIN_PASSWORD) {
            return {
              id: 'admin',
            };
          }
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
