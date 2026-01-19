import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { JwtMiddleware } from '../utils/Authorization';


@Module({
  imports:[PrismaModule],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
// export class CategoriesModule {}


export class CategoriesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude({path: "categories/getAllCategories", method:RequestMethod.GET},
        {path: "categories/get-all-subCategories", method:RequestMethod.GET},
        {path: "categories/findsingleCategory/:customUrl", method:RequestMethod.GET},
        {path: "categories/findsingleCategorymain/:customUrl", method:RequestMethod.GET},
      
      )
      .forRoutes(CategoriesController); 
  }
}
