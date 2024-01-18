'use client';

import { useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { Handlers } from '@/shared/types';

import { deleteFile } from './server-action';

interface DBFile {
  id: string;
  link: string;
}

export function useUploadFile() {
  const [isLoading, setIsLoading] = useState(false);

  const uploadFile = useCallback(async (file: File, { onSuccess, onError }: Handlers<DBFile>) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/files', {
        method: 'POST',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      onSuccess?.(await response.json());
    } catch (error) {
      toast.error('Что-то пошло не так при загрузка файла');
      onError?.(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return useMemo(
    () => ({
      isLoading,
      uploadFile,
    }),
    [isLoading, uploadFile],
  );
}

export function useDeleteFile() {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteFile = useCallback(
    async ({ link }: { link: string }, { onSuccess, onError }: Handlers) => {
      setIsDeleting(true);

      try {
        await deleteFile({ link });
        onSuccess?.();
      } catch (error) {
        toast.error('Что-то пошло не так при удалении файла');
        onError?.(error as Error);
      }

      setIsDeleting(false);
    },
    [],
  );

  return useMemo(
    () => ({
      isDeleting,
      deleteFile: handleDeleteFile,
    }),
    [handleDeleteFile, isDeleting],
  );
}
