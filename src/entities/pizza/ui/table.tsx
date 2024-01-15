'use client';

import { Pizza } from '@prisma/client';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { minBy } from 'lodash';

import { DataTable } from '@/shared/ui/data-table';

import { Actions } from './actions';

type LocalPizza = Pizza & {
  image: {
    link: string;
  };
  prices: Array<{
    rub: number;
    size: {
      title: string;
    };
  }>;
};

const columnHelper = createColumnHelper<LocalPizza>();

const columns: ColumnDef<LocalPizza>[] = [
  {
    accessorKey: 'title',
    header: 'Имя',
  },
  columnHelper.display({
    id: 'minPrice',
    header: 'Цена',
    cell: ({
      row: {
        original: { prices },
      },
    }) => {
      const { rub, size } = minBy(prices, price => price.rub) || {};

      return `от ${rub} руб. за ${size?.title}`;
    },
  }),
  columnHelper.display({
    id: 'actions',
    cell: props => (
      <div className="flex justify-end">
        <Actions pizzaId={props.row.original.id} />
      </div>
    ),
  }),
];

export interface PizzaTableProps {
  pizza: LocalPizza[];
  onRowClick?(value: LocalPizza): void;
}

export function PizzaTable({ pizza, onRowClick }: PizzaTableProps) {
  return <DataTable searchKey="title" columns={columns} data={pizza} onRowClick={onRowClick} />;
}
