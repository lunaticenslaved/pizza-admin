'use client';

import { useState } from 'react';
import Dropzone from 'react-dropzone';
import { toast } from 'react-toastify';

import Image from 'next/image';

import { Button } from '@/shared/ui/button';

import { deleteFile } from '../server-action';

const accept = {
  'image/jpeg': [],
  'image/png': [],
};

type LocalFile = {
  link: string;
};

interface ImageDropProps {
  value?: LocalFile;
  disabled?: boolean;
  onChange?(value?: LocalFile): void;
}

export function ImageDrop({ value, disabled, onChange }: ImageDropProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<LocalFile | undefined>(value);

  async function handleFileUpload(file: File) {
    setIsLoading(true);

    try {
      const response = await fetch('/api/files', {
        method: 'POST',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      const newlyUploadedFile: LocalFile = await response.json();

      setUploadedFile(newlyUploadedFile);
      onChange?.(newlyUploadedFile);
    } catch {
      toast.error('Что-то пошло не так при загрузка файла');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeleteFile() {
    setIsDeleting(true);

    if (!uploadedFile) {
      onChange?.(undefined);
    } else {
      try {
        onChange?.(undefined);
        await deleteFile(uploadedFile);
      } catch {
        toast.error('Что-то пошло не так при удалении файла');
      }
    }

    setIsDeleting(false);
  }

  return (
    <div className="w-[300px] aspect-square relative rounded-lg overflow-hidden">
      {!uploadedFile ? (
        <Dropzone
          maxFiles={1}
          disabled={isLoading || disabled}
          onDrop={acceptedFiles => handleFileUpload(acceptedFiles[0])}
          accept={accept}>
          {({ getRootProps, getInputProps }) => (
            <section className="cursor-pointer bg-neutral-100 p-6 rounded-lg h-full w-full text-center">
              <div {...getRootProps()} className="w-full h-full flex items-center justify-center">
                <input {...getInputProps()} className="focus-visible:outline-none w-full h-full" />
                <p className="mb-8">
                  {isLoading
                    ? 'Uploading...'
                    : 'Перетащите сюда файл или кликните здесь, чтобы выбрать файл'}
                </p>
              </div>
            </section>
          )}
        </Dropzone>
      ) : (
        <>
          <Image
            alt="Image preview"
            src={uploadedFile.link}
            fill
            className="object-cover object-center"
          />

          {!!uploadedFile && (
            <Button
              className="absolute top-2 right-2 z-10"
              disabled={isDeleting || disabled}
              onClick={handleDeleteFile}>
              Удалить
            </Button>
          )}
        </>
      )}
    </div>
  );
}
