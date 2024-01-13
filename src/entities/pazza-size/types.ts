import { z } from 'zod';

import { PizzaSizeSchema } from './schema';

export type PizzaSizeValues = z.infer<typeof PizzaSizeSchema>;
