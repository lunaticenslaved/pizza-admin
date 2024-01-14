import { z } from 'zod';

import { PizzaPriceSchema } from './schema';

export type PizzaPriceValues = z.infer<typeof PizzaPriceSchema>;
