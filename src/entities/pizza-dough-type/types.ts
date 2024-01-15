import { z } from 'zod';

import { PizzaDoughTypeSchema } from './schema';

export type PizzaDoughTypeValues = z.infer<typeof PizzaDoughTypeSchema>;
