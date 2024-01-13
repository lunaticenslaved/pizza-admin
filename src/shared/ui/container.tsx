import { PropsWithChildren } from 'react';

import { cn } from '@/shared/lib';
import { ClassNameProp } from '@/shared/types';

export function Container({ children, className }: PropsWithChildren & ClassNameProp) {
  return <div className={cn('max-w-[800px] mx-auto', className)}>{children}</div>;
}
