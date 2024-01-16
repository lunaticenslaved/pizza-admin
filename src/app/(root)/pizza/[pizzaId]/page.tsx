import { normalizePizzaPrice } from '@/entities/pizza-price';
import { db } from '@/shared/db';

import { PizzaForm } from '../_components/common';

interface PizzaPageProps {
  params: {
    pizzaId: string;
  };
}

export default async function PizzaPage({ params: { pizzaId } }: PizzaPageProps) {
  const tags = await db.pizzaTag.findMany();
  const sizes = await db.pizzaSize.findMany();
  const doughTypes = await db.pizzaDoughType.findMany();

  if (pizzaId === 'new') {
    return <PizzaForm tags={tags} sizes={sizes} doughTypes={doughTypes} />;
  }

  const pizza = await db.pizza
    .findUniqueOrThrow({
      where: {
        id: pizzaId,
      },
      include: {
        tags: true,
        prices: true,
        image: true,
        doughTypes: true,
      },
    })
    .then(data => ({
      ...data,
      prices: data?.prices.map(normalizePizzaPrice),
    }));

  return <PizzaForm tags={tags} sizes={sizes} pizza={pizza} doughTypes={doughTypes} />;
}
