import { z } from 'zod';

import { CreateTagSchema } from './schema';

export type CreateTagValues = z.infer<typeof CreateTagSchema>;
