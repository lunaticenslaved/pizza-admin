import { PlusIcon } from '@radix-ui/react-icons';

import { PizzaTagFormDialog, PizzaTagsTable } from '@/entities/pizza-tag';
import { db } from '@/shared/db';
import { Button } from '@/shared/ui/button';
import { Separator } from '@/shared/ui/separator';

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

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold mb-2">Теги пиццы</h3>
        <PizzaTagFormDialog
          trigger={
            <Button>
              <PlusIcon className="h-4 w-4 mr-2" />
              Создать тег
            </Button>
          }
        />
      </div>
      <Separator />
      <PizzaTagsTable tags={tags} />
    </>
  );
}
