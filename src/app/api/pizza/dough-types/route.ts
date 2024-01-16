import { NextResponse } from 'next/server';

import { db } from '@/shared/db';

export async function GET() {
  const pizzas = await db.pizzaDoughType.findMany({
    select: {
      id: true,
      title: true,
    },
    orderBy: {
      title: 'asc',
    },
  });

  return NextResponse.json(pizzas);
}
