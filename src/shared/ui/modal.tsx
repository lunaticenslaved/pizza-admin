'use client';

import { PropsWithChildren } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';

interface ModalProps extends PropsWithChildren {
  title: string;
  description: string;
  isOpen: boolean;
  onClose(): void;
}

export function Modal({ title, description, isOpen, onClose, children }: ModalProps) {
  function onChange(value: boolean) {
    if (!value) {
      onClose();
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
}
