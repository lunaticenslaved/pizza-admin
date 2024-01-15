'use client';

import { PizzaDoughType } from '@prisma/client';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { DataTable } from '@/shared/ui/data-table';

import { Actions } from './actions';

type PizzaDoughTypeWithCount = PizzaDoughType & { _count: { pizza: number } };

const columnHelper = createColumnHelper<PizzaDoughTypeWithCount>();

const columns: ColumnDef<PizzaDoughTypeWithCount>[] = [
  {
    accessorKey: 'title',
    header: 'Имя',
  },
  columnHelper.display({
    id: 'pizzaCount',
    header: 'Пиццы',
    cell: props => props.row.original._count.pizza,
  }),
  columnHelper.display({
    id: 'actions',
    cell: props => (
      <div className="flex justify-end">
        <Actions doughType={props.row.original} />
      </div>
    ),
  }),
];

interface PizzaDoughTypeTableProps {
  doughTypes: PizzaDoughTypeWithCount[];
}

export function PizzaDoughTypeTable({ doughTypes }: PizzaDoughTypeTableProps) {
  return <DataTable searchKey="title" columns={columns} data={doughTypes} />;
}
