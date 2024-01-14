import { useState } from 'react';

import { DotsVerticalIcon } from '@radix-ui/react-icons';

import { Button } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';

import { DeleteDialog } from './delete-dialog';

interface ActionsProps {
  pizzaId: string;
}

export function Actions({ pizzaId }: ActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <>
      {isDeleting && (
        <DeleteDialog isOpen={isDeleting} onClose={() => setIsDeleting(false)} pizzaId={pizzaId} />
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <DotsVerticalIcon className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem onClick={() => setIsDeleting(true)}>
            <span className="text-red-500">Удалить</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
