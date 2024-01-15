import { z } from 'zod';

export const PizzaSizeSchema = z.object({
  title: z.string().min(1),
});
