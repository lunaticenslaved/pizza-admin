'use client';

import { Button } from '@/shared/ui/button';

import { logout } from '../server-actions';

export function LogoutButton() {
  return <Button onClick={() => logout()}>Выйти</Button>;
}
