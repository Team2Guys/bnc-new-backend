import { Injectable } from '@nestjs/common';

import { cloudinary, s3 } from './cloudinary.config';
import { CustomErrorHandler } from '../utils/helperFunctions';
// utils/s3.ts
import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class FileUploadService {
  async getFile(file: Express.Multer.File): Promise<any> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) {
            CustomErrorHandler(error.message, 'INTERNAL_SERVER_ERROR');
            return reject(error);
          }

          console.log(result, 'result');
          resolve({ imageUrl: result.secure_url, public_id: result.public_id });
        },
      );

      uploadStream.end(file.buffer);
    });
  }

  async DeleteImage(image_public_id: string) {
    return await cloudinary.uploader.destroy(image_public_id);
  }

  async uploadFile(
    file: Express.Multer.File,
  ): Promise<{ imageUrl: string; public_id: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        const fileKey = `${Date.now()}-s3`;

        const command = new PutObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET_NAME!,
          Key: fileKey,
          Body: file.buffer,
          ContentType: file.mimetype,
        });

        await s3.send(command);

        const imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
        resolve({ imageUrl, public_id: fileKey });
      } catch (error: any) {
        console.error(error);
        reject(error);
      }
    });
  }

  async deleteFile(key: string) {
    try {
      const command = new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: key,
      });

      await s3.send(command);
      return { message: 'File deleted successfully' };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
