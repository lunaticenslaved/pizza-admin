import { PizzaPrice } from '@prisma/client';

export function normalize<T extends Partial<PizzaPrice> & Required<Pick<PizzaPrice, 'rub'>>>(
  price: T,
): T & { rub: number } {
  return {
    ...price,
    rub: price.rub.toNumber(),
  };
}
