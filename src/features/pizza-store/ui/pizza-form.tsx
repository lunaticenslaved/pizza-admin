'use client';

import { useMemo, useTransition } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { zodResolver } from '@hookform/resolvers/zod';
import { Pizza, PizzaDoughType, PizzaPrice, PizzaSize, PizzaTag } from '@prisma/client';
import { Cross1Icon } from '@radix-ui/react-icons';
import { omit } from 'lodash';

import { ImageDrop } from '@/entities/file';
import { useUploadFile } from '@/entities/file/hooks';
import { createPizza } from '@/entities/pizza';
import { PizzaDoughTypeSelect } from '@/entities/pizza-dough-type';
import { PizzaPriceTable, PriceFormDialog } from '@/entities/pizza-price';
import { PizzaTagSelect } from '@/entities/pizza-tag';
import { PizzaSchema } from '@/entities/pizza/schema';
import { updatePizza } from '@/entities/pizza/server-actions';
import { PizzaSubmitValues, PizzaValues } from '@/entities/pizza/types';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';

type LocalPizza = Pizza & {
  image: { link: string };
  tags: Pick<PizzaTag, 'id' | 'title'>[];
  doughTypes: Pick<PizzaTag, 'id' | 'title'>[];
  prices: Array<Pick<PizzaPrice, 'id' | 'sizeId'> & { rub: number }>;
};

export interface PizzaFormProps {
  tags: PizzaTag[];
  sizes: PizzaSize[];
  doughTypes: PizzaDoughType[];
  pizza?: LocalPizza | null;
  onSubmitted?(): void;
}

export function PizzaForm({ doughTypes, tags, sizes, pizza, onSubmitted }: PizzaFormProps) {
  const form = useForm<PizzaValues>({
    resolver: zodResolver(PizzaSchema),
    defaultValues: {
      image: pizza?.image.link || '',
      title: pizza?.title || '',
      tags: pizza?.tags || [],
      doughTypes: pizza?.doughTypes || [],
      prices:
        pizza?.prices.map(price => ({
          price: Number(price.rub),
          sizeId: price.sizeId,
        })) || [],
    },
  });

  const tagsArray = useFieldArray({
    control: form.control,
    name: 'tags',
    keyName: '_id',
  });

  const pricesArray = useFieldArray({
    control: form.control,
    name: 'prices',
    keyName: '_id',
  });

  const doughTypesArray = useFieldArray({
    control: form.control,
    name: 'doughTypes',
    keyName: '_id',
  });

  const pricesError = form.getFieldState('prices').error?.message;

  const { handleSubmit } = form;

  const [isPending, startTransition] = useTransition();
  const { uploadFile } = useUploadFile();

  function onSubmit(values: PizzaValues) {
    startTransition(async () => {
      let imageLink = '';
      let submitValues: PizzaSubmitValues;

      if (values.image instanceof File) {
        await uploadFile(values.image, {
          onSuccess: ({ link }) => (imageLink = link),
        });

        submitValues = {
          ...omit(values, 'image'),
          imageLink,
        };
      } else {
        submitValues = {
          ...values,
          imageLink: values.image,
        };
      }

      const promise = pizza ? updatePizza(pizza.id, submitValues) : createPizza(submitValues);

      promise
        .then(({ type, message }) => {
          toast[type](message);

          onSubmitted?.();
        })
        .catch(() => {
          toast.error('что-то пошло не так');
        });
    });
  }

  const notUsedTags = useMemo(
    () => tags.filter(tag => !tagsArray.fields.find(tag2 => tag2.id === tag.id)),
    [tags, tagsArray.fields],
  );

  const notUsedSizes = useMemo(
    () => sizes.filter(size => !pricesArray.fields.find(price => price.sizeId === size.id)),
    [pricesArray.fields, sizes],
  );

  const notUsedDoughTypes = useMemo(
    () => doughTypes.filter(dt1 => !doughTypesArray.fields.find(dt => dt.id === dt1.id)),
    [doughTypes, doughTypesArray.fields],
  );

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Превью</FormLabel>
              <FormControl>
                <ImageDrop
                  link={typeof field.value === 'string' ? field.value : undefined}
                  disabled={isPending}
                  onDelete={() => field.onChange('')}
                  onSelect={value => field.onChange(value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название пиццы</FormLabel>
              <FormControl>
                <Input {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Теги</FormLabel>
          <div className="space-y-4">
            {!!tagsArray.fields.length && (
              <div className="flex items-center gap-x-2 gap-y-2 flex-wrap">
                {tagsArray.fields.map((tag, index) => (
                  <Badge key={tag.id} className="flex flex-nowrap whitespace-nowrap text-md">
                    {tag.title}
                    <Cross1Icon
                      className="h-3 w-3 ml-2"
                      role="button"
                      onClick={() => tagsArray.remove(index)}
                    />
                  </Badge>
                ))}
              </div>
            )}
            {!!notUsedTags.length && (
              <PizzaTagSelect
                placeholder="Выберите тег"
                items={notUsedTags}
                onChange={value => value && tagsArray.append(value)}
              />
            )}
          </div>
          <FormMessage />
        </FormItem>

        <FormItem>
          <FormLabel>Тесто</FormLabel>
          <div className="space-y-4">
            {!!doughTypesArray.fields.length && (
              <div className="flex items-center gap-x-2 gap-y-2 flex-wrap">
                {doughTypesArray.fields.map((doughType, index) => (
                  <Badge key={doughType.id} className="flex flex-nowrap whitespace-nowrap text-md">
                    {doughType.title}
                    <Cross1Icon
                      className="h-3 w-3 ml-2"
                      role="button"
                      onClick={() => doughTypesArray.remove(index)}
                    />
                  </Badge>
                ))}
              </div>
            )}
            {!!notUsedTags.length && (
              <PizzaDoughTypeSelect
                placeholder="Выберите тесто"
                items={notUsedDoughTypes}
                onChange={value => value && doughTypesArray.append(value)}
              />
            )}
          </div>
          <FormMessage />
        </FormItem>

        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex justify-center flex-col">
              <h4 className="font-semibold text-md">Цены</h4>
              {pricesError && <FormMessage>{pricesError}</FormMessage>}
            </div>

            {!!notUsedSizes.length && (
              <PriceFormDialog
                sizes={notUsedSizes}
                trigger={<Button disabled={isPending}>Добавить</Button>}
                onSubmit={values => pricesArray.append(values)}
              />
            )}
          </div>
          <PizzaPriceTable
            disabled={isPending}
            onDelete={index => {
              console.log('on delete');
              pricesArray.remove(index);
            }}
            sizes={pricesArray.fields.map(price => ({
              price: price.price,
              size: sizes.find(size => size.id === price.sizeId)?.title || '',
            }))}
          />

          <Button type="submit" disabled={isPending}>
            Сохранить
          </Button>
        </section>
      </form>
    </Form>
  );
}
