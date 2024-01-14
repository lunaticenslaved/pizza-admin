'use server';

import { db } from '@/shared/db';
import { objectStorage } from '@/shared/object-storage';
import { ServerResponse } from '@/shared/types';

type DeleteFileRequest = {
  link: string;
};

export async function deleteFile({ link }: DeleteFileRequest): Promise<ServerResponse> {
  const existingImage = await db.file.findUnique({
    where: {
      link: link,
    },
  });

  if (!existingImage) {
    return {
      type: 'error',
      message: 'Файл не существует',
    };
  }

  await objectStorage.deleteFile(existingImage.name);

  await db.file.delete({
    where: {
      link: link,
    },
  });

  return {
    type: 'success',
    message: 'Файл удален',
  };
}
