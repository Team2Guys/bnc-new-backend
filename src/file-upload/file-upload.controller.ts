import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Param,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { FileUploadService } from './file-upload.service';
@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly FileUploadService: FileUploadService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file, 'file');
    return this.FileUploadService.getFile(file);
  }
  @Delete('DelImage/:id')
  DeleteImageHandler(@Param('id') id: string) {
    return this.FileUploadService.DeleteImage(id);
  }

  @Post('upload-s3')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
    }),
  )
  uploadFileToS3(@UploadedFile() file: Express.Multer.File) {
    console.log(file, 'file');
    return this.FileUploadService.uploadFile(file);
  }

  @Delete('DelImages3/:id')
  DeleteImageHandlerfromS3(@Param('id') id: string) {
    return this.FileUploadService.deleteFile(id);
  }
}
