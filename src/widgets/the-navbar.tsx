import Link from 'next/link';

import { LogoutButton } from '@/features/auth/ui';

export function TheNavbar() {
  return (
    <nav className="flex items-center justify-between shadow-lg px-4 py-4">
      <Link href="/">
        <h1 className="text-2xl font-bold">Pizza Admin</h1>
      </Link>
      <LogoutButton />
    </nav>
  );
}
