import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';

import { db } from '@/shared/db';

import { objectStorage } from '../../../shared/object-storage';

export async function POST(request: Request): Promise<Response> {
  const filename = randomUUID();
  const arrayBuffer = await request.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { link } = await objectStorage.uploadFile({ filename, buffer });

  const file = await db.file.create({
    data: {
      link,
      name: filename,
    },
  });

  return NextResponse.json(file);
}
