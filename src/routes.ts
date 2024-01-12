export const DEFAULT_LOGIN_REDIRECT = '/';

export function isAuthRoute(route: string) {
  return ['/auth/login'].includes(route);
}

export function isApiRoute(route: string) {
  return ['/api/auth'].includes(route);
}
