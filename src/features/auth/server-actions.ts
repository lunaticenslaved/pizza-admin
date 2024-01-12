'use server';

import { AuthError } from 'next-auth';

import { signIn, signOut } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

import { LoginSchema } from './schemas';
import { LoginValues } from './types';

interface LoginResponse {
  message: string;
  type: 'success' | 'error';
}

export async function login(values: LoginValues): Promise<LoginResponse> {
  const validateFields = LoginSchema.safeParse(values);

  if (!validateFields.success) {
    return { type: 'error', message: 'Invalid fields' };
  }

  const { password } = validateFields.data;

  try {
    await signIn('credentials', {
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { type: 'error', message: 'Invalid credentials' };
        default: {
          return { type: 'error', message: 'Something went wrong' };
        }
      }
    }

    throw error;
  }

  return { type: 'success', message: 'Authenticated' };
}

export async function logout() {
  await signOut();
}
