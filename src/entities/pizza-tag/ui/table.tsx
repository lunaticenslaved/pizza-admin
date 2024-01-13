'use client';

import { PizzaTag } from '@prisma/client';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { PizzaTagActions } from '@/entities/pizza-tag/ui/actions';
import { DataTable } from '@/shared/ui/data-table';

type PizzaTagWithCount = PizzaTag & { _count: { pizza: number } };

const columnHelper = createColumnHelper<PizzaTagWithCount>();

const columns: ColumnDef<PizzaTagWithCount>[] = [
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
        <PizzaTagActions tag={props.row.original} />
      </div>
    ),
  }),
];

interface PizzaTagsTableProps {
  tags: PizzaTagWithCount[];
}

export function PizzaTagsTable({ tags }: PizzaTagsTableProps) {
  return <DataTable searchKey="title" columns={columns} data={tags} />;
}
