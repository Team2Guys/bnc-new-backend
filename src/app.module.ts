import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { MyLoggerModule } from './my-logger/my-logger.module';
import { AppointmentModule } from './appointment/appointment.module';
import { AdminsModule } from './admins/admins.module';
import { BlogsModule } from './blogs/blogs.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [
    CategoriesModule,
    ProductsModule,
    FileUploadModule,
    MyLoggerModule,
    AppointmentModule,
    AdminsModule,
    BlogsModule,
    ReviewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
