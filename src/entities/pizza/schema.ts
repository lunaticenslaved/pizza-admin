import { z } from 'zod';

export const PizzaSchema = z.object({
  imageLink: z.string().min(1, 'Укажите превью'),
  title: z.string().min(1, 'Укажите название'),
  tags: z.array(z.object({ id: z.string(), title: z.string() })),
  prices: z
    .array(
      z.object({
        sizeId: z.string().min(1, 'Обязательное'),
        price: z
          .number({ invalid_type_error: 'Введите число', required_error: 'Введите число' })
          .nonnegative('Введите положительное число'),
      }),
    )
    .min(1, 'Создайте хотя бы одну цену'),
});
