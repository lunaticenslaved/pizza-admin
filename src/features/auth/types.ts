import { z } from 'zod';

import { LoginSchema } from './schemas';

export type LoginValues = z.infer<typeof LoginSchema>;
