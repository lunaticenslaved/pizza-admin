import { ReactNode, useRef } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { PizzaSize } from '@prisma/client';

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';

import { PizzaPriceSchema } from '../schema';
import { PizzaPriceValues } from '../types';

interface PriceFormDialogProps {
  trigger: ReactNode;
  sizes: PizzaSize[];
  onSubmit(values: PizzaPriceValues): void;
}

export function PriceFormDialog({ trigger, sizes, onSubmit }: PriceFormDialogProps) {
  const form = useForm<PizzaPriceValues>({
    resolver: zodResolver(PizzaPriceSchema),
    defaultValues: {
      sizeId: '',
      price: '' as unknown as number,
    },
  });

  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const { handleSubmit } = form;

  function submitAndClose(values: PizzaPriceValues) {
    onSubmit(values);
    closeButtonRef.current?.click();
    form.reset();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <Form {...form}>
        <DialogContent>
          <form
            onSubmit={e => {
              e.preventDefault();
              e.stopPropagation();
              handleSubmit(submitAndClose)(e);
            }}
            className="grid gap-4 py-4">
            <DialogHeader>
              <DialogTitle>Новая цена</DialogTitle>
            </DialogHeader>
            <FormField
              control={form.control}
              name="sizeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Размер</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={value => field.onChange(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {sizes.map(({ id, title }) => (
                          <SelectItem key={id} value={id}>
                            {title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Цена, руб.</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min={1}
                      onChange={e => field.onChange(Number(e.target.value) || undefined)}
                    />
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
              <Button type="submit">Сохранить</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  );
}
