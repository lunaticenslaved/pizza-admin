'use client';

import { ReactNode, useRef, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { zodResolver } from '@hookform/resolvers/zod';
import { PizzaSize } from '@prisma/client';
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

import { PizzaSizeSchema } from '../schema';
import { createSize, updateSize } from '../server-actions';
import { PizzaSizeValues } from '../types';

// TODO: add hiding tags

interface PizzaSizeFormDialogProps {
  isOpen?: boolean;
  onClose?(): void;
  trigger?: ReactNode;
  size?: PizzaSize;
}

export function PizzaSizeFormDialog({ size, trigger, isOpen, onClose }: PizzaSizeFormDialogProps) {
  const title = size ? 'Редактировать размер' : 'Новый размер';
  const actionTitle = size ? 'Сохранить' : 'Создать';

  const router = useRouter();

  const form = useForm<PizzaSizeValues>({
    resolver: zodResolver(PizzaSizeSchema),
    defaultValues: {
      title: size?.title || '',
    },
  });

  const { handleSubmit } = form;

  const [isPending, startTransition] = useTransition();

  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  function onSubmit(values: PizzaSizeValues) {
    startTransition(async () => {
      const promise = !size ? createSize(values) : updateSize(size.id, values);

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
