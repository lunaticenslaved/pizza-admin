import { z } from 'zod';

export const LoginSchema = z.object({
  password: z.string().min(1),
});
