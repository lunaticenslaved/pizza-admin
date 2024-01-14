import {
  DeleteObjectCommand,
  DeleteObjectCommandInput,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';
import { randomUUID } from 'node:crypto';

import {
  OBJECT_STORAGE_KEY_ID,
  OBJECT_STORAGE_NAME,
  OBJECT_STORAGE_REGION,
  OBJECT_STORAGE_SECRET,
} from '@/shared/server-constants';

export interface IObjectStorage {
  uploadFile(data: UploadFileRequest): Promise<{ link: string }>;
}

type UploadFileRequest = {
  buffer: PutObjectCommandInput['Body'];
  filename: string;
};

type ObjectStorageProps = {
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
  endpoint: string;
};

class ObjectStorage implements IObjectStorage {
  private client: S3Client;
  private bucketName: string;
  private endpoint: string;

  constructor({ bucketName, endpoint, ...props }: ObjectStorageProps) {
    this.bucketName = bucketName;
    this.endpoint = endpoint;

    this.client = new S3Client({
      endpoint,
      credentials: props,
      region: OBJECT_STORAGE_REGION,
    });
  }

  async uploadFile({ filename: name, buffer }: UploadFileRequest) {
    const fileName = `${randomUUID()}_${name}`;
    const params: PutObjectCommandInput = {
      Bucket: this.bucketName,
      Body: buffer,
      Key: fileName,
    };

    const link = `${this.endpoint}/${OBJECT_STORAGE_NAME}/${fileName}`;

    await this.client.send(new PutObjectCommand(params));

    console.log(
      'Successfully created ' +
        params.Key +
        ' and uploaded it to ' +
        params.Bucket +
        '/' +
        params.Key,
    );

    await this.client.config;

    return { link };
  }

  async deleteFile(filename: string) {
    const params: DeleteObjectCommandInput = {
      Bucket: this.bucketName,
      Key: filename,
    };

    await this.client.send(new DeleteObjectCommand(params));

    console.log(`Successfully deleted file '${filename}'`);
  }
}

export const objectStorage = new ObjectStorage({
  endpoint: 'https://storage.yandexcloud.net',
  bucketName: OBJECT_STORAGE_NAME,
  accessKeyId: OBJECT_STORAGE_KEY_ID,
  secretAccessKey: OBJECT_STORAGE_SECRET,
});
