import { z } from 'zod';

export const PizzaDoughTypeSchema = z.object({
  title: z.string().min(1),
});
