'use client';

import { useMemo } from 'react';

import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { Button } from '@/shared/ui/button';
import { DataTable } from '@/shared/ui/data-table';

type LocalPizzaPrice = { size: string; price: number };

const columnHelper = createColumnHelper<LocalPizzaPrice>();

interface PizzaPriceTableProps {
  sizes: LocalPizzaPrice[];
  disabled?: boolean;
  onDelete(index: number): void;
}

export function PizzaPriceTable({ sizes, disabled, onDelete }: PizzaPriceTableProps) {
  const columns: ColumnDef<LocalPizzaPrice>[] = useMemo(
    () => [
      {
        accessorKey: 'size',
        header: 'Размер',
      },
      {
        accessorKey: 'price',
        header: 'Цена',
      },
      columnHelper.display({
        id: 'actions',
        cell: ({ row }) => (
          <div className="flex justify-end">
            <Button variant="destructive" disabled={disabled} onClick={() => onDelete(row.index)}>
              Удалить
            </Button>
          </div>
        ),
      }),
    ],
    [disabled, onDelete],
  );

  return <DataTable columns={columns} data={sizes} />;
}
