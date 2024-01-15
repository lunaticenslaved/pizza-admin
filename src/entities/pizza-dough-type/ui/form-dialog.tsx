'use client';

import { ReactNode, useRef, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { zodResolver } from '@hookform/resolvers/zod';
import { PizzaDoughType } from '@prisma/client';
import { useRouter } from 'next/navigation';

import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';

import { PizzaDoughTypeSchema } from '../schema';
import { createDoughType, updateDoughType } from '../server-actions';
import { PizzaDoughTypeValues } from '../types';

// TODO: add hiding tags

interface PizzaDoughTypeFormDialogProps {
  isOpen?: boolean;
  onClose?(): void;
  trigger?: ReactNode;
  doughType?: PizzaDoughType;
}

export function PizzaDoughTypeFormDialog({
  doughType,
  trigger,
  isOpen,
  onClose,
}: PizzaDoughTypeFormDialogProps) {
  const title = doughType ? 'Редактировать тесто' : 'Новое тесто';
  const actionTitle = doughType ? 'Сохранить' : 'Создать';

  const router = useRouter();

  const form = useForm<PizzaDoughTypeValues>({
    resolver: zodResolver(PizzaDoughTypeSchema),
    defaultValues: {
      title: doughType?.title || '',
    },
  });

  const { handleSubmit } = form;

  const [isPending, startTransition] = useTransition();

  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  function onSubmit(values: PizzaDoughTypeValues) {
    startTransition(async () => {
      const promise = !doughType ? createDoughType(values) : updateDoughType(doughType.id, values);

      promise
        .then(({ type, message }) => {
          toast[type](message);

          if (type === 'success') {
            form.reset();
          }
        })
        .catch(() => {
          toast.error('Что-то пошло не так');
        })
        .finally(() => {
          router.refresh();
          onClose?.();
          closeButtonRef.current?.click();
        });
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={v => !v && onClose?.()}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <Form {...form}>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имя</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild ref={closeButtonRef}>
                <Button type="button" variant="secondary">
                  Отмена
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {actionTitle}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  );
}
