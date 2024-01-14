'use client';

import { useRouter } from 'next/navigation';

import { PizzaTable as PizzaTableBase, PizzaTableProps } from '@/entities/pizza';
import { PizzaForm as PizzaFormBase, PizzaFormProps } from '@/features/pizza-store';

export function PizzaTable(props: PizzaTableProps) {
  const router = useRouter();

  return <PizzaTableBase {...props} onRowClick={pizza => router.push(`/pizza/${pizza.id}`)} />;
}

export function PizzaForm(props: PizzaFormProps) {
  const router = useRouter();

  return <PizzaFormBase {...props} onSubmitted={() => router.refresh()} />;
}
