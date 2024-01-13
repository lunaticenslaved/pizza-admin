import { PlusIcon } from '@radix-ui/react-icons';

import { PizzaSizeFormDialog, PizzaSizeTable } from '@/entities/pazza-size';
import { PizzaTagFormDialog, PizzaTagsTable } from '@/entities/pizza-tag';
import { db } from '@/shared/db';
import { Button } from '@/shared/ui/button';

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
          pizza: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <>
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
