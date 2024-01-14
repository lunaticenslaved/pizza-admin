import { z } from 'zod';

export const PizzaPriceSchema = z.object({
  sizeId: z.string().min(1, 'Выберите размер'),
  price: z
    .number({
      invalid_type_error: 'Введите число',
    })
    .min(1, 'Значение должно быть не меньше 1')
    .nonnegative('Укажите положительное число'),
});
