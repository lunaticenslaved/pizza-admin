import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';

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

  const isApiRoute = isApiRouteFn(nextUrl.pathname);
  const isAuthRoute = isAuthRouteFn(nextUrl.pathname);

  if (isApiRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    return NextResponse.next();
  }

  if (!isLoggedIn) {
    return Response.redirect(new URL('/auth/login', nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/api/(.*)', '/(api|trpc)(.*)'],
};
