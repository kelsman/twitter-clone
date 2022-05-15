import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FileService {
  private s3: S3;
  constructor(private configService: ConfigService) {
    this.s3 = new S3({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      region: this.configService.get('AWS_REGION'),
    });
  }

  async uploadPublicFile(dataBuffer: Buffer, filename: string) {
    const uploadResult = await this.s3
      .upload({
        Bucket: this.configService.get<string>('AWS_PUBLIC_BUCKET_NAME'),
        Key: `${uuid()}-${filename}`,
        Body: dataBuffer,
      })
      .promise();

    return {
      url: uploadResult.Location,
      key: uploadResult.Key,
    };
  }

  async deletePublicFile(key: string) {
    await this.s3
      .deleteObject({
        Bucket: this.configService.get<string>('AWS_PUBLIC_BUCKET_NAME'),
        Key: key,
      })
      .promise();
  }
}
