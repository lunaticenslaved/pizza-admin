import { PropsWithChildren } from 'react';

import { TheNavbar } from '@/widgets/the-navbar';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <TheNavbar />
      {children}
    </>
  );
}
