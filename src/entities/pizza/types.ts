import { z } from 'zod';

import { PizzaSchema, PizzaSubmitSchema } from './schema';

export type PizzaValues = z.infer<typeof PizzaSchema>;
export type PizzaSubmitValues = z.infer<typeof PizzaSubmitSchema>;
