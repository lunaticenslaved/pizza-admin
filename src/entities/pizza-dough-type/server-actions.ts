'use server';

import { db } from '@/shared/db';
import { ServerResponse } from '@/shared/types';

import { PizzaDoughTypeValues } from './types';

export async function createDoughType({ title }: PizzaDoughTypeValues): Promise<ServerResponse> {
  return db.$transaction(async trx => {
    const existingDoughType = await trx.pizzaDoughType.findUnique({
      where: { title },
    });

    if (existingDoughType) {
      return {
        type: 'error',
        message: 'Такое тесто уже существует',
      };
    }

    await trx.pizzaDoughType.create({
      data: { title },
    });

    return {
      type: 'success',
      message: 'Тесто создано',
    };
  });
}

export async function updateDoughType(
  doughTypeId: string,
  { title }: PizzaDoughTypeValues,
): Promise<ServerResponse> {
  return db.$transaction(async trx => {
    const existingDoughType = await trx.pizzaDoughType.findUnique({
      where: { id: doughTypeId },
    });

    if (!existingDoughType) {
      return {
        type: 'error',
        message: 'Тесто не найдено',
      };
    }

    await trx.pizzaDoughType.update({
      where: { id: doughTypeId },
      data: { title },
    });

    return {
      type: 'success',
      message: 'Тесто изменёно',
    };
  });
}

export async function deleteDoughType(doughTypeId: string): Promise<ServerResponse> {
  return db?.$transaction(async trx => {
    const existingDoughType = await trx.pizzaDoughType.findUnique({
      where: { id: doughTypeId },
    });

    if (!existingDoughType) {
      return {
        type: 'error',
        message: 'Тесто не найдено',
      };
    }

    await trx.pizzaDoughType.delete({
      where: { id: doughTypeId },
    });

    return {
      type: 'success',
      message: `Тесто '${existingDoughType.title}' удалено`,
    };
  });
}
