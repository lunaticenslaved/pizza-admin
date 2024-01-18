'use client';

import { useState } from 'react';
import Dropzone from 'react-dropzone';

import Image from 'next/image';

import { Button } from '@/shared/ui/button';

const accept = {
  'image/jpeg': [],
  'image/png': [],
  'image/webp': [],
};

interface ImageDropProps {
  link?: string;
  disabled?: boolean;
  onDelete?(link: string): void;
  onSelect?(value?: File): void;
}

export function ImageDrop({ link, disabled, onDelete, onSelect }: ImageDropProps) {
  const [file, setFile] = useState<File>();
  const localLink = file ? URL.createObjectURL(file) : link;

  return (
    <div className="w-[300px] aspect-square relative rounded-lg overflow-hidden">
      {!localLink ? (
        <Dropzone
          maxFiles={1}
          disabled={disabled}
          onDrop={acceptedFiles => {
            onSelect?.(acceptedFiles[0]);
            setFile(acceptedFiles[0]);
          }}
          accept={accept}>
          {({ getRootProps, getInputProps }) => (
            <section className="cursor-pointer bg-neutral-100 p-6 rounded-lg h-full w-full text-center">
              <div {...getRootProps()} className="w-full h-full flex items-center justify-center">
                <input {...getInputProps()} className="focus-visible:outline-none w-full h-full" />
                <p className="mb-8">Перетащите сюда файл или кликните здесь, чтобы выбрать файл</p>
              </div>
            </section>
          )}
        </Dropzone>
      ) : (
        <>
          <Image alt="Image preview" src={localLink} fill className="object-cover object-center" />

          {!!link && (
            <Button
              className="absolute top-2 right-2 z-10"
              disabled={disabled}
              onClick={() => {
                setFile(undefined);

                if (link) {
                  onDelete?.(link);
                }
              }}>
              Удалить
            </Button>
          )}
        </>
      )}
    </div>
  );
}
