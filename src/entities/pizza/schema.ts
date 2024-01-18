import { z } from 'zod';

const common = {
  title: z.string().min(1, 'Укажите название'),
  tags: z.array(z.object({ id: z.string(), title: z.string() })),
  doughTypes: z.array(z.object({ id: z.string(), title: z.string() })),
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
};

export const PizzaSchema = z
  .object({
    ...common,
    image: z.string().min(1, 'Укажите превью'),
  })
  .or(
    z.object({
      ...common,
      image: z.instanceof(File).refine(v => !!v, 'Укажите превью'),
    }),
  );

export const PizzaSubmitSchema = z.object({
  ...common,
  imageLink: z.string().min(1, 'Укажите превью'),
});
