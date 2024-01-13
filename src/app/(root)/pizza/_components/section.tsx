import { PropsWithChildren, ReactNode } from 'react';

import { Separator } from '@/shared/ui/separator';

interface SectionProps extends PropsWithChildren {
  title: string;
  append: ReactNode;
}

export function Section({ children, title, append }: SectionProps) {
  return (
    <section className="mb-8 lest:mb-0">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        {append}
      </div>
      <Separator />
      {children}
    </section>
  );
}
