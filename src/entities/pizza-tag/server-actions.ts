'use server';

import { db } from '@/shared/db';
import { ServerResponse } from '@/shared/types';

import { CreateTagValues } from './types';

export async function createTag({ name }: CreateTagValues): Promise<ServerResponse> {
  return db?.$transaction(async trx => {
    const existingTag = await trx.pizzaTag.findUnique({
      where: { title: name },
    });

    if (existingTag) {
      return {
        type: 'error',
        message: 'Такой тег уже существует',
      };
    }

    await trx.pizzaTag.create({
      data: { title: name },
    });

    return {
      type: 'success',
      message: 'Тег создан',
    };
  });
}

export async function editTag(tagId: string, { name }: CreateTagValues): Promise<ServerResponse> {
  return db?.$transaction(async trx => {
    const existingTag = await trx.pizzaTag.findUnique({
      where: { id: tagId },
    });

    if (!existingTag) {
      return {
        type: 'error',
        message: 'Тег не найден',
      };
    }

    await trx.pizzaTag.update({
      where: { id: tagId },
      data: { title: name },
    });

    return {
      type: 'success',
      message: 'Тег изменён',
    };
  });
}

export async function deleteTag(tagId: string): Promise<ServerResponse> {
  return db?.$transaction(async trx => {
    const existingTag = await trx.pizzaTag.findUnique({
      where: { id: tagId },
    });

    if (!existingTag) {
      return {
        type: 'error',
        message: 'Тег не найден',
      };
    }

    await trx.pizzaTag.delete({
      where: { id: tagId },
    });

    return {
      type: 'success',
      message: `Тег '${existingTag.title}' удален`,
    };
  });
}
