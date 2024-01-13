import { PropsWithChildren } from 'react';

import { Container } from '@/shared/ui/container';
import { TheNavbar } from '@/widgets/the-navbar';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <TheNavbar />
      <Container className="px-8 py-12">{children}</Container>
    </>
  );
}
