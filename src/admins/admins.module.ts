
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import{JwtMiddleware} from '../utils/Authorization'


@Module({
  imports: [PrismaModule],
  controllers: [AdminsController],
  providers: [AdminsService],
})

export class AdminsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude({path: "admins/admin-login", method:RequestMethod.POST},
        {path: "admins/super_admin_login-login", method:RequestMethod.POST},
        {path: "admins/getReviews", method:RequestMethod.POST},
        {path: "admins/fetchReviewsHandler", method:RequestMethod.GET}
      
      )
      .forRoutes(AdminsController); 
  }
}