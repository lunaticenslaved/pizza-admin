import { NextResponse } from 'next/server';

import { normalizePizzaPrice } from '@/entities/pizza-price';
import { db } from '@/shared/db';

export async function GET() {
  const pizzas = await db.pizza
    .findMany({
      include: {
        image: {
          select: {
            link: true,
          },
        },
        prices: {
          select: {
            rub: true,
            size: {
              select: {
                title: true,
              },
            },
          },
        },
        doughTypes: {
          select: {
            id: true,
            title: true,
          },
        },
        tags: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    .then(arr =>
      arr.map(item => ({
        ...item,
        prices: item.prices.map(normalizePizzaPrice),
      })),
    );

  return NextResponse.json(pizzas);
}
