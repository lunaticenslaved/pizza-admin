import { useState } from 'react';

import { PizzaSize } from '@prisma/client';
import { DotsVerticalIcon } from '@radix-ui/react-icons';

import { Button } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';

import { DeleteDialog } from './delete-dialog';
import { PizzaSizeFormDialog } from './form-dialog';

interface ActionsProps {
  size: PizzaSize;
}

export function Actions({ size }: ActionsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <>
      {isDeleting && (
        <DeleteDialog isOpen={isDeleting} onClose={() => setIsDeleting(false)} size={size} />
      )}
      {isEditing && (
        <PizzaSizeFormDialog size={size} isOpen={isEditing} onClose={() => setIsEditing(false)} />
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <DotsVerticalIcon className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem onClick={() => setIsEditing(true)}>Редактировать</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDeleting(true)}>
            <span className="text-red-500">Удалить</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
