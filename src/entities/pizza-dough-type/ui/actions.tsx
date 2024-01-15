import { useState } from 'react';

import { PizzaDoughType } from '@prisma/client';
import { DotsVerticalIcon } from '@radix-ui/react-icons';

import { Button } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';

import { DeleteDialog } from './delete-dialog';
import { PizzaDoughTypeFormDialog } from './form-dialog';

interface ActionsProps {
  doughType: PizzaDoughType;
}

export function Actions({ doughType }: ActionsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <>
      {isDeleting && (
        <DeleteDialog
          isOpen={isDeleting}
          onClose={() => setIsDeleting(false)}
          doughType={doughType}
        />
      )}
      {isEditing && (
        <PizzaDoughTypeFormDialog
          doughType={doughType}
          isOpen={isEditing}
          onClose={() => setIsEditing(false)}
        />
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
