'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { LogoutButton } from '@/features/auth/ui';
import { cn } from '@/shared/lib';
import { ClassNameProp } from '@/shared/types';

const routes = [
  {
    title: 'Dashboard',
    href: '/',
  },
  {
    title: 'Пицца',
    href: '/pizza',
  },
];

export function TheNavbar({ className }: ClassNameProp) {
  const pathname = usePathname();

  return (
    <nav className={cn('flex items-center shadow-lg px-4 py-4', className)}>
      <Link href="/">
        <h1 className="text-2xl font-bold">Pizza Admin</h1>
      </Link>
      <div className="flex-1 px-6">
        {routes.map(({ title, href }) => (
          <Link
            key={href}
            href={href}
            className={cn('px-2 opacity-50 hover:opacity-100 transition-all', {
              'opacity-100': pathname === href,
            })}>
            {title}
          </Link>
        ))}
      </div>

      <LogoutButton />
    </nav>
  );
}
