import { z } from 'zod';

import { PizzaSchema } from './schema';

export type PizzaValues = z.infer<typeof PizzaSchema>;
