'use server';

import { db } from '@/shared/db';
import { ServerResponse } from '@/shared/types';

import { PizzaSizeValues } from './types';

export async function createSize({ title }: PizzaSizeValues): Promise<ServerResponse> {
  return db.$transaction(async trx => {
    const existingSize = await trx.pizzaSize.findUnique({
      where: { title },
    });

    if (existingSize) {
      return {
        type: 'error',
        message: 'Такой размер уже существует',
      };
    }

    await trx.pizzaSize.create({
      data: { title },
    });

    return {
      type: 'success',
      message: 'Размер создан',
    };
  });
}

export async function updateSize(
  sizeId: string,
  { title }: PizzaSizeValues,
): Promise<ServerResponse> {
  return db.$transaction(async trx => {
    const existingSize = await trx.pizzaSize.findUnique({
      where: { id: sizeId },
    });

    if (!existingSize) {
      return {
        type: 'error',
        message: 'Размер не найден',
      };
    }

    await trx.pizzaSize.update({
      where: { id: sizeId },
      data: { title },
    });

    return {
      type: 'success',
      message: 'Размер изменён',
    };
  });
}

export async function deleteSize(sizeId: string): Promise<ServerResponse> {
  return db?.$transaction(async trx => {
    const existingSize = await trx.pizzaSize.findUnique({
      where: { id: sizeId },
    });

    if (!existingSize) {
      return {
        type: 'error',
        message: 'Размер не найден',
      };
    }

    await trx.pizzaSize.delete({
      where: { id: sizeId },
    });

    return {
      type: 'success',
      message: `Размер '${existingSize.title}' удален`,
    };
  });
}
