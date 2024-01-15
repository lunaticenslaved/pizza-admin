import { PlusIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

import { PizzaSizeFormDialog, PizzaSizeTable } from '@/entities/pazza-size';
import { normalizePizzaPrice } from '@/entities/pizza-price';
import { PizzaTagFormDialog, PizzaTagsTable } from '@/entities/pizza-tag';
import { db } from '@/shared/db';
import { Button } from '@/shared/ui/button';

import { PizzaTable } from './_components/common';
import { Section } from './_components/section';

export default async function PizzaPage() {
  const tags = await db.pizzaTag.findMany({
    include: {
      _count: {
        select: {
          pizza: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const sizes = await db.pizzaSize.findMany({
    include: {
      _count: {
        select: {
          prices: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const pizza = await db.pizza
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

  return (
    <>
      <Section
        title="Пицца"
        append={
          <Button asChild>
            <Link href="/pizza/new">
              <PlusIcon className="h-4 w-4 mr-2" />
              Создать пиццу
            </Link>
          </Button>
        }>
        <PizzaTable pizza={pizza} />
      </Section>
      <Section
        title="Теги"
        append={
          <PizzaTagFormDialog
            trigger={
              <Button>
                <PlusIcon className="h-4 w-4 mr-2" />
                Создать тег
              </Button>
            }
          />
        }>
        <PizzaTagsTable tags={tags} />
      </Section>
      <Section
        title="Размеры"
        append={
          <PizzaSizeFormDialog
            trigger={
              <Button>
                <PlusIcon className="h-4 w-4 mr-2" />
                Создать размер
              </Button>
            }
          />
        }>
        <PizzaSizeTable sizes={sizes} />
      </Section>
    </>
  );
}
