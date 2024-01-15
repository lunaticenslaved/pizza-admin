'use server';

import { db } from '@/shared/db';
import { ServerResponse } from '@/shared/types';

import { PizzaSchema } from './schema';
import { PizzaValues } from './types';

export async function createPizza(values: PizzaValues): Promise<ServerResponse> {
  return db.$transaction(async (trx): Promise<ServerResponse> => {
    const validatedData = PizzaSchema.safeParse(values);

    if (!validatedData.success) {
      return {
        type: 'error',
        message: 'Неверные данные',
      };
    }

    const { data } = validatedData;

    const existingPizza = await trx.pizza.findUnique({
      where: { title: values.title },
    });

    if (existingPizza) {
      return {
        type: 'error',
        message: 'Пицца с таким названием уже существует',
      };
    }

    const image = await db.file.findUnique({
      where: {
        link: data.imageLink,
      },
    });

    if (!image) {
      return {
        type: 'error',
        message: 'Изображение не найдено',
      };
    }

    await trx.pizza.create({
      data: {
        title: data.title,
        imageId: image.id,
        tags: {
          connect: data.tags.map(tag => ({ id: tag.id })),
        },
        doughTypes: {
          connect: data.doughTypes.map(dt => ({ id: dt.id })),
        },
        prices: {
          create: data.prices.map(price => ({
            sizeId: price.sizeId,
            rub: price.price,
          })),
        },
      },
    });

    return {
      type: 'success',
      message: 'Пицца создана',
    };
  });
}

export async function updatePizza(pizzaId: string, values: PizzaValues): Promise<ServerResponse> {
  return db.$transaction(async (trx): Promise<ServerResponse> => {
    const validatedData = PizzaSchema.safeParse(values);

    if (!validatedData.success) {
      return {
        type: 'error',
        message: 'Неверные данные',
      };
    }

    const existingPizza = await trx.pizza.findUnique({
      where: { id: pizzaId },
    });

    if (!existingPizza) {
      return {
        type: 'error',
        message: 'Пицца не найдена',
      };
    }

    const { data } = validatedData;

    const pizzaWithTheTitle = await trx.pizza.findUnique({
      where: {
        title: values.title,
        NOT: {
          id: pizzaId,
        },
      },
    });

    if (pizzaWithTheTitle) {
      return {
        type: 'error',
        message: 'Пицца с таким названием уже существует',
      };
    }

    const image = await db.file.findUnique({
      where: {
        link: data.imageLink,
      },
    });

    if (!image) {
      return {
        type: 'error',
        message: 'Изображение не найдено',
      };
    }

    await trx.pizzaPrice.deleteMany({
      where: {
        pizzaId,
      },
    });

    await trx.pizza.update({
      where: {
        id: pizzaId,
      },
      data: {
        title: data.title,
        imageId: image.id,
        tags: {
          set: data.tags.map(tag => ({ id: tag.id })),
        },
        doughTypes: {
          set: data.doughTypes.map(dt => ({ id: dt.id })),
        },
        prices: {
          create: data.prices.map(price => ({
            sizeId: price.sizeId,
            rub: price.price,
          })),
        },
      },
    });

    return {
      type: 'success',
      message: 'Пицца обновлена',
    };
  });
}

export async function deletePizza(pizzaId: string): Promise<ServerResponse> {
  return db.$transaction(async (trx): Promise<ServerResponse> => {
    const existingPizza = await trx.pizza.findUnique({
      where: { id: pizzaId },
    });

    if (!existingPizza) {
      return {
        type: 'error',
        message: 'Пицца не существует',
      };
    }

    await trx.pizza.delete({
      where: {
        id: pizzaId,
      },
    });

    return {
      type: 'success',
      message: 'Пицца удалена',
    };
  });
}
