import { PropsWithChildren } from 'react';

import { Container } from '@/shared/ui/container';
import { TheNavbar } from '@/widgets/the-navbar';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col max-h-full overflow-y-auto relative">
      <TheNavbar className="top-0 sticky" />
      <Container className="px-8 py-12 flex-1">{children}</Container>
    </div>
  );
}
