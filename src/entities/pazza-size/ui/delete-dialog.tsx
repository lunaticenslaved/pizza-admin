'use client';

import { useEffect, useState, useTransition } from 'react';
import { toast } from 'react-toastify';

import { PizzaSize } from '@prisma/client';
import { useRouter } from 'next/navigation';

import { Button } from '@/shared/ui/button';
import { Modal } from '@/shared/ui/modal';

import { deleteSize } from '../server-actions';

interface DeleteDialogProps {
  size: PizzaSize;
  isOpen: boolean;
  onClose(): void;
}

export function DeleteDialog({ size, isOpen, onClose }: DeleteDialogProps) {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  function onConfirm() {
    startTransition(() => {
      deleteSize(size.id)
        .then(({ type, message }) => {
          toast[type](message);
        })
        .catch(() => {
          toast.error('Что-то пошло не так');
        })
        .finally(() => {
          router.refresh();
          onClose();
        });
    });
  }

  return (
    <Modal
      title="Удалить размер?"
      description="Все пиццы будут отвязаны от этого размера"
      isOpen={isOpen}
      onClose={onClose}>
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={isPending} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={isPending} variant="destructive" onClick={onConfirm}>
          Continue
        </Button>
      </div>
    </Modal>
  );
}
