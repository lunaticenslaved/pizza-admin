'use client';

import { PizzaSize } from '@prisma/client';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { DataTable } from '@/shared/ui/data-table';

import { Actions } from './actions';

type PizzaSizeWithCount = PizzaSize & { _count: { prices: number } };

const columnHelper = createColumnHelper<PizzaSizeWithCount>();

const columns: ColumnDef<PizzaSizeWithCount>[] = [
  {
    accessorKey: 'title',
    header: 'Имя',
  },
  columnHelper.display({
    id: 'pizzaCount',
    header: 'Пиццы',
    cell: props => props.row.original._count.prices,
  }),
  columnHelper.display({
    id: 'actions',
    cell: props => (
      <div className="flex justify-end">
        <Actions size={props.row.original} />
      </div>
    ),
  }),
];

interface PizzaSizeTableProps {
  sizes: PizzaSizeWithCount[];
}

export function PizzaSizeTable({ sizes }: PizzaSizeTableProps) {
  return <DataTable searchKey="title" columns={columns} data={sizes} />;
}
