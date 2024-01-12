import NextAuth from 'next-auth';

import { authConfig } from '../auth.config';

import {
  DEFAULT_LOGIN_REDIRECT,
  isApiRoute as isApiRouteFn,
  isAuthRoute as isAuthRouteFn,
} from './routes';

export const { auth } = NextAuth(authConfig);

export default auth(req => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = isApiRouteFn(nextUrl.pathname);
  const isAuthRoute = isAuthRouteFn(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    return null;
  }

  if (!isLoggedIn) {
    return Response.redirect(new URL('/auth/login', nextUrl));
  }

  return null;
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
